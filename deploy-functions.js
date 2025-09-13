#!/usr/bin/env node

/**
 * Firebase Functions Deployment Script
 * This script helps deploy the email notification system to Firebase Functions
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Firebase Functions Deployment Script');
console.log('=====================================\n');

// Check if Firebase CLI is installed
try {
  execSync('firebase --version', { stdio: 'pipe' });
  console.log('✅ Firebase CLI is installed');
} catch (error) {
  console.log('❌ Firebase CLI not found. Installing...');
  execSync('npm install -g firebase-tools', { stdio: 'inherit' });
}

// Check if user is logged in to Firebase
try {
  execSync('firebase projects:list', { stdio: 'pipe' });
  console.log('✅ Firebase authentication verified');
} catch (error) {
  console.log('❌ Not logged in to Firebase. Please run: firebase login');
  process.exit(1);
}

// Install Functions dependencies
console.log('\n📦 Installing Functions dependencies...');
try {
  process.chdir('./functions');
  execSync('npm install', { stdio: 'inherit' });
  process.chdir('..');
  console.log('✅ Dependencies installed');
} catch (error) {
  console.log('❌ Failed to install dependencies');
  process.exit(1);
}

// Set Firebase configuration
console.log('\n⚙️  Setting up Firebase configuration...');
try {
  // Set Gmail configuration for Functions
  console.log('Setting Gmail configuration...');
  console.log('\n📧 IMPORTANT: You need to set up Gmail App Password');
  console.log('1. Go to Google Account Settings > Security');
  console.log('2. Enable 2-Factor Authentication if not already enabled');
  console.log('3. Generate an App Password for "Mail"');
  console.log('4. Run the following commands with your credentials:');
  console.log('\n   firebase functions:config:set gmail.email="inforoyalviplimo@gmail.com"');
  console.log('   firebase functions:config:set gmail.password="your-app-password"');
  console.log('   firebase functions:config:set company.phone="your-phone-number"');
  console.log('\n5. Then run: firebase deploy --only functions');
  
} catch (error) {
  console.log('❌ Configuration setup failed:', error.message);
}

console.log('\n🎯 Next Steps:');
console.log('1. Set up Gmail App Password (see instructions above)');
console.log('2. Configure Firebase Functions environment variables');
console.log('3. Deploy functions: firebase deploy --only functions');
console.log('4. Test the email notifications by creating a booking');

console.log('\n📚 Documentation:');
console.log('- Firebase Functions: https://firebase.google.com/docs/functions');
console.log('- Gmail App Passwords: https://support.google.com/accounts/answer/185833');

console.log('\n✨ Setup complete! Follow the next steps to deploy your email system.');