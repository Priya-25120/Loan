import { Routes, Route, NavLink } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { HomePage } from '@/pages/HomePage';
import { FeaturesPage } from '@/pages/FeaturesPage';
import { ApplyPage } from '@/pages/ApplyPage';
import { ReviewsPage } from '@/pages/ReviewsPage';
import { ContactPage } from '@/pages/ContactPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';
import { LicensesPage } from '@/pages/LicensesPage';
import AdminApp from '@/Admin';
import { 
  Home, 
  FileText, 
  HelpCircle, 
  User,
  CheckCircle2
} from 'lucide-react';

// Bottom Navigation Component
const BottomNav = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/features', icon: FileText, label: 'Features' },
    { to: '/apply', icon: CheckCircle2, label: 'Apply', isCenter: true },
    { to: '/reviews', icon: HelpCircle, label: 'Reviews' },
    { to: '/contact', icon: User, label: 'Profile' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-loan-dark/95 backdrop-blur-lg border-t border-loan-border safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          item.isCenter ? (
            <NavLink 
              key={item.to}
              to={item.to}
              className="relative -top-4 flex flex-col items-center cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full bg-loan-lime flex items-center justify-center shadow-lg shadow-loan-lime/30 active:scale-95 transition-all group-hover:scale-105 group-hover:shadow-loan-lime/50">
                <item.icon className="w-7 h-7 text-loan-dark" />
              </div>
              <span className="text-[10px] text-loan-lime mt-1 font-medium group-hover:text-loan-lime/80 transition-colors">{item.label}</span>
            </NavLink>
          ) : (
            <NavLink 
              key={item.to}
              to={item.to}
              className={({ isActive }) => 
                `flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  isActive ? 'text-loan-primary' : 'text-loan-text-secondary'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          )
        ))}
      </div>
    </nav>
  );
};

// Main App
function App() {
  return (
    <ThemeProvider storageKey="quickloan-theme">
      <div className="relative min-h-screen bg-loan-dark pt-[72px] md:pt-[104px]">
        <Header />
        <main className="pb-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/licenses" element={<LicensesPage />} />
            <Route path="/admin" element={<AdminApp />} />
          </Routes>
        </main>
        <BottomNav className="hidden" />
      </div>
    </ThemeProvider>
  );
}

export default App;
