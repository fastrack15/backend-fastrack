import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", login);

router.get("/me", authenticate, (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
});

export default router;
