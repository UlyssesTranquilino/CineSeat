"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.post("/register", userController_1.default.registerUser);
router.post("/login", userController_1.default.loginUser);
router.post("/:id/book/ticket", userController_1.default.bookTicket);
router.get("/", userController_1.default.getAllUsers);
router.get("/:id", userController_1.default.getUserById);
router.put("/:id", userController_1.default.updateUser);
// Favorites
router.post("/:id/favorites", userController_1.default.addFavorite);
router.delete("/:id/favorites", userController_1.default.removeFavorite);
// Watchlist
router.post("/:id/watchlists", userController_1.default.addWatchlist);
router.delete("/:id/watchlists", userController_1.default.removeWatchlist);
router.delete("/", userController_1.default.deleteAllUsers);
// Get All User's Booking
router.get("/showtime/:showtimeId/seats", userController_1.default.getTakenSeats);
exports.default = router;
