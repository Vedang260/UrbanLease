import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from '../entities/feature.entity';
import { Location } from '../entities/location.entity';
import { Property } from '../entities/property.entity';
import { Address } from '../entities/address.entity';
import { PropertyService } from '../services/property.service';
import { PropertyRepository } from '../repositories/property.repository';
import { PropertyController } from '../controllers/property.controller';
import { LocationRepository } from '../repositories/location.repository';
import { AddressRepository } from '../repositories/address.repository';
import { NotificationModule } from 'src/modules/notifications/modules/notification.module';
import { UploadModule } from 'src/utils/upload/upload.module';
import { FeatureRepository } from '../repositories/feature.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Address, Location, Feature]), 
    NotificationModule,
    UploadModule
  ],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepository, LocationRepository, AddressRepository, FeatureRepository],
  exports: [PropertyService, PropertyRepository, LocationRepository, AddressRepository, FeatureRepository],
})
export class PropertyModule {} 