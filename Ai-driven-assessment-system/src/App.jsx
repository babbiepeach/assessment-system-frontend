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
          <Route path="classes" element={<StudentClasses />} />
          <Route path="assignments" element={<StudentAssignment />} />
          <Route path="notifications" element={<StudentNotification />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;