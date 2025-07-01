# Portfolio Website - Data Science & Analytics

Website portfolio open source untuk menampilkan proyek data science, Power BI, dan analytics dengan desain modern dan interaktif.

## ✨ Fitur Utama

- **Responsive Design** - Tampilan optimal di desktop, tablet, dan mobile
- **Dark/Light Mode** - Toggle antara tema gelap dan terang
- **Project Showcase** - Galeri proyek data science dan Power BI
- **About Section** - Profil dan keahlian profesional
- **Contact Form** - Form kontak yang mudah digunakan
- **Modern UI** - Interface yang clean dan profesional

## 🚀 Teknologi

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Express.js + Node.js  
- **Routing**: Wouter untuk client-side routing
- **State Management**: TanStack Query
- **Icons**: Lucide React
- **Storage**: In-memory storage (dapat diganti dengan database)

## 📦 Instalasi

1. Clone repository ini
```bash
git clone <repository-url>
cd portfolio-website
```

2. Install dependencies
```bash
npm install
```

3. Jalankan development server
```bash
npm run dev
```

4. Buka browser ke `http://localhost:3000`

## 🏗️ Struktur Proyek

```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Komponen React
│   │   ├── pages/         # Pages/halaman utama
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities dan helpers
├── server/                # Backend Express server
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage layer
├── shared/               # Shared types dan schemas
└── run.js               # Main application runner
```

## 🎨 Kustomisasi

### Mengubah Data Portfolio

Edit file `server/storage.ts` untuk mengupdate:
- Informasi profil pribadi
- Daftar proyek dan portfolio
- Kategori keahlian
- Data kontak

### Styling dan Tema

- Warna tema: `client/src/index.css`
- Komponen UI: `client/src/components/`
- Layout responsive: Tailwind CSS classes

### Menambah Halaman Baru

1. Buat file baru di `client/src/pages/`
2. Register route di `client/src/App.tsx`
3. Tambahkan link navigasi di `client/src/components/Navigation.tsx`

## 📊 API Endpoints

- `GET /api/profile` - Data profil user
- `GET /api/projects` - Daftar semua proyek
- `GET /api/projects/:id` - Detail proyek tertentu
- `GET /api/skills` - Kategori keahlian

## 🚀 Deployment

### Replit Deployment

1. Push kode ke Replit
2. Klik tombol "Deploy" 
3. Pilih Static/Web Deployment
4. Deploy otomatis tersedia di `.replit.app` domain

### Manual Deployment

1. Build aplikasi: `npm run build`
2. Deploy ke hosting pilihan (Vercel, Netlify, Heroku)
3. Set environment variables jika diperlukan

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 Lisensi

Proyek ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail.

## 🆘 Support

Jika mengalami masalah atau memiliki pertanyaan:

1. Cek dokumentasi di file `replit.md`
2. Buat issue di repository
3. Hubungi melalui contact form di website

---

⭐ **Star repo ini jika bermanfaat!** ⭐