import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { RentalPeriod } from "src/common/enums/rentalPeroid.enums";
import { CreateFeatureDto } from "./createFeature.dto";
import { PropertyType } from "../../../common/enums/propertyType.enums";

export class NewPropertyDto{
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

    @IsNotEmpty()
    propertyType: PropertyType;

    @IsNotEmpty()
    @Min(-90)
    @Max(90)
    latitude: number;

    @IsNotEmpty()
    @Min(-180)
    @Max(180)
    longitude: number;

     @IsNotEmpty()
    @IsString()
    street: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    zipcode: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateFeatureDto)
    features?: CreateFeatureDto[];
}