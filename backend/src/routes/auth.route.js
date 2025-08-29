import express from "express";
import {
  login,
  logout,
  signup,
  onboard,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);
router.post("/onboard", protectRoute, onboard);
router.get("/me", protectRoute, async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

export default router;
