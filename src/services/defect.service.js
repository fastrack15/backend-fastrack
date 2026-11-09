import pool from "../config/db.js";

const accessParams = (user) => [
  user?.role === "superadmin",
  Array.isArray(user?.ruas) ? user.ruas : [],
];

export async function updateDefectTarget(dataId, body, user) {
  const result = await pool.query(
    `UPDATE public.table_data AS da
    SET target = NULLIF($2, '')::DATE,
      keterangan = $3,
      status = $4,
      lingkup = $5,
      sublingkup = $6,
      sta = $7,
      jenis_bangunan = $8,
      temuan = $9,
      rekomendasi = $10,
      lajur = $11
    FROM public.table_event AS eve
    WHERE da.data_id = $1
      AND eve.secret_id = da.event_id
      AND ($12::boolean = TRUE OR eve.ruas = ANY($13::text[]))
    RETURNING da.data_id, da.target, da.keterangan, da.status, da.lingkup,
      da.sublingkup, da.sta, da.jenis_bangunan, da.temuan, da.rekomendasi, da.lajur`,
    [
      dataId,
      body.target || null,
      body.keterangan ?? "",
      body.status ?? "",
      body.lingkup ?? "",
      body.sublingkup ?? "",
      body.sta ?? "",
      body.bangunan ?? "",
      body.temuan ?? "",
      body.rekomendasi ?? "",
      body.lajur ?? "",
      ...accessParams(user),
    ],
  );
  return result.rows[0];
}

export async function updateDefectLocation(dataId, latitude, longitude, user) {
  const result = await pool.query(
    `UPDATE public.table_data AS da
    SET latitude = $1, longitude = $2, location_pending = FALSE
    FROM public.table_event AS eve
    WHERE da.data_id = $3
      AND eve.secret_id = da.event_id
      AND ($4::boolean = TRUE OR eve.ruas = ANY($5::text[]))
    RETURNING da.data_id, da.latitude, da.longitude, da.location_pending`,
    [latitude, longitude, dataId, ...accessParams(user)],
  );
  return result.rows[0];
}

export async function softDeleteDefect(dataId, user) {
  const result = await pool.query(
    `UPDATE public.table_data AS da
    SET delete_data = 1
    FROM public.table_event AS eve
    WHERE da.data_id = $1
      AND da.delete_data = 0
      AND eve.secret_id = da.event_id
      AND ($2::boolean = TRUE OR eve.ruas = ANY($3::text[]))
    RETURNING da.data_id, da.delete_data`,
    [dataId, ...accessParams(user)],
  );
  return result.rows[0];
}
