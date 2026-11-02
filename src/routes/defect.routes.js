import { Router } from "express";
import {
  updateLocation,
  updateTarget,
} from "../controllers/defect.controller.js";

const router = Router();

router.put("/:id/target", updateTarget);
router.put("/:id/location", updateLocation);

export default router;
