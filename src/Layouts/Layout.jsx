import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { ROLE_LECTURER, ROLE_STUDENT } from '../redux/utils.jsx';

import StudentSidebar from "../components/StudentSidebar.jsx";
import LecturerSidebar from '../components/LecturerSidebar.jsx';
import Header from '../components/Header.jsx';

const Layout = () => {
    const [showSidebar, setShowSidebar] = useState(true)

    const { user } = useSelector(state => state.auth)
    const userRole = user?.role?.toLowerCase()

    const toggleSidebarVisibility = () => {
        setShowSidebar((prev) => (prev === true ? false : true));
    };


    return (
        <div className="flex h-screen fixed w-full">
            <div>
                {userRole === ROLE_STUDENT && (
                    <React.Fragment>
                        {showSidebar && (
                            <StudentSidebar />
                        )}
                    </React.Fragment>
                )}
                {userRole === ROLE_LECTURER && (
                    <React.Fragment>
                        {showSidebar && (
                            <LecturerSidebar />
                        )}
                    </React.Fragment>
                )}
            </div>

            <div className="flex-1 flex flex-col">
                <div>
                    <Header toggleSidebar={toggleSidebarVisibility} role={userRole} />
                </div>
                <div className="flex-1 flex justify-center items-center bg-gray-100 p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout