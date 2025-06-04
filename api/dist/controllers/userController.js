"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserController = {
    // Register
    registerUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            const existingUser = yield UserModel_1.default.findOne({ email });
            if (existingUser)
                return res.status(400).json({ message: "User already exists." });
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newUser = new UserModel_1.default({ name, email, password: hashedPassword });
            yield newUser.save();
            const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            console.log("USER REGISTERD");
            const _a = newUser.toObject(), { password: _ } = _a, safeUser = __rest(_a, ["password"]);
            res
                .status(201)
                .json({ message: "User created successfully.", user: safeUser, token });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }),
    // Login
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            console.log(req.body);
            const user = yield UserModel_1.default.findOne({ email });
            if (!user)
                return res.status(404).json({ message: "User not found." });
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                return res.status(401).json({ message: "Invalid credentials." });
            console.log("USER: ", user);
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            res.status(200).json({
                message: "Login successful.",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    reviews: user.reviews,
                    bookings: user.bookings,
                    watchlist: user.watchlist,
                    favorites: user.favorites,
                },
                token,
            });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }),
    // Get all users
    getAllUsers: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield UserModel_1.default.find().select("-password");
            res.status(200).json(users);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }),
    // Get user by ID
    getUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield UserModel_1.default.findById(req.params.id).select("-password");
            if (!user)
                return res.status(404).json({ message: "User not found." });
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }),
    // Update user
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, currentPassword, newPassword, confirmNewPassword } = req.body;
            const { id } = req.params;
            const currentUser = yield UserModel_1.default.findById(id);
            if (!currentUser)
                return res.status(404).json({ message: "User not found." });
            // Changing password
            // Check if current password
            if (currentPassword || newPassword || confirmNewPassword) {
                const isMatch = yield bcryptjs_1.default.compare(currentPassword, currentUser.password);
                if (!isMatch) {
                    return res
                        .status(400)
                        .json({ message: "Current password is incorrect." });
                }
                if (newPassword !== confirmNewPassword) {
                    return res
                        .status(400)
                        .json({ message: "New passwords do not match" });
                }
                currentUser.password = yield bcryptjs_1.default.hash(newPassword, 10);
            }
            if (name)
                currentUser.name = name;
            if (email)
                currentUser.email = email;
            yield currentUser.save();
            const _a = currentUser.toObject(), { password: _ } = _a, safeUser = __rest(_a, ["password"]);
            res
                .status(200)
                .json({ message: "User updated successfully", user: safeUser });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }),
    // Add favorite movie
    addFavorite: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { movieData } = req.body;
            const user = yield UserModel_1.default.findById(req.params.id);
            if (!user)
                return res.status(404).json({ message: "User not found." });
            const movieAlreadyInFavorites = user.favorites.some((favMovie) => favMovie._id === movieData._id);
            if (!movieAlreadyInFavorites) {
                user.favorites.push(movieData);
                yield user.save();
            }
            else {
                throw new Error("Movie is already in the favorites.");
            }
            res.status(200).json({
                message: "Added to Favorites!",
                favorites: user.favorites,
                user,
            });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }),
    // Remove favorite movie
    removeFavorite: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { movieId } = req.body;
            const { id } = req.params;
            const updatedUser = yield UserModel_1.default.findByIdAndUpdate(id, { $pull: { favorites: { _id: movieId } } }, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({
                message: "Movie removed from favorites",
                favorites: updatedUser.favorites,
                user: updatedUser,
            });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }),
    // Book ticket movie
    bookTicket: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield UserModel_1.default.findById(req.params.id);
            if (!user)
                return res.status(404).json({ message: "User not found" });
            const { movieDetails, bookingDetails } = req.body;
            const { date, seats, price, screen, theaterName, location, paymentMethod, } = bookingDetails;
            if (!date || !seats || !price || !theaterName) {
                return res.status(400).json({ message: "Missing booking details." });
            }
            const showtimeId = `${movieDetails.id}-${theaterName.replace(/\s+/g, "")}-${location.replace(/\s+/g, "")}-${screen}-${date.day.month}-${date.day.day}-${date.time.replace(/\s+/g, "")}`;
            const newBooking = {
                movieDetails: movieDetails,
                showtimeId: showtimeId,
                location,
                theaterName,
                seats,
                totalPrice: price,
                bookingDate: new Date(),
                paymentMethod: paymentMethod,
            };
            user.bookings.push(newBooking);
            yield user.save();
            res.status(200).json({
                message: "Booking successful",
                booking: {
                    movieDetails,
                    bookingDetails,
                },
                user,
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    // Get seats taken
    getTakenSeats: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { showtimeId } = req.params;
        try {
            // Fetch only the bookings field to reduce memory
            const users = yield UserModel_1.default.find({}, "bookings");
            let takenSeats = [];
            users.forEach((user) => {
                user.bookings.forEach((booking) => {
                    if (booking.showtimeId === showtimeId) {
                        takenSeats.push(...booking.seats);
                    }
                });
            });
            return res.status(200).json({ takenSeats });
        }
        catch (error) {
            console.error("Error fetching taken seats:", error);
            return res.status(500).json({ error: "Failed to fetch taken seats." });
        }
    }),
    // Add Watchlist
    addWatchlist: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { movieData } = req.body;
            const user = yield UserModel_1.default.findById(req.params.id);
            if (!user)
                return res.status(404).json({ message: "User not found." });
            const movieAlreadyInWatchlist = user.watchlist.some((favMovie) => favMovie._id === movieData._id);
            if (!movieAlreadyInWatchlist) {
                user.watchlist.push(movieData);
                yield user.save();
            }
            else {
                throw new Error("Movie is already in the watchlists.");
            }
            res.status(200).json({
                message: "Added to Favorites!",
                watchlist: user.watchlist,
                user,
            });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }),
    // Remove favorite movie
    removeWatchlist: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { movieId } = req.body;
            const { id } = req.params;
            const updatedUser = yield UserModel_1.default.findByIdAndUpdate(id, { $pull: { watchlist: { _id: movieId } } }, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({
                message: "Movie removed from favorites",
                watchlist: updatedUser.watchlist,
                user: updatedUser,
            });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }),
    // Delete all users
    deleteAllUsers: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield UserModel_1.default.deleteMany({});
            res.status(200).json({ message: "All users deleted successfully." });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }),
};
exports.default = UserController;
