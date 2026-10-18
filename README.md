# Battle Tense

Game duel kesatria pixel untuk latihan Simple Present Tense (SMP). Dua kelompok bertarung di dua perangkat, guru menonton di layar ketiga. Berjalan di browser HP maupun laptop, tanpa login.

## Struktur
- `index.html` : kerangka halaman (layar masuk dan layar permainan)
- `css/style.css` : seluruh tampilan (tema pixel, arena, kartu soal)
- `js/questions.js` : bank soal (42 soal). Tambah atau ubah soal di sini
- `js/net.js` : koneksi antar perangkat (MQTT lewat broker publik gratis)
- `js/app.js` : logika game dan animasi

## Cara main
1. Guru membuka situs, tekan "Buat game", lalu tampilkan layar ke proyektor. Muncul kode 4 karakter.
2. Kelompok A dan B membuka situs yang sama di perangkat masing-masing, masukkan kode, pilih Kelompok A atau B.
3. Guru tekan "Mulai pertarungan". Yang menjawab benar lebih dulu menyerang. Damage: mudah 5%, sedang 10%, sulit 20%. Jawaban salah mengunci kelompok itu di soal tersebut. HP lawan habis, kelompok menang.

Layar guru adalah pengatur permainan, jadi jangan tutup halamannya selama pertandingan.

## Deploy ke GitHub Pages
1. Buat repository baru di GitHub (public), misalnya `battle-tense`.
2. Upload semua isi folder ini (`index.html`, `css`, `js`, `README.md`) ke repository, atau lewat terminal:

       git init
       git add .
       git commit -m "Battle Tense"
       git branch -M main
       git remote add origin https://github.com/USERNAME/battle-tense.git
       git push -u origin main

3. Di GitHub: Settings, Pages, pada "Build and deployment" pilih Source "Deploy from a branch", Branch `main`, folder `/ (root)`, lalu Save.
4. Tunggu 1 sampai 2 menit. Situs aktif di `https://USERNAME.github.io/battle-tense/`. Bagikan alamat itu ke murid.

## Menambah soal
Di `js/questions.js`, tambahkan baris seperti ini. Isi pertama di `o` harus jawaban benar (urutan pilihan diacak otomatis):

    {d:'m', q:'She ___ to school.', o:['goes','go','going','gone'], ex:'Penjelasan singkat.'}

Kesulitan `d`: `e` = 5%, `m` = 10%, `h` = 20% (diatur di `DMG` pada `js/app.js`).

## Catatan koneksi
`js/net.js` memakai broker MQTT publik (HiveMQ, cadangan test.mosquitto.org). Gratis dan tanpa akun, tetapi bersifat publik dan tanpa jaminan layanan. Data yang lewat hanya kode game, nama kelompok, jawaban, dan HP. Kalau ingin lebih stabil, ganti ke broker sendiri dengan mengubah daftar `BROKERS` di `js/net.js`.
