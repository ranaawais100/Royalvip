import express from 'express';
import { db } from '../config/firebase.js';
import firebaseService from '../services/firebase-service.js';
import { sendAdminNotification, sendClientConfirmation } from '../utils/mailer.js';

const router = express.Router();

// Helper function to validate booking data
const validateBookingData = (data) => {
  const stringFields = ['name', 'email', 'phone', 'vehicleType'];
  const missing = [];
  
  // Check string fields
  for (const field of stringFields) {
    if (!data[field] || typeof data[field] !== 'string' || data[field].trim() === '') {
      missing.push(field);
    }
  }
  
  // Check passengers separately since it's a number
  if (!data.passengers || isNaN(data.passengers) || data.passengers < 1) {
    missing.push('passengers');
  }
  
  if (missing.length > 0) {
    return { isValid: false, message: `Missing or invalid required fields: ${missing.join(', ')}` };
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { isValid: false, message: 'Invalid email format' };
  }
  
  return { isValid: true };
};

// Helper function to sanitize booking data
const sanitizeBookingData = (data) => {
  return {
    name: data.name ? data.name.trim() : '',
    email: data.email ? data.email.trim().toLowerCase() : '',
    phone: data.phone ? data.phone.trim() : '',
    date: data.date ? data.date.trim() : '',
    time: data.time ? data.time.trim() : '',
    pickupLocation: data.pickupLocation ? data.pickupLocation.trim() : '',
    dropLocation: data.dropLocation ? data.dropLocation.trim() : '',
    vehicleType: data.vehicleType ? data.vehicleType.trim() : '',
    passengers: parseInt(data.passengers) || 1,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// CREATE - Add new booking
router.post('/', async (req, res) => {
  try {
    // Validate input data
    const validation = validateBookingData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }
    
    // Sanitize and prepare booking data
    const bookingData = sanitizeBookingData(req.body);
    
    // Add booking// Save to Firebase
    const result = await firebaseService.addDocument('bookings', bookingData);
    const bookingId = result.id;
    
    // Update booking with ID
    await firebaseService.updateDocument('bookings', bookingId, { id: bookingId });
    
    // Prepare data for emails
    const emailData = { ...bookingData, id: bookingId };
    
    // Send email notifications (don't wait for them to complete)
    Promise.all([
      sendAdminNotification(emailData),
      sendClientConfirmation(emailData)
    ]).then(([adminResult, clientResult]) => {
      console.log('📧 Email notifications status:');
      console.log('  Admin:', adminResult.success ? '✅ Sent' : '❌ Failed');
      console.log('  Client:', clientResult.success ? '✅ Sent' : '❌ Failed');
    }).catch(error => {
      console.error('📧 Email notification error:', error);
    });
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        id: bookingId,
        ...bookingData
      }
    });
    
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// READ - Get all bookings (with pagination)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, date } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;
    
    let query = db.collection('bookings').orderBy('createdAt', 'desc');
    
    // Filter by status if provided
    if (status) {
      query = query.where('status', '==', status);
    }
    
    // Filter by date if provided
    if (date) {
      query = query.where('date', '==', date);
    }
    
    // Apply pagination
    query = query.offset(offset).limit(limitNum);
    
    const snapshot = await query.get();
    const bookings = [];
    
    snapshot.forEach(doc => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Get total count for pagination
    let countQuery = db.collection('bookings');
    if (status) countQuery = countQuery.where('status', '==', status);
    if (date) countQuery = countQuery.where('date', '==', date);
    
    const countSnapshot = await countQuery.get();
    const totalCount = countSnapshot.size;
    const totalPages = Math.ceil(totalCount / limitNum);
    
    res.json({
      success: true,
      data: bookings,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCount,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });
    
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// READ - Get single booking by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const doc = await db.collection('bookings').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        id: doc.id,
        ...doc.data()
      }
    });
    
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// UPDATE - Update booking by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if booking exists
    const doc = await db.collection('bookings').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Validate input data if provided
    if (Object.keys(req.body).length > 0) {
      const validation = validateBookingData({ ...doc.data(), ...req.body });
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: validation.message
        });
      }
    }
    
    // Prepare update data
    const updateData = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    // Remove undefined fields
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });
    
    // Update booking
    await db.collection('bookings').doc(id).update(updateData);
    
    // Get updated booking
    const updatedDoc = await db.collection('bookings').doc(id).get();
    
    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: {
        id: updatedDoc.id,
        ...updatedDoc.data()
      }
    });
    
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// UPDATE - Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }
    
    const validStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Valid statuses: ${validStatuses.join(', ')}`
      });
    }
    
    // Check if booking exists
    const doc = await db.collection('bookings').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Update status
    await db.collection('bookings').doc(id).update({
      status,
      updatedAt: new Date().toISOString()
    });
    
    // Get updated booking
    const updatedDoc = await db.collection('bookings').doc(id).get();
    
    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: {
        id: updatedDoc.id,
        ...updatedDoc.data()
      }
    });
    
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// DELETE - Delete booking by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if booking exists
    const doc = await db.collection('bookings').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Delete booking
    await db.collection('bookings').doc(id).delete();
    
    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update booking status (admin only)
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: pending, confirmed, completed, cancelled'
      });
    }
    
    // Update booking status in database
    const bookingRef = db.collection('bookings').doc(id);
    const bookingDoc = await bookingRef.get();
    
    if (!bookingDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    await bookingRef.update({
      status: status,
      updatedAt: new Date().toISOString()
    });
    
    console.log(`📋 Booking ${id} status updated to: ${status}`);
    
    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: {
        id: id,
        status: status,
        updatedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking status',
      error: error.message
    });
  }
});

// Get booking statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const bookingsRef = db.collection('bookings');
    
    // Get all bookings
    const allBookings = await bookingsRef.get();
    const totalBookings = allBookings.size;
    
    // Get bookings by status
    const statusCounts = {};
    const validStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
    
    for (const status of validStatuses) {
      const statusSnapshot = await bookingsRef.where('status', '==', status).get();
      statusCounts[status] = statusSnapshot.size;
    }
    
    // Get today's bookings
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = await bookingsRef.where('date', '==', today).get();
    
    // Get this month's bookings
    const thisMonth = new Date().toISOString().substring(0, 7);
    const monthlyBookings = await bookingsRef
      .where('date', '>=', thisMonth + '-01')
      .where('date', '<=', thisMonth + '-31')
      .get();
    
    res.json({
      success: true,
      data: {
        totalBookings,
        statusCounts,
        todayBookings: todayBookings.size,
        monthlyBookings: monthlyBookings.size,
        generatedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error fetching booking statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

export default router;