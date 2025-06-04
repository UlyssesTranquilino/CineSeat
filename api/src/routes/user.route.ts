import express from "express";
import UserController from "../controllers/userController";
import User from "../models/UserModel";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/:id/book/ticket", UserController.bookTicket);

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);

router.put("/:id", UserController.updateUser);

// Favorites
router.post("/:id/favorites", UserController.addFavorite);
router.delete("/:id/favorites", UserController.removeFavorite);

// Watchlist
router.post("/:id/watchlists", UserController.addWatchlist);
router.delete("/:id/watchlists", UserController.removeWatchlist);

router.delete("/", UserController.deleteAllUsers);

// Get All User's Booking
router.get("/showtime/:showtimeId/seats", UserController.getTakenSeats);

export default router;
