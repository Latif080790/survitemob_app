# Blueprint Aplikasi: Site Manager Dashboard

## 1. Ringkasan & Tujuan

Aplikasi ini adalah **Dasbor Manajemen Proyek Konstruksi** yang berfokus pada alur kerja *mobile-first*. Tujuannya adalah untuk memberdayakan manajer situs (site managers) dan pekerja lapangan untuk melacak, memperbarui, dan mendokumentasikan kemajuan pekerjaan konstruksi secara *real-time* langsung dari perangkat seluler mereka.

**Tujuan Utama:**
- **Efisiensi Pelacakan:** Menggantikan metode pelacakan manual (kertas/spreadsheet) dengan alur kerja digital yang terpusat.
- **Dokumentasi Visual:** Menyediakan bukti visual (foto sebelum & sesudah) untuk setiap pekerjaan.
- **Kolaborasi Cepat:** Memfasilitasi komunikasi dan anotasi pada masalah yang ditemukan di lapangan.
- **Transparansi Progres:** Memberikan gambaran progres keseluruhan proyek secara instan.

## 2. Fitur & Kemampuan (Versi Saat Ini - Frontend Only)

### 2.1. Dasbor Utama
- **Header Progres:** Menampilkan ringkasan progres proyek dalam bentuk persentase, beserta jumlah tugas yang sudah selesai.
- **Navigasi Utama:** Bar navigasi bawah untuk berpindah antar menu utama (Home, Tasks, Issues, Profile) dengan ikon yang jelas.

### 2.2. Manajemen Pekerjaan (Tasks)
- **Daftar Tugas (Task List):** Menampilkan semua pekerjaan dalam bentuk kartu (cards) yang informatif.
- **Filter Status:** Pengguna dapat memfilter tugas berdasarkan status: `All`, `Pending`, `On Progress`, `Done`.
- **Tambah Tugas Baru:** Modal untuk menambahkan pekerjaan baru dengan input untuk nama pekerjaan, lokasi, dan penanggung jawab (PIC).

### 2.3. Detail & Update Pekerjaan
- **Modal Detail Tugas:** Tampilan detail saat sebuah tugas dipilih, berisi informasi lengkap.
- **Visualisasi Sebelum & Sesudah:** Menampilkan slot untuk foto "Kondisi Awal" dan "Hasil Kerja".
- **Simulasi Upload:** Tombol untuk mensimulasikan proses upload foto "Hasil Kerja", yang akan mengubah status tugas menjadi `Done`.
- **Catatan Lapangan:** Area teks untuk menambahkan catatan atau kendala yang ditemukan.

### 2.4. Fitur Interaktif
- **Anotasi Foto:** Kemampuan untuk membuka foto dan menambahkan coretan (anotasi) langsung di atas gambar untuk menandai area spesifik (misalnya, defect atau revisi).
- **Denah Lantai 2D (Floor Plan):** Kemampuan untuk melihat lokasi tugas pada sebuah denah (blueprint) interaktif.

## 3. Desain & UX

- **Gaya Visual:** Modern, bersih, dan premium dengan penekanan pada hirarki visual yang jelas.
- **Palet Warna:** Dominan warna netral (slate) dengan aksen warna yang memiliki makna (merah untuk *pending*, kuning untuk *progress*, hijau untuk *done*, biru untuk *aksi primer*).
- **Interaktivitas:** Penuh dengan transisi halus, animasi, dan umpan balik mikro (seperti `scale` pada tombol) untuk memberikan pengalaman pengguna yang responsif.
- **Ikonografi:** Menggunakan `lucide-react` untuk ikon yang tajam, konsisten, dan mudah dipahami.

## 4. Arsitektur Teknis (Versi Saat Ini)

- **Framework:** React `19.2.0`
- **Build Tool:** Vite `7.3.1`
- **Styling:** Tailwind CSS `4.2.1`
- **State Management:** State lokal React (`useState`, `useMemo`).
- **Backend:** **Tidak ada.** Aplikasi saat ini berjalan sepenuhnya di sisi klien dengan data mock.

## 5. Rencana Pengembangan (Langkah Berikutnya)

### 5.1. Refaktorisasi Frontend (Prioritas #1)
- **Tujuan:** Memecah komponen `App.jsx` yang terlalu besar menjadi komponen-komponen yang lebih kecil dan dapat dikelola.
- **Langkah-langkah:**
    1.  Buat struktur folder `src/components`, `src/features`, `src/hooks`.
    2.  Pindahkan logika UI ke komponen-komponen terpisah: `Header.jsx`, `TaskList.jsx`, `TaskDetailModal.jsx`, `AddTaskModal.jsx`, `AnnotationCanvas.jsx`, `FloorPlanModal.jsx`.
    3.  Ekstrak logika state manajemen tugas ke dalam custom hook `useTasks.js`.

### 5.2. Integrasi Backend dengan Firebase (Prioritas #2)
- **Tujuan:** Mengubah aplikasi menjadi aplikasi *full-stack* yang dapat menyimpan data secara persisten dan mendukung banyak pengguna.
- **Langkah-langkah:**
    1.  **Setup Firebase:** Konfigurasi proyek Firebase baru.
    2.  **Otentikasi:** Implementasikan Firebase Authentication untuk login pengguna.
    3.  **Database:** Ganti state lokal dengan **Firestore** untuk menyimpan data tasks, projects, dan users.
    4.  **Storage:** Gunakan **Firebase Storage** untuk meng-handle upload gambar (foto sebelum/sesudah) dan anotasi.

### 5.3. Fitur Tambahan (Masa Depan)
- **Manajemen Isu (Issues):** Halaman khusus untuk melaporkan dan melacak masalah di luar daftar pekerjaan utama.
- **Notifikasi Real-time:** Notifikasi push saat ada update atau tugas baru.
- **Mode Offline:** Kemampuan untuk menggunakan aplikasi saat koneksi internet tidak stabil dan sinkronisasi saat kembali online.
- **Dashboard Web Admin:** Versi desktop yang lebih komprehensif untuk manajer proyek.
