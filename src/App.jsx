import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { ROLE_STUDENT, ROLE_LECTURER } from "./redux/utils.jsx";
import { clearError, clearSuccess } from './redux/slices/message-slice'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import FourZeroFour from './components/ErrorBoundary/FourZeroFour.jsx'

import Layout from "./Layouts/Layout.jsx";

// common pages
import Notification from "./common-components/Notification.jsx";

// student pages
import StudentAssignment from "./Pages/Student/StudentAssignment.jsx";
import AssignmentView from "./Pages/Student/AssignmentView.jsx";
import StudentClasses from "./Pages/Student/StudentClasses.jsx";
import JoinClass from "./Pages/Student/JoinClass.jsx"
import StudentDashboard from "./Pages/Student/StudentDashboard.jsx";
import StudentMain from "./Pages/Student/StudentMain.jsx";

// lecturer pages
import LecturerDashboard from "./Pages/Lecturer/LecturerDashboard.jsx";
import LecturerClasses from "./Pages/Lecturer/LecturerClasses.jsx";
import CreateClass from "./Pages/Lecturer/CreateClass.jsx";
import ClassView from "./Pages/Lecturer/ClassView.jsx";
import ClassAssignment from "./Pages/Lecturer/ClassAssignment.jsx";
import CreateAssignment from "./Pages/Lecturer/CreateAssignment.jsx";
import ClassGrades from "./Pages/Lecturer/ClassGrades.jsx";
import ClassHistory from "./Pages/Lecturer/ClassHistory.jsx";

const LoginPage = lazy(() => import('./Pages/LoginPage.jsx'))

function App() {
  const { error, success, message } = useSelector(state => state.message)

  const RouteGuard = ({ allowedRole }) => {
    const { user } = useSelector(state => state.auth)
    const userRole = user?.role?.toLowerCase();
    const location = useLocation();

    // If user is not logged in, redirect to login
    if (!user) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }

    // If user tries to access another role's page, redirect to their dashboard
    if (userRole !== allowedRole) {
      return <Navigate to={`/${userRole}`} replace />;
    }

    return (
      <Outlet />
    )
  }

  const PrivateRoutes = () => {
    return (
      <Routes>
        <Route element={<RouteGuard allowedRole={ROLE_STUDENT} />}>
          <Route path={`/${ROLE_STUDENT}`} element={<Layout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="classes" element={<StudentClasses />} />
            <Route path="classes/join-class" element={<JoinClass />} />
            <Route path="student-main" element={<StudentMain />} />
            <Route path="assignments" element={<StudentAssignment />} />
            <Route path="view-assignment" element={<AssignmentView />} />
            <Route path="notifications" element={<Notification />} />
          </Route>
        </Route>

        <Route element={<RouteGuard allowedRole={ROLE_LECTURER} />}>
          <Route path={`/${ROLE_LECTURER}`} element={<Layout />}>
            <Route index element={<LecturerDashboard />} />
            <Route path="classes" element={<LecturerClasses />} />
            <Route path="classes/create-class" element={<CreateClass />} />
            <Route path="classes/:classId" element={<ClassView />} />
            <Route path="class-assignment" element={<ClassAssignment />} />
            <Route path="create-assignment" element={<CreateAssignment />} />
            <Route path="class-grade" element={<ClassGrades />} />
            <Route path="class-history" element={<ClassHistory />} />
            <Route path="notifications" element={<Notification />} />
          </Route>
        </Route>

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
            <Route path="/" element={<LoginPage />} />

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