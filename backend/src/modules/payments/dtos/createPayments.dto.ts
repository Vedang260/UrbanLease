import { IsNotEmpty } from "class-validator";

export class CreatePaymentDto{
    @IsNotEmpty()
    tenantId: string;

    @IsNotEmpty()
    agreementId: string;

    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    dueDate: Date;
}