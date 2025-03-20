import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassNavbar from '../../components/ClassNavbar';

const ClassAssignment = () => {
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState(
        JSON.parse(localStorage.getItem('assignment')) || null
    );

    return (
        <div className="flex flex-col h-screen">
            <ClassNavbar />
            <div className="flex-1 overflow-y-auto hide-scrollbar p-4 pb-32 bg-gray-50">
                <div className="w-full max-w-5xl mx-auto font-poppins">
                    {/* Create Button */}
                    <div className="mb-8">
                        <button
                            onClick={() => navigate('class-assignment/create-assignment')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Create Assignment
                        </button>
                    </div>

                    {/* Divider */}
                    {assignment && <hr className="mb-8 border-gray-300" />}

                    {/* Display Created Assignment */}
                    {assignment && (
                        <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
                            <h2 className="text-2xl font-semibold">{assignment.title}</h2>
                            <p><strong>Instructions:</strong> {assignment.instructions}</p>
                            {assignment.fileName && (
                                <p><strong>Attached:</strong> {assignment.fileName}</p>
                            )}
                            <p><strong>Points:</strong> {assignment.points}</p>
                            <p><strong>Due Date:</strong> {assignment.dueDate}</p>
                            <p><strong>Topic:</strong> {assignment.topic}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassAssignment;


