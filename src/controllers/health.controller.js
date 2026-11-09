import { checkDatabase } from "../services/health.service.js";

export function root(req, res) {
  res.json({ message: "Defect Dashboard API berjalan" });
}

export async function dbHealth(req, res) {
  try {
    const row = await checkDatabase();

    res.json({
      success: true,
      message: "Koneksi PostgreSQL berhasil",
    });
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(500).json({
      success: false,
      message: "Koneksi PostgreSQL gagal",
    });
  }
}
