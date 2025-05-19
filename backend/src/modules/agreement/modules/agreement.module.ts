import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { PropertyModule } from 'src/modules/properties/modules/property.module';
import { NotificationModule } from 'src/modules/notifications/modules/notification.module';
import { Agreement } from '../entities/agreement.entity';
import { AgreementProcessor } from '../processor/agreement.processor';
import { AgreementController } from '../controller/agreement.controller';
import { AgreementRepository } from '../repositories/agreement.repository';
import { AgreementService } from '../service/agreement.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agreement]), 
    PropertyModule,
    NotificationModule,
    BullModule.registerQueue({
        name: 'agreementsQueue',
    }),
  ],
  controllers: [AgreementController],
  providers: [AgreementService, AgreementRepository, AgreementProcessor],
  exports: [AgreementService, AgreementRepository, BullModule],
})
export class AgreementModule {} 