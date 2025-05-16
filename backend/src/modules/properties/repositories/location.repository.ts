import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLocationDto } from "../dtos/createLocation.dto";
import { Location } from '../entities/location.entity';

@Injectable()
export class LocationRepository{
    constructor(
        @InjectRepository(Location)
        private readonly locationRepository: Repository<Location>
    ){}
    
    async addNewLocation(createLocationDto: CreateLocationDto): Promise<Location>{
        try{
            const newLocation = this.locationRepository.create(createLocationDto);
            return await this.locationRepository.save(newLocation);
        }catch(error){
            console.error('Error in creating new Location: ', error.message);
            throw new InternalServerErrorException('Error in creating new Location: ');
        }
    }
}