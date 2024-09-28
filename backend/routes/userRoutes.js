import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Logout User
router.get("/logout", protect, logoutUser);

// Get User Profile
router.get("/profile", protect, getUserProfile);

// Update User Profile
router.put("/profile", protect, updateUserProfile);

export default router;