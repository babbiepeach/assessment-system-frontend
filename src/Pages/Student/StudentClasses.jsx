import React from 'react';
import { Link } from 'react-router-dom';
import folderIcon from '/src/assets/folder.png'; // Adjust this path if needed

const classes = [
    { title: "Modelling and Simulation", lecturer: "Dr Ernest Onwiri", badge: "M", color: "bg-blue-700" },
    { title: "Artificial Intelligence", lecturer: "Dr Ernest Onwiri", badge: "A", color: "bg-cyan-500" },
    { title: "Machine Learning", lecturer: "Dr Anyakoyai", badge: "M", color: "bg-blue-900" },
    { title: "Database Design", lecturer: "Dr Jerry", badge: "D", color: "bg-pink-500" },
    { title: "Compiler Construction", lecturer: "Dr Agbaje", badge: "C", color: "bg-green-500" },
    { title: "Computer Architecture", lecturer: "Mrs Fatade", badge: "C", color: "bg-pink-500" },
];

const StudentClasses = () => {
    return (
        <div className='bg-white font-poppins rounded-xl h-[100%] w-[100%] px-4 py-6'>
            <div className="flex flex-wrap gap-6">
                {classes.map((cls, idx) => (
                    <Link
                        key={idx}
                        to="/student/student-main"
                        className="flex flex-col border border-dark-gray bg-white rounded-xl shadow-sm relative w-[280px] h-[210px] hover:scale-[1.02] transition-transform"
                    >
                        <div className='flex flex-col gap-1 bg-back-image rounded-tl-xl rounded-tr-xl px-3 pt-2 h-20 text-white'>
                            <h3 className="text-md font-semibold">{cls.title}</h3>
                            <p className="text-sm">{cls.lecturer}</p>
                        </div>
                        {/* Badge */}
                        <div className={`absolute top-12 right-5 h-9 w-9 rounded-full text-white flex items-center justify-center text-sm ${cls.color}`}>
                            {cls.badge}
                        </div>
                        {/* Folder Icon */}
                        <img
                            src={folderIcon}
                            alt="folder"
                            className="absolute bottom-4 right-4 w-5 h-5 object-contain"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default StudentClasses;