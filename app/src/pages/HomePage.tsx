import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FileText, 
  HelpCircle, 
  User,
  CheckCircle,
  CheckCircle2,
  Zap,
  Percent,
  Shield,
  Banknote,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  Users,
  Star,
  MessageCircle,
  Clock,
  Lock,
  BadgeCheck,
  Sparkles,
  Timer,
  Award,
  Flag,
  Building2,
  Phone,
  Mail,
  HeadphonesIcon,
  AlertCircle
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

const TrustBadge = ({ icon: Icon, text, subtext, color = 'lime' }: { icon: any, text: string, subtext?: string, color?: 'lime' | 'gold' | 'blue' }) => {
  const colorClasses = {
    lime: 'bg-purple-500/20 border-purple-500/50',
    gold: 'bg-purple-500/20 border-purple-500/50',
    blue: 'bg-blue-500/20 border-blue-500/50'
  };
  
  const textColors = {
    lime: 'text-purple-700',
    gold: 'text-purple-700', 
    blue: 'text-blue-700'
  };
  
  return (
    <div className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border min-w-[140px] sm:min-w-[160px] ${colorClasses[color]}`}>
      <Icon className={`w-4 h-4 flex-shrink-0 ${textColors[color]}`} />
      <div>
        <p className={`text-xs font-semibold ${textColors[color]}`}>{text}</p>
        {subtext && <p className={`text-[10px] opacity-80 ${textColors[color]}`}>{subtext}</p>}
      </div>
    </div>
  );
};

const UrgencyBanner = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Get real count from API or localStorage
    const stored = localStorage.getItem('quickloan_urgency_count');
    if (stored) {
      setCount(parseInt(stored, 10));
    }
  }, []);
  
  if (count === 0) return null;
  
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 flex items-center justify-center gap-2 animate-pulse">
      <AlertCircle className="w-4 h-4" />
      <span className="text-xs font-medium">
        Only <span className="font-bold">{count}</span> spots left at today's low rates!
      </span>
    </div>
  );
};

const SocialProofPopup = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState({ name: '', location: '', action: '' });
  
  const addNotification = (notif: any) => {
    const existing = JSON.parse(localStorage.getItem('quickloan_notifications') || '[]');
    const newNotif = {
      id: Date.now(),
      name: notif.name,
      location: notif.location,
      action: notif.action,
      time: 'Just now',
      timestamp: Date.now(),
      read: false
    };
    const updated = [newNotif, ...existing].slice(0, 50);
    localStorage.setItem('quickloan_notifications', JSON.stringify(updated));
    
    window.dispatchEvent(new Event('notificationAdded'));
  };
  
  useEffect(() => {
    // No mock data - real notifications only
    return () => {};
  }, []);
  
  if (!visible) return null;
  
  return (
    <div className="fixed top-20 left-4 right-4 z-50 animate-in slide-in-from-top duration-500">
      <div className="bg-loan-surface border border-loan-border rounded-xl p-3 shadow-lg flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-loan-lime/20 flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-loan-lime" />
        </div>
        <div className="flex-1">
          <p className="text-loan-white text-sm">
            <span className="font-semibold">{message.name}</span> from {message.location}
          </p>
          <p className="text-loan-lime text-xs">{message.action}</p>
        </div>
        <span className="text-loan-gray text-[10px]">Just now</span>
      </div>
    </div>
  );
};

// Features Section
const FeaturesSection = () => {
  const sectionRef = useFadeIn(0.3) as React.RefObject<HTMLElement>;
  const navigate = useNavigate();
  
  const features = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Approval in 2 minutes or less', badge: 'FASTEST', color: 'from-blue-500 to-blue-600' },
    { icon: Percent, title: 'Low Rates', desc: 'Starting from just 5.99% APR', badge: 'LOWEST', color: 'from-green-500 to-green-600' },
    { icon: Shield, title: 'No Credit Impact', desc: 'Soft check only', badge: 'SAFE', color: 'from-purple-500 to-purple-600' },
    { icon: Banknote, title: 'Same Day Cash', desc: 'Funds in your account today', badge: 'QUICK', color: 'from-orange-500 to-orange-600' },
  ];
  
  const steps = [
    { step: '01', title: 'Fill Out Form', desc: 'Takes just 2 minutes - no paperwork', icon: FileText },
    { step: '02', title: 'Get Instant Decision', desc: 'See your rate immediately', icon: CheckCircle2 },
    { step: '03', title: 'Receive Funds', desc: 'Money deposited same day', icon: Banknote },
  ];
  
  return (
    <section id="features" ref={sectionRef} className="bg-loan-dark py-8 px-5">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <span className="text-purple-300 text-sm font-semibold">Why Americans Choose Us</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
          America's #1 Loan Provider
        </h2>
        <p className="text-gray-400 text-base max-w-md mx-auto">
          Government approved. 500,000+ satisfied customers trust us for their financial needs.
        </p>
      </div>
      
      {/* Feature Cards - 2 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-16">
        {features.map((feature, i) => (
          <div 
            key={i} 
            onClick={() => navigate('/apply')}
            className="group rounded-xl p-5 shadow-lg shadow-black/10 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20 active:scale-[0.98]"
            style={{ backgroundColor: '#ffffff' }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[#0F172A] font-semibold text-lg">{feature.title}</h3>
                  <span className="px-2 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-[10px] font-bold">
                    {feature.badge}
                  </span>
                </div>
                <p className="text-[#475569] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* How It Works */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">How It Works</h3>
          <p className="text-gray-400 text-sm">Get your loan in 3 simple steps</p>
        </div>
        
        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((item, i) => (
            <div key={i} className="relative">
              {/* Connector line for desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-purple-500/40 to-transparent" />
              )}
              
              <div 
                onClick={() => navigate('/apply')}
                className="group rounded-xl p-5 shadow-lg shadow-black/10 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20 active:scale-[0.98]"
                style={{ backgroundColor: '#ffffff' }}
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">{item.step}</span>
                  </div>
                  <span className="text-purple-600 text-xs font-semibold bg-purple-100 px-2 py-1 rounded-full">
                    Step {item.step}
                  </span>
                </div>
                
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-3 shadow-md">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Content */}
                <h4 className="text-[#0F172A] font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-[#475569] text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={() => navigate('/apply')}
            className="bg-white text-purple-600 hover:bg-white/90 font-semibold py-4 px-8 rounded-xl shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Start Your Application
          </Button>
        </div>
      </div>
    </section>
  );
};

// Loan Types Section
const LoanTypesSection = () => {
  const sectionRef = useFadeIn(0.3) as React.RefObject<HTMLElement>;
  const navigate = useNavigate();
  
  const loanTypes = [
    { title: 'Debt Consolidation', amount: '$5,000 - $50,000', rate: 'From 5.99% APR', popular: true },
    { title: 'Home Improvement', amount: '$1,000 - $35,000', rate: 'From 6.49% APR', popular: false },
    { title: 'Emergency Expense', amount: '$500 - $15,000', rate: 'From 7.99% APR', popular: false },
    { title: 'Major Purchase', amount: '$2,000 - $40,000', rate: 'From 6.99% APR', popular: false },
  ];
  
  return (
    <section ref={sectionRef} className="bg-loan-dark py-8 px-5">
      <h2 className="text-2xl font-display font-bold text-loan-white mb-2">Loan Options</h2>
      <p className="text-loan-gray text-sm mb-6">Choose what works for your needs</p>
      
      <div className="space-y-3">
        {loanTypes.map((loan, i) => (
          <div 
            key={i} 
            onClick={() => navigate('/apply')}
            className="bg-loan-surface border border-loan-border rounded-xl p-4 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer hover:bg-loan-dark hover:border-loan-primary/50"
          >
            {loan.popular && (
              <span className="absolute top-0 left-0 bg-loan-lime text-loan-dark text-[9px] font-bold px-2 py-1 rounded-br-lg">
                MOST POPULAR
              </span>
            )}
            <div className={loan.popular ? 'mt-4' : ''}>
              <h3 className="text-loan-white font-semibold text-sm">{loan.title}</h3>
              <p className="text-loan-gray text-xs mt-1">{loan.amount}</p>
            </div>
            <div className="text-right">
              <p className="text-loan-lime text-xs font-medium">{loan.rate}</p>
              <ChevronRight className="w-4 h-4 text-loan-gray inline-block mt-1" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Reviews Section
const ReviewsSection = () => {
  const sectionRef = useFadeIn(0.3) as React.RefObject<HTMLElement>;
  const navigate = useNavigate();
  
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    // Load real reviews from API or localStorage
    const stored = localStorage.getItem('quickloan_reviews');
    if (stored) {
      setReviews(JSON.parse(stored));
    }
  }, []);
  
  // Function to get star color based on review count
  const getStarColor = (reviewCount: number) => {
    if (reviewCount >= 5) return 'text-purple-400 fill-purple-400';      // Purple - 5+ reviews
    if (reviewCount >= 3) return 'text-blue-400 fill-blue-400';        // Blue - 3-4 reviews  
    if (reviewCount >= 2) return 'text-green-400 fill-green-400';      // Green - 2 reviews
    return 'text-yellow-400 fill-yellow-400';                         // Yellow - 1 review
  };
  
  return (
    <section id="reviews" ref={sectionRef} className="bg-loan-dark py-8 px-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-loan-lime" />
            <span className="text-loan-lime text-xs font-semibold">Showing {reviews.length} Reviews</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-loan-white mb-1">Customer Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-loan-lime text-loan-lime" />
              ))}
            </div>
            <span className="text-loan-gray text-sm">4.9 ({reviews.length} reviews)</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-loan-text-secondary text-center py-4">No reviews yet.</p>
        ) : (
          reviews.map((review, i) => {
            const starColor = getStarColor(1);
            
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
      
      {reviews.length > 0 && (
        <Button 
          className="w-full mt-4 bg-loan-surface border border-loan-border text-loan-white hover:bg-loan-dark hover:border-loan-primary transition-all rounded-lg py-3"
          onClick={() => navigate('/reviews')}
        >
          View All {reviews.length} Reviews
        </Button>
      )}
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const sectionRef = useFadeIn(0.3) as React.RefObject<HTMLElement>;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    { q: 'Is QuickLoan government approved?', a: 'Yes! QuickLoan is a fully licensed and government-approved lender. We comply with all federal and state regulations, and we\'re BBB A+ rated for your peace of mind.' },
    { q: 'Will checking my rate affect my credit score?', a: 'Absolutely not. We use a soft credit inquiry that does not impact your credit score in any way. You can check your rate as many times as you\'d like.' },
    { q: 'How fast can I get my money?', a: 'Once approved, funds are typically deposited into your bank account the same business day. In some cases, it may take up to 24 hours.' },
    { q: 'What are the requirements to apply?', a: 'You must be 18+ years old, a US resident, have a valid bank account, and a monthly income of at least $2,000. No minimum credit score required!' },
  ];
  
  return (
    <section id="faq" ref={sectionRef} className="bg-loan-dark py-8 px-5">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-loan-lime" />
        <h2 className="text-2xl font-display font-bold text-loan-white">Common Questions</h2>
      </div>
      
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-loan-surface border border-loan-border rounded-xl overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-loan-dark/50 transition-colors"
            >
              <span className="text-loan-white text-sm font-medium pr-4">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-loan-lime flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4">
                <p className="text-loan-gray text-sm leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const sectionRef = useFadeIn(0.3) as React.RefObject<HTMLElement>;
  
  return (
    <section id="contact" ref={sectionRef} className="bg-loan-surface py-8 px-5">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-loan-muted mb-4">
          <HeadphonesIcon className="w-4 h-4 text-loan-primary" />
          <span className="text-loan-text text-xs font-medium">24/7 Support</span>
        </div>
        <h2 className="text-2xl font-display font-bold text-loan-text mb-2">Contact Us</h2>
        <p className="text-loan-text-secondary text-sm">Our team is here to help you</p>
      </div>
      
      <div className="space-y-4">
        <a href="tel:1-800-QUICKLOAN" className="flex items-center gap-4 p-4 bg-loan-surface border border-loan-border rounded-xl active:scale-[0.98] transition-transform hover:bg-loan-dark">
          <div className="w-12 h-12 rounded-full bg-loan-primary/20 flex items-center justify-center">
            <Phone className="w-6 h-6 text-loan-primary" />
          </div>
          <div className="flex-1">
            <p className="text-loan-white font-semibold">Call Us</p>
            <p className="text-loan-gray text-sm">1-800-QUICKLOAN</p>
          </div>
          <ChevronRight className="w-5 h-5 text-loan-gray" />
        </a>
        
        <a href="mailto:support@quickloan.com" className="flex items-center gap-4 p-4 bg-loan-surface border border-loan-border rounded-xl active:scale-[0.98] transition-transform hover:bg-loan-dark">
          <div className="w-12 h-12 rounded-full bg-loan-primary/20 flex items-center justify-center">
            <Mail className="w-6 h-6 text-loan-primary" />
          </div>
          <div className="flex-1">
            <p className="text-loan-white font-semibold">Email Us</p>
            <p className="text-loan-gray text-sm">support@quickloan.com</p>
          </div>
          <ChevronRight className="w-5 h-5 text-loan-gray" />
        </a>
        
        <div className="flex items-center gap-4 p-4 bg-loan-dark rounded-xl border border-loan-border">
          <div className="w-12 h-12 rounded-full bg-loan-lime/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-loan-lime" />
          </div>
          <div className="flex-1">
            <p className="text-loan-white font-semibold">Hours</p>
            <p className="text-loan-gray text-sm">24/7 Available</p>
          </div>
        </div>
      </div>
      
      {/* Security Badges */}
      <div className="mt-8 pt-6 border-t border-loan-border">
        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-loan-dark rounded-lg">
            <Lock className="w-4 h-4 text-loan-lime" />
            <span className="text-loan-gray text-xs">256-bit SSL</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-loan-dark rounded-lg">
            <Shield className="w-4 h-4 text-loan-lime" />
            <span className="text-loan-gray text-xs">FDIC Insured</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-loan-dark rounded-lg">
            <BadgeCheck className="w-4 h-4 text-loan-lime" />
            <span className="text-loan-gray text-xs">BBB A+ Rated</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export function HomePage() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  
  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <section id="home" ref={sectionRef} className="bg-loan-dark pt-6 pb-16 px-5">
        <UrgencyBanner />
        <SocialProofPopup />
        
        {/* Trust Badges Row - Single Banner */}
        <div className="hero-content flex items-center justify-start gap-2 sm:gap-3 mb-6 pt-4 overflow-x-auto hide-scrollbar px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <TrustBadge icon={Flag} text="USA Approved" subtext="Licensed Lender" color="blue" />
          <TrustBadge icon={Building2} text="Govt. Verified" subtext="Federal Compliant" color="gold" />
          <TrustBadge icon={Shield} text="100% Secure" subtext="256-bit SSL" />
        </div>
        
        {/* Main Badge */}
        <div className="hero-content mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/50">
            <Award className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700 font-bold text-sm">#1 Fastest Loan Provider in USA</span>
          </div>
        </div>
        
        <h1 className="hero-content text-4xl font-display font-bold text-loan-white leading-tight mb-4">
          Get Approved for <span className="text-loan-lime">$50,000</span> in 2 Minutes
        </h1>
        
        <p className="hero-content text-loan-gray text-base mb-6 leading-relaxed">
          Over <span className="text-loan-lime font-semibold">500,000+ Americans</span> trust QuickLoan. 
          No credit check required. Government approved & 100% secure.
        </p>
        
        {/* Trust Indicators */}
        <div 
          onClick={() => navigate('/reviews')}
          className="hero-content flex flex-wrap items-center gap-4 mb-8 cursor-pointer hover:bg-loan-surface/30 p-2 rounded-xl transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-loan-violet border-2 border-loan-dark flex items-center justify-center">
                <span className="text-xs font-bold text-loan-white">U</span>
              </div>
            </div>
            <span className="text-loan-gray text-xs"><span className="text-loan-lime font-semibold">Apply</span> to see real-time stats</span>
          </div>
          <div className="flex items-center gap-1">
            <Timer className="w-4 h-4 text-loan-lime" />
            <span className="text-loan-gray text-xs">Avg. approval: <span className="text-loan-lime">94 seconds</span></span>
          </div>
        </div>
        
        <div className="hero-content flex gap-3 mb-10">
          <Button 
            onClick={() => navigate('/apply')}
            className="flex-1 btn-primary py-4 text-center"
          >
            Check My Eligibility
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="hero-content grid grid-cols-3 gap-3 mb-8">
          <div className="bg-loan-surface border border-loan-border rounded-xl p-4 text-center">
            <p className="text-2xl font-display font-bold text-loan-lime">$50K</p>
            <p className="text-xs text-loan-gray mt-1">Max Amount</p>
          </div>
          <div className="bg-loan-surface border border-loan-border rounded-xl p-4 text-center">
            <p className="text-2xl font-display font-bold text-loan-lime">2min</p>
            <p className="text-xs text-loan-gray mt-1">Approval</p>
          </div>
          <div className="bg-loan-surface border border-loan-border rounded-xl p-4 text-center">
            <p className="text-2xl font-display font-bold text-loan-lime">4.9</p>
            <p className="text-xs text-loan-gray mt-1">Rating</p>
          </div>
        </div>
        
        {/* Trust Badges Footer */}
        <div className="hero-content flex flex-wrap items-center justify-center gap-3 py-3 border-t border-loan-border">
          <div className="flex items-center gap-2 text-loan-gray text-xs">
            <Lock className="w-4 h-4 text-loan-lime" />
            <span>256-bit Secure</span>
          </div>
          <div className="flex items-center gap-2 text-loan-gray text-xs">
            <BadgeCheck className="w-4 h-4 text-loan-lime" />
            <span>BBB A+ Rated</span>
          </div>
          <div className="flex items-center gap-2 text-loan-gray text-xs">
            <Sparkles className="w-4 h-4 text-loan-lime" />
            <span>No Hidden Fees</span>
          </div>
        </div>
      </section>
      
      <FeaturesSection />
      <LoanTypesSection />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-loan-dark border-t border-loan-border py-8 px-5">
        <div className="flex flex-wrap justify-center gap-6">
          <Link 
            to="/privacy" 
            className="text-loan-gray text-sm hover:text-loan-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="text-loan-gray text-sm hover:text-loan-primary transition-colors"
          >
            Terms of Service
          </Link>
          <Link 
            to="/licenses" 
            className="text-loan-gray text-sm hover:text-loan-primary transition-colors"
          >
            Licenses
          </Link>
        </div>
        <div className="text-center mt-6">
          <p className="text-loan-gray text-xs">© 2024 QuickLoan. All rights reserved. 1</p>
        </div>
      </footer>
    </>
  );
}
