import { Router } from "express";
import { root } from "../controllers/health.controller.js";
import dashboardRoutes from "./dashboard.routes.js";
import defectRoutes from "./defect.routes.js";
import healthRoutes from "./health.routes.js";
import uploadRoutes from "./upload.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router.get("/", root);

router.use("/api/auth", authRoutes);
router.use("/api/health", healthRoutes);
router.use("/api/dashboard", dashboardRoutes);
router.use("/api/defects", defectRoutes);
router.use("/uploads", uploadRoutes);

export default router;
