import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getInitials, ROLE_STUDENT } from '../../redux/utils';
import { useJoinClassMutation } from '../../redux/apis/api-slice';

const JoinClass = () => {
    const navigate = useNavigate()
    const [classCode, setClassCode] = useState('');

    const { userDetails } = useSelector(state => state.auth)

    const [joinClass, { isSuccess, isLoading }] = useJoinClassMutation()

    const handleJoin = async (e) => {
        e.preventDefault()

        try {
            await joinClass({
                studentId: userDetails?.id,
                classCode: classCode.toLocaleUpperCase(),
            })
        } catch (error) {
            console.error(error)
        } finally {
            navigate(`/${ROLE_STUDENT}/classes`)
        }
    };

    return (
        <div className='bg-white rounded-xl flex justify-center items-center h-full w-full font-poppins'>
            <form onSubmit={handleJoin} className='flex flex-col justify-center border border-light-gray h-fit rounded-xl w-1/2 p-6 '>
                <h2 className="text-xl font-semibold mb-4">Join Class</h2>

                <div className="flex items-center gap-4 border rounded-md p-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        {getInitials(userDetails?.fullName)}
                    </div>
                    <div>
                        <p className="font-semibold text-sm">{userDetails?.fullName}</p>
                        <p className="text-xs text-gray-500">{userDetails?.email}</p>
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
                        value={classCode}
                        required
                    />
                </div>

                <div className="flex justify-between">
                    <button onClick={() => navigate(-1)} className="text-red-500 font-medium">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 rounded-lg ${classCode ? 'bg-light-blue text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                        disabled={!classCode}
                    >
                        {isLoading ? 'Joining...' : 'Join'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JoinClass;
