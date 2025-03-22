import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE_LECTURER } from '../redux/utils';

import BookIcon from '/src/assets/book.png';
import HomeIcon from '/src/assets/Home.png';
import LogOutIcon from '/src/assets/logout.png';

import { resetStorageSlice } from '../redux/slices/storage-slice';
import { logout } from '../redux/slices/auth-slice';

const LecturerSidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const path = useLocation().pathname

    // const { user, userDetails } = useSelector(state => state.auth)
    const userDetails = {
        name: 'Please Wait',
        email: 'Loading'
    }

    const [ getProfile ] = useProfileMutation()
    useEffect(() => {
        if (user) {
            dispatch(getProfile)
        }
    }, [user])
    
    const getInitials = (name) => {
        if (!name) return "EA";

        const [firstName, lastName] = name.split(" ").map(part => part.trim());

        const firstNameInitial = firstName ? firstName[0] : "E";
        const lastNameInitial = lastName ? lastName[0] : "A";

        return `${firstNameInitial}${lastNameInitial}`;
    }
    const initials = getInitials(userDetails?.name);

    const navItems = [
        { name: 'Home', path: `/${ROLE_LECTURER}`, icon: HomeIcon },
        { name: 'Classes', path: `/${ROLE_LECTURER}/classes`, icon: BookIcon },
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
                    <h3>{userDetails?.name || ''}</h3>
                    <p className='text-[11px]'>{userDetails?.email || ''}</p>
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
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className='flex justify-center pt-6'>
                <Button onClick={() => handleLogout()} className="flex items-center text-white w-[200px] gap-2 px-5 py-2 pl-4 rounded-md 
                    hover:bg-soft-blue hover:text-white transition-colors duration-200 cursor-pointer 
                    active:bg-soft-blue active:text-white">
                    <img src={LogOutIcon} alt="logout icon" />
                    <span>Logout</span>
                </Button>
            </div>
        </div>
    );
}

export default LecturerSidebar;
