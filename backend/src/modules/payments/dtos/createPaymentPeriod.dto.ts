import { IsNotEmpty } from "class-validator";

export class CreatePaymentPeriodDto{
    @IsNotEmpty()
    tenantId: string;

    @IsNotEmpty()
    agreementId: string;

    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    rentalDuration: number;
}