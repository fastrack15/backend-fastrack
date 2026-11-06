import pool from "../config/db.js";

// Mengembalikan baris yang diperbarui, atau undefined bila data_id tidak ada.
export async function updateDefectTarget(
  dataId,
  {
    target,
    keterangan,
    status,
    lingkup,
    sublingkup,
    sta,
    bangunan,
    temuan,
    rekomendasi,
    lajur,
  },
) {
  const result = await pool.query(
    `
    UPDATE public.table_data
    SET
      target = NULLIF($2, '')::DATE,
      keterangan = $3,
      status = $4,
      lingkup = $5,
      sublingkup = $6,
      sta = $7,
      jenis_bangunan = $8,
      temuan = $9,
      rekomendasi = $10,
      lajur = $11

    WHERE data_id = $1
    RETURNING data_id, target, keterangan, status, lingkup, sublingkup, sta, jenis_bangunan, temuan, rekomendasi, lajur
    `,
    [
      dataId,
      target || null,
      keterangan ?? "",
      status ?? "",
      lingkup ?? "",
      sublingkup ?? "",
      sta ?? "",
      bangunan ?? "",
      temuan ?? "",
      rekomendasi ?? "",
      lajur ?? "",
    ],
  );

  return result.rows[0];
}

// Mengembalikan baris yang diperbarui, atau undefined bila data_id tidak ada.
export async function updateDefectLocation(dataId, latitude, longitude) {
  const result = await pool.query(
    `
    UPDATE public.table_data
    SET
      latitude = $1,
      longitude = $2,
      location_pending = FALSE
    WHERE data_id = $3
    RETURNING data_id, latitude, longitude, location_pending
    `,
    [latitude, longitude, dataId],
  );

  return result.rows[0];
}

// Temporary Delete
export async function softDeleteDefect(dataId) {
  const result = await pool.query(
    `
    UPDATE public.table_data
    SET delete_data = 1
    WHERE data_id = $1
      AND delete_data = 0
    RETURNING data_id, delete_data
    `,
    [dataId],
  );

  return result.rows[0];
}
