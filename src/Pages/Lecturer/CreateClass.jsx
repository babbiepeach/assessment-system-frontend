import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateClass = () => {
    const [courseCode, setCourseCode] = useState('');
    const [className, setClassName] = useState('');
    const navigate = useNavigate();

    const generateCode = () => {
        const code = Math.random().toString(36).substring(2, 8);
        setCourseCode(code);
    };

    const handleCancel = () => {
        navigate('/lecturer');
    };

    const handleCreate = () => {
        if (className.trim() !== '' && courseCode.trim() !== '') {
            const existingClasses = JSON.parse(localStorage.getItem('createdClasses')) || [];
            const newClass = { name: className, code: courseCode };
            existingClasses.push(newClass);
            localStorage.setItem('createdClasses', JSON.stringify(existingClasses));
            navigate('/lecturer/lec-classes', { state: { className, courseCode } });
        } else {
            alert('Please enter a class name and generate a course code');
        }
    };

    return (
        <div className='bg-gray-100 p-6 h-[100%] w-[100%]'>
            <div className='bg-white rounded-xl h-[100%] w-[100%] font-poppins flex justify-center items-center'>
                <div className="w-[45%] h-[75%] bg-white shadow-md rounded-lg p-6 border">
                    <h2 className="text-lg font-semibold pb-5">Create Class</h2>

                    {/* User Info */}
                    <div className="flex items-center gap-4 border rounded-md p-3 mb-5">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500"></div>
                        <div>
                            <p className="font-semibold text-sm">Taiwo George-Taylor</p>
                            <p className="text-xs text-gray-500">taiwogeorgetaylor@gmail.com</p>
                        </div>
                    </div>

                    {/* Class Name Input */}
                    <div className="mb-4">
                        <label className="block text-sm pb-2">Class Name</label>
                        <input
                            type="text"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            placeholder="This is the name your students will see"
                            className="w-full border rounded-md px-3 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Generate Code */}
                    <div className="flex items-center gap-12 mb-5">
                        <button
                            onClick={generateCode}
                            className="flex-1 bg-blue-600 text-white py-4 rounded-md text-base hover:bg-blue-700"
                        >
                            Generate Course Code
                        </button>
                        <div className="flex-1 border rounded-md px-3 py-4 text-base flex items-center justify-center bg-gray-100">
                            {courseCode || '------'}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end text-base gap-6">
                        <button onClick={handleCancel} className="text-red-500 hover:underline">Cancel</button>
                        <button onClick={handleCreate} className="text-green-600 hover:underline">Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateClass;

