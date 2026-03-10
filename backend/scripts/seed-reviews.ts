import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ReviewsService } from '../src/reviews/reviews.service';

const initialReviews = [
  {
    name: 'Sarah Johnson',
    location: 'Texas, USA',
    rating: 5,
    text: 'QuickLoan made the entire process so easy! I got approved in under 2 minutes and had the money in my account the same day. The rates were much better than my bank offered. Highly recommend!',
    isActive: true,
  },
  {
    name: 'Michael Chen',
    location: 'California, USA',
    rating: 5,
    text: 'I was skeptical at first, but this service is legit. No hidden fees, no credit check impact, and the customer support was fantastic. Got my debt consolidation loan quickly!',
    isActive: true,
  },
  {
    name: 'Jennifer Williams',
    location: 'Florida, USA',
    rating: 4,
    text: 'Great experience overall. The application was simple and I got a decision immediately. The only reason for 4 stars instead of 5 is I wish they had higher loan limits, but for my needs it was perfect.',
    isActive: true,
  },
  {
    name: 'David Martinez',
    location: 'Arizona, USA',
    rating: 5,
    text: 'After being turned down by my bank, QuickLoan came through for me. The approval process was fast and transparent. Now I can finally fix my roof. Thank you!',
    isActive: true,
  },
  {
    name: 'Emily Rodriguez',
    location: 'New York, USA',
    rating: 5,
    text: 'This is my second time using QuickLoan and they never disappoint. Same day funding, great rates, and zero hassle. Best loan service I have ever used!',
    isActive: true,
  },
  {
    name: 'Robert Taylor',
    location: 'Ohio, USA',
    rating: 4,
    text: 'Very satisfied with the service. The online application took just a few minutes and I had my approval instantly. The money was in my account within hours.',
    isActive: true,
  },
];

async function seedReviews() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const reviewsService = app.get(ReviewsService);

  console.log('Starting reviews seed...');

  for (const reviewData of initialReviews) {
    try {
      await reviewsService.create(reviewData);
      console.log(`✅ Created review from ${reviewData.name}`);
    } catch (error) {
      console.error(`❌ Failed to create review from ${reviewData.name}:`, error.message);
    }
  }

  console.log('✅ Reviews seed completed!');
  await app.close();
}

seedReviews().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
