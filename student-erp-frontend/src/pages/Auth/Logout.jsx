import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to login after logout
    navigate("/login");
  }, [navigate]);

  return <p>Logging out...</p>;
}
