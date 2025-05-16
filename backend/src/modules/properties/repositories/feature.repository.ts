import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Feature } from "../entities/feature.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFeatureDto } from "../dtos/createFeature.dto";

@Injectable()
export class FeatureRepository{
    constructor(
        @InjectRepository(Feature)
        private readonly featureRepository: Repository<Feature>
    ){}

    async addNewFeatures(createFeatureDto: CreateFeatureDto){
        try{
            const features = this.featureRepository.create(createFeatureDto);
            return await this.featureRepository.save(features);
        }catch(error){
            console.error('Error in creating new Features: ', error.message);
            throw new InternalServerErrorException('Error in creating features');
        }
    }
}