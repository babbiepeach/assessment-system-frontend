import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getInitials, ROLE_STUDENT } from '../redux/utils';

import BellIcon from '../assets/bell.png';
import BookIcon from '../assets/book.png';
import HomeIcon from '../assets/Home.png';
import PenIcon from '../assets/pen.png';
import LogOutIcon from '../assets/logout.png';

import { logout } from '../redux/slices/auth-slice';
import { resetStorageSlice } from '../redux/slices/storage-slice';
import { useGetAllClassesQuery, useProfileMutation } from '../redux/apis/api-slice';

const StudentSidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const path = useLocation().pathname

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { user, userDetails } = useSelector(state => state.auth)

    const { data: classes, isLoading } = useGetAllClassesQuery()
    const classList = classes?.enrolledClasses || []
    const [getProfile] = useProfileMutation()
    useEffect(() => {
        if (user) {
            dispatch(getProfile)
        }
    }, [user])

    const initials = getInitials(userDetails?.fullName);

    const navItems = [
        {
            name: 'Enrolled  Classes',
            path: `/${ROLE_STUDENT}/classes`,
            icon: BookIcon,
            hasDropdown: classList && classList?.length > 0 ? true : false,
            dropdownNav: [ 
                ...classList?.map(cls => ({
                    label: cls?.name, 
                    path: `/${ROLE_STUDENT}/classes/${cls?.name}`,
                })),
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

    const handleLogout = () => {
        dispatch(resetStorageSlice())
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className='h-[100vh] w-[17rem] font-poppins bg-light-blue pt-14 pl-3'>
            <div className='flex gap-2 items-center pl-3 pr-5 pb-6'>
                <div className='bg-some-white rounded-full w-11 h-11 text-black inline-flex items-center justify-center'>
                    {initials || ''}
                </div>
                <div className='text-sm w-[150px] text-white'>
                    <h3>{userDetails?.fullName || ''}</h3>
                    <p className='text-[11px]'>{userDetails?.email || ''}</p>
                </div>
            </div>

            <div className='border-t border-b border-white h-[27rem]'>
                <nav className="flex justify-center items-center pt-8">
                    <ul className="flex flex-col font-medium gap-6">
                        <li className='relative' >
                            <div className={`flex items-center px-5 py-2 pl-4 rounded-md 
                                    hover:bg-soft-blue transition-colors duration-200 cursor-pointer
                                    ${path === `/${ROLE_STUDENT}` && 'bg-soft-blue'}`}>
                                <Link to={`/${ROLE_STUDENT}`} className='flex items-center gap-2 flex-1'>
                                    <img src={HomeIcon} alt={'home'} />
                                    <span className='text-white'>Home</span>
                                </Link>
                            </div>
                        </li>
                        {navItems.map((item, id) => (
                            <li className='relative' key={id}>
                                <div className={`flex items-center px-5 py-2 pl-4 rounded-md 
                                    hover:bg-soft-blue transition-colors duration-200 cursor-pointer
                                        ${(path === item.path) || (path.includes(item.path)) ? 'bg-soft-blue' : ''}`}>
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
                                                    <div className="bg-dark-blue rounded-full w-8 h-8 inline-flex items-center justify-center">
                                                    {item.label[0]}
                                                    </div> {item.label}
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
                <button onClick={() => handleLogout()} className="flex items-center text-white w-[200px] gap-2 px-5 py-2 pl-4 rounded-md 
                    hover:bg-soft-blue hover:text-white transition-colors duration-200 cursor-pointer 
                    active:bg-soft-blue active:text-white">
                    <img src={LogOutIcon} alt="logout icon" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}

export default StudentSidebar;