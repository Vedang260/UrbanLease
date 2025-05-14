import { IsNotEmpty, MinLength, MaxLength, IsStrongPassword, IsString, IsEmail, IsEnum  } from 'class-validator';
import { UserRole } from 'src/common/enums/roles.enums';

// register dto
export class CreateUserDto {
    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    phoneNumber: string;
    
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    @MinLength(6)
    @MaxLength(15)
    password: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;
}