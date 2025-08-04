import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AdminDashboard from "./pages/Dashboard/AdminDashboard.jsx";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./pages/Auth/Logout";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<h1 className="text-center mt-20">Welcome to Student ERP</h1>}
      />
    </Routes>
  );
}
