import React from 'react'

export const LecturerSidebar = () => {
    return (
        <div className='h-[100vh] w-[17rem] bg-light-blue pt-12 pl-6 pr-5'>
            <div className='flex gap-2 items-center'>
                <div className='bg-some-white rounded-[50%] w-11 h-11 '></div>
                <div className=' text-xs text-white'>
                    <h3>Taiwo George-Taylor</h3>
                    <p>taiwogeorgetaylor.gt@gmail.com</p>
                </div>
            </div>
            <div className='bg-dem-line'></div>
        </div>
    )
}
