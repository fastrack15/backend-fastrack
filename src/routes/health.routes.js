import { Router } from "express";
import { dbHealth } from "../controllers/health.controller.js";

const router = Router();

router.get("/db", dbHealth);

export default router;
