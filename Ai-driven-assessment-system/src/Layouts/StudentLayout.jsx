import React from 'react'
import StudentSidebar from "../components/StudentSidebar.jsx";
import HeaderStudent from "../components/HeaderStudent.jsx";
import { Outlet } from 'react-router-dom'

const StudentLayout = () => {
    return (
        <div className="flex h-screen w-full">
            <div>
                <StudentSidebar />
            </div>

            <div className="flex-1 flex flex-col">
                <div>
                    <HeaderStudent />
                </div>
                <div className="flex-1 flex justify-center items-center bg-gray-100 p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default StudentLayout
