const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = localStorage.getItem('admin_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('admin_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('admin_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Always get fresh token from localStorage
    const token = localStorage.getItem('admin_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.clearToken();
          throw new Error('Unauthorized');
        }
        const error = await response.json();
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth
  async adminLogin(email: string, password: string) {
    const data = await this.request('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async register(userData: {
    fullName: string;
    email: string;
    password?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    loanAmount?: string;
    monthlyIncome?: string;
    employmentStatus?: string;
    bankName?: string;
    accountType?: string;
  }) {
    // Generate a random password if not provided (for loan applications)
    const dataToSend = {
      ...userData,
      password: userData.password || Math.random().toString(36).slice(-8),
    };
    
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    });
  }

  // Dashboard
  async getDashboardStats() {
    return this.request('/admin/dashboard');
  }

  // Users (Leads)
  async getAllUsers() {
    return this.request('/admin/users');
  }

  async updateUserStatus(id: string, status: string) {
    return this.request(`/admin/users/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/admin/users/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
