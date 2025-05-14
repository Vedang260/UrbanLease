import { IsNotEmpty, Max, Min } from "class-validator";

export class CreateLocationDto{
    @IsNotEmpty()
    @Min(-90)
    @Max(90)
    latitude: number;

    @IsNotEmpty()
    @Min(-180)
    @Max(180)
    longitude: number;
}