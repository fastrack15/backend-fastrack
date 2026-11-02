const isBlank = (value) =>
  value === null || value === undefined || String(value).trim() === "";

const isOptionalString = (value) =>
  value === undefined || value === null || typeof value === "string";

/** Mengembalikan pesan error (string) atau null bila payload valid. */
export function validateTargetPayload(body) {
  const {
    target,
    keterangan,
    status,
    lingkup,
    sublingkup,
    sta,
    jalur,
    bangunan,
    temuan,
    rekomendasi,
    lajur,
  } = body ?? {};

  if (target != null && target !== "" && !/^\d{4}-\d{2}-\d{2}$/.test(target)) {
    return "Target harus berupa tanggal dengan format YYYY-MM-DD.";
  }
  if (!isOptionalString(status)) return "Status harus berupa teks.";
  if (!isOptionalString(sublingkup)) return "Sublingkup harus berupa teks.";
  if (!isOptionalString(lingkup)) return "Lingkup harus berupa teks.";
  if (!isOptionalString(sta)) return "STA harus berupa teks.";
  if (!isOptionalString(jalur)) return "Jalur harus berupa teks.";
  if (!isOptionalString(bangunan)) return "Bangunan harus berupa teks.";
  if (!isOptionalString(temuan)) return "Temuan harus berupa teks.";
  if (!isOptionalString(rekomendasi)) return "Rekomendasi harus berupa teks.";
  if (!isOptionalString(lajur)) return "Lajur harus berupa teks.";

  return null;
}

/**
 * Mengembalikan { error } atau { latitude, longitude } (sudah berupa angka
 * dengan 6 desimal).
 */
export function validateLocationPayload(body) {
  const { latitude, longitude } = body ?? {};

  if (isBlank(latitude) || isBlank(longitude)) {
    return { error: "Latitude dan longitude wajib diisi." };
  }

  const lat = Number(latitude);
  const lng = Number(longitude);

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    return { error: "Koordinat latitude atau longitude tidak valid." };
  }

  return {
    latitude: Number(lat.toFixed(6)),
    longitude: Number(lng.toFixed(6)),
  };
}
