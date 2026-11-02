function toDateString(value) {
  if (!value) return null;

  // Kolom DATE PostgreSQL biasanya dikembalikan sebagai string.
  if (typeof value === "string") {
    const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : null;
  }

  // Antisipasi jika nilainya berupa objek Date.
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return [
      value.getFullYear(),
      String(value.getMonth() + 1).padStart(2, "0"),
      String(value.getDate()).padStart(2, "0"),
    ].join("-");
  }

  return null;
}

function toDayNumber(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return Math.floor(date.getTime() / 86400000);
}

/**
 * Menghitung teks sisa hari antara target dan tanggal acuan
 * (tanggal perbaikan, atau hari ini bila belum diperbaiki).
 * Mengembalikan null bila tanggal tidak valid.
 */
export function getRemainingDayValue(target, createdPerbaikan) {
  if (!target) return null;

  const targetString = toDateString(target);
  const referenceString = toDateString(createdPerbaikan || new Date());

  if (!targetString || !referenceString) return null;

  const targetDay = toDayNumber(targetString);
  const referenceDay = toDayNumber(referenceString);

  if (targetDay === null || referenceDay === null) return null;

  const difference = targetDay - referenceDay;

  return difference >= 0
    ? `${difference} hari tersisa`
    : `sudah terlewat ${Math.abs(difference)} hari`;
}
