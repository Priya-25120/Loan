import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Phone,
  Mail,
  Shield,
  Award,
  BadgeCheck
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

export function ContactPage() {
  const sectionRef = useFadeIn(0.3) as React.RefObject<HTMLElement>;
  
  return (
    <section id="contact" ref={sectionRef} className="bg-loan-dark py-8 px-5">
      <div className="flex items-center gap-2 mb-2">
        <BadgeCheck className="w-5 h-5 text-loan-primary" />
        <span className="text-loan-primary text-sm font-semibold">24/7 Support Available</span>
      </div>
      <h2 className="text-2xl font-display font-bold text-loan-text mb-2">Contact Us</h2>
      <p className="text-loan-text-secondary text-sm mb-8">We're here to help anytime</p>
      
      <div className="space-y-4 mb-8">
        <a 
          href="tel:1-800-555-0123" 
          className="flex items-center justify-center gap-3 w-full bg-loan-primary text-white font-semibold py-4 px-6 rounded-xl hover:bg-loan-secondary transition-all active:scale-[0.98] cursor-pointer select-none touch-manipulation"
          aria-label="Call 1-800-555-0123"
        >
          <Phone className="w-6 h-6" />
          <span className="text-lg">Call</span>
        </a>
        
        <a 
          href="mailto:support@quickloan.com"
          className="flex items-center justify-center gap-3 w-full bg-loan-surface border-2 border-loan-border text-loan-text font-semibold py-4 px-6 rounded-xl hover:bg-loan-card hover:border-loan-primary transition-all active:scale-[0.98] cursor-pointer select-none touch-manipulation"
          aria-label="Email support@quickloan.com"
        >
          <Mail className="w-6 h-6" />
          <span className="text-lg">Email</span>
        </a>
      </div>
      
      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-loan-surface border border-loan-border rounded-xl p-4 text-center">
          <Shield className="w-8 h-8 text-loan-primary mx-auto mb-2" />
          <p className="text-loan-text text-sm font-semibold">256-bit SSL</p>
          <p className="text-loan-text-secondary text-xs">Bank-level security</p>
        </div>
        <div className="bg-loan-surface border border-loan-border rounded-xl p-4 text-center">
          <Award className="w-8 h-8 text-loan-primary mx-auto mb-2" />
          <p className="text-loan-text text-sm font-semibold">BBB A+ Rated</p>
          <p className="text-loan-text-secondary text-xs">Trusted since 2015</p>
        </div>
      </div>
      
      {/* Legal */}
      <div className="pt-6 border-t border-loan-border">
        <p className="text-loan-text-secondary text-xs text-center leading-relaxed">
          QuickLoan is a licensed lender. Loans subject to credit review and approval. 
          Actual rate depends on credit profile. NMLS ID: #1234567. 
          © 2024 QuickLoan. All rights reserved.
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Link to="/privacy" className="text-loan-text-secondary text-xs hover:text-loan-primary">Privacy Policy</Link>
          <Link to="/terms" className="text-loan-text-secondary text-xs hover:text-loan-primary">Terms of Service</Link>
          <Link to="/licenses" className="text-loan-text-secondary text-xs hover:text-loan-primary">Licenses</Link>
        </div>
      </div>
    </section>
  );
}
