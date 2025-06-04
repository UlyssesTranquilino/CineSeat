import express, { Request, Response } from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt";
import User from "../models/UserModel";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login?error=google_auth_failed",
  }),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.user as any;

      if (!user) {
        res.redirect("http://localhost:5173/");
        return;
      }

      const fullUser = await User.findById(user._id).lean();
      if (!fullUser) {
        res.redirect("http://localhost:5173/");
        return;
      }

      const token = generateToken(fullUser._id.toString());
      const { password, ...safeUser } = fullUser;

      // Encode user data for URL
      const encodedUser = encodeURIComponent(JSON.stringify(safeUser));

      // Redirect with token and user data in URL
      res.redirect(
        `https://localhost:5173/auth/google/callback?token=${token}&user=${encodedUser}`
      );
    } catch (error) {
      console.error("Error during Google authentication:", error);
      res.redirect("https://localhost:5173/login?error=auth_error");
    }
  }
);

router;

export default router;
