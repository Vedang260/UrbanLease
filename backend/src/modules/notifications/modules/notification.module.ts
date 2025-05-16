import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationController } from '../controllers/notification.controller';
import { NotificationService } from '../services/notification.service';
import { NotificationRepository } from '../repositories/notification.repository';
import { NotificationProcessor } from '../processor/notification.processor';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository, NotificationProcessor],
  exports: [NotificationService, NotificationRepository, NotificationProcessor],
})
export class NotificationModule {} 