import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Review } from "../entities/review.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateReviewDto } from "../dtos/createReview.dto";

@Injectable()
export class ReviewRepository{
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>
    ){}

    async createReview(createReviewDto: CreateReviewDto){
        try{
            const newReview = this.reviewRepository.create(createReviewDto);
            return await this.reviewRepository.save(newReview);
        }catch(error){
            console.error('Error in creating a new Review: ', error.message);
            throw new InternalServerErrorException('Error in creating a review');
        }
    }

    async getPropertyReviewes(propertyId: string){
        try{
            return await this.reviewRepository.find({
                where: {propertyId}
            });
        }catch(error){
            console.error('Error in fetching property reviews: ', error.message);
            throw new InternalServerErrorException('Error in fetching property reviews');
        }
    }

    async deleteReview(reviewId: string): Promise<boolean>{
        try{
            const result = await this.reviewRepository.delete({reviewId});
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting review: ', error.message);
            throw new InternalServerErrorException('Error in deleting review');
        }
    }
}


