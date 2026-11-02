import { Router } from "express";
import { defects } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/defects", defects);

export default router;
