import React from 'react'
import SclearnLogo from '/src/assets/ScLearn.png'
import Hamburger from '/src/assets/hamburger.png'
import Plus from '/src/assets/plus.png'
import LightBell from '/src/assets/belllight.png'

const HeaderLecturer = () => {
    return (
        <div className='h-20 flex bg-white justify-between shadow-md items-center px-7'>
            <div className='flex gap-7'>
                <button><img src={Hamburger} alt="hamburger button" /></button>
                <img src={SclearnLogo} alt="App logo" />
            </div>
            <div className='flex gap-7'>
                <button><img src={Plus} alt="plus button" /></button>
                <button><img src={LightBell} alt="notification bell" /></button>
            </div>
        </div>
    )
}

export default HeaderLecturer