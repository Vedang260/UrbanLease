import { IsNotEmpty } from "class-validator";

export class CreateAgreementDto{
    @IsNotEmpty()
    tenantId: string;
    
    @IsNotEmpty()
    propertyId: string;
    
    @IsNotEmpty()
    startDate: Date;
    
    @IsNotEmpty()
    endDate: Date;
    
    @IsNotEmpty()
    agreementUrl: string;
}