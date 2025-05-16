import { Injectable } from "@nestjs/common";
import { PropertyRepository } from "../repositories/property.repository";

@Injectable()
export class PropertyService{
    constructor(
        private readonly propertyRepository: PropertyRepository
    ){}

    async addNewProperty(){
        try{
            
        }catch(error){

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