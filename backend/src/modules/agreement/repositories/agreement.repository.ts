import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Agreement } from "../entities/agreement.entity";
import { Repository } from "typeorm";
import { CreateAgreementDto } from "../dtos/createAgreement.dto";

@Injectable()
export class AgreementRepository{

    constructor(
        @InjectRepository(Agreement)
        private readonly agreementRepository: Repository<Agreement>
    ){}

    async createAgreement(agreementDto: CreateAgreementDto){
        try{
            const newAgreement = this.agreementRepository.create(agreementDto);
            return await this.agreementRepository.save(newAgreement);
        }catch(error){
            console.error('Error in creating a new Agreement: ', error.message);
            throw new InternalServerErrorException('Failed to create a new Agreement: ', error.message);
        }
    }

    async getAgreementsForTenant(tenantId: string){
        try{
            return this.agreementRepository.find({
                where: {tenantId}
            });
        }catch(error){
            console.error('Error in fetching Agreements for Tenant: ', error.message);
            throw new InternalServerErrorException('Failed to fetch tenant agreements: ', error.message);
        }
    }

    async getAllAgreements(){
        try{
            return await this.agreementRepository.find();
        }catch(error){
            console.error('Error in creating a new Agreement: ', error.message);
            throw new InternalServerErrorException('Failed to create a new Agreement: ', error.message);
        }
    }

    async getOwnerAgreements(){
        try{

        }catch(error){
            console.error('Error in creating a new Agreement: ', error.message);
            throw new InternalServerErrorException('Failed to create a new Agreement: ', error.message);
        }
    }

}