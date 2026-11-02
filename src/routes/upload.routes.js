import { Router } from "express";
import { proxyPhoto } from "../controllers/upload.controller.js";

const router = Router();

router.get("/*path", proxyPhoto);

export default router;
