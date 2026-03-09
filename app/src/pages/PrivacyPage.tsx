import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PrivacyPage() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.privacy-content',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={sectionRef} className="min-h-screen bg-loan-dark pt-6 pb-32 px-5">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="privacy-content flex items-center gap-2 text-loan-gray text-sm mb-6 hover:text-loan-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      
      {/* Header */}
      <div className="privacy-content text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-loan-primary/20 flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-loan-primary" />
        </div>
        <h1 className="text-3xl font-display font-bold text-loan-white mb-2">Privacy Policy</h1>
        <p className="text-loan-gray text-sm">Last updated: January 1, 2024</p>
      </div>
      
      {/* Content */}
      <div className="privacy-content space-y-6 max-w-4xl mx-auto">
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Information We Collect</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-loan-white font-semibold mb-1">Personal Information</h3>
                <p className="text-loan-gray text-sm">Name, address, email, phone number, Social Security number, and government-issued ID.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-loan-white font-semibold mb-1">Financial Information</h3>
                <p className="text-loan-gray text-sm">Bank account details, income information, credit history, and employment details.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-loan-white font-semibold mb-1">Usage Data</h3>
                <p className="text-loan-gray text-sm">How you interact with our website, device information, and IP address.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">How We Use Your Information</h2>
          <ul className="space-y-2 text-loan-gray text-sm">
            <li className="flex items-start gap-2">
              <span className="text-loan-primary mt-1">•</span>
              <span>To process loan applications and determine eligibility</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-loan-primary mt-1">•</span>
              <span>To communicate with you about your application</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-loan-primary mt-1">•</span>
              <span>To comply with federal and state regulations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-loan-primary mt-1">•</span>
              <span>To improve our services and prevent fraud</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Data Protection</h2>
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
            <div>
              <p className="text-loan-gray text-sm mb-3">
                We implement industry-standard security measures including:
              </p>
              <ul className="space-y-1 text-loan-gray text-sm">
                <li>• 256-bit SSL encryption</li>
                <li>• Secure data centers</li>
                <li>• Regular security audits</li>
                <li>• Limited employee access</li>
                <li>• Compliance with GLBA and state privacy laws</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Your Rights</h2>
          <p className="text-loan-gray text-sm mb-3">
            As a US resident, you have the right to:
          </p>
          <ul className="space-y-2 text-loan-gray text-sm">
            <li className="flex items-start gap-2">
              <span className="text-loan-primary mt-1">•</span>
              <span>Access your personal information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-loan-primary mt-1">•</span>
              <span>Correct inaccurate information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-loan-primary mt-1">•</span>
              <span>Request deletion of your data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-loan-primary mt-1">•</span>
              <span>Opt-out of marketing communications</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Contact Us</h2>
          <p className="text-loan-gray text-sm">
            For privacy-related questions, contact us at:<br />
            Email: privacy@quickloan.com<br />
            Phone: 1-800-QUICKLOAN<br />
            Mail: QuickLoan Privacy Dept, 123 Financial Ave, New York, NY 10001
          </p>
        </div>
      </div>
    </section>
  );
}
