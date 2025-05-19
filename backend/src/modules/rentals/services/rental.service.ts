import { Injectable } from "@nestjs/common";
import { RentalRepository } from "../repositories/rental.repository";
import { CreateRentalApplicationDto } from "../dtos/rentalApplication.dto";
import { PropertyRepository } from "src/modules/properties/repositories/property.repository";
import { ApplicationStatus } from "src/common/enums/applicationStatus.enums";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";
import { NotificationType } from "src/common/enums/notificationType.enums";
import { CreateNotificationDto } from "src/modules/notifications/dtos/createNotification.dto";

@Injectable()
export class RentalService{
    constructor(
        private readonly rentalRepository: RentalRepository,
        private readonly propertyRepository: PropertyRepository,
        @InjectQueue('rentalsQueue') private rentalsQueue: Queue,
        @InjectQueue('notificationsQueue') private notificationsQueue: Queue
    ){}

    async createNewApplication(tenantId: string, createRentalApplicationDto: CreateRentalApplicationDto){
        try{
            const newApp = await this.rentalRepository.createRentalApplication(tenantId, createRentalApplicationDto);
            if(newApp){
                const property = await this.propertyRepository.getPropertyById(newApp.propertyId);
                if(property){
                    const notificationDto: CreateNotificationDto = {
                        userId: property.ownerId as string,
                        title: 'New Rental Request',
                        message: `A new Rental Request for "${property.title}" has been added.`,
                        type: NotificationType.REQUEST
                    }
                    await this.notificationsQueue.add('notify', {notificationDto});
                }

                return{
                    success: true,
                    message: 'Failed to create new App'
                }
            }
            throw new Error('Failed to create a new App')
        }catch(error){
            console.error('Error in creating a new rental Application');
            return{
                success: false,
                message: 'Failed to create new Application'
            }
        }
    }

    async  getRentalApplicationsTenant(tenantId: string){
        try{

        }catch(error){
            console.error('Error in fetching tenant rental applications');
            return{
                success: false,
                message: 'Failed to create new Application'
            }
        }
    }

    async getRentalApplicationOwner(ownerId: string){
        try{

        }catch(error){
            console.error('Error in fetching rental applications for owner');
            return{
                success: false,
                message: 'Failed to fetch rental applications'
            }
        }
    }

    async getAllRentalApplications(){
        try{
            const rentals = await this.rentalRepository.getAllRentalApplications();
        }catch(error){
            console.error('Error in fetching all rental applications');
            return{
                success: false,
                message: 'Failed to fetch all rental applications'
            } 
        }
    }

    async updateRentalStatus(rentalApplicationId: string, status: ApplicationStatus){
        try{
            const result = await this.rentalRepository.updateRentalStatus(rentalApplicationId, status);
            if(result){
                const rentalApplication = await this.rentalRepository.getRentalApplicationById(rentalApplicationId);
                if(rentalApplication){
                    await this.rentalsQueue.add('rentals', { rentalApplication, status });
                }
                return{
                    success: true,
                    message: 'Rental Application updated successfully'
                }
            }
            throw new Error ('Error in updating the rental status');
        }catch(error){
            console.error('Error in updating the rental Status: ', error.message);
            return{
                success: false,
                message: 'Failed to update rental status'
            }
        }
    }

    async deleteRentalApplication(rentalApplicationId: string){
        try{
            const result = await this.rentalRepository.deleteRentalApplication(rentalApplicationId);
            return{
                success: true,
                message: 'Rental Application Deleted Successfully'
            }
        }catch(error){
            console.error('Error in deleting rental application: ', error.message);
            return{
                success: false,
                message: 'Failed to delete rental application'
            }
        }
    }
}