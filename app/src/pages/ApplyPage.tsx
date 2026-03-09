import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { apiService } from '@/services/api';
import { 
  User, 
  MapPin, 
  DollarSign, 
  CreditCard,
  Lock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const usBankNames = [
  "Chase Bank",
  "Bank of America",
  "Wells Fargo",
  "Citibank",
  "U.S. Bank",
  "PNC Bank",
  "Truist Bank",
  "Capital One",
  "TD Bank",
  "Ally Bank",
  "Discover Bank",
  "American Express National Bank",
  "Charles Schwab Bank",
  "BMO Harris Bank",
  "KeyBank",
  "Regions Bank",
  "Fifth Third Bank",
  "Synchrony Bank",
  "Comerica Bank",
  "Huntington National Bank",
  "M&T Bank",
  "Citizens Bank",
  "First Republic Bank",
  "Silicon Valley Bank",
  "Western Alliance Bank",
  "Zions Bancorporation",
];

export function ApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    loanAmount: '',
    monthlyIncome: '',
    employmentStatus: '',
    bankName: '',
    accountType: '',
  });
  
  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      await apiService.register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        loanAmount: formData.loanAmount,
        monthlyIncome: formData.monthlyIncome,
        employmentStatus: formData.employmentStatus,
        bankName: formData.bankName,
        accountType: formData.accountType,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  const updateField = (field: string, value: string) => {
    // Format phone number for US format
    if (field === 'phone') {
      // Remove all non-digit characters
      const digits = value.replace(/\D/g, '');
      
      // Limit to 10 digits (US phone numbers)
      if (digits.length > 10) return;
      
      // Format as (XXX) XXX-XXXX
      let formatted = '';
      if (digits.length > 0) {
        if (digits.length <= 3) {
          formatted = `(${digits}`;
        } else if (digits.length <= 6) {
          formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        } else {
          formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        }
      }
      
      setFormData(prev => ({ ...prev, [field]: formatted }));
    } else if (field === 'zipCode') {
      // Only allow valid US ZIP code input
      if (isValidUSZip(value)) {
        setFormData(prev => ({ ...prev, [field]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const validateUSPhone = (phone: string) => {
    // Check if phone matches US format: (XXX) XXX-XXXX with exactly 10 digits
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validateUSZip = (zip: string) => {
    // Check if ZIP is exactly 5 digits (US ZIP code)
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zip);
  };

  const isValidUSZip = (zip: string) => {
    // Check if the partial input could lead to a valid US ZIP code
    if (zip.length === 0) return true; // Empty is allowed initially
    if (zip.length > 5) return false; // More than 5 digits is invalid
    return /^\d*$/.test(zip); // Only digits allowed
  };
  
  return (
    <section id="apply" className="bg-loan-surface py-16 px-5 min-h-screen">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-loan-muted mb-4">
          <Sparkles className="w-4 h-4 text-loan-primary" />
          <span className="text-loan-text text-xs font-medium">Takes only 2 minutes</span>
        </div>
        <h2 className="text-2xl font-display font-bold text-loan-text mb-2">Apply Now</h2>
        <p className="text-loan-text-secondary text-sm">Get your personalized rate instantly</p>
      </div>
      
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= s ? 'bg-loan-primary text-white' : 'bg-loan-border text-loan-text-secondary'
          }`}>
            {s}
          </div>
        ))}
      </div>
      
      <div className="bg-loan-dark rounded-2xl p-6 border-2 border-loan-primary shadow-lg shadow-loan-primary/20">
        {!submitted ? (
          <>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-loan-text font-semibold mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-loan-primary" />
                  Personal Information
                </h3>
                <div>
                  <Label className="text-loan-text-secondary text-xs">Full Name *</Label>
                  <Input 
                    placeholder="John Michael Smith" 
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    className="mt-1 bg-loan-surface border-loan-border text-loan-text rounded-lg" 
                  />
                </div>
                <div>
                  <Label className="text-loan-text-secondary text-xs">Email Address *</Label>
                  <Input 
                    type="email" 
                    placeholder="john.smith@email.com" 
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="mt-1 bg-loan-surface border-loan-border text-loan-text rounded-lg" 
                  />
                </div>
                <div>
                  <Label className="text-loan-text-secondary text-xs">US Phone Number *</Label>
                  <Input 
                    placeholder="(555) 123-4567" 
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    maxLength={14}
                    className="mt-1 bg-loan-surface border-loan-border text-loan-text rounded-lg" 
                  />
                  <p className="text-loan-text-secondary text-xs mt-1">Format: (555) 123-4567</p>
                </div>
                <Button 
                  onClick={() => setStep(2)} 
                  disabled={!formData.fullName || !formData.email || !validateUSPhone(formData.phone)}
                  className="w-full btn-primary mt-4 disabled:opacity-50"
                >
                  Continue
                </Button>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-loan-text font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-loan-primary" />
                  Address Details
                </h3>
                <div>
                  <Label className="text-loan-text-secondary text-xs">Street Address *</Label>
                  <Input 
                    placeholder="123 Main Street, Apt 4B" 
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className="mt-1 bg-loan-surface border-loan-border text-loan-text rounded-lg" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-loan-text-secondary text-xs">US City *</Label>
                    <Select onValueChange={(v) => updateField('city', v)}>
                      <SelectTrigger className="mt-1 bg-loan-surface border-loan-border text-loan-text rounded-lg">
                        <SelectValue placeholder="Select US City" />
                      </SelectTrigger>
                      <SelectContent className="bg-loan-surface border-loan-border">
                        <SelectItem value="New York">New York, NY</SelectItem>
                        <SelectItem value="Los Angeles">Los Angeles, CA</SelectItem>
                        <SelectItem value="Chicago">Chicago, IL</SelectItem>
                        <SelectItem value="Houston">Houston, TX</SelectItem>
                        <SelectItem value="Phoenix">Phoenix, AZ</SelectItem>
                        <SelectItem value="Philadelphia">Philadelphia, PA</SelectItem>
                        <SelectItem value="San Antonio">San Antonio, TX</SelectItem>
                        <SelectItem value="San Diego">San Diego, CA</SelectItem>
                        <SelectItem value="Dallas">Dallas, TX</SelectItem>
                        <SelectItem value="San Jose">San Jose, CA</SelectItem>
                        <SelectItem value="Austin">Austin, TX</SelectItem>
                        <SelectItem value="Jacksonville">Jacksonville, FL</SelectItem>
                        <SelectItem value="Fort Worth">Fort Worth, TX</SelectItem>
                        <SelectItem value="Columbus">Columbus, OH</SelectItem>
                        <SelectItem value="Charlotte">Charlotte, NC</SelectItem>
                        <SelectItem value="Indianapolis">Indianapolis, IN</SelectItem>
                        <SelectItem value="San Francisco">San Francisco, CA</SelectItem>
                        <SelectItem value="Seattle">Seattle, WA</SelectItem>
                        <SelectItem value="Denver">Denver, CO</SelectItem>
                        <SelectItem value="Washington">Washington, DC</SelectItem>
                        <SelectItem value="Boston">Boston, MA</SelectItem>
                        <SelectItem value="El Paso">El Paso, TX</SelectItem>
                        <SelectItem value="Nashville">Nashville, TN</SelectItem>
                        <SelectItem value="Oklahoma City">Oklahoma City, OK</SelectItem>
                        <SelectItem value="Las Vegas">Las Vegas, NV</SelectItem>
                        <SelectItem value="Detroit">Detroit, MI</SelectItem>
                        <SelectItem value="Portland">Portland, OR</SelectItem>
                        <SelectItem value="Memphis">Memphis, TN</SelectItem>
                        <SelectItem value="Louisville">Louisville, KY</SelectItem>
                        <SelectItem value="Milwaukee">Milwaukee, WI</SelectItem>
                        <SelectItem value="Baltimore">Baltimore, MD</SelectItem>
                        <SelectItem value="Albuquerque">Albuquerque, NM</SelectItem>
                        <SelectItem value="Tucson">Tucson, AZ</SelectItem>
                        <SelectItem value="Fresno">Fresno, CA</SelectItem>
                        <SelectItem value="Sacramento">Sacramento, CA</SelectItem>
                        <SelectItem value="Kansas City">Kansas City, MO</SelectItem>
                        <SelectItem value="Mesa">Mesa, AZ</SelectItem>
                        <SelectItem value="Atlanta">Atlanta, GA</SelectItem>
                        <SelectItem value="Omaha">Omaha, NE</SelectItem>
                        <SelectItem value="Colorado Springs">Colorado Springs, CO</SelectItem>
                        <SelectItem value="Raleigh">Raleigh, NC</SelectItem>
                        <SelectItem value="Miami">Miami, FL</SelectItem>
                        <SelectItem value="Oakland">Oakland, CA</SelectItem>
                        <SelectItem value="Tulsa">Tulsa, OK</SelectItem>
                        <SelectItem value="Minneapolis">Minneapolis, MN</SelectItem>
                        <SelectItem value="Cleveland">Cleveland, OH</SelectItem>
                        <SelectItem value="Wichita">Wichita, KS</SelectItem>
                        <SelectItem value="Arlington">Arlington, TX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-loan-text-secondary text-xs">US State *</Label>
                    <Select onValueChange={(v) => updateField('state', v)}>
                      <SelectTrigger className="mt-1 bg-loan-surface border-loan-border text-loan-text rounded-lg">
                        <SelectValue placeholder="Select US State" />
                      </SelectTrigger>
                      <SelectContent className="bg-loan-surface border-loan-border">
                        <SelectItem value="AL">Alabama</SelectItem>
                        <SelectItem value="AK">Alaska</SelectItem>
                        <SelectItem value="AZ">Arizona</SelectItem>
                        <SelectItem value="AR">Arkansas</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="CO">Colorado</SelectItem>
                        <SelectItem value="CT">Connecticut</SelectItem>
                        <SelectItem value="DE">Delaware</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="GA">Georgia</SelectItem>
                        <SelectItem value="HI">Hawaii</SelectItem>
                        <SelectItem value="ID">Idaho</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                        <SelectItem value="IN">Indiana</SelectItem>
                        <SelectItem value="IA">Iowa</SelectItem>
                        <SelectItem value="KS">Kansas</SelectItem>
                        <SelectItem value="KY">Kentucky</SelectItem>
                        <SelectItem value="LA">Louisiana</SelectItem>
                        <SelectItem value="ME">Maine</SelectItem>
                        <SelectItem value="MD">Maryland</SelectItem>
                        <SelectItem value="MA">Massachusetts</SelectItem>
                        <SelectItem value="MI">Michigan</SelectItem>
                        <SelectItem value="MN">Minnesota</SelectItem>
                        <SelectItem value="MS">Mississippi</SelectItem>
                        <SelectItem value="MO">Missouri</SelectItem>
                        <SelectItem value="MT">Montana</SelectItem>
                        <SelectItem value="NE">Nebraska</SelectItem>
                        <SelectItem value="NV">Nevada</SelectItem>
                        <SelectItem value="NH">New Hampshire</SelectItem>
                        <SelectItem value="NJ">New Jersey</SelectItem>
                        <SelectItem value="NM">New Mexico</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="NC">North Carolina</SelectItem>
                        <SelectItem value="ND">North Dakota</SelectItem>
                        <SelectItem value="OH">Ohio</SelectItem>
                        <SelectItem value="OK">Oklahoma</SelectItem>
                        <SelectItem value="OR">Oregon</SelectItem>
                        <SelectItem value="PA">Pennsylvania</SelectItem>
                        <SelectItem value="RI">Rhode Island</SelectItem>
                        <SelectItem value="SC">South Carolina</SelectItem>
                        <SelectItem value="SD">South Dakota</SelectItem>
                        <SelectItem value="TN">Tennessee</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="UT">Utah</SelectItem>
                        <SelectItem value="VT">Vermont</SelectItem>
                        <SelectItem value="VA">Virginia</SelectItem>
                        <SelectItem value="WA">Washington</SelectItem>
                        <SelectItem value="WV">West Virginia</SelectItem>
                        <SelectItem value="WI">Wisconsin</SelectItem>
                        <SelectItem value="WY">Wyoming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-loan-text-secondary text-xs">US ZIP Code *</Label>
                  <Input 
                    placeholder="10001" 
                    value={formData.zipCode}
                    onChange={(e) => updateField('zipCode', e.target.value)}
                    maxLength={5}
                    className="mt-1 bg-loan-surface border-loan-border text-loan-text rounded-lg" 
                  />
                  <p className="text-loan-text-secondary text-xs mt-1">5-digit US ZIP code only</p>
                  {formData.zipCode && !isValidUSZip(formData.zipCode) && (
                    <p className="text-red-500 text-xs mt-1">Invalid ZIP code format</p>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => setStep(1)} variant="outline" className="flex-1 border-loan-border text-loan-text rounded-lg hover:bg-loan-surface hover:border-loan-primary transition-all">
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)} 
                    disabled={!formData.address || !formData.city || !formData.state || !validateUSZip(formData.zipCode)}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-loan-text font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-loan-primary" />
                  Loan & Income Details
                </h3>
                <div>
                  <Label className="text-loan-text-secondary text-xs">How much do you want to borrow? *</Label>
                  <Select onValueChange={(v) => updateField('loanAmount', v)}>
                    <SelectTrigger className="mt-1 bg-loan-surface border-loan-border text-loan-text rounded-lg">
                      <SelectValue placeholder="Select loan amount" />
                    </SelectTrigger>
                    <SelectContent className="bg-loan-surface border-loan-border">
                      <SelectItem value="1000">$1,000</SelectItem>
                      <SelectItem value="5000">$5,000</SelectItem>
                      <SelectItem value="10000">$10,000</SelectItem>
                      <SelectItem value="20000">$20,000</SelectItem>
                      <SelectItem value="35000">$35,000</SelectItem>
                      <SelectItem value="50000">$50,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-loan-text-secondary text-xs">Monthly Income *</Label>
                  <Select onValueChange={(v) => updateField('monthlyIncome', v)}>
                    <SelectTrigger className="mt-1 bg-loan-surface border-loan-border text-loan-text rounded-lg">
                      <SelectValue placeholder="Select monthly income" />
                    </SelectTrigger>
                    <SelectContent className="bg-loan-surface border-loan-border">
                      <SelectItem value="2000">$2,000 - $3,000</SelectItem>
                      <SelectItem value="3000">$3,000 - $4,000</SelectItem>
                      <SelectItem value="4000">$4,000 - $5,000</SelectItem>
                      <SelectItem value="5000">$5,000 - $7,000</SelectItem>
                      <SelectItem value="7000">$7,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-loan-text-secondary text-xs">Employment Status *</Label>
                  <Select onValueChange={(v) => updateField('employmentStatus', v)}>
                    <SelectTrigger className="mt-1 bg-loan-surface border-loan-border text-loan-text rounded-lg">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-loan-surface border-loan-border">
                      <SelectItem value="employed">Full-time Employed</SelectItem>
                      <SelectItem value="selfemployed">Self Employed</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => setStep(2)} variant="outline" className="flex-1 border-loan-border text-loan-text rounded-lg hover:bg-loan-surface hover:border-loan-primary transition-all">
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(4)} 
                    disabled={!formData.loanAmount || !formData.monthlyIncome || !formData.employmentStatus}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
            
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-loan-text font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-loan-primary" />
                  Bank Details
                </h3>
                <div>
                  <Label className="text-loan-text-secondary text-xs">US Bank Name *</Label>
                  <Select onValueChange={(v) => updateField('bankName', v)}>
                    <SelectTrigger className="mt-1 bg-loan-surface border-loan-border text-loan-text rounded-lg">
                      <SelectValue placeholder="Select US Bank" />
                    </SelectTrigger>
                    <SelectContent className="bg-loan-surface border-loan-border">
                      {usBankNames.map((bank) => (
                        <SelectItem key={bank} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-loan-text-secondary text-xs">Account Type *</Label>
                  <Select onValueChange={(v) => updateField('accountType', v)}>
                    <SelectTrigger className="mt-1 bg-loan-surface border-loan-border text-loan-text rounded-lg">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent className="bg-loan-surface border-loan-border">
                      <SelectItem value="checking">Checking Account</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-start gap-2 p-3 bg-loan-lime/10 rounded-lg">
                  <Lock className="w-4 h-4 text-loan-primary flex-shrink-0 mt-0.5" />
                  <p className="text-loan-text-secondary text-xs">
                    Your information is secured with 256-bit encryption. We never store your login credentials.
                  </p>
                </div>
                
                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <Button onClick={() => setStep(3)} variant="outline" className="flex-1 border-loan-border text-loan-text rounded-lg hover:bg-loan-surface hover:border-loan-primary transition-all">
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!formData.bankName || !formData.accountType || submitting}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-white border-2 border-black flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-loan-text font-bold text-xl mb-2">Application Submitted!</h3>
            <p className="text-loan-text-secondary text-sm mb-2">Thank you, {formData.fullName.split(' ')[0]}!</p>
            <p className="text-loan-text-secondary text-sm mb-6">One of our loan specialists will contact you within 24 hours.</p>
            
            <div className="bg-loan-surface rounded-xl p-4 mb-6">
              <p className="text-loan-primary font-semibold text-lg">Reference #: QL-{Date.now().toString().slice(-8)}</p>
              <p className="text-loan-text-secondary text-xs mt-1">Save this for your records</p>
            </div>
            
            <Button onClick={() => {setStep(1); setSubmitted(false);}} variant="outline" className="w-full border-loan-border text-loan-text hover:bg-loan-surface hover:border-loan-primary transition-all">
              Submit Another Application
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
