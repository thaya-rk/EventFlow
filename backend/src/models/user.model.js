import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure that the email is unique
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Email validation regex
    },
    role: {
      type: String,
      enum: ['staff', 'HOD', 'principal', 'AO'],
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
