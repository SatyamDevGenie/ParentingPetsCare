import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Register User
const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    next(error);
  }
});

// Login User
const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "90d",
    });

    res.json({ token, user });
  } catch (error) {
    next(error);
  }
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  try {
    // Invalidate the token on the client side (handled by frontend)
    res.status(200).json({ message: "Logged out successfully", token: null });
  } catch (error) {
    res.status(500).json({ message: "Error during logout" });
  }
});

// Get User Profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Update User Profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = req.user;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    const token = jwt.sign(
      { userId: updatedUser._id, role: updatedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
};