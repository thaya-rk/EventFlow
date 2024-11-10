import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Register user
export const registerUser = async (req, res) => {
  const { user_id, username, email, role, department, password } = req.body;

  try {
    const existingUser = await User.findOne({ user_id });
    if (existingUser) return res.status(400).json({ message: "User ID already exists" });

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ user_id, username, email, role, department, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ user_id: newUser.user_id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// User login
export const loginUser = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const user = await User.findOne({ user_id });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

// Get user by ID
export const getUser = async (req, res) => {
  const { user_id } = req.params;


  try {
    const user = await User.findOne({ user_id });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { user_id } = req.params;

  
  const { username, email, role, department } = req.body;

  try {
    const user = await User.findOneAndUpdate(   
      { user_id },
      { username, email, role, department },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const { user_id } = req.params;

  if (req.user.user_id !== user_id) {
    return res.status(403).json({ message: 'You are not authorized to delete this user.' });
  }

  try {
    const user = await User.findOneAndDelete({ user_id });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
