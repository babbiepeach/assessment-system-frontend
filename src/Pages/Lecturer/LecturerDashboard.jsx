import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROLE_LECTURER } from '../../redux/utils'

const LecturerDashboard = () => {
    return (
        <div className='bg-gray-100 p-6 h-full w-full'>
            <div className='font-poppins bg-white h-full w-full rounded-xl text-center flex flex-col justify-center items-center '>
                <p className="text-lg md:text-[34px] leading-relaxed font-medium w-[62%] text-light-blue">
                    Join a <span className="text-darkest-blue font-semibold">Classroom</span>{" "}
                    and Interact with{" "}
                    <span className="text-blue-400 font-semibold">Classmates</span> and
                    Ask <span className="text-blue-300 font-semibold">Teachers</span>{" "}
                    Questions by Using your Class Code With{" "}
                    <span className="">
                        <span className="text-light-blue font-semibold">Sc</span>
                        <span className="text-light-yellow font-semibold">Learn</span>
                    </span>
                </p>

                <Link to={`/${ROLE_LECTURER}/classes/create-class`}>
                    <button className="mt-6 px-12 py-5 bg-light-blue text-xl text-white font-medium rounded-lg shadow-md">
                        Create Class
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default LecturerDashboard