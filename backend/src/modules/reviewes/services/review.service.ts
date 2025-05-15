import { Injectable } from "@nestjs/common";
import { ReviewRepository } from "../repositories/review.repository";
import { CreateReviewDto } from "../dtos/createReview.dto";

@Injectable()
export class ReviewService{
    constructor(
        private readonly reviewRepository: ReviewRepository
    ){}

    async createReview(userId: string, createReviewDto: Partial<CreateReviewDto>){
        try{
            const newCreateReview = {
                ...createReviewDto,
                tenantId: userId,
            } as CreateReviewDto;

            const newReview = await this.reviewRepository.createReview(newCreateReview);
            if(newReview){
                return {
                    success: true,
                    message: 'Your review is added'
                }
            }
            throw new Error('Failed to add review');
        }catch(error){
            console.error('Error in creating a new review: ', error.message);
            return{
                success: false,
                message: 'Failed to add review'
            }
        }
    }

    async getPropertyReview(propertyId: string){
        try{
            const reviews = await this.reviewRepository.getPropertyReviewes(propertyId);
            if(reviews){
                return{
                    success: true,
                    message: 'Reviews are fetched successfully',
                    reviews: reviews
                }
            }
            throw new Error('Failed to fetch the reviews');
        }catch(error){
            console.error('Error in fetching all the property reviews');
            return{
                success: false,
                message: 'Failed to fetch the property reviews',
                reviews: []
            }
        }
    }

    async deleteReview(reviewId: string){
        try{
            const result = await this.reviewRepository.deleteReview(reviewId);
            if(result){
                return{
                    success: true,
                    message: 'Review is deleted'
                }
            }
            throw new Error('Failed to delete review');
        }catch(error){
            console.error('Error in deleting a review');
            return{
                success: false,
                message: 'Failed to delete Review'
            }
        }
    }
}