import { Injectable } from "@nestjs/common";
import { AgreementRepository } from "../repositories/agreement.repository";

@Injectable()
export class AgreementService{
    constructor(
        private readonly agreementRepository: AgreementRepository
    ){}

    async generateAgreement(){
        try{

        }catch(error){

        }
    }

    async uploadAgreement(){

    }
    
    async createAgreement(){

    }
}