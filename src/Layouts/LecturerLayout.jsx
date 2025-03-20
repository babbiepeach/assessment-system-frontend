import React from 'react'
import { Outlet } from 'react-router-dom'
import LecturerSidebar from "../components/LecturerSidebar.jsx";
import HeaderLecturer from "../components/HeaderLecturer.jsx";

const LecturerLayout = () => {
    return (
        <div className="flex fixed h-screen w-full">
            <div>
                <LecturerSidebar />
            </div>

            <div className="flex-1 flex flex-col">
                <div>
                    <HeaderLecturer />
                </div>
                <div className="flex-1 bg-gray-100">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default LecturerLayout