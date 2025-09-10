import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/firebase.js';
import firebaseService from '../services/firebase-service.js';
import { sendAdminResponse, sendStatusUpdateEmail } from '../utils/mailer.js';

const router = express.Router();

// Admin credentials (in production, store in database with hashed password)
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD_HASH = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // password: 'admin123'

// JWT Secret (should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// Middleware to verify admin authentication
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.adminToken;
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid token.' });
  }
};

// Create initial admin user (for setup only)
router.post('/create-admin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    // Check if admin already exists
    const adminRef = db.collection('admins').doc(email);
    const adminDoc = await adminRef.get();
    
    if (adminDoc.exists) {
      return res.status(400).json({
        success: false,
        message: 'Admin user already exists'
      });
    }
    
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create admin user
    await adminRef.set({
      email: email,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date().toISOString(),
      lastLogin: null
    });
    
    console.log(`👤 Admin user created: ${email}`);
    
    res.json({
      success: true,
      message: 'Admin user created successfully',
      data: {
        email: email,
        role: 'admin'
      }
    });
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create admin user',
      error: error.message
    });
  }
});

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    // Get admin from database
    const adminRef = db.collection('admins').doc(email);
    const adminDoc = await adminRef.get();
    
    if (!adminDoc.exists) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    const adminData = adminDoc.data();
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, adminData.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Update last login
    await adminRef.update({
      lastLogin: new Date().toISOString()
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { email: email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    console.log(`👤 Admin login successful: ${email}`);
    
    // Set cookie (optional)
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: { email: email, role: 'admin' }
    });
    
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Admin logout
router.post('/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// Get all bookings (admin only)
router.get('/bookings', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const offset = (page - 1) * limit;
    const limitNum = parseInt(limit);
    
    // Build query conditions
    const whereConditions = [];
    
    // Apply filters
    if (status && status !== 'all') {
      whereConditions.push({ field: 'status', operator: '==', value: status });
    }
    
    if (search) {
      // Note: Firestore doesn't support full-text search natively
      // This is a basic implementation - for production, consider using Algolia or similar
      whereConditions.push({ field: 'name', operator: '>=', value: search });
      whereConditions.push({ field: 'name', operator: '<=', value: search + '\uf8ff' });
    }
    
    // Get total count for pagination
    const totalBookings = await firebaseService.getDocumentCount('bookings', whereConditions);
    
    // Get bookings with pagination
    const bookings = await firebaseService.getDocuments('bookings', {
      whereConditions,
      orderByField: 'createdAt',
      orderByDirection: 'desc',
      limitCount: limitNum,
      // Note: For proper pagination with startAfter, we'd need to implement cursor-based pagination
      // For now, we'll use a simple offset approach by getting more docs and slicing
    });
    
    // Apply offset manually (not ideal for large datasets)
    const paginatedBookings = bookings.slice(offset, offset + limitNum);
    
    // Filter by search term if provided (client-side filtering for simplicity)
    let filteredBookings = paginatedBookings;
    if (search && !whereConditions.some(c => c.field === 'name')) {
      const searchTerm = search.toLowerCase();
      filteredBookings = paginatedBookings.filter(booking => 
        booking.name?.toLowerCase().includes(searchTerm) ||
        booking.email?.toLowerCase().includes(searchTerm) ||
        booking.phone?.includes(searchTerm) ||
        booking.pickupLocation?.toLowerCase().includes(searchTerm) ||
        booking.dropLocation?.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json({
      success: true,
      data: {
        bookings: filteredBookings,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalBookings / limit),
          totalBookings,
          hasNext: offset + limit < totalBookings,
          hasPrev: page > 1
        }
      }
    });
    
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
});

// Get single booking (admin only)
router.get('/bookings/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const booking = await firebaseService.getDocument('bookings', id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        id: id,
        ...booking
      }
    });
    
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking'
    });
  }
});

// Update booking status (admin only)
router.patch('/bookings/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    
    // Validate status
    const validStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }
    
    const updateData = {
      status,
      updatedAt: new Date().toISOString(),
      lastUpdatedBy: req.admin.email
    };
    
    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }
    
    await firebaseService.updateDocument('bookings', id, updateData);
    
    // Get updated booking
    const bookingData = await firebaseService.getDocument('bookings', id);
    if (!bookingData) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found after update'
      });
    }
    
    // Send status update email to client
    try {
      await sendStatusUpdateEmail(bookingData, status, adminNotes);
      console.log(`📧 Status update email sent for booking ${id} (${status})`);
    } catch (emailError) {
      console.error('Failed to send status update email:', emailError);
      // Don't fail the status update if email fails
    }
    
    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: bookingData
    });
    
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking status'
    });
  }
});

// Send response to client (admin only)
router.post('/bookings/:id/respond', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { message, subject } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Response message is required'
      });
    }
    
    // Get booking details
    const bookingData = await firebaseService.getDocument('bookings', id);
    
    if (!bookingData) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Send email response
    const emailResult = await sendAdminResponse({
      booking: bookingData,
      responseMessage: message,
      subject: subject || `Response to your booking - Royal VIP Limos`
    });
    
    if (emailResult.success) {
      // Update booking with response history
      const responseRecord = {
        message,
        subject: subject || `Response to your booking - Royal VIP Limos`,
        sentAt: new Date().toISOString(),
        sentBy: req.admin.email
      };
      
      // Get current booking data to update responses array
      const currentBooking = await firebaseService.getDocument('bookings', id);
      const currentResponses = currentBooking.responses || [];
      
      await firebaseService.updateDocument('bookings', id, {
        responses: [...currentResponses, responseRecord],
        lastResponseAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      res.json({
        success: true,
        message: 'Response sent successfully',
        data: responseRecord
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send email response',
        error: emailResult.error
      });
    }
    
  } catch (error) {
    console.error('Error sending admin response:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send response'
    });
  }
});

// Get booking statistics (admin only)
router.get('/stats/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Get total bookings
    const totalSnapshot = await db.collection('bookings').count().get();
    const totalBookings = totalSnapshot.data().count;
    
    // Get today's bookings
    const todaySnapshot = await db.collection('bookings')
      .where('createdAt', '>=', startOfDay.toISOString())
      .count().get();
    const todayBookings = todaySnapshot.data().count;
    
    // Get this month's bookings
    const monthSnapshot = await db.collection('bookings')
      .where('createdAt', '>=', startOfMonth.toISOString())
      .count().get();
    const monthlyBookings = monthSnapshot.data().count;
    
    // Get bookings by status
    const statusCounts = {};
    const statuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
    
    for (const status of statuses) {
      const statusSnapshot = await db.collection('bookings')
        .where('status', '==', status)
        .count().get();
      statusCounts[status] = statusSnapshot.data().count;
    }
    
    res.json({
      success: true,
      data: {
        totalBookings,
        todayBookings,
        monthlyBookings,
        statusCounts,
        generatedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
});

// Verify admin token (for frontend auth check)
router.get('/verify', authenticateAdmin, (req, res) => {
  res.json({
    success: true,
    admin: req.admin
  });
});

export default router;