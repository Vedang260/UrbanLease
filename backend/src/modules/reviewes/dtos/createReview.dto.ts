import { IsNotEmpty, IsString } from "class-validator";

export class CreateReviewDto{
    @IsNotEmpty()
    @IsString()
    propertyId: string;

    @IsNotEmpty()
    @IsString()
    tenantId: string;

    @IsNotEmpty()
    rating: number;

    @IsNotEmpty()
    @IsString()
    content: string;
}