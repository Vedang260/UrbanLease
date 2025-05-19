import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { UserRole } from "src/common/enums/roles.enums";
import { Roles } from "src/common/decorators/roles.decorators";
import { CreateRentalApplicationDto } from "../dtos/rentalApplication.dto";
import { RentalService } from "../services/rental.service";
import { ApplicationStatus } from "src/common/enums/applicationStatus.enums";

@Controller('rentals')
@UseGuards(JwtAuthGuard)
export class RentalController{
    constructor(
        private readonly rentalService: RentalService
    ){}

    // @Get('/request')
    // @UseGuards(RolesGuard)
    // @Roles(UserRole.OWNER)
    // async getPropertyReviews(@Param('id') propertyId: string){
    //     return await this.reviewService.getPropertyReview(propertyId);
    // }

    @Get('/tenants')
    @UseGuards(RolesGuard)
    @Roles(UserRole.TENANT)
    async getRentalRequestsTenant(@Req() req: Request){
        return await this.rentalService.getRentalApplicationsTenant(req['user'].userId);
    }

    @Get('/owners')
    @UseGuards(RolesGuard)
    @Roles(UserRole.OWNER)
    async getRentalRequestsOwner(@Req() req: Request){
        return await this.rentalService.getRentalApplicationOwner(req['user'].userId);
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    async getAllRentalRequests(){
        return await this.rentalService.getAllRentalApplications();
    }

    @Post('/create')
    @UseGuards(RolesGuard)
    @Roles(UserRole.TENANT)
    async createRental(@Req() req: Request, @Body() createRentalDto: CreateRentalApplicationDto){
        return await this.rentalService.createNewApplication(req['user'].userId, createRentalDto);
    }

    @Put(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.OWNER)
    async updateStatus(@Param('id') rentalApplicationId: string,@Body() body: { status:ApplicationStatus}){
        return await this.rentalService.updateRentalStatus(rentalApplicationId, body.status);
    }
}