import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import StudentLayout from "./Layouts/StudentLayout";
import StudentAssignment from "./Pages/Student/StudentAssignment.jsx";
import StudentNotification from "./Pages/Student/StudentNotification.jsx";
import StudentClasses from "./Pages/Student/StudentClasses.jsx";
import ClassCode from "./Pages/Student/ClassCode.jsx"
import StudentDashboard from "./Pages/Student/StudentDashboard.jsx";
import LecturerLayout from "./Layouts/LecturerLayout.jsx"
import LecturerClasses from "./Pages/Lecturer/LecturerClasses.jsx"
import LecturerDashboard from "./Pages/Lecturer/LecturerDashboard.jsx";
import Logout from "./Pages/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Nested Routes inside StudentLayout */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="join-class" element={<ClassCode />} />
          <Route path="student-classes" element={<StudentClasses />} />
          <Route path="assignments" element={<StudentAssignment />} />
          <Route path="notifications" element={<StudentNotification />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path="/lecturer" element={<LecturerLayout />}>
          <Route index element={<LecturerDashboard />} />
          <Route path="Lecturer-classes" element={<LecturerClasses />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;