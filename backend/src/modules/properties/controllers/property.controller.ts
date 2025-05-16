import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { UserRole } from "src/common/enums/roles.enums";
import { Roles } from "src/common/decorators/roles.decorators";
import { NewPropertyDto } from "../dtos/newProperty.dto";
import { PropertyService } from "../services/property.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UploadService } from "src/utils/upload/upload.service";

@Controller('properties')
@UseGuards(JwtAuthGuard)
export class PropertyController{
    constructor(
        private readonly propertyService: PropertyService,
        private readonly uploadService: UploadService
    ){}

    @Post('/create')
    @UseGuards(RolesGuard)
    @Roles(UserRole.OWNER)
    async createProperty(@Req() req: Request, @Body() newPropertyDto: NewPropertyDto){
        return await this.propertyService.addNewProperty(req['user'].userId, newPropertyDto);
    }

    @Post('upload-image')
    @UseInterceptors(FilesInterceptor('image'))
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.OWNER)
    async uploadImage(@UploadedFiles() files: Express.Multer.File[]){
        return await this.uploadService.uploadMultipleFiles(files);
    }
}