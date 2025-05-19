import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { RentalApplication } from 'src/modules/rentals/entities/rentalApplication.entity';
import { PropertyService } from 'src/modules/properties/services/property.service';

@Processor('agreementsQueue')
export class AgreementProcessor {
  
    constructor(
        private readonly propertyService: PropertyService,
    ) {}

    @Process('generateAgreement') // Job Name
    async generateAgreement(job: Job<{ rentalApplication: RentalApplication }>) {
        try{
            const { rentalApplication } = job.data;
            console.log('Data for Agreement is received from the queue: ', rentalApplication);

            const result = await this.propertyService.getPropertyByPropertyId(rentalApplication.propertyId);
            if(result.success){
                const property = result.property;
            }
            
        }catch(error){
            console.error('Error in notification processor: ', error.message);
        }
    }
}