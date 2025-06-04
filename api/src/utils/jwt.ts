import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  throw new Error("SECRET_KEY is not defined!");
}

// Generates JWT Token
export const generateToken = (userId: string) => {
  const payload = { _id: userId };
  const options: jwt.SignOptions = { expiresIn: "24h" };
  return jwt.sign(payload, secretKey, options);
};

// Verify JWT Token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey) as { _id: string };
  } catch (error) {
    console.error("Token verification failed:", error);
    return null; // If token is invalid or expired
  }
};
