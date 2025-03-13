import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ClassCode = () => {
    const [classCode, setClassCode] = useState(null)

    // const { user } = useSelector(state => state.auth)
    const user = {
        name:'Taiwo George-Taylor', 
        email: 'taiwogeorgetaylor.gt@gmail.com'
    }

    const handleSubmitCode = (e) => {
        e.preventDefault()
        console.log(classCode)
    }

    return (
        <div className='bg-white rounded-xl flex justify-center items-center h-[100%] w-[100%] font-poppins'>
            <form onSubmit={handleSubmitCode} className='flex flex-col justify-center border border-light-gray h-[80%] rounded-xl w-[37%] p-6 '>
                <h2 className="text-xl font-semibold mb-4">Join Class</h2>

                <div className="border rounded-lg p-4 mb-4 bg-gray-50">
                    <p className="text-sm text-gray-600">You're currently signed in as</p>
                    <div className="flex items-center gap-3 mt-2">

                        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                        <div>
                            <p className="font-semibold text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-4 mb-4 bg-gray-50">
                    <p className="text-sm font-medium text-gray-700">Class Code</p>
                    <p className="text-xs text-gray-500 mb-2">
                        Ask your teacher for the class code, then enter it here.
                    </p>
                    <input
                        type="text"
                        placeholder="Class Code"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        onChange={(e) => setClassCode(e.target.value)}
                    />
                </div>


                <div className="flex justify-between">
                    <button className="text-red-500 font-medium">Cancel</button>
                    <button type='submit' className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed">
                        Join
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ClassCode