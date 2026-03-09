import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, FileText, AlertCircle, DollarSign, Shield, Clock, Percent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TermsPage() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.terms-content',
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
        className="terms-content flex items-center gap-2 text-loan-gray text-sm mb-6 hover:text-loan-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      
      {/* Header */}
      <div className="terms-content text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-loan-primary/20 flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-loan-primary" />
        </div>
        <h1 className="text-3xl font-display font-bold text-loan-white mb-2">Terms of Service</h1>
        <p className="text-loan-gray text-sm">Last updated: January 1, 2024</p>
      </div>
      
      {/* Content */}
      <div className="terms-content space-y-6 max-w-4xl mx-auto">
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Agreement to Terms</h2>
          <p className="text-loan-gray text-sm">
            By using QuickLoan's services, you agree to these terms and conditions. This agreement is governed by the laws of the United States and the state of New York.
          </p>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Eligibility Requirements</h2>
          <div className="space-y-2 text-loan-gray text-sm">
            <p>To be eligible for our loan services, you must:</p>
            <ul className="space-y-1 ml-4">
              <li>• Be at least 18 years of age</li>
              <li>• Be a US citizen or permanent resident</li>
              <li>• Have a valid Social Security number</li>
              <li>• Have a minimum monthly income of $2,000</li>
              <li>• Maintain an active bank account</li>
              <li>• Provide valid government-issued identification</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Loan Terms</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-loan-white font-semibold mb-1">Loan Amounts</h3>
                <p className="text-loan-gray text-sm">Minimum: $500 | Maximum: $50,000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Percent className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-loan-white font-semibold mb-1">Interest Rates</h3>
                <p className="text-loan-gray text-sm">Starting from 5.99% APR up to 35.99% APR based on creditworthiness</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-loan-white font-semibold mb-1">Repayment Terms</h3>
                <p className="text-loan-gray text-sm">3 to 60 months, depending on loan amount and your qualifications</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Fees and Charges</h2>
          <div className="space-y-2 text-loan-gray text-sm">
            <p>• Origination fee: 1% - 6% of loan amount</p>
            <p>• Late payment fee: $15 or 5% of unpaid amount</p>
            <p>• Returned payment fee: $25</p>
            <p>• Prepayment penalty: None (you can pay off early without penalty)</p>
          </div>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Important Disclosures</h2>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
            <div className="space-y-2 text-loan-gray text-sm">
              <p>• Loans are subject to credit approval</p>
              <p>• Actual rates and terms may vary based on credit history</p>
              <p>• We report payment history to major credit bureaus</p>
              <p>• Failure to repay may result in collection activities</p>
              <p>• This is not a commitment to lend</p>
            </div>
          </div>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Your Responsibilities</h2>
          <ul className="space-y-2 text-loan-gray text-sm">
            <li className="flex items-start gap-2">
              <span className="text-loan-primary mt-1">•</span>
              <span>Provide accurate and complete information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-loan-primary mt-1">•</span>
              <span>Make timely payments as agreed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-loan-primary mt-1">•</span>
              <span>Notify us of any changes to your contact information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-loan-primary mt-1">•</span>
              <span>Use loan funds for legitimate purposes</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Legal Compliance</h2>
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
            <div className="space-y-2 text-loan-gray text-sm">
              <p>QuickLoan complies with:</p>
              <ul className="space-y-1 ml-4">
                <li>• Truth in Lending Act (TILA)</li>
                <li>• Equal Credit Opportunity Act (ECOA)</li>
                <li>• Fair Credit Reporting Act (FCRA)</li>
                <li>• State lending laws and regulations</li>
                <li>• Federal Trade Commission guidelines</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Contact Information</h2>
          <p className="text-loan-gray text-sm">
            For questions about these terms, contact:<br />
            Email: legal@quickloan.com<br />
            Phone: 1-800-QUICKLOAN<br />
            Mail: QuickLoan Legal Dept, 123 Financial Ave, New York, NY 10001
          </p>
        </div>
      </div>
    </section>
  );
}
