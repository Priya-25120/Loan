import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  rating: number;

  @IsString()
  @IsNotEmpty()
  text: string;
}
