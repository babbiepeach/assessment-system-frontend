import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLE_STUDENT } from '../redux/utils';

import BellIcon from '../assets/bell.png';
import BookIcon from '../assets/book.png';
import HomeIcon from '../assets/Home.png';
import PenIcon from '../assets/pen.png';
import LogOutIcon from '../assets/logout.png';

const StudentSidebar = () => {
    const path = useLocation().pathname

    const [dropdownOpen, setDropdownOpen] = useState(false);

    // const { user } = useSelector(state => state.auth)
    const user = {
        name: 'Taiwo George-Taylor',
        email: 'taiwogeorgetaylor.gt@gmail.com'
    }

    const getInitials = (name) => {
        if (!name) return "EA";

        const [firstName, lastName] = name.split(" ").map(part => part.trim());

        const firstNameInitial = firstName ? firstName[0] : "E";
        const lastNameInitial = lastName ? lastName[0] : "A";

        return `${firstNameInitial}${lastNameInitial}`;
    }
    const initials = getInitials(user.name);

    const navItems = [
        { name: 'Home', path: `/${ROLE_STUDENT}`, icon: HomeIcon, hasDropdown: false },
        {
            name: 'Enrolled  Classes',
            path: `/${ROLE_STUDENT}/classes`,
            icon: BookIcon,
            hasDropdown: true,
            dropdownNav: [ // need to be gotten from backend somehow. otherwise remove
                {
                    label: "Modelling",
                    path: `/${ROLE_STUDENT}/classes/modelling`,
                },
                {
                    label: "Modelling-2",
                    path: `/${ROLE_STUDENT}/classes/modelling-2`,
                },
            ],
        },
        { name: 'Assignments', path: `/${ROLE_STUDENT}/assignments`, icon: PenIcon, hasDropdown: false },
        { name: 'Notifications', path: `/${ROLE_STUDENT}/notifications`, icon: BellIcon, hasDropdown: false },
    ]

    const canOpenDropdown = (check) => {
        if (check) {
            setDropdownOpen(!dropdownOpen)
        }
    }

    return (
        <div className='h-[100vh] w-[17rem] font-poppins bg-light-blue pt-14 pl-3'>
            <div className='flex gap-2 items-center pl-3 pr-5 pb-6'>
                <div className='bg-some-white rounded-full w-11 h-11 text-black inline-flex items-center justify-center'>
                    {initials}
                </div>
                <div className='text-sm w-[150px] text-white'>
                    <h3>Taiwo George-Taylor</h3>
                    <p className='text-[11px]'>taiwogeorgetaylor.gt@gmail.com</p>
                </div>
            </div>

            <div className='border-t border-b border-white h-[27rem]'>
                <nav className="flex justify-center items-center pt-8">
                    <ul className="flex flex-col font-medium gap-6">
                        {navItems.map((item, id) => (
                            <li className='relative' key={id}>
                                <div to={item.path}
                                    className={`flex items-center px-5 py-2 pl-4 rounded-md 
                                    hover:bg-soft-blue transition-colors duration-200 cursor-pointer
                                    ${path === item.path && 'bg-soft-blue'}`}>
                                    <Link to={item.path} onClick={() => canOpenDropdown(item.hasDropdown)} className='flex items-center gap-2 flex-1'>
                                        <img src={item.icon} alt={item.name} />
                                        <span className='text-white'>{item.name}</span>
                                    </Link>
                                    {item.hasDropdown && (
                                        <span
                                            className="ml-auto text-sm cursor-pointer"
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                        >
                                            {dropdownOpen ? '▲' : '▼'}
                                        </span>
                                    )}
                                </div>
                                {(item.hasDropdown) && (dropdownOpen) && (
                                    <ul className="bg-light-blue text-white text-sm mt-2 pl-3 pr-3 
                                    max-h-32 overflow-y-auto space-y-1 hide-scrollbar">
                                        {item.dropdownNav?.map((item, id) => (
                                            <li key={id}>
                                                <Link to={item.path} className="flex items-center gap-2 pl-1 py-1 cursor-pointer 
                                            hover:bg-soft-blue rounded-md transition-colors">
                                                    <div className="bg-dark-blue rounded-full w-8 h-8" /> {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
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