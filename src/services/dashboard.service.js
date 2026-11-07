import pool from "../config/db.js";

export async function getAllDefects(user) {
  const isAdmin = user?.role === "admin";
  const userRuas = Array.isArray(user?.ruas) ? user.ruas : [];

  const result = await pool.query(
    `SELECT da.*,
      de.path AS path_defect,
      prg.path AS path_progress,
      prb.path AS path_perbaikan,
      de.created_at AS created_defect,
      prg.created_at AS created_progress,
      prb.created_at AS created_perbaikan,
      de.nama AS nama_defect,
      prg.nama AS nama_progress,
      prb.nama AS nama_perbaikan,
      eve.kegiatan,
      eve.ruas
    FROM public.table_data AS da
    LEFT JOIN public.table_defect AS de ON de.id = da.photo_defect
    LEFT JOIN public.table_progress AS prg ON prg.id = da.photo_progress
    LEFT JOIN public.table_perbaikan AS prb ON prb.id = da.photo_perbaikan
    LEFT JOIN public.table_event AS eve ON eve.secret_id = da.event_id
    WHERE da.delete_data = 0
      AND ($1::boolean = TRUE OR eve.ruas = ANY($2::text[]))`,
    [isAdmin, userRuas],
  );

  return result.rows;
}
