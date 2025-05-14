import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification.repository";
import { Notification } from "../entities/notification.entity";
import { CreateNotificationDto } from "../dtos/createNotification.dto";

@Injectable()
export class NotificationService{
    constructor(
        private readonly notificationRepository: NotificationRepository
    ){}

    async createNotification(createNotificationDto: CreateNotificationDto){
        try{
            const newNotification = await this.notificationRepository.createNotification(createNotificationDto);
        }catch(error){
            console.error('Error in creating notification: ', error.message);
            return{
                success: false,
                message: 'Failed to create notification'
            }
        }
    }

    async getAllNotifications(userId: string): Promise<{ success: boolean; message: string; notifications: Notification[]}>{
        try{
            const notifications = await this.notificationRepository.getAllNotifications(userId);
            if(notifications){
                return {
                    success: true,
                    message: 'All notifications are fetched',
                    notifications: notifications
                }
            }
            throw new Error('Failed to fetch the notifications');
        }catch(error){
            console.error('Error in fetching all notifications: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch the notifications',
                notifications: []
            }
        }
    }

    async deleteNotification(notificationId: string): Promise<{ success: boolean;  message: string;}>{
        try{
            const result = await this.notificationRepository.deleteNotification(notificationId);
            if(result){
                return {
                    success: true,
                    message: 'Notification is deleted successfully'
                }
            }
            throw new Error('Failed to delete notification');
        }catch(error){
            console.error('Error in deleting notification: ', error.message);
            return{
                success: false,
                message: 'Failed to delete notification'
            }
        }
    }

    async markAllNotificationsAsRead(userId: string): Promise<{success: boolean; message: string;}>{
        try{
            const result = await this.notificationRepository.markAllAsRead(userId);
            return{
                success: true,
                message: 'Marked as Read'
            }
        }catch(error){
            console.error('Error in updating the notification as read: ', error.message);
            return{
                success: false,
                message: 'Failed to update the notification as read'
            }
        }
    }
}