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
    async notify(job: Job<{ notificationDto: CreateNotificationDto}>) {
        try{
            const { notificationDto } = job.data;
            console.log('Notification is received from the queue: ', notificationDto);
            
            const result = await this.notificationService.createNotification(notificationDto);
            
            if(result.success){
                console.log(result.message);
            }else{
                console.log(result.message);
            }
        }catch(error){
            console.error('Error in notification processor: ', error.message);
        }
    }
}