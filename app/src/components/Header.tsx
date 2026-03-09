import { useTheme } from "./ThemeProvider"
import { 
  Banknote, 
  Shield, 
  TrendingUp, 
  Wallet,
  Menu,
  X,
  Phone,
  BadgeCheck,
  Settings,
  Bell
} from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function Header() {
  const { theme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem('quickloan_notifications');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Update any "Just now" notifications to show relative time
      const updated = parsed.map((notif: any) => {
        if (notif.time === 'Just now') {
          const timeDiff = Date.now() - notif.timestamp;
          if (timeDiff < 60000) return { ...notif, time: 'Just now' };
          if (timeDiff < 3600000) return { ...notif, time: `${Math.floor(timeDiff / 60000)} min ago` };
          if (timeDiff < 86400000) return { ...notif, time: `${Math.floor(timeDiff / 3600000)} hours ago` };
          return { ...notif, time: `${Math.floor(timeDiff / 86400000)} days ago` };
        }
        return notif;
      });
      return updated;
    }
    return [];
  });

  // Update notifications every minute to refresh "Just now" times
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem('quickloan_notifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        const updated = parsed.map((notif: any) => {
          if (notif.timestamp) {
            const timeDiff = Date.now() - notif.timestamp;
            if (timeDiff < 60000) return { ...notif, time: 'Just now' };
            if (timeDiff < 3600000) return { ...notif, time: `${Math.floor(timeDiff / 60000)} min ago` };
            if (timeDiff < 86400000) return { ...notif, time: `${Math.floor(timeDiff / 3600000)} hours ago` };
            return { ...notif, time: `${Math.floor(timeDiff / 86400000)} days ago` };
          }
          return notif;
        });
        setNotifications(updated);
        localStorage.setItem('quickloan_notifications', JSON.stringify(updated));
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Listen for storage changes to update notifications in real-time
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('quickloan_notifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        setNotifications(parsed);
      }
    };

    const handleNotificationAdded = () => {
      handleStorageChange(); // Refresh notifications when new one is added
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('notificationAdded', handleNotificationAdded);
    // Also check for local changes every 2 seconds
    const interval = setInterval(handleStorageChange, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('notificationAdded', handleNotificationAdded);
      clearInterval(interval);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('quickloan_notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('quickloan_notifications', JSON.stringify(updated));
  };

  return (
    <>
    <style>{`
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `}</style>
    <header className="fixed top-0 left-0 right-0 z-50 bg-loan-dark/95 backdrop-blur-lg">
      {/* Top Bar - Trust Indicators */}
      <div className="hide-scrollbar hidden md:flex items-center justify-center gap-4 md:gap-8 px-4 py-2 text-xs overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <button 
          onClick={() => navigate('/licenses')}
          className="flex items-center gap-2 text-loan-gray hover:text-loan-lime transition-colors flex-shrink-0"
          title="View our licenses and certifications"
        >
          <Shield className="w-3 h-3 text-loan-lime" />
          <span className="hidden sm:inline">Government Approved</span>
          <span className="sm:hidden">Gov Approved</span>
        </button>
        <button 
          onClick={() => navigate('/reviews')}
          className="flex items-center gap-2 text-loan-gray hover:text-loan-lime transition-colors flex-shrink-0"
          title="See customer reviews and success stories"
        >
          <TrendingUp className="w-3 h-3 text-loan-lime" />
          <span className="hidden sm:inline">500K+ Loans Approved</span>
          <span className="sm:hidden">500K+ Loans</span>
        </button>
        <button 
          onClick={() => navigate('/apply')}
          className="flex items-center gap-2 text-loan-gray hover:text-loan-lime transition-colors flex-shrink-0"
          title="Apply for a loan up to $50,000"
        >
          <Wallet className="w-3 h-3 text-loan-lime" />
          <span className="hidden sm:inline">Up to $50,000</span>
          <span className="sm:hidden">Up to $50K</span>
        </button>
        <button 
          onClick={() => navigate('/contact')}
          className="flex items-center gap-2 text-loan-gray hover:text-loan-lime transition-colors flex-shrink-0"
          title="Contact our BBB A+ rated support"
        >
          <BadgeCheck className="w-3 h-3 text-loan-lime" />
          <span className="hidden sm:inline">BBB A+ Rated</span>
          <span className="sm:hidden">BBB A+</span>
        </button>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-loan-lime/10 border border-loan-lime/30 flex items-center justify-center">
            <Banknote className="w-5 h-5 text-loan-lime" />
          </div>
          <div className="block">
            <h1 className="font-display font-bold text-lg text-loan-white leading-none">
              QuickLoan
            </h1>
            <p className="text-[10px] text-loan-gray hidden sm:block">USA Approved Lender</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-loan-gray hover:text-loan-lime transition-colors font-medium"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/features')}
            className="text-sm text-loan-gray hover:text-loan-lime transition-colors font-medium"
          >
            Features
          </button>
          <button
            onClick={() => navigate('/apply')}
            className="text-sm text-loan-gray hover:text-loan-lime transition-colors font-medium"
          >
            Apply
          </button>
          <button
            onClick={() => navigate('/reviews')}
            className="text-sm text-loan-gray hover:text-loan-lime transition-colors font-medium"
          >
            Reviews
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="text-sm text-loan-gray hover:text-loan-lime transition-colors font-medium"
          >
            Contact
          </button>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-xl bg-loan-surface border border-loan-border flex items-center justify-center hover:border-loan-lime/50 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-loan-lime" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-loan-lime text-loan-dark text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-loan-surface border border-loan-border rounded-xl shadow-xl z-50 max-h-96 overflow-hidden">
                <div className="p-4 border-b border-loan-border flex items-center justify-between">
                  <h3 className="text-loan-white font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-loan-lime text-xs hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-loan-gray text-sm p-4 text-center">No notifications</p>
                  ) : (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={`p-3 border-b border-loan-border last:border-b-0 hover:bg-loan-dark/50 cursor-pointer transition-colors ${
                          !notif.read ? 'bg-loan-lime/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-loan-lime/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-loan-lime text-xs font-bold">{notif.name[0]}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-loan-white text-sm">
                              <span className="font-semibold">{notif.name}</span> from {notif.location}
                            </p>
                            <p className="text-loan-lime text-xs">{notif.action}</p>
                            <p className="text-loan-gray text-xs mt-1">{notif.time}</p>
                          </div>
                          {!notif.read && (
                            <div className="w-2 h-2 bg-loan-lime rounded-full flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Admin Panel - Desktop - HIDDEN FROM PUBLIC UI */}
          {/* <button onClick={() => navigate('/admin')} className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-loan-surface border border-loan-border text-loan-white text-sm hover:border-loan-lime/50 transition-colors"><Settings className="w-4 h-4 text-loan-lime" /><span>Admin</span></button> */}

          {/* Phone - Desktop */}
          <a 
            href="tel:1-800-555-0123" 
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-loan-surface border border-loan-border text-loan-white text-sm hover:border-loan-lime/50 transition-colors"
          >
            <Phone className="w-4 h-4 text-loan-lime" />
            <span>1-800-555-0123</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-loan-surface border border-loan-border flex items-center justify-center hover:border-loan-lime/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-loan-white" />
            ) : (
              <Menu className="w-5 h-5 text-loan-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-loan-border bg-loan-dark">
          <nav className="flex flex-col px-4 py-4 gap-2">
            <button
              onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
              className="px-4 py-3 rounded-lg text-loan-gray hover:text-loan-white hover:bg-loan-surface transition-colors text-left"
            >
              Home
            </button>
            <button
              onClick={() => { navigate('/features'); setMobileMenuOpen(false); }}
              className="px-4 py-3 rounded-lg text-loan-gray hover:text-loan-white hover:bg-loan-surface transition-colors text-left"
            >
              Features
            </button>
            <button
              onClick={() => { navigate('/apply'); setMobileMenuOpen(false); }}
              className="px-4 py-3 rounded-lg text-loan-gray hover:text-loan-white hover:bg-loan-surface transition-colors text-left"
            >
              Apply
            </button>
            <button
              onClick={() => { navigate('/reviews'); setMobileMenuOpen(false); }}
              className="px-4 py-3 rounded-lg text-loan-gray hover:text-loan-white hover:bg-loan-surface transition-colors text-left"
            >
              Reviews
            </button>
            <button
              onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }}
              className="px-4 py-3 rounded-lg text-loan-gray hover:text-loan-white hover:bg-loan-surface transition-colors text-left"
            >
              Contact
            </button>
            {/* Admin Panel - Mobile - HIDDEN FROM PUBLIC UI */}
            {/* <button 
              onClick={() => { navigate('/admin'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-loan-gray hover:text-loan-lime transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4 text-loan-lime" />
              <span>Admin Panel</span>
            </button> */}
            <a 
              href="tel:1-800-555-0123"
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-loan-lime/10 border border-loan-lime/30 text-loan-lime mt-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call 1-800-555-0123</span>
            </a>
          </nav>
        </div>
      )}
    </header>
    </>
  )
}
