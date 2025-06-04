"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", authRoutes_1.default);
app.use("/api/movies", movieRoutes_1.default);
app.use("/api/user", user_route_1.default);
// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    throw new Error("❌ MongoDB URI is not defined in environment variables");
}
mongoose_1.default
    .connect(mongoUri)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((error) => console.log("❌ MongoDB Connection Error:", error));
// API Routes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
