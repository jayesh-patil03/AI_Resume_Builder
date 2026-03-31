# AI Resume Builder

AI-powered resume builder built with the MERN stack.  
Create, edit, enhance, preview, download, and share professional resumes with AI assistance.

## Live Demo

Primary Live App (AWS EC2): http://65.2.148.132  
Vercel Fallback: https://ai-resume-builder-pi-ten.vercel.app/  
Repository: https://github.com/jayesh-patil03/AI_Resume_Builder.git

Note: The EC2 deployment is the main live version. If the EC2 instance is stopped, you can still access the frontend through the Vercel link.

---

## Features

- JWT-based authentication
- Create and manage multiple resumes
- Edit resume sections individually
- AI-powered content enhancement using Gemini API
- Live resume preview
- Download resume as PDF
- Public shareable resume link
- Image upload support
- Protected API routes
- Responsive design

---

## Tech Stack

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
- Google Gemini API

**Deployment**
- AWS EC2
- Nginx
- PM2
- Vercel (frontend fallback)

---

## Project Structure

```text
AI_Resume_Builder/
|
|-- client/
|   |-- public/
|   |-- src/
|   |   |-- app/
|   |   |-- assets/
|   |   |-- components/
|   |   |-- configs/
|   |   |-- pages/
|   |   |-- App.jsx
|   |   `-- main.jsx
|   `-- vite.config.js
|
|-- server/
|   |-- configs/
|   |-- controllers/
|   |-- middlewares/
|   |-- models/
|   |-- routes/
|   `-- server.js
|
`-- README.md
```

---

## Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/jayesh-patil03/AI_Resume_Builder.git
cd AI_Resume_Builder
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file inside `server/`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_gemini_model
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Run backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd client
npm install
```

Create `.env` inside `client/`:

```env
VITE_BASE_URL=http://localhost:3000
```

Run frontend:

```bash
npm run dev
```

---

## Deployment Notes

- Primary deployment is on AWS EC2
- Nginx is used to serve the frontend and reverse proxy API requests
- PM2 is used to keep the Node.js server running in production
- MongoDB Atlas is used as the cloud database
- Vercel is kept as a fallback frontend deployment

---

## Authentication

- Passwords are hashed using bcrypt
- JWT token is stored in localStorage
- Protected routes are handled using middleware
- Auto-login is supported with token validation

---

## Author

Jayesh Patil  
LinkedIn: http://www.linkedin.com/in/jayesh-patil2512  
Email: jayeshpat9422@gamil.com
