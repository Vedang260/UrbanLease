import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { RentalApplication } from 'src/modules/rentals/entities/rentalApplication.entity';
import { PropertyService } from 'src/modules/properties/services/property.service';
import { AgreementService } from '../service/agreement.service';
import { UploadService } from 'src/utils/upload/upload.service';
import { CreateAgreementDto } from '../dtos/createAgreement.dto';
import { UsersService } from 'src/modules/users/services/user.service';

@Processor('agreementsQueue')
export class AgreementProcessor {
  
    constructor(
        private readonly propertyService: PropertyService,
        private readonly agreementService: AgreementService,
        private readonly uploadService: UploadService,
        private readonly userService: UsersService
    ) {}

    @Process('generateAgreement') // Job Name
    async generateAgreement(job: Job<{ rentalApplication: RentalApplication }>) {
        try{
            const { rentalApplication } = job.data;
            console.log('Data for Agreement is received from the queue: ', rentalApplication);

            const result = await this.propertyService.getPropertyByPropertyId(rentalApplication.propertyId);
            if(result.success){
                const property = result.property;
                
                if(property){
                    const owner = await this.userService.findOne(property?.ownerId);
                    if(owner){
                        // Step 1: Generate the rental agreement PDF as a buffer
                        const pdfBuffer = await this.agreementService.generateRentalAgreementBuffer(rentalApplication, property, owner);

                        // Step 2: Upload Generated PDF to cloudinary
                        const result = await this.uploadService.uploadPDFBuffer(pdfBuffer);

                        if(result.success && result.url){
                            const expectedMoveInDate = new Date(rentalApplication.expectedMoveInDate);

                            const endDate = new Date(
                                expectedMoveInDate.getFullYear(),
                                expectedMoveInDate.getMonth() + rentalApplication.rentalDuration,
                                expectedMoveInDate.getDate()
                            );
                            const createAgreementDto: CreateAgreementDto = {
                                tenantId: rentalApplication.tenantId,
                                propertyId: rentalApplication.propertyId,
                                startDate: rentalApplication.expectedMoveInDate,
                                endDate: endDate,
                                agreementUrl: result.url
                            }

                            await this.agreementService.createAgreement(createAgreementDto);
                        }
                    }
                }
            }
        }catch(error){
            console.error('Error in agreement processor: ', error.message);
        }
    }
}