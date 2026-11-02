import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import routes from "./routes/index.js";

const app = express();

// Urutan dipertahankan dari versi lama: file statis dicek lebih dulu,
// bila tidak ada baru jatuh ke route proxy /uploads.
app.use(cors());
app.use("/uploads", express.static(env.uploadsDir));
app.use(express.json());

app.use(routes);

export default app;
