// import { useState, useEffect } from "react";
// import API from "../../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Redirect to role-based dashboard if already logged in
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");

//     if (token && role) {
//       if (role === "admin") {
//         navigate("/admin", { replace: true });
//       } else if (role === "teacher") {
//         navigate("/teacher", { replace: true });
//       } else if (role === "student") {
//         navigate("/student", { replace: true });
//       } else {
//         navigate("/login", { replace: true }); // fallback
//       }
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await API.post("/auth/login", form);
//       const { token, user } = res.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role);

//       // Role-based redirect
//       if (user.role === "admin") {
//         navigate("/admin");
//       } else if (user.role === "teacher") {
//         navigate("/teacher");
//       } else if (user.role === "student") {
//         navigate("/student");
//       } else {
//         alert("Unknown role, please contact admin.");
//       }
//     } catch (err) {
//       alert("Login failed. Please check your email and password.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "teacher") {
        navigate("/teacher", { replace: true });
      } else if (role === "student") {
        navigate("/student", { replace: true });
      } else {
        navigate("/dashboard", { replace: true }); // fallback
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "teacher") {
        navigate("/teacher");
      } else if (user.role === "student") {
        navigate("/student");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      const message = err.response?.data?.error || "Login failed. Please check your email and password.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}