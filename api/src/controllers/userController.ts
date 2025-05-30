import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/UserModel";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const UserController = {
  // Register
  registerUser: async (req: any, res: any) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "User already exists." });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });

      console.log("USER REGISTERD");

      const { password: _, ...safeUser } = newUser.toObject();

      res
        .status(201)
        .json({ message: "User created successfully.", user: safeUser, token });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  // Login
  loginUser: async (req: any, res: any) => {
    try {
      const { email, password } = req.body;

      console.log(req.body);
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials." });

      console.log("USER: ", user);

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });

      res.status(200).json({
        message: "Login successful.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          reviews: user.reviews,
          bookings: user.bookings,
          watchlist: user.watchlist,
          favorites: user.favorites,
        },
        token,
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
      const { name, email } = req.body;

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, email },
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

  // Book ticket movie
  bookTicket: async (req: any, res: any) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) return res.status(404).json({ message: "User not found" });

      const { movieDetails, bookingDetails } = req.body;

      const { date, seats, price, screen, theaterName, location } =
        bookingDetails;

      if (!date || !seats || !price || !theaterName) {
        return res.status(400).json({ message: "Missing booking details." });
      }

      const newBooking = {
        movieId: movieDetails.id,
        showtimeId: new mongoose.Types.ObjectId(),
        theaterName,
        seats,
        totalPrice: price,
        bookingDate: new Date(),
      };

      user.bookings.push(newBooking);
      await user.save();

      res.status(200).json({
        message: "Booking successful",
        booking: {
          movieDetails,
          bookingDetails,
        },
      });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  // Delete all users
  deleteAllUsers: async (_: Request, res: Response) => {
    try {
      await User.deleteMany({});
      res.status(200).json({ message: "All users deleted successfully." });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },
};

export default UserController;
