import React from 'react'
import SclearnLogo from '/ScLearn.png'
import Hamburger from '../assets/hamburger.png'
import Plus from '../assets/plus.png'
import LightBell from '../assets/belllight.png'

const Header = ({ toggleSidebar }) => {
    return (
        <div className='h-20 flex bg-white justify-between shadow-md items-center px-7'>
            <div className='flex gap-7'>
                <button onClick={toggleSidebar}><img src={Hamburger} alt="hamburger button" /></button>
                <img src={SclearnLogo} alt="App logo" />
            </div>
            <div className='flex gap-7'>
                <button><img src={Plus} alt="plus button" /></button>
                <button><img src={LightBell} alt="notification bell" /></button>
            </div>
        </div>
    )
}

export default Header