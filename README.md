# OpenTalk

OpenTalk is a modern full-stack blogging platform built with a scalable and developer-friendly tech stack. It provides a fast, responsive, and seamless blogging experience where users can create, publish, and explore blogs efficiently.

---

## 🚀 Tech Stack

### Frontend
- TypeScript
- React.js
- Tailwind CSS

### Backend
- Hono
- Cloudflare Workers

### Database
- PostgreSQL
- Prisma ORM

---

## ✨ Features

- 🔐 User Authentication
- 📝 Create, Edit & Delete Blogs
- 📖 Read Blogs with Clean UI
- ⚡ Fast and Optimized APIs
- ☁️ Edge Deployment using Cloudflare Workers
- 🗄️ PostgreSQL Database Integration
- 🔄 Prisma ORM for Database Management
- 📱 Fully Responsive Design

---

## 📂 Project Structure

```bash
OpenTalk/
│
├── frontend/        # React Frontend
├── backend/         # Hono + Cloudflare Workers Backend
├── prisma/          # Prisma Schema & Migrations
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/opentalk.git
cd opentalk
```

---

## 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_secret_key
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

---

## 🗄️ Prisma Commands

Generate Prisma Client:

```bash
npx prisma generate
```

Run Database Migrations:

```bash
npx prisma migrate dev
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

## ☁️ Cloudflare Workers Deployment

Deploy backend using:

```bash
npm run deploy
```

---

## 📸 Screenshots

Add project screenshots here.

```md
![Home Page](./screenshots/home.png)
```

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📌 Future Improvements

- 💬 Comment System
- ❤️ Like & Bookmark Feature
- 🔎 Search & Filter Blogs
- 🌙 Dark Mode
- 📊 User Dashboard & Analytics

---

## 👨‍💻 Author

Ayush Singh

- Full Stack Developer
- TypeScript Enthusiast
- Cloud & Backend Learner

---

## 📄 License

This project is licensed under the MIT License.
