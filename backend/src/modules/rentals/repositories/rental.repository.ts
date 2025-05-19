import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RentalApplication } from "../entities/rentalApplication.entity";
import { Repository } from "typeorm";
import { CreateRentalApplicationDto } from "../dtos/rentalApplication.dto";
import { ApplicationStatus } from "src/common/enums/applicationStatus.enums";

@Injectable()
export class RentalRepository{
    constructor(
        @InjectRepository(RentalApplication)
        private readonly rentalRepository: Repository<RentalApplication>
    ){}

    async createRentalApplication(tenantId: string, createRentalApplicationDto: CreateRentalApplicationDto){
        try{
            const newRental = this.rentalRepository.create({...createRentalApplicationDto, tenantId});
            return await this.rentalRepository.save(newRental);
        }catch(error){
            console.error('Error in creating a rental application');
            throw new InternalServerErrorException('Failed to create a new Rental Application');
        }
    }

    async getRentalApplicationTenant(tenantId: string){
        try{
            const rentalApplication = await this.rentalRepository.find({
                relations: [
                        'property',
                    ],
                    order: {
                        createdAt: 'DESC',
                },
                where: { tenantId: tenantId }
            });
            return rentalApplication;
        }catch(error){
            console.error('Error in fetching the tenant applications: ', error.message);
            throw new InternalServerErrorException('Failed to fetch tenant Rental Application');
        }
    }

    async getRenatlApplicationOwner(ownerId: string){
        try{
            const rentalApplications = await this.rentalRepository
                .createQueryBuilder('rentalApplication')
                .innerJoinAndSelect('rentalApplication.property', 'property')
                .where('property.ownerId = :ownerId', { ownerId })
                .getMany();
            return rentalApplications;
        }catch(error){
            console.error('Error in fetching the applications for the owner: ', error.message);
            throw new InternalServerErrorException('Failed to fetch owner Rental Application');
        }
    }

    async getAllRentalApplications(){
        try{
            const rentalApplications = await this.rentalRepository
                .createQueryBuilder('rentalApplication')
                .innerJoinAndSelect('rentalApplication.property', 'property')
                .getMany();
            return rentalApplications;
        }catch(error){
            console.error('Error in fetching the applications for Admin: ', error.message);
            throw new InternalServerErrorException('Failed to fetch all Rental Application');
        }
    }

    async deleteRentalApplication(rentalApplicationId: string): Promise<boolean>{
        try{
            const result = await this.rentalRepository.delete({rentalApplicationId});
            return result.affected ? result.affected>0 : false;
        }catch(error){
            console.error('Error in deleting rental application: ', error.message);
            throw new InternalServerErrorException('Failed to update the rental application');
        }
    }

    async updateRentalStatus(rentalApplicationId: string, status: ApplicationStatus): Promise<boolean>{
        try{
            const result = await this.rentalRepository.update({rentalApplicationId}, {status});
            return result.affected ? result.affected>0 : false;
        }catch(error){
            console.error('Error in updating the rental status: ', error.message);
            throw new InternalServerErrorException('Failed to update the rental application');
        }
    }

    async getRentalApplicationById(rentalApplicationId: string){
        try{
            return await this.rentalRepository.findOne({
                where: {rentalApplicationId}
            });
        }catch(error){
            console.error('Error in fetching rental application by Id');
            throw new InternalServerErrorException('Failed to fetch rental application');
        }
    }
}