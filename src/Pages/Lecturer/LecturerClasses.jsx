import React from 'react';
import { useLocation } from 'react-router-dom';

const LecturerClasses = () => {
    const location = useLocation();
    const { className } = location.state || {};

    const classes = [
        "Modelling and Simulation",
        "Artificial Intelligence",
        "Machine Learning",
        "Database Design",
        "Compiler Construction",
        "Computer Architecture",
    ];

    if (className) {
        classes.unshift(className);
    }

    return (
        <div className='bg-white font-poppins rounded-xl h-full w-full px-4 py-6'>
            <div className="flex flex-wrap gap-6 overflow-y-auto max-h-[calc(100vh-150px)] pr-2">
                {classes.map((cls, idx) => (
                    <div key={idx} className="w-[30%] min-w-[200px] border rounded-lg shadow-sm overflow-hidden">
                        <div className="h-24 bg-gradient-to-r from-blue-600 to-green-500 p-3 text-white font-semibold">
                            {cls}
                        </div>
                        <div className="h-24 bg-white relative">
                            <div className="absolute bottom-2 right-2 text-gray-500">
                                <i className="fa-regular fa-folder"></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LecturerClasses;
