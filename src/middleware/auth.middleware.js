import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const normalizeRuas = (ruas) => {
  if (Array.isArray(ruas))
    return ruas.filter((item) => typeof item === "string" && item.trim());
  if (!ruas) return [];
  try {
    const parsed = JSON.parse(ruas);
    if (Array.isArray(parsed))
      return parsed.filter((item) => typeof item === "string" && item.trim());
  } catch (error) {
    // Mendukung token lama yang menyimpan satu nama ruas sebagai teks.
  }
  return typeof ruas === "string" && ruas.trim() ? [ruas.trim()] : [];
};

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Token authentication tidak ditemukan",
        });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = {
      id: decoded.sub,
      username: decoded.username,
      role: decoded.role,
      ruas: normalizeRuas(decoded.ruas),
    };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        success: false,
        message: "Token tidak valid atau sudah kedaluwarsa",
      });
  }
};

// Middleware khusus admin
export const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Anda tidak memiliki hak akses",
    });
  }

  next();
};
