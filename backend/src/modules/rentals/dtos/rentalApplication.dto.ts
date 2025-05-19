import { IsNotEmpty, IsOptional } from "class-validator";
import { RentalDurationType } from "src/common/enums/rentalDurationType.enums";

export class CreateRentalApplicationDto{

    @IsNotEmpty()
    propertyId: string

    @IsNotEmpty()
    fullName: string;
    
    @IsNotEmpty()
    dateOfBirth: Date;
    
    @IsNotEmpty()
    phoneNumber: string;
    
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    currentAddress: string;
    
    @IsNotEmpty()
    governmentIdType: string; // e.g. Aadhar, Passport
    
    @IsNotEmpty()
    governmentIdNumber: string;
    
    @IsNotEmpty()
    governmentPhotoId: string;
    
    // 🏢 Employment Info
    @IsNotEmpty()
    jobTitle: string;
    
    @IsNotEmpty()
    monthlyIncome: number;
    
    @IsNotEmpty()
    employmentDuration: string;
    
    @IsNotEmpty()
    employerContact: string;
    
        // 👨‍👩‍👧 Occupants & Pets
    @IsNotEmpty()
    numberOfOccupants: number;

    @IsNotEmpty()
    occupantDetails: string; // names & ages

    @IsOptional()
    hasPets: boolean;

    @IsOptional()
    petDetails: string;

    // 📝 Additional Fields
    @IsNotEmpty()
    message: string;
    
    @IsNotEmpty()
    expectedMoveInDate: Date;

    @IsNotEmpty()
    rentalDuration: number; 

    @IsNotEmpty()
    rentalDurationType: RentalDurationType
}