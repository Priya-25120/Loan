import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { 
  Users,
  Star
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useFadeIn = (threshold = 0.2) => {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: `top ${100 - threshold * 100}%`,
          toggleActions: 'play none none none'
        }
      }
    );
  }, [threshold]);
  
  return ref;
};

export function ReviewsPage() {
  const sectionRef = useFadeIn(0.3) as React.RefObject<HTMLElement>;
  const [showAll, setShowAll] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewCounts, setReviewCounts] = useState<Record<string, number>>({});
  
  useEffect(() => {
    // Load real reviews from localStorage or API
    const stored = localStorage.getItem('quickloan_reviews');
    if (stored) {
      setReviews(JSON.parse(stored));
    }
    
    const storedCounts = localStorage.getItem('quickloan_member_reviews');
    if (storedCounts) {
      setReviewCounts(JSON.parse(storedCounts));
    }
  }, []);
  
  // Function to get star color based on review count
  const getStarColor = (reviewCount: number) => {
    if (reviewCount >= 5) return 'text-purple-400 fill-purple-400';
    if (reviewCount >= 3) return 'text-blue-400 fill-blue-400';
    if (reviewCount >= 2) return 'text-green-400 fill-green-400';
    return 'text-yellow-400 fill-yellow-400';
  };
  
  const displayedReviews = showAll ? reviews : reviews.slice(0, 4);
  
  return (
    <section id="reviews" ref={sectionRef} className="bg-loan-dark py-16 px-5 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-loan-primary" />
            <span className="text-loan-primary text-xs font-semibold">Customer Reviews</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-loan-text mb-1">Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-loan-primary text-loan-primary" />
              ))}
            </div>
            <span className="text-loan-text-secondary text-sm">{reviews.length > 0 ? `(${reviews.length} reviews)` : 'No reviews yet'}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {displayedReviews.length === 0 ? (
          <p className="text-loan-text-secondary text-center py-8">No reviews available yet.</p>
        ) : (
          displayedReviews.map((review, i) => {
            const reviewCount = reviewCounts[review.name] || 1;
            const starColor = getStarColor(reviewCount);
            
            return (
              <div key={i} className="bg-loan-surface border border-loan-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-loan-violet flex items-center justify-center">
                      <span className="text-loan-text text-xs font-bold">{review.name[0]}</span>
                    </div>
                    <div>
                      <span className="text-loan-text text-sm font-medium">{review.name}</span>
                      <span className="text-loan-text-secondary text-xs ml-2">{review.location}</span>
                      <span className="text-xs ml-2 px-2 py-1 rounded-full bg-loan-dark/50 text-gray-400">
                        {reviewCount} reviews
                      </span>
                    </div>
                  </div>
                  <span className="text-loan-text-secondary text-xs">{review.date}</span>
                </div>
                <div className="flex mb-2">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className={`w-3 h-3 ${starColor}`} />
                  ))}
                </div>
                <p className="text-loan-text-secondary text-sm">{review.text}</p>
              </div>
            );
          })
        )}
      </div>
      
      {reviews.length > 4 && (
        <Button 
          variant="outline" 
          className="w-full mt-4 border-loan-border text-loan-text rounded-lg"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less Reviews' : `View All ${reviews.length} Reviews`}
        </Button>
      )}
    </section>
  );
}
