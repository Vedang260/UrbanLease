import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Property } from "../entities/property.entity";
import { Repository } from "typeorm";
import { CreatePropertyDto } from "../dtos/createProperty.dto";
import { updatePropertyDto } from "../dtos/updateProperty.dto";
import { PropertyStatus } from "src/common/enums/propertyStatus.enums";

@Injectable()
export class PropertyRepository{
    constructor(
        @InjectRepository(Property)
        private readonly propertyRepository: Repository<Property>
    ){}

    async addNewProperty(createPropertyDto: CreatePropertyDto): Promise<Property>{
        try{
            const newProperty = this.propertyRepository.create(createPropertyDto);
            return await this.propertyRepository.save(newProperty);
        }catch(error){
            console.error('Error in creating new Property: ', error.message);
            throw new InternalServerErrorException('Error in creating new Property: ');
        }
    }

    async editProperty(propertyId: string, updatePropertyDto: updatePropertyDto): Promise<boolean>{
        try{
            const result = await this.propertyRepository.update({propertyId}, updatePropertyDto);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating Property: ', error.message);
            throw new InternalServerErrorException('Error in updating Property: ');
        }
    }

    async deleteProperty(propertyId: string): Promise<boolean>{
        try{
            const result = await this.propertyRepository.delete({propertyId});
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting Property: ', error.message);
            throw new InternalServerErrorException('Error in deleting Property: ');
        }
    }

    async getPropertyRequests(): Promise<Property[]> {
        try {
            const properties = await this.propertyRepository.find({
                relations: [
                    'location',
                    'address',
                    'features',
                ],
                order: {
                    createdAt: 'DESC',
                },
                where: { status: PropertyStatus.PENDING_APPROVAL }
            });

            return properties;
        } catch (error) {
            console.error('Error in fetching property requests: ', error.message);
            throw new InternalServerErrorException('Error in fetching property requests');
        }
    }

    async getPropertyListing(){
        try{
            const properties = await this.propertyRepository.find({
                relations: [
                    'owner',
                    'location',
                    'address',
                    'features',
                ],
                order: {
                    createdAt: 'DESC',
                },
                where: { status: PropertyStatus.AVAILABLE }
            });

            return properties;
        }catch(error){
            console.error('Error in fetching property requests: ', error.message);
            throw new InternalServerErrorException('Error in fetching property requests');
        }
    }

    async getOwnerProperties(ownerId: string){
        try{
            const properties = await this.propertyRepository.find({
                relations: [
                    'owner',
                    'location',
                    'address',
                    'features',
                ],
                order: {
                    createdAt: 'DESC',
                },
                where: { ownerId }
            });
            return properties;
        }catch(error){
            console.error('Error in fetching owner properties: ', error.message);
            throw new InternalServerErrorException('Error in fetching owner properties');
        }
    }

    async getPropertyById(propertyId: string): Promise<Property|null>{
        try{
            return await this.propertyRepository.findOne({
                relations: [
                    'location',
                    'address',
                    'features',
                ],
                order: {
                    createdAt: 'DESC',
                },
                where: {propertyId}
            });
        }catch(error){
            console.log('Error in fetching the property details: ', error.message);
            throw new InternalServerErrorException('Failed to fetch the property details');
        }
    }

    async approveProperty(propertyId: string): Promise<boolean>{
        try{
            const result = await this.propertyRepository.update({propertyId}, { status: PropertyStatus.AVAILABLE });
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in approving the property: ', error.message);
            throw new InternalServerErrorException('Failed to approve property');
        }
    }
}