import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import StudentSidebar from "../components/StudentSidebar.jsx";
import HeaderStudent from "../components/HeaderStudent.jsx";

const StudentLayout = () => {
    const [showSidebar, setShowSidebar] = useState(true)

    const toggleSidebarVisibility = () => {
        setShowSidebar((prev) => (prev === true ? false : true));
    };

    return (
        <div className="flex h-screen fixed w-full">
            <div>
                {showSidebar && (
                    <StudentSidebar />
                )}
            </div>

            <div className="flex-1 flex flex-col">
                <div>
                    <HeaderStudent toggleSidebar={toggleSidebarVisibility} />
                </div>
                <div className="flex-1 flex justify-center items-center bg-gray-100 p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default StudentLayout