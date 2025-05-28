import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.post("/:id/favorites", UserController.addFavorite);
router.delete("/:id/favorites", UserController.removeFavorite);
router.delete("/", UserController.deleteAllUsers);
export default router;
