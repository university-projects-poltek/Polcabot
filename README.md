# Installation Guide

## Prerequisites

Pastikan software berikut telah terinstal:

- Node.js v18+
- npm
- Python 3.10+
- MySQL Server
- Git

---

## 1. Clone Repository

```bash
git clone https://github.com/username/Polcabot.git
cd Polcabot
```

---

## 2. Backend Setup

Masuk ke folder backend.

```bash
cd backend
```

Install dependency.

```bash
npm install
```

Buat file `.env`.

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=polcabot
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_secret
```

Jalankan migration.

```bash
npm run migrate
```

Menjalankan backend.

```bash
npm run dev
```

---

## 3. AI Service Setup

Masuk ke folder AI.

```bash
cd ../AI
```

Buat virtual environment.

```bash
python -m venv venv
```

Aktivasi virtual environment.

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

Install dependency.

```bash
pip install -r requirements.txt
```

Jalankan AI Service.

```bash
python app.py
```

---

## 4. Frontend Setup

Masuk ke folder frontend.

```bash
cd ../frontend
```

Install dependency.

```bash
npm install
```

Jalankan aplikasi.

```bash
npm run dev
```

---

## 5. Open Application

Frontend

```
http://localhost:5173
```

Backend API

```
http://localhost:5000
```

AI Service

```
http://localhost:5001
```
