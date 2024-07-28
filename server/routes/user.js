import express from "express";
import { login, signup } from "../controllers/auth.js";
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.get("/", getAllUsers);
router.get("/:id", auth, getUserProfile);
router.put("/:id", auth, updateUserProfile);
export default router;
