import "dotenv/config";

// Satu-satunya tempat membaca process.env. Modul lain cukup import `env`.
export const env = {
  port: process.env.PORT || 3000,

  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },

  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",

  // Folder foto yang disajikan langsung sebagai file statis.
  uploadsDir: process.env.UPLOADS_DIR || "/opt/n8n/uploads",

  // Server foto yang di-proxy ketika file tidak ada di uploadsDir.
  photoServerUrl: process.env.PHOTO_SERVER_URL || "http://127.0.0.1:8765",
};
