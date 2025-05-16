import { Injectable } from "@nestjs/common";
import { PropertyRepository } from "../repositories/property.repository";
import { NewPropertyDto } from "../dtos/newProperty.dto";
import { CreateLocationDto } from "../dtos/createLocation.dto";

@Injectable()
export class PropertyService{
    constructor(
        private readonly propertyRepository: PropertyRepository
    ){}

    async addNewProperty(newPropertyDto: NewPropertyDto){
        try{
            const createLocationDto: CreateLocationDto = {
                latitude: newPropertyDto.latitude,
                longitude: newPropertyDto.longitude
            };
            const locationId = await this.
        }catch(error){
            console.error('Error in creating a new Property: ', error.message);
        }
    }

    async editProperty(){
        try{

        }catch(error){

        }
    }

    async deleteProperty(){
        try{

        }catch(error){

        }
    }

    async getPropertyRequests(){
        try{

        }catch(error){

        }
    }

    async getPropertyListing(){
        try{

        }catch(error){

        }
    }

    async getOwnerProperties(){
        try{

        }catch(error){

        }
    }
}