import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getInitials, ROLE_LECTURER } from '../redux/utils';

import BellIcon from '../assets/bell.png';
import BookIcon from '../assets/book.png';
import HomeIcon from '../assets/Home.png';
import PenIcon from '../assets/pen.png';
import LogOutIcon from '/src/assets/logout.png';

import { resetStorageSlice } from '../redux/slices/storage-slice';
import { logout } from '../redux/slices/auth-slice';
import { useProfileMutation } from '../redux/apis/api-slice';

const LecturerSidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const path = useLocation().pathname

    const { user, userDetails } = useSelector(state => state.auth)

    const [getProfile] = useProfileMutation()
    useEffect(() => {
        if (user) {
            dispatch(getProfile)
        }
    }, [user])

    const initials = getInitials(userDetails?.fullName);

    const navItems = [
        // { name: 'Home', path: `/${ROLE_LECTURER}`, icon: HomeIcon },
        { name: 'Classes', path: `/${ROLE_LECTURER}/classes`, icon: BookIcon },
        // { name: 'Assignments', path: `/${ROLE_LECTURER}/classes`, icon: PenIcon },
        { name: 'Similarity Checker', path: `/${ROLE_LECTURER}/similarity-checker`, icon: PenIcon },
        { name: 'Notifications', path: `/${ROLE_LECTURER}/notifications`, icon: BellIcon },
    ]

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

            <div className='w-full border-t border-b border-white h-[27rem]'>
                <nav className="w-full flex  items-center pt-8">
                    <ul className="flex flex-col font-medium gap-6">
                        <li className='relative' >
                            <div className={`flex items-center px-5 py-2 pl-4 rounded-md 
                                    hover:bg-soft-blue transition-colors duration-200 cursor-pointer
                                    ${path === `/${ROLE_LECTURER}` && 'bg-soft-blue'}`}>
                                <Link to={`/${ROLE_LECTURER}`} className='flex items-center gap-2 flex-1'>
                                    <img src={HomeIcon} alt={'home'} />
                                    <span className='text-white'>Home</span>
                                </Link>
                            </div>
                        </li>
                        {navItems.map((item, id) => (
                            <li className='relative w-full' key={id}>
                                <div className={`w-full flex items-center px-5 py-2 rounded-md 
                                        hover:bg-soft-blue transition-colors duration-200 cursor-pointer
                                        ${(path === item.path) || (path.includes(item.path)) ? 'bg-soft-blue' : ''}`}>
                                    <Link to={item.path} className='flex items-center gap-2 flex-1'>
                                        <img src={item.icon} alt={item.name} />
                                        <span className='text-white'>{item.name}</span>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className='flex justify-center pt-6'>
                <button onClick={() => handleLogout()} className="flex items-center text-white w-[200px] gap-2 px-5 py-2 rounded-md 
                    hover:bg-soft-blue hover:text-white transition-colors duration-200 cursor-pointer 
                    active:bg-soft-blue active:text-white">
                    <img src={LogOutIcon} alt="logout icon" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}

export default LecturerSidebar;
