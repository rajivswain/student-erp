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



import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Logout from "../pages/Auth/Logout";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import PrivateRoute from "../components/PrivateRoute";
import StudentPanel from "../components/Students/StudentPanel";
import StudentList from "../components/Students/StudentList";
import AddStudent from "../pages/students/AddStudent";       // ✅ Page component
import EditStudent from "../pages/students/EditStudent";     // ✅ Page component

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      {/* Students */}
      <Route path="/students" element={<StudentList />} />
      <Route path="/students/add" element={<AddStudent />} />         {/* ✅ Updated */}
      <Route path="/students/edit/:id" element={<EditStudent />} />   {/* ✅ Updated */}
      <Route path="/students/manage" element={<StudentPanel />} />

      {/* Fallback */}
      <Route
        path="*"
        element={<h1 className="text-center mt-20">Welcome to Student ERP</h1>}
      />
    </Routes>
  );
};

export default AppRoutes;
