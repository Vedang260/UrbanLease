import { Processor, Process, InjectQueue } from '@nestjs/bull';
import { ApplicationConfig } from '@nestjs/core';
import { Job, Queue } from 'bull';
import { RentalApplication } from '../entities/rentalApplication.entity';
import { ApplicationStatus } from 'src/common/enums/applicationStatus.enums';
import { CreateNotificationDto } from 'src/modules/notifications/dtos/createNotification.dto';
import { NotificationType } from 'src/common/enums/notificationType.enums';

@Processor('rentalsQueue')
export class RentalProcessor {
  
    constructor(
        @InjectQueue('notificationsQueue') private notificationsQueue: Queue,
        @InjectQueue('agreementsQueue') private agreementsQueue: Queue
    ) {}

    @Process('rentals') // Job Name
    async processRentals(job: Job<{ rentalApplication: RentalApplication, status: ApplicationStatus}>) {
        try{
            const { rentalApplication, status } = job.data;
            
            const notificationDto: CreateNotificationDto = {
                userId: rentalApplication.tenantId as string,
                title: 'Rental Request',
                message: `Your rental request for the property has been "${status.toUpperCase()}" `,
                type: status === 'approved' ? NotificationType.APPROVAL : NotificationType.REJECTION
            }
            await this.notificationsQueue.add('notify', {notificationDto});

            if(status === 'approved'){
                await this.agreementsQueue.add('generateAgreement', rentalApplication);
                console.log('Rental Agreement details sent...');
            }

        }catch(error){
            console.error('Error in rental processor: ', error.message);
        }
    }
}