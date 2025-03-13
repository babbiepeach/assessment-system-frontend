import React from 'react'
import { Outlet } from 'react-router-dom'
import LecturerSidebar from "../components/LecturerSidebar.jsx";
import HeaderLecturer from "../components/HeaderLecturer.jsx";

const LecturerLayout = () => {
    return (
        <>
            <HeaderLecturer />
            <LecturerSidebar />
            <Outlet />
        </>
    )
}

export default LecturerLayout