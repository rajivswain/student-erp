# 🎓 Student ERP Backend

A backend system built with Node.js, Express, and Supabase for managing students, teachers, and admin roles in an educational institution. This handles secure authentication, role-based access, and API endpoints for managing user data.

---

## 🚀 Features

- 🔐 JWT-based authentication
- 👨‍🏫 Role-based access control (Admin, Teacher, Student)
- 🌐 CORS support for frontend-backend communication
- 📦 Modular code structure with controllers, middleware, and utils
- 📊 Supabase integration for authentication and database

---

## 🗂️ Project Structure

```
student-erp-backend/
├── config/              # Supabase client config
├── controllers/         # Request logic for auth, student
├── middleware/          # JWT, role-based auth, logger
├── models/              # (Future DB models if needed)
├── routes/              # Express route handlers
├── utils/               # Helpers like JWT functions
├── .env                 # Environment variables
├── index.js             # Main app file
├── package.json         # Project config
└── README.md            # This file
```

---

## 🔧 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/student-erp-backend.git
cd student-erp-backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up `.env`:**

Create a `.env` file with:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
JWT_SECRET=your-jwt-secret
PORT=5000
```

4. **Start the server:**

```bash
npm start
```

---

## 🔐 API Endpoints

| Method | Route              | Access       | Description                 |
|--------|--------------------|--------------|-----------------------------|
| POST   | /api/auth/signup   | Public       | Register a new user         |
| POST   | /api/auth/login    | Public       | Authenticate user & get JWT |
| GET    | /api/protected     | Auth roles   | Test token-protected route  |
| GET    | /api/admin         | Admin only   | Admin dashboard route       |
| GET    | /api/student       | Student only | Student-specific route      |

---

## ⚙️ Built With

- Node.js
- Express.js
- Supabase
- JSON Web Tokens (JWT)
- dotenv
- morgan (logging)

---

## 👨‍💻 Author

**Rajeeb S.**  
[LinkedIn](https://linkedin.com/in/your-profile)  
[GitHub](https://github.com/your-username)

---

## 📜 License

This project is licensed under the ISC License.
