# LZR Courses – React JS

Website e-learning dengan **React + Vite + React Router** sesuai desain UI/UX dark theme + yellow accent.

## Fitur

- **Login / Register** – Kartu kuning sesuai mockup
- **Dashboard** – Stats + welcome (beda user & admin)
- **Courses** – Grid course cards
  - User: tombol Mulai Belajar
  - Admin: + Tambah / Edit / Hapus (localStorage)
- **Course Detail** – Video player + instructor + daftar materi
- Sidebar + Topbar
- Auth dengan Context API + localStorage
- Role-based (email mengandung `admin` → admin)

## Cara Menjalankan

```bash
cd lzr-courses-react
npm install
npm run dev
```

Buka http://localhost:5173

### Login Demo
- User biasa: `user@test.com` / password apa saja
- Admin: `admin@test.com` / password apa saja

## Struktur

```
src/
├── components/
│   ├── Layout.jsx
│   ├── Sidebar.jsx
│   └── Topbar.jsx
├── context/
│   └── AuthContext.jsx
├── data/
│   └── courses.js
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Courses.jsx
│   └── CourseDetail.jsx
├── App.jsx
├── main.jsx
└── index.css          # Dark + Yellow theme
```

## Tech Stack

- React 19
- Vite
- React Router DOM
- CSS Variables (custom dark theme)
