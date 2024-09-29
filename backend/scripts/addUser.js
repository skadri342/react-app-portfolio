import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import User from '../db/models/User.js';
import connectDB from '../db/config/connection.js';

dotenv.config();

async function addUser(username, password) {
  await connectDB();

  // Generate 2FA secret
  const secret = speakeasy.generateSecret({
    name: `Portfolio Website (${username})`
  });

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log('Generated hashed password:', hashedPassword);

  const user = new User({
    username,
    password: hashedPassword,
    twoFactorSecret: secret.base32
  });

  await user.save();

  console.log('User added successfully');

  // Retrieve the user from the database to verify the stored hash
  const storedUser = await User.findOne({ username });
  console.log('Stored hashed password:', storedUser.password);

  console.log('Username:', username);
  console.log('2FA Secret:', secret.base32);
  
  // Generate QR code
  const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);
  console.log('2FA QR Code URL:', qrCodeUrl);

  await mongoose.connection.close();
}

// Usage: node addUser.js <username> <password>
const [,, username, password] = process.argv;
if (username && password) {
  addUser(username, password).catch(console.error);
} else {
  console.log('Usage: node addUser.js <username> <password>');
}