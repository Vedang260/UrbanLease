import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Address } from "../entities/address.entity";
import { CreateAddressDto } from "../dtos/createAddress.dto";

@Injectable()
export class AddressRepository{
    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>
    ){}
    
    async addNewAddress(createAddressDto: CreateAddressDto): Promise<Address>{
        try{
            const newAddress = this.addressRepository.create(createAddressDto);
            return await this.addressRepository.save(newAddress);
        }catch(error){
            console.error('Error in creating new Address: ', error.message);
            throw new InternalServerErrorException('Error in creating new Address: ');
        }
    }
}