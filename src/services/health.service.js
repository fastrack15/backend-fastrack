import pool from "../config/db.js";

export async function checkDatabase() {
  const result = await pool.query(`
    SELECT
      current_database() AS database,
      NOW() AS server_time
  `);

  return result.rows[0];
}
