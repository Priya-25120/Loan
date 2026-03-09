import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Download, 
  Trash2, 
  Eye, 
  Phone, 
  Mail, 
  MapPin, 
  DollarSign, 
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Users,
  TrendingUp,
  Wallet
} from 'lucide-react';

interface Lead {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  loanAmount: string;
  monthlyIncome: string;
  employmentStatus: string;
  bankName: string;
  accountType: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'approved' | 'rejected';
}

// Login Component
const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      await apiService.adminLogin(email, password);
      onLogin();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 text-sm mt-2">QuickLoan Lead Management</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-gray-700 text-sm font-medium">Email</label>
            <Input 
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 bg-purple-50 border-purple-300 text-gray-900 placeholder:text-gray-400 text-left"
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm font-medium">Password</label>
            <Input 
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 bg-gray-50 border-gray-300 text-gray-900"
            />
          </div>
          <Button onClick={handleLogin} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

// Lead Detail Modal
const LeadDetailModal = ({ lead, onClose, onUpdateStatus }: { 
  lead: Lead; 
  onClose: () => void;
  onUpdateStatus: (id: number, status: Lead['status']) => void;
}) => {
  if (!lead) return null;

  const statusColors = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-purple-100 text-purple-700',
    rejected: 'bg-red-100 text-red-700'
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-display font-bold text-gray-900">Lead Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Status</span>
            <select 
              value={lead.status}
              onChange={(e) => onUpdateStatus(lead.id, e.target.value as Lead['status'])}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${statusColors[lead.status]}`}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Personal Info */}
          <div>
            <h3 className="text-purple-600 text-sm font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Personal Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Full Name</span>
                <span className="text-gray-900 text-sm">{lead.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Email</span>
                <a href={`mailto:${lead.email}`} className="text-purple-600 text-sm">{lead.email}</a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Phone</span>
                <a href={`tel:${lead.phone}`} className="text-purple-600 text-sm">{lead.phone}</a>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-purple-600 text-sm font-semibold mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address
            </h3>
            <p className="text-gray-900 text-sm">{lead.address}</p>
            <p className="text-gray-600 text-sm">{lead.city}, {lead.state} {lead.zipCode}</p>
          </div>

          {/* Loan Details */}
          <div>
            <h3 className="text-purple-600 text-sm font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Loan Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Loan Amount</span>
                <span className="text-gray-900 text-sm font-semibold">${parseInt(lead.loanAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Monthly Income</span>
                <span className="text-gray-900 text-sm">${parseInt(lead.monthlyIncome).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Employment</span>
                <span className="text-gray-900 text-sm capitalize">{lead.employmentStatus}</span>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div>
            <h3 className="text-purple-600 text-sm font-semibold mb-3 flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Bank Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Bank Name</span>
                <span className="text-gray-900 text-sm">{lead.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Account Type</span>
                <span className="text-gray-900 text-sm capitalize">{lead.accountType}</span>
              </div>
            </div>
          </div>

          {/* Submission Info */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Submitted
              </span>
              <span className="text-gray-900 text-sm">
                {new Date(lead.submittedAt).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-2">Lead ID: {lead.id}</p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
          <Button 
            onClick={() => window.open(`tel:${lead.phone}`)}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button 
            onClick={() => window.open(`mailto:${lead.email}`)}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main Admin Dashboard
const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Lead['status'] | 'all'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    approved: 0,
    totalAmount: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Load from API
      const usersData = await apiService.getAllUsers();
      
      const mappedLeads = usersData.map((user: any) => ({
        id: user._id || user.id,
        fullName: user.fullName || 'N/A',
        email: user.email || 'N/A',
        phone: user.phone || 'N/A',
        address: user.address || 'N/A',
        city: user.city || 'N/A',
        state: user.state || 'N/A',
        zipCode: user.zipCode || 'N/A',
        loanAmount: user.loanAmount || '0',
        monthlyIncome: user.monthlyIncome || '0',
        employmentStatus: user.employmentStatus || 'N/A',
        bankName: user.bankName || 'N/A',
        accountType: user.accountType || 'N/A',
        submittedAt: user.createdAt || new Date().toISOString(),
        status: user.status || 'new'
      }));
      
      setLeads(mappedLeads);
      setStats({
        total: mappedLeads.length,
        new: mappedLeads.filter((l: Lead) => l.status === 'new').length,
        contacted: mappedLeads.filter((l: Lead) => l.status === 'contacted').length,
        approved: mappedLeads.filter((l: Lead) => l.status === 'approved').length,
        totalAmount: mappedLeads.reduce((sum: number, l: Lead) => sum + (parseInt(l.loanAmount) || 0), 0)
      });
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (id: number, status: Lead['status']) => {
    try {
      await apiService.updateUserStatus(String(id), status);
      const updatedLeads = leads.map(lead => 
        lead.id === id ? { ...lead, status } : lead
      );
      setLeads(updatedLeads);
      if (selectedLead) {
        setSelectedLead({ ...selectedLead, status });
      }
      // Recalculate stats
      setStats({
        total: updatedLeads.length,
        new: updatedLeads.filter((l: Lead) => l.status === 'new').length,
        contacted: updatedLeads.filter((l: Lead) => l.status === 'contacted').length,
        approved: updatedLeads.filter((l: Lead) => l.status === 'approved').length,
        totalAmount: updatedLeads.reduce((sum: number, l: Lead) => sum + (parseInt(l.loanAmount) || 0), 0)
      });
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const deleteLead = async (id: number) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      try {
        await apiService.deleteUser(String(id));
        const updatedLeads = leads.filter(lead => lead.id !== id);
        setLeads(updatedLeads);
        // Recalculate stats
        setStats({
          total: updatedLeads.length,
          new: updatedLeads.filter((l: Lead) => l.status === 'new').length,
          contacted: updatedLeads.filter((l: Lead) => l.status === 'contacted').length,
          approved: updatedLeads.filter((l: Lead) => l.status === 'approved').length,
          totalAmount: updatedLeads.reduce((sum: number, l: Lead) => sum + (parseInt(l.loanAmount) || 0), 0)
        });
      } catch (err) {
        console.error('Failed to delete:', err);
      }
    }
  };

  const exportLeads = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Phone', 'Address', 'City', 'State', 'ZIP', 'Loan Amount', 'Income', 'Employment', 'Bank', 'Account Type', 'Status', 'Submitted'].join(','),
      ...filteredLeads.map(lead => [
        lead.id,
        lead.fullName,
        lead.email,
        lead.phone,
        lead.address,
        lead.city,
        lead.state,
        lead.zipCode,
        lead.loanAmount,
        lead.monthlyIncome,
        lead.employmentStatus,
        lead.bankName,
        lead.accountType,
        lead.status,
        new Date(lead.submittedAt).toISOString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quickloan-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const statusColors = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-purple-100 text-purple-700',
    rejected: 'bg-red-100 text-red-700'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold text-gray-900">QuickLoan Admin</h1>
              <p className="text-gray-600 text-xs">Lead Management System</p>
            </div>
          </div>
          <Button onClick={onLogout} className="bg-purple-600 hover:bg-purple-700 text-white border-0">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-gray-600 text-xs">Total Leads</span>
            </div>
            <p className="text-2xl font-display font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600 text-xs">New</span>
            </div>
            <p className="text-2xl font-display font-bold text-blue-500">{stats.new}</p>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-600 text-xs">Contacted</span>
            </div>
            <p className="text-2xl font-display font-bold text-yellow-500">{stats.contacted}</p>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              <span className="text-gray-600 text-xs">Approved</span>
            </div>
            <p className="text-2xl font-display font-bold text-purple-600">{stats.approved}</p>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-purple-600" />
              <span className="text-gray-600 text-xs">Total Value</span>
            </div>
            <p className="text-2xl font-display font-bold text-purple-600">${(stats.totalAmount / 1000000).toFixed(1)}M</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-200 text-gray-900"
            />
          </div>
          <div className="flex gap-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Lead['status'] | 'all')}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <Button onClick={exportLeads} className="bg-purple-600 hover:bg-purple-700 text-white border-0">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="max-w-7xl mx-auto px-4 pb-32">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading leads...</p>
          </div>
        ) : paginatedLeads.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No leads found</p>
            <p className="text-gray-500 text-sm">Submit a form on the main site to see leads here</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-600 text-xs font-medium">Name</th>
                    <th className="text-left px-4 py-3 text-gray-600 text-xs font-medium">Contact</th>
                    <th className="text-left px-4 py-3 text-gray-600 text-xs font-medium">Loan Amount</th>
                    <th className="text-left px-4 py-3 text-gray-600 text-xs font-medium">Status</th>
                    <th className="text-left px-4 py-3 text-gray-600 text-xs font-medium">Date</th>
                    <th className="text-right px-4 py-3 text-gray-600 text-xs font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="text-gray-900 text-sm font-medium">{lead.fullName}</p>
                        <p className="text-gray-500 text-xs">{lead.city}, {lead.state}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-gray-900 text-sm">{lead.phone}</p>
                        <p className="text-gray-500 text-xs">{lead.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-purple-600 text-sm font-semibold">${parseInt(lead.loanAmount).toLocaleString()}</p>
                        <p className="text-gray-500 text-xs">{lead.employmentStatus}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[lead.status]}`}>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-gray-900 text-sm">{new Date(lead.submittedAt).toLocaleDateString()}</p>
                        <p className="text-gray-500 text-xs">{new Date(lead.submittedAt).toLocaleTimeString()}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setSelectedLead(lead)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-purple-600"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteLead(lead.id)}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredLeads.length)} of {filteredLeads.length}
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <span className="px-3 py-2 text-gray-700">{currentPage} / {totalPages}</span>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal 
          lead={selectedLead} 
          onClose={() => setSelectedLead(null)}
          onUpdateStatus={updateLeadStatus}
        />
      )}
    </div>
  );
};

// Main Admin App
function AdminApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('admin_token');
  });

  return isLoggedIn ? (
    <AdminDashboard onLogout={() => { apiService.clearToken(); setIsLoggedIn(false); }} />
  ) : (
    <AdminLogin onLogin={() => setIsLoggedIn(true)} />
  );
}

export default AdminApp;
