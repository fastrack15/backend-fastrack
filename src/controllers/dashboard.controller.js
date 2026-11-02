import { getAllDefects } from "../services/dashboard.service.js";

export async function defects(req, res) {
  try {
    return res.json({ success: true, data: await getAllDefects() });
  } catch (error) {
    console.error("Gagal mengambil data defect:", error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data defect",
    });
  }
}
