# EmailJS Setup Guide - Fix 400 Error

## Problem
You're getting a **400 error** when trying to send emails because the EmailJS service ID is not properly configured.

## Solution Steps

### 1. Get Your EmailJS Service ID

1. **Login to EmailJS Dashboard**: Go to [https://dashboard.emailjs.com](https://dashboard.emailjs.com)

2. **Navigate to Email Services**: Click on "Email Services" in the left sidebar

3. **Create or Find Service**: 
   - If you don't have a service, click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Give it a name like "Royal VIP Limo Service"
   - **Copy the Service ID** (it looks like `service_xxxxxxx`)

4. **Set as Default** (Optional): You can set this service as your default

### 2. Update Your Environment Variables

Update your `.env` file with the correct Service ID:

```env
# Replace 'service_your_service_id' with your actual service ID
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
```

### 3. Restart Your Development Server

After updating the `.env` file:

```bash
# Stop your current server (Ctrl+C)
# Then restart
npm run dev
# or
yarn dev
```

### 4. Test the Email Service

You can test the email service using the test utility:

```javascript
// In browser console
testQuickEmail('your-email@example.com', 'Test Name')
```

## Current Configuration

✅ **Template ID**: `template_l0v1s65` (Already configured)  
✅ **Public Key**: `tHsczBrrCw6ts-Nim` (Already configured)  
✅ **Private Key**: `b8X3ZIzA1N0c3Bei6nV4j` (Already configured)  
❌ **Service ID**: Needs to be updated in `.env` file

## Common Issues

### 400 Error Causes:
1. **Invalid Service ID** - Most common cause
2. **Service not connected** - Make sure your email service is properly connected in EmailJS dashboard
3. **Template not found** - Verify your template ID exists
4. **Rate limiting** - EmailJS has a 1 request per second limit

### Debugging Tips:
1. Check browser console for detailed error messages
2. Verify all credentials in EmailJS dashboard
3. Test with a simple email first
4. Make sure your email service is active and connected

## Need Help?

If you're still having issues:
1. Check the EmailJS dashboard for service status
2. Verify your email service connection
3. Try creating a new service if the current one isn't working
4. Contact EmailJS support if the service itself has issues