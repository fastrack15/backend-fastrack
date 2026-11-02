# Defect Dashboard API

```
src/
├── server.js        # titik masuk: jalankan job + listen
├── app.js           # susunan middleware & route
├── config/          # env.js (baca .env), db.js (pool PostgreSQL)
├── routes/          # daftar endpoint, tanpa logika
├── controllers/     # baca request -> panggil service -> kirim response
├── services/        # query database
├── validators/      # validasi payload request
├── jobs/            # tugas terjadwal (hitung remaining_day)
└── utils/           # fungsi bantu murni
```

## Menjalankan
```
cp .env.example .env   # lalu isi
npm install
npm run dev
```
