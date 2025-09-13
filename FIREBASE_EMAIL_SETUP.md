# Firebase Email Notification System Setup Guide

This guide will help you set up automated email notifications using Firebase Cloud Functions for your Royal VIP Limo booking system.

## 🎯 What This System Does

1. **New Booking Notifications**: When a customer makes a booking, you (admin) receive an email notification at `inforoyalviplimo@gmail.com`
2. **Customer Confirmations**: Customers automatically receive a confirmation email after booking
3. **Status Updates**: When you update booking status in the admin dashboard, customers receive automatic email notifications

## 📋 Prerequisites

- Firebase project with Firestore enabled
- Gmail account: `inforoyalviplimo@gmail.com`
- Node.js installed on your system
- Firebase CLI installed globally

## 🚀 Step-by-Step Setup

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase Project

```bash
# In your project root directory
firebase init
```

Select:
- ✅ Functions: Configure and deploy Cloud Functions
- ✅ Firestore: Deploy rules and create indexes
- ✅ Hosting: Configure and deploy Firebase Hosting sites

### Step 4: Set Up Gmail App Password

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Go to **Security** → **App passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### Step 5: Configure Firebase Functions Environment

```bash
# Set Gmail credentials
firebase functions:config:set gmail.email="inforoyalviplimo@gmail.com"
firebase functions:config:set gmail.password="your-16-char-app-password"

# Set company information
firebase functions:config:set company.phone="+1-XXX-XXX-XXXX"
```

### Step 6: Install Functions Dependencies

```bash
cd functions
npm install
cd ..
```

### Step 7: Deploy Functions

```bash
firebase deploy --only functions
```

### Step 8: Update Environment Variables

Update your `.env` file with:

```env
# Email Configuration
VITE_ADMIN_EMAIL=inforoyalviplimo@gmail.com
VITE_COMPANY_NAME=Royal VIP Limo
VITE_COMPANY_EMAIL=inforoyalviplimo@gmail.com
VITE_COMPANY_PHONE=+1-XXX-XXX-XXXX
```

## 🧪 Testing the System

### Test New Booking Notification

1. Go to your booking page: `http://localhost:8081/booking`
2. Fill out and submit a booking form
3. Check `inforoyalviplimo@gmail.com` for admin notification
4. Check customer email for confirmation

### Test Status Update Notification

1. Go to admin dashboard: `http://localhost:8081/admin/dashboard`
2. Change a booking status (pending → confirmed)
3. Check customer email for status update notification

## 📧 Email Templates

### Admin Notification Email
- **Subject**: 🚗 New Booking Received - [Booking ID]
- **Content**: Complete booking details with customer information
- **Action**: Review and update booking status

### Customer Confirmation Email
- **Subject**: ✅ Booking Confirmation - Royal VIP Limo
- **Content**: Booking details and next steps
- **Branding**: Professional design with company colors

### Status Update Email
- **Subject**: 📋 Booking Status Update - Royal VIP Limo
- **Content**: Status change notification with booking details
- **Visual**: Color-coded status indicators

## 🔧 Troubleshooting

### Functions Not Triggering

1. Check Firebase Console → Functions for errors
2. Verify Firestore rules allow write access
3. Check function logs: `firebase functions:log`

### Emails Not Sending

1. Verify Gmail App Password is correct
2. Check function configuration: `firebase functions:config:get`
3. Ensure 2-Factor Authentication is enabled on Gmail

### Permission Errors

1. Update Firestore rules in `firestore.rules`
2. Deploy rules: `firebase deploy --only firestore:rules`

## 📊 Monitoring

### Firebase Console
- Monitor function executions
- Check error logs
- View performance metrics

### Email Delivery
- Check Gmail sent folder for admin emails
- Monitor customer email delivery
- Set up email bounce handling if needed

## 🔒 Security Best Practices

1. **Never commit Gmail passwords** to version control
2. **Use App Passwords** instead of account passwords
3. **Regularly rotate** App Passwords
4. **Monitor function logs** for suspicious activity
5. **Set up billing alerts** to prevent unexpected charges

## 💰 Cost Considerations

- **Firebase Functions**: Pay per invocation (very low cost for typical usage)
- **Gmail API**: Free for reasonable usage
- **Firestore**: Pay per read/write operation

**Estimated monthly cost for 100 bookings**: < $1 USD

## 🆘 Support

If you encounter issues:

1. Check Firebase Console logs
2. Review function configuration
3. Test with Firebase emulator first
4. Contact Firebase support for complex issues

## 📚 Additional Resources

- [Firebase Functions Documentation](https://firebase.google.com/docs/functions)
- [Gmail App Passwords Guide](https://support.google.com/accounts/answer/185833)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Nodemailer Documentation](https://nodemailer.com/about/)

---

**🎉 Congratulations!** Your automated email notification system is now set up and ready to handle customer bookings professionally.