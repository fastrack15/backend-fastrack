import {
  updateDefectLocation,
  updateDefectTarget,
} from "../services/defect.service.js";
import {
  validateLocationPayload,
  validateTargetPayload,
} from "../validators/defect.validator.js";

const fail = (res, status, message) =>
  res.status(status).json({ success: false, message });

export async function updateTarget(req, res) {
  const dataId = String(req.params.id ?? "").trim();

  if (!dataId) return fail(res, 400, "ID data defect tidak valid.");

  const validationError = validateTargetPayload(req.body);
  if (validationError) return fail(res, 400, validationError);

  try {
    const row = await updateDefectTarget(dataId, req.body);

    if (!row) return fail(res, 404, "Data defect tidak ditemukan.");

    return res.status(200).json({
      success: true,
      message: "Data berhasil diperbarui.",
      data: row,
    });
  } catch (error) {
    console.error("Gagal memperbarui target defect:", error);
    return fail(res, 500, "Terjadi kesalahan saat memperbarui data.");
  }
}

export async function updateLocation(req, res) {
  const dataId = String(req.params.id ?? "").trim();

  if (!dataId) return fail(res, 400, "data_id wajib diisi.");

  const { error, latitude, longitude } = validateLocationPayload(req.body);
  if (error) return fail(res, 400, error);

  try {
    const row = await updateDefectLocation(dataId, latitude, longitude);

    if (!row) return fail(res, 404, "Data defect tidak ditemukan.");

    return res.status(200).json({
      success: true,
      message: "Lokasi defect berhasil diperbarui.",
      data: row,
    });
  } catch (err) {
    console.error("Gagal memperbarui lokasi defect:", err);
    return fail(res, 500, "Terjadi kesalahan saat menyimpan lokasi defect.");
  }
}
