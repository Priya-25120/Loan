import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, Award, Building2, Shield, CheckCircle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LicensesPage() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.licenses-content',
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
        className="licenses-content flex items-center gap-2 text-loan-gray text-sm mb-6 hover:text-loan-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      
      {/* Header */}
      <div className="licenses-content text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-loan-primary/20 flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-loan-primary" />
        </div>
        <h1 className="text-3xl font-display font-bold text-loan-white mb-2">Licenses & Certifications</h1>
        <p className="text-loan-gray text-sm">Government approved and fully licensed lender</p>
      </div>
      
      {/* Content */}
      <div className="licenses-content space-y-6 max-w-4xl mx-auto">
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Federal Licenses</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-loan-white font-semibold mb-1">Consumer Financial Protection Bureau (CFPB)</h3>
                <p className="text-loan-gray text-sm">License #: CFPB-2024-NY-001234</p>
                <p className="text-loan-gray text-xs mt-1">Registered as a supervised financial institution</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-loan-white font-semibold mb-1">Federal Deposit Insurance Corporation (FDIC)</h3>
                <p className="text-loan-gray text-sm">Certificate #: FDIC-33456789</p>
                <p className="text-loan-gray text-xs mt-1">Partner banks are FDIC insured up to $250,000</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">State Licenses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { state: 'New York', license: 'NY-DFS-2024-98765', agency: 'Department of Financial Services' },
              { state: 'California', license: 'CA-DBO-2024-45678', agency: 'Department of Business Oversight' },
              { state: 'Texas', license: 'TX-OCCC-2024-34567', agency: 'Office of Consumer Credit Commissioner' },
              { state: 'Florida', license: 'FL-OFR-2024-23456', agency: 'Office of Financial Regulation' },
              { state: 'Illinois', license: 'IL-DFI-2024-12345', agency: 'Department of Financial & Professional Regulation' },
              { state: 'Pennsylvania', license: 'PA-DBI-2024-67890', agency: 'Department of Banking & Securities' },
            ].map((state, i) => (
              <div key={i} className="border border-loan-border rounded-lg p-3">
                <h4 className="text-loan-white font-semibold text-sm mb-1">{state.state}</h4>
                <p className="text-loan-gray text-xs mb-1">{state.license}</p>
                <p className="text-loan-gray text-xs opacity-75">{state.agency}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Industry Certifications</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-loan-white font-semibold mb-1">Better Business Bureau (BBB)</h3>
                <p className="text-loan-gray text-sm">A+ Rating | Accredited Since 2019</p>
                <p className="text-loan-gray text-xs mt-1">BBB ID: 123456789</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-loan-white font-semibold mb-1">Online Lenders Alliance (OLA)</h3>
                <p className="text-loan-gray text-sm">Certified Member | OLA-2024-001</p>
                <p className="text-loan-gray text-xs mt-1">Committed to best practices and consumer protection</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-loan-white font-semibold mb-1">National Mortgage Licensing System (NMLS)</h3>
                <p className="text-loan-gray text-sm">NMLS ID: 1234567</p>
                <p className="text-loan-gray text-xs mt-1">Nationwide mortgage licensing system</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Security & Compliance</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-loan-white font-semibold mb-1">SOC 2 Type II Certified</h3>
                <p className="text-loan-gray text-sm">Annual security audit completed</p>
                <p className="text-loan-gray text-xs mt-1">Certified by Deloitte | Valid through 2025</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-loan-white font-semibold mb-1">PCI DSS Level 1 Compliant</h3>
                <p className="text-loan-gray text-sm">Payment Card Industry Data Security Standard</p>
                <p className="text-loan-gray text-xs mt-1">Highest level of payment security certification</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-loan-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-loan-white font-semibold mb-1">Gramm-Leach-Bliley Act (GLBA) Compliant</h3>
                <p className="text-loan-gray text-sm">Financial institutions privacy and data security</p>
                <p className="text-loan-gray text-xs mt-1">Annual compliance verification completed</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Verification</h2>
          <p className="text-loan-gray text-sm mb-4">
            You can verify our licenses and certifications through:
          </p>
          <div className="space-y-2">
            <a href="#" className="flex items-center gap-2 text-loan-primary text-sm hover:underline">
              <ExternalLink className="w-4 h-4" />
              NMLS Consumer Access Portal
            </a>
            <a href="#" className="flex items-center gap-2 text-loan-primary text-sm hover:underline">
              <ExternalLink className="w-4 h-4" />
              BBB Business Directory
            </a>
            <a href="#" className="flex items-center gap-2 text-loan-primary text-sm hover:underline">
              <ExternalLink className="w-4 h-4" />
              State Financial Regulator Websites
            </a>
          </div>
        </div>
        
        <div className="bg-loan-surface border border-loan-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-loan-white mb-4">Contact for Verification</h2>
          <p className="text-loan-gray text-sm">
            For license verification or compliance questions:<br />
            Email: compliance@quickloan.com<br />
            Phone: 1-800-QUICKLOAN ext. 5<br />
            Mail: QuickLoan Compliance Dept, 123 Financial Ave, New York, NY 10001
          </p>
        </div>
      </div>
    </section>
  );
}
