import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROLE_STUDENT, ROLE_LECTURER } from "./redux/utils.jsx";
import { clearError, clearSuccess } from './redux/slices/message-slice'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import FourZeroFour from './components/ErrorBoundary/FourZeroFour.jsx'

import LoginPage from "./Pages/LoginPage.jsx";
import StudentLayout from "./Layouts/StudentLayout";
import LecturerLayout from "./Layouts/LecturerLayout"
import Logout from "./Pages/Logout";

// student pages
import StudentAssignment from "./Pages/Student/StudentAssignment.jsx";
import AssignmentView from "./Pages/Student/AssignmentView.jsx";
import StudentNotification from "./Pages/Student/StudentNotification.jsx";
import StudentClasses from "./Pages/Student/StudentClasses.jsx";
import ClassCode from "./Pages/Student/ClassCode.jsx"
import StudentDashboard from "./Pages/Student/StudentDashboard.jsx";
import StudentMain from "./Pages/Student/StudentMain.jsx";

// lecturer pages
import LecturerDashboard from "./Pages/Lecturer/LecturerDashboard.jsx";
import LecturerClasses from "./Pages/Lecturer/LecturerClasses.jsx";
import CreateClass from "./Pages/Lecturer/CreateClass.jsx";
import Classmain from "./Pages/Lecturer/Classmain.jsx";
import ClassAssignment from "./Pages/Lecturer/ClassAssignment.jsx";
import CreateAssignment from "./Pages/Lecturer/CreateAssignment.jsx";
import ClassGrades from "./Pages/Lecturer/ClassGrades.jsx";
import ClassHistory from "./Pages/Lecturer/ClassHistory.jsx";

const HomePage = lazy(() => import('./Pages/HomePage.jsx'))

function App() {
  const { error, success, message } = useSelector(state => state.message)

  const PrivateRoutes = () => {
    return (
      <Routes>
        {/* Nested Routes inside StudentLayout */}
        <Route path={`/${ROLE_STUDENT}`} element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="join-class" element={<ClassCode />} />
          <Route path="classes" element={<StudentClasses />} />
          <Route path="student-main" element={<StudentMain />} />
          <Route path="assignments" element={<StudentAssignment />} />
          <Route path="view-assignment" element={<AssignmentView />} />
          <Route path="notifications" element={<StudentNotification />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path={`/${ROLE_LECTURER}`} element={<LecturerLayout />}>
          <Route index element={<LecturerDashboard />} />
          <Route path="create-class" element={<CreateClass />} />
          <Route path="lec-classes" element={<LecturerClasses />} />
          <Route path="class-main" element={<Classmain />} />
          <Route path="class-assignment" element={<ClassAssignment />} />
          <Route path="class-grade" element={<ClassGrades />} />
          <Route path="class-history" element={<ClassHistory />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path="create-assignment" element={<CreateAssignment />} />
        <Route path='*' element={<FourZeroFour />} />
      </Routes>
    )
  }

  const PublicRoutes = () => {
    return (
      <Suspense fallback={
        <div className="h-screen bg-white justify-center items-center flex">
          <p>Page is loading</p>
        </div>
      }>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path='/*' element={<PrivateRoutes />} />
            <Route path='*' element={<FourZeroFour />} />
          </Routes>
        </Router>
      </Suspense>
    )
  }

  return (
    <ErrorBoundary
      error={error}
      success={success}
      message={message}
      clearErrorMessage={clearError}
      clearSuccessMessage={clearSuccess}
    >
      <PublicRoutes />
    </ErrorBoundary>
  )
}

export default App;