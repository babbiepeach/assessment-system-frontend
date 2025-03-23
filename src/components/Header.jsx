import React from 'react'
import SclearnLogo from '/ScLearn.png'
import Hamburger from '../assets/hamburger.png'
import Plus from '../assets/plus.png'
import LightBell from '../assets/belllight.png'
import { useGetNotificationsQuery } from '../redux/apis/api-slice'
import { useNavigate } from 'react-router-dom'

const Header = ({ toggleSidebar, role }) => {
    const navigate = useNavigate()

    const { data: notifications } = useGetNotificationsQuery()
    const unReadNotifications = notifications?.filter(note => note.isRead === false)
    
    const handleNavigate = () => {
        if (unReadNotifications?.length > 0){
            navigate(`/${role}/notifications`)
        }
    }

    return (
        <div className='h-20 flex bg-white justify-between shadow-md items-center px-7'>
            <div className='flex gap-7'>
                <button onClick={toggleSidebar}><img src={Hamburger} alt="hamburger button" /></button>
                <img src={SclearnLogo} alt="App logo" />
            </div>
            <div className='flex gap-7'>
                {/* <button><img src={Plus} alt="plus button" /></button> */}
                <div className='relative'>
                    <button onClick={handleNavigate}><img src={LightBell} alt="notification bell" className='h-8' /></button>
                    {unReadNotifications?.length > 0 && (
                        <p className='absolute top-0 right-0 bg-soft-blue rounded-full text-xs w-4 h-4 text-center'>
                            {unReadNotifications?.length}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header