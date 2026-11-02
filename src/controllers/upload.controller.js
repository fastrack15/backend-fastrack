import { env } from "../config/env.js";

// Hanya izinkan folder foto yang diperlukan (nama segmen pertama, persis).
const ALLOWED_FOLDERS = new Set(["defects", "progress", "perbaikan"]);

// Segmen path aman: tidak kosong, bukan "." / "..", dan tanpa pemisah path.
function isSafeSegment(segment) {
  return (
    segment !== "" &&
    segment !== "." &&
    segment !== ".." &&
    !segment.includes("/") &&
    !segment.includes("\\") &&
    !segment.includes("\0")
  );
}

// Dipakai ketika file tidak ditemukan di folder statis: ambil dari server foto.
export async function proxyPhoto(req, res) {
  try {
    const segments = Array.isArray(req.params.path)
      ? req.params.path
      : String(req.params.path ?? "").split("/");

    if (
      segments.length < 2 ||
      !ALLOWED_FOLDERS.has(segments[0]) ||
      !segments.every(isSafeSegment)
    ) {
      return res.status(400).json({ message: "Path foto tidak valid" });
    }

    const encodedPath = segments.map(encodeURIComponent).join("/");

    const response = await fetch(`${env.photoServerUrl}/${encodedPath}`);

    if (!response.ok) {
      return res.status(response.status).end();
    }

    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/octet-stream",
    );
    res.setHeader("Cache-Control", "private, max-age=300");

    const imageBuffer = Buffer.from(await response.arrayBuffer());
    return res.send(imageBuffer);
  } catch (error) {
    console.error("Gagal mengambil foto:", error);
    return res
      .status(502)
      .json({ message: "Gagal mengambil foto dari server" });
  }
}
