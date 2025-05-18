import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PropertyRepository } from "../repositories/property.repository";
import { NewPropertyDto } from "../dtos/newProperty.dto";
import { CreateLocationDto } from "../dtos/createLocation.dto";
import { LocationRepository } from "../repositories/location.repository";
import { CreateAddressDto } from "../dtos/createAddress.dto";
import { AddressRepository } from "../repositories/address.repository";
import { CreatePropertyDto } from "../dtos/createProperty.dto";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";
import { CreateNotificationDto } from "src/modules/notifications/dtos/createNotification.dto";
import * as dotenv from 'dotenv';
import { NotificationType } from "src/common/enums/notificationType.enums";
import { CreateFeatureDto } from "../dtos/createFeature.dto";
import { FeatureRepository } from "../repositories/feature.repository";
import { Feature } from "../entities/feature.entity";
dotenv.config();

@Injectable()
export class PropertyService{
    constructor(
        private readonly propertyRepository: PropertyRepository,
        private readonly locationRepository: LocationRepository,
        private readonly addressRepository: AddressRepository,
         private readonly featureRepository: FeatureRepository,
        @InjectQueue('notificationsQueue') private notificationsQueue: Queue
    ){}

    async addNewProperty(ownerId: string, newPropertyDto: NewPropertyDto) {
        try {
            // Step 1: Create location
            const createLocationDto: CreateLocationDto = {
                latitude: newPropertyDto.latitude,
                longitude: newPropertyDto.longitude,
            };
            const location = await this.locationRepository.addNewLocation(createLocationDto);

            if (!location) {
                throw new InternalServerErrorException('Failed to add location');
            }

            // Step 2: Create address
            const createAddressDto: CreateAddressDto = {
                street: newPropertyDto.street,
                state: newPropertyDto.state,
                city: newPropertyDto.city,
                country: newPropertyDto.country,
                zipcode: newPropertyDto.zipcode,
            };
            const address = await this.addressRepository.addNewAddress(createAddressDto);

            if (!address) {
                throw new InternalServerErrorException('Failed to add address');
            }

            // Step 3: Create Features 
            const createdFeatures: any = [];

            if (newPropertyDto.features && newPropertyDto.features.length > 0) {
                for (const feature of newPropertyDto.features) {
                    const featureDto: CreateFeatureDto = {
                        name: feature.name,
                        type: feature.type,
                        details: feature.details,
                    };
                    const createdFeature = await this.featureRepository.addNewFeatures(featureDto);
                    createdFeatures.push(createdFeature);
                }
            }


            // Step 3: Create property
            const createPropertyDto: CreatePropertyDto = {
                ownerId: ownerId,
                locationId: location.locationId,
                addressId: address.addressId,
                title: newPropertyDto.title,
                description: newPropertyDto.description,
                areaSqft: newPropertyDto.areaSqft,
                numberOfBedrooms: newPropertyDto.numberOfBedrooms,
                numberOfBathrooms: newPropertyDto.numberOfBathrooms,
                numberOfBalconies: newPropertyDto.numberOfBalconies,
                rentAmount: newPropertyDto.rentAmount,
                depositAmount: newPropertyDto.depositAmount,
                rentalPeriod: newPropertyDto.rentalPeriod,
                images: newPropertyDto.images,
                phoneNumber: newPropertyDto.phoneNumber,
                features: createdFeatures,
                propertyType: newPropertyDto.propertyType
            };

            const createdProperty = await this.propertyRepository.addNewProperty(createPropertyDto);
            if(!createdProperty){
                throw new InternalServerErrorException('Failed to add property');
            }

            const notificationDto: CreateNotificationDto = {
                userId: process.env.ADMIN_ID as string,
                title: 'New Property',
                message: `A new property titled "${createdProperty.title}" has been added.`,
                type: NotificationType.ALERT
            }
            await this.notificationsQueue.add('notify', {notificationDto});

            return{
                success: true,
                message: 'New Property is added'
            }
        } catch (error) {
            console.error('Error in creating a new Property: ', error.message);
            return{
                success: false,
                message: 'Failed to add new property'
            }
        }
    }

    async getPropertyRequests(){
        try{
            const property = await this.propertyRepository.getPropertyRequests();
            if(property){
                return{
                    success: true,
                    message: 'Property requests are fetched',
                    propertyRequest: property
                }
            }
            throw new Error('Failed to fetch property request');
        }catch(error){
            console.error('Error in fetching property requests');
        }
    }

    async getPropertyByPropertyId(propertyId: string){
        try{
            const property = await this.propertyRepository.getPropertyById(propertyId);
            return{
                success: true,
                message: 'Property is fetched',
                property: property
            }
        }catch(error){
            console.error('Error in fetching the property details: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch the property details'
            }
        }
    }

    async approvePropertyRequest(propertyId: string){
        try{
            const result = await this.propertyRepository.approveProperty(propertyId);
            if(result){
                const property = await this.propertyRepository.getPropertyById(propertyId);
                const notificationDto: CreateNotificationDto = {
                    userId: property?.ownerId as string,
                    title: 'Property Approval',
                    message: `Congratulations🎉 !!!  \n
                        Your Property "${property?.title}" has been approved by Admin.`,
                    type: NotificationType.ALERT
                }
                
                await this.notificationsQueue.add('notify', {notificationDto});
                
                return{
                    success: true,
                    message: 'Property is approved successfully'
                }
            }
            throw new Error('Failed to approve property');
        }catch(error){
            console.error('Error in approving the status of the property: ', error.message);
            return{
                success: false,
                message: 'Failed to approve the property'
            }
        }
    }
}