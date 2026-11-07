import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { env } from "../config/env.js";

const normalizeRuas = (ruas) => {
  if (!ruas) return [];

  try {
    const parsed = JSON.parse(ruas);
    if (Array.isArray(parsed)) return parsed;
  } catch (error) {
    // Jika bukan JSON, anggap sebagai satu nama ruas.
  }
  return typeof ruas === "string" && ruas.trim() ? [ruas.trim()] : [];
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username dan password wajib diisi",
      });
    }

    if (!env.jwtSecret) {
      throw new Error("JWT_SECRET belum dikonfigurasi");
    }

    const result = await pool.query(
      `SELECT id, username, fullname, password, role, ruas
       FROM table_user
       WHERE username = $1
       LIMIT 1`,
      [username.trim()],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    const user = result.rows[0];
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    const userRuas = normalizeRuas(user.ruas);
    const token = jwt.sign(
      {
        sub: user.id,
        username: user.username,
        role: user.role,
        ruas: userRuas,
      },
      env.jwtSecret,
      {
        expiresIn: env.jwtExpiresIn,
      },
    );

    return res.json({
      success: true,
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        ruas: userRuas,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};
