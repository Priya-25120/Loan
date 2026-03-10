import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from '../database/schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const newReview = new this.reviewModel(createReviewDto);
    const savedReview = await newReview.save();
    return {
      message: 'Review created successfully',
      review: savedReview,
    };
  }

  async findAll() {
    return this.reviewModel.find({ isActive: true }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    const review = await this.reviewModel.findById(id);
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  async update(id: string, updateReviewDto: Partial<CreateReviewDto>) {
    const review = await this.reviewModel.findByIdAndUpdate(
      id,
      { $set: updateReviewDto },
      { new: true },
    );
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return {
      message: 'Review updated successfully',
      review,
    };
  }

  async remove(id: string) {
    const review = await this.reviewModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return {
      message: 'Review deleted successfully',
    };
  }
}
