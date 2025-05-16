import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { UserRole } from "src/common/enums/roles.enums";
import { Roles } from "src/common/decorators/roles.decorators";
import { NewPropertyDto } from "../dtos/newProperty.dto";
import { PropertyService } from "../services/property.service";

@Controller('properties')
@UseGuards(JwtAuthGuard)
export class PropertyController{
    constructor(
        private readonly propertyService: PropertyService
    ){}

    @Post('/create')
    @UseGuards(RolesGuard)
    @Roles(UserRole.TENANT)
    async createProperty(@Req() req: Request, @Body() newPropertyDto: NewPropertyDto){
        return await this.propertyService.addNewProperty(req['user'].userId, newPropertyDto);
    }
}