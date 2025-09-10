// Example: How to use the Firebase Backend in React Components
import React, { useState, useEffect } from 'react';
import {
  BackendService,
  AuthRoutes,
  BookingRoutes,
  VehicleRoutes,
  UploadRoutes,
  getCurrentUser,
  isAuthenticated,
  auth
} from '../backend';
import { onAuthStateChanged, User } from 'firebase/auth';

// Example Authentication Component
export const AuthExample: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle user signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await AuthRoutes.signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        ip: 'user-ip' // In real app, get from request
      });

      if (result.success) {
        alert('Signup successful! Please check your email for verification.');
      } else {
        alert(`Signup failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  // Handle user signin
  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await AuthRoutes.signin({
        email: formData.email,
        password: formData.password,
        ip: 'user-ip' // In real app, get from request
      });

      if (result.success) {
        alert('Signin successful!');
      } else {
        alert(`Signin failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Signin error:', error);
      alert('An error occurred during signin');
    } finally {
      setLoading(false);
    }
  };

  // Handle user signout
  const handleSignout = async () => {
    try {
      const result = await AuthRoutes.signout();
      if (result.success) {
        alert('Signed out successfully!');
      }
    } catch (error) {
      console.error('Signout error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.displayName || user.email}!</h2>
        <p className="mb-4">Email: {user.email}</p>
        <p className="mb-4">Email Verified: {user.emailVerified ? 'Yes' : 'No'}</p>
        <button
          onClick={handleSignout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Authentication Example</h2>
      
      <form className="space-y-4">
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          className="w-full p-2 border rounded"
        />
        
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          className="w-full p-2 border rounded"
        />
        
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-2 border rounded"
        />
        
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleSignup}
            disabled={loading}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          
          <button
            type="button"
            onClick={handleSignin}
            disabled={loading}
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Example Booking Component
export const BookingExample: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newBooking, setNewBooking] = useState({
    vehicleId: '',
    startDate: '',
    endDate: '',
    customerInfo: {
      name: '',
      phone: '',
      email: ''
    }
  });

  // Load user bookings
  const loadBookings = async () => {
    if (!isAuthenticated()) {
      alert('Please sign in to view bookings');
      return;
    }

    setLoading(true);
    try {
      const result = await BookingRoutes.getUserBookings();
      if (result.success) {
        setBookings(result.data || []);
      } else {
        alert(`Failed to load bookings: ${result.message}`);
      }
    } catch (error) {
      console.error('Load bookings error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create new booking
  const createBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      alert('Please sign in to create a booking');
      return;
    }

    setLoading(true);
    try {
      const result = await BookingRoutes.createBooking(newBooking);
      if (result.success) {
        alert('Booking created successfully!');
        setNewBooking({
          vehicleId: '',
          startDate: '',
          endDate: '',
          customerInfo: { name: '', phone: '', email: '' }
        });
        loadBookings(); // Refresh bookings list
      } else {
        alert(`Failed to create booking: ${result.message}`);
      }
    } catch (error) {
      console.error('Create booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Booking Management Example</h2>
      
      {/* Create Booking Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Create New Booking</h3>
        <form onSubmit={createBooking} className="space-y-4">
          <input
            type="text"
            placeholder="Vehicle ID"
            value={newBooking.vehicleId}
            onChange={(e) => setNewBooking({ ...newBooking, vehicleId: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              placeholder="Start Date"
              value={newBooking.startDate}
              onChange={(e) => setNewBooking({ ...newBooking, startDate: e.target.value })}
              className="p-2 border rounded"
              required
            />
            
            <input
              type="date"
              placeholder="End Date"
              value={newBooking.endDate}
              onChange={(e) => setNewBooking({ ...newBooking, endDate: e.target.value })}
              className="p-2 border rounded"
              required
            />
          </div>
          
          <input
            type="text"
            placeholder="Customer Name"
            value={newBooking.customerInfo.name}
            onChange={(e) => setNewBooking({
              ...newBooking,
              customerInfo: { ...newBooking.customerInfo, name: e.target.value }
            })}
            className="w-full p-2 border rounded"
            required
          />
          
          <input
            type="tel"
            placeholder="Customer Phone"
            value={newBooking.customerInfo.phone}
            onChange={(e) => setNewBooking({
              ...newBooking,
              customerInfo: { ...newBooking.customerInfo, phone: e.target.value }
            })}
            className="w-full p-2 border rounded"
            required
          />
          
          <input
            type="email"
            placeholder="Customer Email"
            value={newBooking.customerInfo.email}
            onChange={(e) => setNewBooking({
              ...newBooking,
              customerInfo: { ...newBooking.customerInfo, email: e.target.value }
            })}
            className="w-full p-2 border rounded"
            required
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Booking'}
          </button>
        </form>
      </div>
      
      {/* Bookings List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Your Bookings</h3>
          <button
            onClick={loadBookings}
            disabled={loading}
            className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border p-4 rounded">
                <p><strong>Vehicle ID:</strong> {booking.vehicleId}</p>
                <p><strong>Dates:</strong> {booking.startDate} to {booking.endDate}</p>
                <p><strong>Customer:</strong> {booking.customerInfo?.name}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Created:</strong> {new Date(booking.createdAt?.seconds * 1000).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Example Vehicle Component
export const VehicleExample: React.FC = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load all vehicles
  const loadVehicles = async () => {
    setLoading(true);
    try {
      const result = await VehicleRoutes.getAllVehicles();
      if (result.success) {
        setVehicles(result.data || []);
      } else {
        alert(`Failed to load vehicles: ${result.message}`);
      }
    } catch (error) {
      console.error('Load vehicles error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Vehicle Catalog Example</h2>
        <button
          onClick={loadVehicles}
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh Vehicles'}
        </button>
      </div>
      
      {vehicles.length === 0 ? (
        <p className="text-gray-500">No vehicles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
              <p className="text-gray-600 mb-2">Type: {vehicle.type}</p>
              <p className="text-gray-600 mb-2">Capacity: {vehicle.capacity} people</p>
              <p className="text-green-600 font-semibold">${vehicle.pricePerDay}/day</p>
              {vehicle.description && (
                <p className="text-gray-500 mt-2">{vehicle.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Example File Upload Component
export const UploadExample: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    if (!isAuthenticated()) {
      alert('Please sign in to upload files');
      return;
    }

    setUploading(true);
    try {
      const result = selectedFile.type.startsWith('image/')
        ? await UploadRoutes.uploadImage(selectedFile, 'user-uploads')
        : await UploadRoutes.uploadDocument(selectedFile, 'user-documents');

      if (result.success) {
        setUploadResult(result.data);
        alert('File uploaded successfully!');
      } else {
        alert(`Upload failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">File Upload Example</h2>
      
      <div className="space-y-4">
        <input
          type="file"
          onChange={handleFileSelect}
          accept="image/*,.pdf,.doc,.docx"
          className="w-full p-2 border rounded"
        />
        
        {selectedFile && (
          <div className="text-sm text-gray-600">
            <p>Selected: {selectedFile.name}</p>
            <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            <p>Type: {selectedFile.type}</p>
          </div>
        )}
        
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
        
        {uploadResult && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800 font-semibold">Upload Successful!</p>
            <p className="text-sm text-green-600">File URL: {uploadResult.downloadURL}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Example Component
export const BackendUsageExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState('auth');
  const [backendStatus, setBackendStatus] = useState<any>(null);

  // Initialize backend and check status
  useEffect(() => {
    const initializeBackend = async () => {
      const initResult = await BackendService.initialize();
      const statusResult = await BackendService.getStatus();
      setBackendStatus(statusResult);
      
      if (!initResult.success) {
        console.error('Backend initialization failed:', initResult.message);
      }
    };

    initializeBackend();
  }, []);

  const tabs = [
    { id: 'auth', label: 'Authentication', component: <AuthExample /> },
    { id: 'bookings', label: 'Bookings', component: <BookingExample /> },
    { id: 'vehicles', label: 'Vehicles', component: <VehicleExample /> },
    { id: 'upload', label: 'File Upload', component: <UploadExample /> }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Backend Status */}
      {backendStatus && (
        <div className={`p-4 text-center ${backendStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          Backend Status: {backendStatus.message}
        </div>
      )}
      
      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="py-8">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default BackendUsageExample;