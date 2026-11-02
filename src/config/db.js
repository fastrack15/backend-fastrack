import pg from "pg";
import { env } from "./env.js";

const { Pool, types } = pg;

types.setTypeParser(1082, (value) => value);

const pool = new Pool(env.db);

export default pool;
