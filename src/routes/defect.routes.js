import { Router } from "express";
import {
  deleteDefect,
  updateLocation,
  updateTarget,
} from "../controllers/defect.controller.js";

const router = Router();

router.put("/:id/target", updateTarget);
router.put("/:id/location", updateLocation);
router.put("/:id", deleteDefect);

export default router;
