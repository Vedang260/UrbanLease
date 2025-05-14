import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "../entities/notification.entity";
import { Repository } from "typeorm";
import { CreateNotificationDto } from "../dtos/createNotification.dto";
import { InternalServerErrorException } from "@nestjs/common";

export class NotificationRepository{
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>
    ){}

    async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification>{
        try{
            const newNotification = await this.notificationRepository.create(createNotificationDto);
            return await this.notificationRepository.save(newNotification);
        }catch(error){
            console.error('Error in creating notification: ', error.message);
            throw new InternalServerErrorException('Error in creating a notification');
        }
    }

    async markAllAsRead(userId: string): Promise<boolean>{
        try{
            const result = await this.notificationRepository.update({userId}, {isRead: true});
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in changing status to read: ', error.message);
            throw new InternalServerErrorException('Error in changing status to read');
        }
    }

    async deleteNotification(notificationId: string): Promise<boolean>{
        try{
            const result = await this.notificationRepository.delete({notificationId});
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting a notification: ', error.message);
            throw new InternalServerErrorException('Error in deleting notification');
        }
    }
    async getAllNotifications(userId: string): Promise<Notification[]>{
        try{
            return await this.notificationRepository.find({
                where: { userId }
            });
        }catch(error){
            console.error('Error in fetching all notifications: ', error.message);
            throw new InternalServerErrorException('Error in fetching all notifications');
        }
    }
}