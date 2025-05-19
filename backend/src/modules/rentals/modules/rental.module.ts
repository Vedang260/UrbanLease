import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalApplication } from '../entities/rentalApplication.entity';
import { RentalController } from '../controllers/rental.controller';
import { BullModule } from '@nestjs/bull';
import { RentalRepository } from '../repositories/rental.repository';
import { RentalService } from '../services/rental.service';
import { RentalProcessor } from '../processor/rental.processor';
import { PropertyModule } from 'src/modules/properties/modules/property.module';
import { NotificationModule } from 'src/modules/notifications/modules/notification.module';
import { AgreementModule } from 'src/modules/agreement/modules/agreement.module';

@Module({
  imports: [TypeOrmModule.forFeature([RentalApplication]), 
    PropertyModule,
    NotificationModule,
    AgreementModule,
    BullModule.registerQueue({
        name: 'rentalsQueue',
    }),
  ],
  controllers: [RentalController],
  providers: [RentalService, RentalRepository, RentalProcessor],
  exports: [RentalService, RentalRepository, BullModule],
})
export class RentalModule {} 