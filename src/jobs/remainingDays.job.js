import pool from "../config/db.js";
import { getRemainingDayValue } from "../utils/remainingDay.js";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export async function updateRemainingDays() {
  try {
    const result = await pool.query(`
      SELECT
        da.data_id,
        da.target,
        da.photo_perbaikan,
        da.remaining_day,
        prb.created_at AS created_perbaikan
      FROM public.table_data AS da
      LEFT JOIN public.table_perbaikan AS prb
        ON prb.id = da.photo_perbaikan
      WHERE da.target IS NOT NULL
    `);

    for (const row of result.rows) {
      const remainingDay = getRemainingDayValue(
        row.target,
        row.created_perbaikan,
      );

      // Target tidak valid: jangan mengubah nilai database.
      if (remainingDay === null) continue;

      // Jika perbaikan sudah ada dan nilai final sudah tersimpan,
      // jangan hitung atau ubah lagi.
      if (
        row.created_perbaikan &&
        row.remaining_day !== null &&
        row.remaining_day !== undefined
      ) {
        continue;
      }

      // Hindari UPDATE jika nilainya belum berubah.
      if (row.remaining_day === remainingDay) continue;

      await pool.query(
        `UPDATE public.table_data
         SET remaining_day = $1
         WHERE data_id = $2`,
        [remainingDay, row.data_id],
      );
    }

    console.log(
      `[remaining_day] Pemeriksaan selesai: ${result.rowCount} data diperiksa.`,
    );
  } catch (error) {
    console.error("[remaining_day] Gagal memperbarui data:", error.message);
  }
}

// Jalankan sekali saat backend mulai, lalu ulangi setiap 24 jam.
export function startRemainingDaysJob() {
  updateRemainingDays();
  return setInterval(updateRemainingDays, ONE_DAY_MS);
}
