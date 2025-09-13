import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import firebaseService, { BookingData } from '@/services/firebaseService';
import emailService from '@/services/emailService';

// Using BookingData from firebaseService
type Booking = BookingData;

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
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up Firebase auth state listener
    const unsubscribe = firebaseService.onAuthStateChange(async (user) => {
      if (user) {
        const isAdmin = await firebaseService.isUserAdmin(user.email || '');
        if (isAdmin) {
          setUser(user);
          fetchBookings();
        } else {
          navigate('/admin/login');
        }
      } else {
        navigate('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Removed checkAuth - now handled by Firebase auth state listener

  const fetchBookings = async () => {
    try {
      const bookingsData = await firebaseService.getBookings();
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    setUpdatingStatus(bookingId);
    try {
      // Get the current booking data before updating
      const currentBooking = bookings.find(booking => booking.id === bookingId);
      if (!currentBooking) {
        throw new Error('Booking not found');
      }

      const oldStatus = currentBooking.status;
      
      // Update status in Firebase
      await firebaseService.updateBookingStatus(bookingId, status as BookingData['status']);
      
      // Update local state
      const updatedBooking = { ...currentBooking, status: status as BookingData['status'], updatedAt: new Date() };
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? updatedBooking : booking
      ));

      // Send email notification to customer about status change
      try {
        await emailService.sendStatusUpdateEmail(updatedBooking, oldStatus);
        console.log('Status update email sent to customer');
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
        // Don't fail the status update if email fails
      }
      
      alert('Status updated successfully!');
    } catch (error: any) {
      console.error('Error updating booking status:', error);
      alert('Error updating booking status: ' + error.message);
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
      // Create a custom email template for admin responses
      const customBookingData = {
        ...selectedBooking,
        specialRequests: `Admin Response:\n\nSubject: ${responseData.subject}\n\nMessage: ${responseData.message}`
      };

      // Send email using the customer template with custom message
      await emailService.sendCustomerConfirmation(customBookingData);
      
      alert(`Response sent successfully to ${selectedBooking.email}!`);
      setSelectedBooking(null);
      setResponseData({ subject: '', message: '' });
    } catch (error) {
      console.error('Error sending response:', error);
      alert('Error sending response: ' + (error as Error).message);
    } finally {
      setSendingResponse(false);
    }
  };

  const logout = async () => {
    try {
      await firebaseService.signOutAdmin();
      localStorage.removeItem('adminEmail');
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
      // Still navigate even if sign out fails
      navigate('/admin/login');
    }
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
            <span>Welcome, {user?.email || localStorage.getItem('adminEmail')}</span>
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