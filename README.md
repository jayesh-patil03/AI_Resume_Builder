# AI Resume Builder

AI-powered resume builder built with the MERN stack.  
Create, edit, enhance, preview, download, and share professional resumes with AI assistance.

## 🌐 Live Demo

Frontend: https://ai-resume-builder-pi-ten.vercel.app/  
Repository: https://github.com/jayesh-patil03/AI_Resume_Builder.git

---

## 🚀 Features

- JWT-based Authentication
- Create multiple resumes per user
- Edit resume sections individually
- AI-powered content enhancement (Gemini API)
- Live preview
- Download resume
- Public shareable resume link
- Protected API routes
- Responsive design

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Redux Toolkit
- Tailwind CSS
- React Router
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt

**AI**
- Google Gemini API (`gemini-3-flash-preview`)

**Deployment**
- Frontend → Vercel
- Backend → Render

---

## 📂 Project Structure

```
AI_Resume_Builder/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── configs/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
│
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/jayesh-patil03/AI_Resume_Builder.git
cd AI_Resume_Builder
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file inside `server/`:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

Create `.env` inside `client/`:

```
VITE_BASE_URL=http://localhost:3000
```

Run frontend:

```bash
npm run dev
```

---

## 🔐 Authentication

- Passwords hashed using bcrypt
- JWT token stored in localStorage
- Protected routes using middleware
- Auto-login with token validation

---


Jayesh Patil  
LinkedIn: http://www.linkedin.com/in/jayesh-patil2512  
Email: jayeshpat9422@gamil.com  
