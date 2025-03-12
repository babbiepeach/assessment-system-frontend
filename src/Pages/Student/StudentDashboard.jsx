import React from 'react'
import { Link } from 'react-router-dom'

const StudentDashboard = () => {
    return (
        <div className='bg-white rounded-xl h-[100%] w-[100%] font-poppins text-center flex flex-col justify-center items-center '>
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
            <Link to="/student/join-class">
                <button className="mt-6 px-12 py-5 bg-light-blue text-xl text-white font-medium rounded-lg shadow-md">
                    Join Class
                </button>
            </Link>
        </div>
    )
}

export default StudentDashboard
