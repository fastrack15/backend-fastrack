import { Router } from "express";

import {
  deleteDefect,
  updateLocation,
  updateTarget,
} from "../controllers/defect.controller.js";

import { authenticate, authorizeRoles } from "../middleware/auth.middleware.js";

const router = Router();

const canManageDefect = authorizeRoles("superadmin", "admin");

router.put("/:id/target", authenticate, canManageDefect, updateTarget);

router.put("/:id/location", authenticate, canManageDefect, updateLocation);

router.put("/:id/delete", authenticate, canManageDefect, deleteDefect);

export default router;
