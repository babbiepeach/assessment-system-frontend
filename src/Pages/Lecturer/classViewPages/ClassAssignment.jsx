import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ClassAssignment = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('assignments')) || [];
        setAssignments(stored);
    }, []);

    const toggleDetails = (id) => {
        setAssignments(assignments.map((a) =>
            a.id === id ? { ...a, show: !a.show } : a
        ));
    };

    return (
        <div className="flex flex-col h-screen">

            <div className="flex-1 overflow-y-auto hide-scrollbar p-4 pb-32 bg-gray-50">
                <div className="w-full max-w-5xl mx-auto font-poppins">
                    {/* Create Button */}
                    <div className="mb-8">
                        <Link
                            to="/create-assignment"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
                        >
                            Create Assignment
                        </Link>
                    </div>

                    {/* Divider */}
                    {assignments.length > 0 && <hr className="mb-8 border-gray-300" />}

                    {/* Display Assignments */}
                    {assignments.map((assignment) => (
                        <div key={assignment.id} className="bg-white rounded-xl p-6 shadow-md space-y-4 mb-6 relative">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">{assignment.title}</h2>
                                <button
                                    onClick={() => toggleDetails(assignment.id)}
                                    className="text-blue-600 font-medium hover:underline focus:outline-none"
                                >
                                    {assignment.show ? 'Hide' : 'Show'}
                                </button>
                            </div>

                            {assignment.show && (
                                <div className="space-y-2 mt-4">
                                    <p><strong>Instructions:</strong> {assignment.instructions || 'No instructions'}</p>
                                    {assignment.file && (
                                        <p>
                                            <strong>Attached:</strong>{' '}
                                            <a href={assignment.file} download={assignment.fileName} className="text-blue-600 underline">
                                                {assignment.fileName}
                                            </a>
                                        </p>
                                    )}
                                    <p><strong>Points:</strong> {assignment.points || 'N/A'}</p>
                                    <p><strong>Due Date:</strong> {assignment.dueDate || 'N/A'}</p>
                                    <p><strong>Topic:</strong> {assignment.topic || 'N/A'}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClassAssignment;



