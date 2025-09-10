import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  pickupLocation: string;
  dropLocation: string;
  vehicleType: string;
  passengers: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
}

interface ResponseData {
  subject: string;
  message: string;
}

const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [responseData, setResponseData] = useState<ResponseData>({ subject: '', message: '' });
  const [sendingResponse, setSendingResponse] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    if (checkAuth()) {
      fetchBookings();
    }
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return false;
    }
    return true;
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setBookings(data.data.bookings || []);
      } else {
        console.error('Failed to fetch bookings:', data.message);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    setUpdatingStatus(bookingId);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();
      if (data.success) {
        setBookings(prev => prev.map(booking => 
          booking.id === bookingId ? { ...booking, status: status as any } : booking
        ));
        alert('Status updated successfully! Email notification sent to client.');
      } else {
        alert('Failed to update status: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Error updating booking status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const sendResponse = async () => {
    if (!selectedBooking || !responseData.subject || !responseData.message) {
      alert('Please fill in both subject and message');
      return;
    }

    setSendingResponse(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/bookings/${selectedBooking.id}/respond`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(responseData)
      });

      const data = await response.json();
      if (data.success) {
        alert('Response sent successfully! Email delivered to client.');
        setSelectedBooking(null);
        setResponseData({ subject: '', message: '' });
      } else {
        alert('Failed to send response: ' + data.message);
      }
    } catch (error) {
      console.error('Error sending response:', error);
      alert('Error sending response');
    } finally {
      setSendingResponse(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'confirmed': return '#27ae60';
      case 'in-progress': return '#9b59b6';
      case 'completed': return '#3498db';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>🚗 Royal VIP Limos - Admin Dashboard</h1>
          <div className="admin-header-actions">
            <span>Welcome, {localStorage.getItem('adminEmail')}</span>
            <button onClick={logout} className="logout-btn">🚪 Logout</button>
          </div>
        </div>
      </header>

      <div className="admin-content">
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>📊 Total Bookings</h3>
            <p>{bookings.length}</p>
          </div>
          <div className="stat-card">
            <h3>⏳ Pending</h3>
            <p>{bookings.filter(b => b.status === 'pending').length}</p>
          </div>
          <div className="stat-card">
            <h3>✅ Confirmed</h3>
            <p>{bookings.filter(b => b.status === 'confirmed').length}</p>
          </div>
          <div className="stat-card">
            <h3>🏁 Completed</h3>
            <p>{bookings.filter(b => b.status === 'completed').length}</p>
          </div>
        </div>

        <div className="admin-actions">
          <div className="action-card">
            <h3>📝 Blog Management</h3>
            <p>Create, edit, and manage blog posts</p>
            <button 
              onClick={() => navigate('/admin/blog')}
              className="action-btn blog-btn"
            >
              📝 Manage Blogs
            </button>
          </div>
        </div>

        <div className="bookings-section">
          <div className="bookings-header">
            <h2>📋 Booking Management</h2>
            <div className="filter-controls">
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Bookings</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="bookings-grid">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <h3>{booking.name}</h3>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(booking.status) }}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="booking-details">
                  <p><strong>📧 Email:</strong> {booking.email}</p>
                  <p><strong>📱 Phone:</strong> {booking.phone}</p>
                  <p><strong>📅 Date:</strong> {booking.date}</p>
                  <p><strong>🕐 Time:</strong> {booking.time}</p>
                  <p><strong>📍 Pickup:</strong> {booking.pickupLocation}</p>
                  <p><strong>🎯 Drop-off:</strong> {booking.dropLocation}</p>
                  <p><strong>🚗 Vehicle:</strong> {booking.vehicleType}</p>
                  <p><strong>👥 Passengers:</strong> {booking.passengers}</p>
                  {booking.specialRequests && (
                    <p><strong>💬 Special Requests:</strong> {booking.specialRequests}</p>
                  )}
                </div>
                
                <div className="booking-actions">
                  <div className="status-controls">
                    {updatingStatus === booking.id ? (
                      <div className="status-updating">
                        <div className="status-loader"></div>
                        <span>Updating status...</span>
                      </div>
                    ) : (
                      <select 
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                        className="status-select"
                        disabled={updatingStatus !== null}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => setSelectedBooking(booking)}
                    className="respond-btn"
                  >
                    📧 Send Response
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedBooking && (
        <div className="response-modal">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <div className="modal-icon">📧</div>
                <div>
                  <h3>Send Response</h3>
                  <p className="modal-subtitle">Responding to {selectedBooking.name}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="close-btn"
                title="Close"
              >
                ✖️
              </button>
            </div>
            
            <div className="modal-body">
              <div className="booking-info">
                <div className="info-item">
                  <span className="info-label">Customer:</span>
                  <span className="info-value">{selectedBooking.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{selectedBooking.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Booking Date:</span>
                  <span className="info-value">{selectedBooking.date} at {selectedBooking.time}</span>
                </div>
              </div>
              
              <div className="response-form">
                <div className="form-group">
                  <label htmlFor="subject">Email Subject *</label>
                  <input 
                    id="subject"
                    type="text"
                    value={responseData.subject}
                    onChange={(e) => setResponseData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter a clear and professional subject line"
                    className="response-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message Content *</label>
                  <textarea 
                    id="message"
                    value={responseData.message}
                    onChange={(e) => setResponseData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Dear {selectedBooking.name},\n\nThank you for your booking inquiry...\n\nBest regards,\nRoyal VIP Limos Team"
                    className="response-textarea"
                    rows={8}
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                onClick={() => setSelectedBooking(null)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button 
                onClick={sendResponse}
                disabled={sendingResponse || !responseData.subject || !responseData.message}
                className="send-btn"
              >
                {sendingResponse ? (
                  <>
                    <div className="btn-loader"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    📧 Send Response
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;