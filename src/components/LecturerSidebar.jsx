import React from 'react';
import { Link } from 'react-router-dom';
import '/src/index.css';
import BookIcon from '/src/assets/book.png';
import HomeIcon from '/src/assets/Home.png';
import LogOutIcon from '/src/assets/logout.png';

const LecturerSidebar = () => {

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
                            <Link to="/lecturer" className="flex items-center gap-2 px-5 py-2 pl-4 rounded-md 
                                hover:bg-soft-blue hover:text-white transition-colors duration-200 cursor-pointer
                                active:bg-soft-blue active:text-white">
                                <img src={HomeIcon} alt="Home" />
                                <span>Home</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/lecturer/lecturer-classes" className="flex items-center gap-2 px-5 py-2 pl-4 rounded-md 
                                hover:bg-soft-blue hover:text-white transition-colors duration-200 cursor-pointer
                                active:bg-soft-blue active:text-white">
                                <img src={BookIcon} alt="Classes" />
                                <span>Classes</span>
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

export default LecturerSidebar;
