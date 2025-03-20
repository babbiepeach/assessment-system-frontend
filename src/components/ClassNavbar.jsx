import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { Calendar, AlertTriangle, Settings } from 'lucide-react';

const ClassNavbar = () => {
    const location = useLocation();

    const tabs = [
        { name: 'Stream', path: '/lecturer/class-main' },
        { name: 'Assignment', path: '/lecturer/class-assignment' },
        { name: 'Grading', path: '/lecturer/class-grade' },
        { name: 'History', path: '/lecturer/class-history' },
    ];

    return (
        <div className="flex items-center w-full justify-between border-t border-b border-gray-200 px-6 py-3 bg-white">
            {/* Tabs */}
            <div className="flex items-center space-x-8">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.path;
                    return (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            className={`font-medium transition relative ${isActive
                                ? 'text-blue-600 after:content-[""] after:block after:h-[2px] after:bg-blue-600 after:w-full after:mt-1'
                                : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            {tab.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default ClassNavbar;


