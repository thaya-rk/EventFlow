import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; 

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { user_id, displayName, role, department, password } = req.body;

  // Ensure required fields are provided
  if (!user_id || !displayName || !role || !department || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ user_id });
    if (existingUser) {
      return res.status(400).json({ message: "User ID already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({
      user_id,
      displayName,
      role,
      department,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ user_id: newUser.user_id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "Error registering user" });
  }
});

// User login route
router.post("/login", async (req, res) => {
  const { user_id, password } = req.body;

  // Ensure required fields are provided
  if (!user_id || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find user by user_id
    const user = await User.findOne({ user_id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Fetch a user by user_id
router.get("/get-user/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: "Error fetching user" });
  }
});

// Update a user by user_id
router.put("/update-user/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { displayName, role, department } = req.body;

  if (!displayName || !role || !department) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { user_id },
      { displayName, role, department },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: "Error updating user" });
  }
});

// Delete a user by user_id
router.delete("/delete-user/:user_id", async (req, res) => {
    const { user_id } = req.params;
  
    console.log("Attempting to delete user with user_id:", user_id); // Added logging
  
    try {
      const user = await User.findOneAndDelete({ user_id });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("User deleted:", user); // Log the deleted user
  
      res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
      console.error('Error deleting user:', error.message);
      res.status(500).json({ message: "Error deleting user" });
    }
  });
  
export default router;
