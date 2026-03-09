import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  TrendingUp,
  Zap,
  Percent,
  Shield,
  Banknote
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

export function FeaturesPage() {
  const sectionRef = useFadeIn(0.3) as React.RefObject<HTMLElement>;
  
  const features = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Approval in 2 minutes or less', badge: 'FASTEST' },
    { icon: Percent, title: 'Low Rates', desc: 'Starting from just 5.99% APR', badge: 'LOWEST' },
    { icon: Shield, title: 'No Credit Impact', desc: 'Soft check only', badge: 'SAFE' },
    { icon: Banknote, title: 'Same Day Cash', desc: 'Funds in your account today', badge: 'QUICK' },
  ];
  
  return (
    <section id="features" ref={sectionRef} className="bg-loan-dark py-16 px-5 min-h-screen">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="w-5 h-5 text-loan-primary" />
        <span className="text-loan-primary text-sm font-semibold">Why Americans Choose Us</span>
      </div>
      <h2 className="text-2xl font-display font-bold text-loan-text mb-2">America's #1 Loan Provider</h2>
      <p className="text-loan-text-secondary text-sm mb-8">Government approved. 500,000+ satisfied customers.</p>
      
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <div key={i} className="bg-loan-surface border border-loan-border rounded-xl p-5 relative overflow-hidden">
            <span className="absolute top-2 right-2 px-2 py-0.5 bg-loan-primary/20 text-loan-primary text-[9px] font-bold rounded">
              {feature.badge}
            </span>
            <div className="w-10 h-10 rounded-lg bg-loan-primary/10 flex items-center justify-center mb-3">
              <feature.icon className="w-5 h-5 text-loan-primary" />
            </div>
            <h3 className="text-loan-text font-semibold text-sm mb-1">{feature.title}</h3>
            <p className="text-loan-text-secondary text-xs">{feature.desc}</p>
          </div>
        ))}
      </div>
      
      {/* How It Works */}
      <div className="mt-12">
        <h3 className="text-lg font-display font-bold text-loan-text mb-6">How It Works</h3>
        
        <div className="space-y-4">
          {[
            { step: '1', title: 'Fill Out Form', desc: 'Takes just 2 minutes - no paperwork', time: '2 min' },
            { step: '2', title: 'Get Instant Decision', desc: 'See your rate immediately', time: 'Instant' },
            { step: '3', title: 'Receive Funds', desc: 'Money deposited same day', time: 'Same Day' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-loan-primary flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">{item.step}</span>
              </div>
              <div className="flex-1 pb-4 border-b border-loan-border">
                <div className="flex items-center justify-between">
                  <h4 className="text-loan-text font-semibold text-sm">{item.title}</h4>
                  <span className="text-loan-primary text-xs font-medium">{item.time}</span>
                </div>
                <p className="text-loan-text-secondary text-xs mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
