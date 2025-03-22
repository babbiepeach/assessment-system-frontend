import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getInitials } from '../../redux/utils';
import { useCreateClassMutation } from '../../redux/apis/api-slice';

const CreateClass = () => {
    const navigate = useNavigate();

    const [className, setClassName] = useState('');
    const [classDesc, setClassDesc] = useState('');

    const { userDetails } = useSelector(state => state.auth)
    const [createClass, { isSuccess, isLoading }] = useCreateClassMutation()

    const handleCreateClass = async (e) => {
        e.preventDefault()

        try {
            await createClass({
                teacherId: userDetails?.id,
                className,
                classDesc
            })
        } catch (error) {
            console.error();
        } finally {
            navigate(`/${ROLE_LECTURER}/classes`)
        }
    }

    return (
        <div className='bg-gray-100 p-6 h-full w-full'>
            <div className='bg-white rounded-xl h-full w-full font-poppins flex justify-center items-center'>
                <form onSubmit={handleCreateClass} className="w-1/2 h-fit bg-white shadow-md rounded-lg p-6 border">
                    <h2 className="text-lg font-semibold pb-5">Create Class</h2>

                    {/* User Info */}
                    <div className="flex items-center gap-4 border rounded-md p-3 mb-5">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            {getInitials(userDetails?.fullName)}
                        </div>
                        <div>
                            <p className="font-semibold text-sm">{userDetails?.fullName}</p>
                            <p className="text-xs text-gray-500">{userDetails?.email}</p>
                        </div>
                    </div>

                    {/* Class Name Input */}
                    <fieldset className="mb-4">
                        <label className="block text-sm pb-2">Class Name</label>
                        <input
                            type="text"
                            required
                            onChange={(e) => setClassName(e.target.value)}
                            placeholder="This is the name your students will see"
                            className="w-full border rounded-md px-3 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </fieldset>

                    <fieldset className="mb-4">
                        <label className="block text-sm pb-2">Class Description</label>
                        <input
                            type="text"
                            required
                            onChange={(e) => setClassDesc(e.target.value)}
                            placeholder="Write a short description"
                            className="w-full border rounded-md px-3 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </fieldset>

                    {/* Buttons */}
                    <div className="flex justify-end text-base gap-6">
                        <button onClick={() => navigate(-1)} className="text-red-500 hover:underline">
                            Cancel
                        </button>
                        <button
                            type='submit'
                            disabled={isLoading}
                            className={`${isLoading ? 'text-gray-500' : 'text-green-600'} hover:underline`}>
                            {isLoading ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateClass;

