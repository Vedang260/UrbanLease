import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { UserRole } from "src/common/enums/roles.enums";
import { Roles } from "src/common/decorators/roles.decorators";
import { ReviewService } from "../services/review.service";
import { CreateReviewDto } from "../dtos/createReview.dto";

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewController{
    constructor(
        private readonly reviewService: ReviewService
    ){}

    @Get('/property/:id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.OWNER, UserRole.TENANT)
    async getPropertyReviews(@Param('id') propertyId: string){
        return await this.reviewService.getPropertyReview(propertyId);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TENANT)
    async deleteReview(@Param('id') reviewId: string){
        return await this.reviewService.deleteReview(reviewId);
    }

    @Post('/create')
    @UseGuards(RolesGuard)
    @Roles(UserRole.TENANT)
    async createReview(@Req() req: Request, @Body() createReviewDto: Partial<CreateReviewDto>){
        return await this.reviewService.createReview(req['user'].userId, createReviewDto);
    }
}