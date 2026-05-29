# Primedev Backend API - 2026

Backend API untuk sistem manajemen perpustakaan. Proyek ini dikembangkan menggunakan **Express.js** sebagai framework web dan **Prisma ORM** untuk interaksi dengan database PostgreSQL. 

## Fitur Utama

- **Autentikasi & Otorisasi** - Menggunakan JWT dengan pembagian role (Admin & User).
- **Manajemen Buku & Kategori** - CRUD lengkap untuk katalog buku dan pengelompokan kategorinya.
- **Manajemen Pengguna** - Pengaturan profil dan data pengguna.
- **Sistem Peminjaman** - Pencatatan peminjaman dan pengembalian buku.
- **Upload File** - Integrasi dengan Cloudinary untuk penyimpanan cover buku.

## Prerequisites

- Node.js (v18 ke atas)
- PostgreSQL
- NPM / Yarn

## 🛠️ Setup Lokal

### 1. Clone Repository & Install Dependencies

```bash
npm install
```

### 2. Konfigurasi Environment

Buat file `.env` di root folder dengan menyalin dari `.env.example`:

```bash
cp .env.example .env
```

Pastikan mengisi credentials kamu. Contoh isi dari environment:

```env
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
JWT_SECRET="secret_key_kamu"
CLOUDINARY_CLOUD_NAME="cloud_name_kamu"
CLOUDINARY_API_KEY="api_key_kamu"
CLOUDINARY_API_SECRET="api_secret_kamu"
```

### 3. Database Migration & Prisma Client

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Menjalankan Server

```bash
# Mode development
npm run dev
```
Server akan aktif di `http://localhost:3000`.

## 📁 Folder Structure

```text
├── configs/         # Konfigurasi aplikasi (Logger, database, dll.)
├── controllers/     # Logika bisnis dan penanganan request
├── generated/       # File auto-generated (seperti Prisma Client)
├── middlewares/     # Custom middleware (Auth, Admin, dll.)
├── prisma/          # Skema database dan seeder
├── routes/          # Definisi endpoint API
├── validations/     # Validasi input data request
└── index.js         # Entry point server
```

## 🔌 API Routes

Berikut adalah daftar endpoint API yang tersedia. Perhatikan label otorisasi pada setiap endpoint:
- **(Auth required)**: Membutuhkan JWT token yang valid.
- **(Admin only)**: Hanya dapat diakses oleh user dengan role Admin.

### Authentication
- `POST /auth/register` - Registrasi pengguna baru
- `POST /auth/login` - Login untuk mendapatkan token

### Books
- `GET /books` - Mendapatkan daftar buku _(Auth required)_
- `GET /books/:id` - Mendapatkan detail buku _(Auth required)_
- `POST /books` - Menambahkan buku baru _(Auth required, Admin only)_
- `PUT /books/:id` - Mengubah data buku _(Auth required, Admin only)_
- `DELETE /books/:id` - Menghapus buku _(Auth required, Admin only)_

### Categories
- `GET /categories` - Mendapatkan semua kategori _(Auth required)_
- `GET /categories/:id` - Mendapatkan detail kategori _(Auth required)_
- `GET /categories/:id/books` - Mendapatkan daftar buku berdasarkan kategori _(Auth required)_
- `POST /categories` - Membuat kategori baru _(Auth required, Admin only)_
- `PUT /categories/:id` - Mengubah kategori _(Auth required, Admin only)_
- `DELETE /categories/:id` - Menghapus kategori _(Auth required, Admin only)_

### Users
- `GET /users` - List semua pengguna _(Auth required, Admin only)_
- `GET /users/:id` - Mendapatkan detail pengguna _(Auth required, Admin only)_
- `GET /users/:id/profile` - Mendapatkan detail pengguna beserta profil _(Auth required, Admin only)_
- `POST /users` - Menambahkan pengguna baru _(Auth required, Admin only)_
- `PUT /users/:id` - Mengubah pengguna _(Auth required, Admin only)_
- `DELETE /users/:id` - Menghapus pengguna _(Auth required, Admin only)_

### Profiles
- `GET /profiles` - List semua profil _(Auth required, Admin only)_
- `GET /profiles/:id` - Mendapatkan detail profil _(Auth required, Admin only)_
- `POST /profiles` - Membuat profil baru _(Auth required, Admin only)_
- `PUT /profiles/:id` - Mengubah profil _(Auth required, Admin only)_
- `DELETE /profiles/:id` - Menghapus profil _(Auth required, Admin only)_

### Borrowings
- `GET /borrowings` - List semua peminjaman _(Auth required, Admin only)_
- `GET /borrowings/:id` - Mendapatkan detail peminjaman _(Auth required, Admin only)_
- `POST /borrowings` - Membuat data peminjaman _(Auth required, Admin only)_
- `PUT /borrowings/:id/return` - Mengembalikan buku yang dipinjam _(Auth required, Admin only)_
- `DELETE /borrowings/:id` - Menghapus catatan peminjaman _(Auth required, Admin only)_

## 👤 Author

Richi Ananta
