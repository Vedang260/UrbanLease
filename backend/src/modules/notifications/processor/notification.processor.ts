import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from '../dtos/createNotification.dto';

@Processor('notificationsQueue')
export class NotificationProcessor {
  
    constructor(
        private readonly notificationService: NotificationService,
    ) {}

    @Process('notify') // Job Name
    async notify(job: Job<{ createNotificationDto: CreateNotificationDto}>) {
        try{
            const { createNotificationDto } = job.data;
            console.log('Notification is received from the queue: ', createNotificationDto);
            
            const result = await this.notificationService.createNotification(createNotificationDto);
            
            if(result)
        }catch(error){
            console.error('Error in notification processor: ', error.message);
        }
    }
}