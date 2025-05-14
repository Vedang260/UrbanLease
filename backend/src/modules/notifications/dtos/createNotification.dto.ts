import { IsNotEmpty, IsString } from "class-validator";
import { NotificationType } from "src/common/enums/notificationType.enums";

export class CreateNotificationDto{
    
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    message: string;

    @IsNotEmpty()
    type: NotificationType;
}