"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const movieRouter = express_1.default.Router();
movieRouter.get("/", movieController_1.getMovies);
movieRouter.get("/:id", movieController_1.getMovieById);
exports.default = movieRouter;
