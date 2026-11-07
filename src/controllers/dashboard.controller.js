import { getAllDefects } from "../services/dashboard.service.js";

export async function defects(req, res) {
  try {
    const data = await getAllDefects(req.user);
    return res.json({ success: true, data });
  } catch (error) {
    console.error("Gagal mengambil data defect:", error);
    return res
      .status(500)
      .json({ success: false, message: "Gagal mengambil data defect" });
  }
}
