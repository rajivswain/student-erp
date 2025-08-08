// import { Routes, Route } from "react-router-dom";
// import Login from "../pages/Auth/Login";
// import Signup from "../pages/Auth/Signup";
// import Logout from "../pages/Auth/Logout";
// import AdminDashboard from "../pages/Dashboard/AdminDashboard";
// import PrivateRoute from "../components/PrivateRoute";
// import StudentPanel from "../components/Students/StudentPanel";
// import StudentAddForm from "../components/Students/StudentAddForm";
// import StudentList from "../components/Students/StudentList";
// import EditStudentForm from "../components/Students/EditStudentForm";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* Auth */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/logout" element={<Logout />} />

//       {/* Protected Dashboard */}
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute>
//             <AdminDashboard />
//           </PrivateRoute>
//         }
//       />

//       {/* Students */}
//       <Route path="/students" element={<StudentList />} />
//       <Route path="/students/add" element={<StudentAddForm />} />
//       <Route path="/students/manage" element={<StudentPanel />} />
//       <Route path="/students/edit/:id" element={<EditStudentForm />} />

//       {/* Fallback */}
//       <Route
//         path="*"
//         element={<h1 className="text-center mt-20">Welcome to Student ERP</h1>}
//       />
//     </Routes>
//   );
// };

// export default AppRoutes;



// import { Routes, Route } from "react-router-dom";
// import Login from "../pages/Auth/Login";
// import Signup from "../pages/Auth/Signup";
// import Logout from "../pages/Auth/Logout";
// import AdminDashboard from "../pages/Dashboard/AdminDashboard";
// import PrivateRoute from "../components/PrivateRoute";
// import StudentPanel from "../components/Students/StudentPanel";
// import StudentList from "../components/Students/StudentList";
// import AddStudent from "../pages/students/AddStudent";       // ✅ Page component
// import EditStudent from "../pages/students/EditStudent";     // ✅ Page component

// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* Auth */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/logout" element={<Logout />} />

//       {/* Protected Dashboard */}
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute>
//             <AdminDashboard />
//           </PrivateRoute>
//         }
//       />

//       {/* Students */}
//       <Route path="/students" element={<StudentList />} />
//       <Route path="/students/add" element={<AddStudent />} />         {/* ✅ Updated */}
//       <Route path="/students/edit/:id" element={<EditStudent />} />   {/* ✅ Updated */}
//       <Route path="/students/manage" element={<StudentPanel />} />

//       {/* Fallback */}
//       <Route
//         path="*"
//         element={<h1 className="text-center mt-20">Welcome to Student ERP</h1>}
//       />
//     </Routes>
//   );
// };

// export default AppRoutes;



import { Routes, Route } from "react-router-dom";

// 🔐 Auth Pages
import LoginPage from "../pages/auth/Login";
import SignupPage from "../pages/auth/Signup";
import LogoutPage from "../pages/auth/Logout";

// 🧭 Dashboard
import AdminDashboardPage from "../pages/dashboard/AdminDashboard";
import PrivateRoute from "../components/PrivateRoute";

// 🎓 Student Pages
import StudentListPage from "../pages/students/StudentListPage";
import AddStudentPage from "../pages/students/AddStudentPage";
import EditStudentPage from "../pages/students/EditStudentPage";
import StudentProfilePage from "../pages/students/StudentProfilePage";

// 🧩 Other Components
import StudentPanel from "../components/students/StudentPanel";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔐 Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/logout" element={<LogoutPage />} />

      {/* 🧭 Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboardPage />
          </PrivateRoute>
        }
      />

      {/* 🎓 Student Management */}
      <Route path="/students" element={<StudentListPage />} />
      <Route path="/students/add" element={<AddStudentPage />} />
      <Route path="/students/edit/:id" element={<EditStudentPage />} />
      <Route path="/students/:id" element={<StudentProfilePage />} />
      <Route path="/students/manage" element={<StudentPanel />} />

      {/* 🧭 Fallback */}
      <Route
        path="*"
        element={<h1 className="text-center mt-20">Welcome to Student ERP</h1>}
      />
    </Routes>
  );
};

export default AppRoutes;
