import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import firebaseService from '@/services/firebaseService';

interface LoginFormData {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Sign in with Firebase Authentication
      const user = await firebaseService.signInAdmin(formData.email, formData.password);
      
      // Check if user is admin
      const isAdmin = await firebaseService.isUserAdmin(user.email || '');
      
      if (!isAdmin) {
        await firebaseService.signOutAdmin();
        setError('Access denied. Admin privileges required.');
        return;
      }

      // Update last login
      await firebaseService.updateAdminLastLogin(user.email || '');
      
      // Store admin info in localStorage for convenience
      localStorage.setItem('adminEmail', user.email || '');
      
      // Redirect to dashboard
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>🚗 Royal VIP Limos</h1>
          <h2>Admin Panel</h2>
          <p>Secure access to booking management</p>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div className="error-message">
              <span>⚠️ {error}</span>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="admin@royalviplimos.com"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <span>🔄 Signing in...</span>
            ) : (
              <span>🔐 Sign In</span>
            )}
          </button>
        </form>
        
        <div className="admin-login-footer">
          <p>🔒 Secure admin access only</p>
          <small>Contact IT support if you need assistance</small>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;