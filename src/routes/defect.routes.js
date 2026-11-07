import { Router } from "express";
import {
  deleteDefect,
  updateLocation,
  updateTarget,
} from "../controllers/defect.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();
router.put("/:id/target", authenticate, updateTarget);
router.put("/:id/location", authenticate, updateLocation);
router.put("/:id/delete", authenticate, deleteDefect);
export default router;
