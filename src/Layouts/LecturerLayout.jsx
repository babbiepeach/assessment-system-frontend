import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import LecturerSidebar from "src/components/LecturerSidebar.jsx";
import LecturerHeader from "src/components/HeaderLecturer.jsx";

const LecturerLayout = () => {
    return (
        <>
            <LecturerHeader />
            <LecturerSidebar />
            <Outlet />
        </>
    )
}

export default LecturerLayout