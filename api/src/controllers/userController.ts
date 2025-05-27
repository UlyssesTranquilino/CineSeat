import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/UserModel";

const UserController = {
  // Register
  registerUser: async (req: any, res: any) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "User already exists." });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User created successfully." });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  // Login
  loginUser: async (req: any, res: any) => {
    console.log("HELLO");
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials." });

      res.status(200).json({
        message: "Login successful.",
        user: { id: user._id, username: user.username },
      });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  // Get all users
  getAllUsers: async (_: any, res: any) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  // Get user by ID
  getUserById: async (req: any, res: any) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found." });

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  // Update user
  updateUser: async (req: any, res: any) => {
    try {
      const { username, email } = req.body;

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { username, email },
        { new: true }
      ).select("-password");

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  // Add favorite movie
  addFavorite: async (req: any, res: any) => {
    try {
      const { movieId } = req.body;
      const user = await User.findById(req.params.id);

      if (!user) return res.status(404).json({ message: "User not found." });

      if (!user.favorites.includes(movieId)) {
        user.favorites.push(movieId);
        await user.save();
      }

      res.status(200).json(user.favorites);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  // Remove favorite movie
  removeFavorite: async (req: any, res: any) => {
    try {
      const { movieId } = req.body;
      const user = await User.findById(req.params.id);

      if (!user) return res.status(404).json({ message: "User not found." });

      user.favorites = user.favorites.filter((id) => id.toString() !== movieId);
      await user.save();

      res.status(200).json(user.favorites);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },
};

export default UserController;
