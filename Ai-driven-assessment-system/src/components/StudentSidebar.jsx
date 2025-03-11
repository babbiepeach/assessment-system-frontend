import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '/src/index.css';
import BellIcon from '/src/assets/bell.png';
import BookIcon from '/src/assets/book.png';
import HomeIcon from '/src/assets/Home.png';
import PenIcon from '/src/assets/pen.png';
import LogOutIcon from '/src/assets/logout.png';

const StudentSidebar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className='h-[100vh] w-[17rem] font-poppins bg-light-blue pt-14 pl-3'>
            <div className='flex gap-2 items-center pl-3 pr-5 pb-6'>
                <div className='bg-some-white rounded-full w-11 h-11'></div>
                <div className='text-sm w-[150px] text-white'>
                    <h3>Taiwo George-Taylor</h3>
                    <p className='text-[11px]'>taiwogeorgetaylor.gt@gmail.com</p>
                </div>
            </div>

            <div className='border-t border-b border-white h-[27rem]'>
                <nav className="flex justify-center items-center pt-8">
                    <ul className="flex flex-col font-medium text-white gap-6">
                        <li>
                            <Link to="/student" className="flex items-center gap-2 px-5 py-2 pl-4 rounded-md 
                                hover:bg-soft-blue hover:text-white transition-colors duration-200 cursor-pointer
                                active:bg-soft-blue active:text-white">
                                <img src={HomeIcon} alt="Home" />
                                <span>Home</span>
                            </Link>
                        </li>

                        {/* Enrolled Classes Navigation */}
                        <li className="relative">
                            <div className="flex items-center px-5 py-2 pl-4 rounded-md 
                                    hover:bg-soft-blue hover:text-white transition-colors duration-200 cursor-pointer
                                    active:bg-soft-blue active:text-white">
                                <Link to="/student/classes" className="flex items-center gap-2 flex-1">
                                    <img src={BookIcon} alt="Enrolled Classes" />
                                    <span>Enrolled Classes</span>
                                </Link>
                                <span
                                    className="ml-auto text-sm cursor-pointer"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    {dropdownOpen ? '▲' : '▼'}
                                </span>
                            </div>
                            {dropdownOpen && (
                                <ul className="bg-light-blue text-white text-sm mt-2 pl-3 pr-3 
                                    max-h-32 overflow-y-auto space-y-1 hide-scrollbar">
                                    <li>
                                        <Link to="/student/classes/modelling" className="flex items-center gap-2 pl-1 py-1 cursor-pointer 
                                            hover:bg-soft-blue rounded-md transition-colors">
                                            <span className="bg-dark-blue rounded-full w-8 h-8"></span> Modelling and Simulation
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/student/classes/ai" className="flex items-center gap-2 pl-1 py-1 cursor-pointer 
                                            hover:bg-soft-blue rounded-md transition-colors">
                                            <span className="bg-dark-blue rounded-full w-8 h-8"></span> Artificial Intelligence
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/student/classes/ml" className="flex items-center gap-2 pl-1 py-1 cursor-pointer 
                                            hover:bg-soft-blue rounded-md transition-colors">
                                            <span className="bg-dark-blue rounded-full w-8 h-8"></span> Machine Learning
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/student/classes/database" className="flex items-center gap-2 pl-1 py-1 cursor-pointer 
                                            hover:bg-soft-blue rounded-md transition-colors">
                                            <span className="bg-dark-blue rounded-full w-8 h-8"></span> Database Design
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/student/classes/compiler" className="flex items-center gap-2 pl-1 py-1 cursor-pointer 
                                            hover:bg-soft-blue rounded-md transition-colors">
                                            <span className="bg-dark-blue rounded-full w-8 h-8"></span> Compiler Construction
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/student/classes/architecture" className="flex items-center gap-2 pl-1 py-1 cursor-pointer 
                                            hover:bg-soft-blue rounded-md transition-colors">
                                            <span className="bg-dark-blue rounded-full w-8 h-8"></span> Computer Architecture
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <Link to="/student/assignments" className="flex items-center gap-2 px-5 py-2 pl-4 rounded-md 
                                hover:bg-soft-blue hover:text-white transition-colors duration-200 cursor-pointer
                                active:bg-soft-blue active:text-white">
                                <img src={PenIcon} alt="Assignments" />
                                <span>Assignments</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/student/notifications" className="flex items-center gap-2 px-5 py-2 pl-4 rounded-md 
                                hover:bg-soft-blue hover:text-white transition-colors duration-200 cursor-pointer
                                active:bg-soft-blue active:text-white">
                                <img src={BellIcon} alt="Notifications" />
                                <span>Notifications</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className='flex justify-center pt-6'>
                <Link to="/login" className="flex items-center text-white w-[200px] gap-2 px-5 py-2 pl-4 rounded-md 
                    hover:bg-soft-blue hover:text-white transition-colors duration-200 cursor-pointer 
                    active:bg-soft-blue active:text-white">
                    <img src={LogOutIcon} alt="logout icon" />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
}

export default StudentSidebar;