// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const navigate = useNavigate();

//   // Get user role from localStorage, fallback to "Unknown"
//   const role = localStorage.getItem("role") || "Unknown";

//   // Logout handler: clear token & role, redirect to login page
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-4">Welcome to Admin Dashboard!</h1>

//       <p className="text-lg mb-6">
//         Logged in as: <span className="font-semibold">{role}</span>
//       </p>

//       <button
//         onClick={handleLogout}
//         className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios"; // Add this

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const role = localStorage.getItem("role") || "Unknown";

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await API.get("/admin/dashboard");
        setDashboardData(res.data);
      } catch (err) {
        console.error("Failed to load dashboard", err);
        navigate("/login"); // In case token is invalid
      }
    }
    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome Admin!</h1>
      {dashboardData ? (
        <>
          <p className="text-lg mb-2">User ID: {dashboardData.user.userId}</p>
          <p className="text-lg mb-6">Role: {dashboardData.user.role}</p>
          <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
