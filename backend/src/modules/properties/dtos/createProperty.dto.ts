import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { RentalPeriod } from "src/common/enums/rentalPeroid.enums";
import { CreateFeatureDto } from "./createFeature.dto";
import { PropertyType } from "src/common/enums/propertyType.enums";

export class CreatePropertyDto{
    @IsNotEmpty()
    @IsString()
    ownerId: string;
    
    @IsNotEmpty()
    @IsString()
    addressId: string;

    @IsNotEmpty()
    @IsString()
    locationId: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    areaSqft: number;
    
    @IsOptional()
    numberOfBedrooms: number;
    
    @IsOptional()
    numberOfBathrooms: number;

    @IsOptional()
    numberOfBalconies: number;

    @IsNotEmpty()
    rentAmount: number;

    @IsNotEmpty()
    depositAmount: number;

    @IsNotEmpty()
    rentalPeriod: RentalPeriod

    @IsNotEmpty()
    images: string[];    
    
    @IsNotEmpty()
    phoneNumber: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateFeatureDto)
    features?: CreateFeatureDto[];

    @IsNotEmpty()
    propertyType: PropertyType;
}