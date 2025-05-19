import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { PropertyModule } from 'src/modules/properties/modules/property.module';
import { NotificationModule } from 'src/modules/notifications/modules/notification.module';
import { Agreement } from '../entities/agreement.entity';
import { AgreementProcessor } from '../processor/agreement.processor';

@Module({
  imports: [TypeOrmModule.forFeature([Agreement]), 
    PropertyModule,
    NotificationModule,
    BullModule.registerQueue({
        name: 'agreementsQueue',
    }),
  ],
  providers: [AgreementProcessor],
  exports: [BullModule],
})
export class AgreementModule {} 