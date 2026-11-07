import { Router } from "express";
import { defects } from "../controllers/dashboard.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// Semua endpoint dashboard wajib login
router.get("/defects", authenticate, defects);

export default router;
