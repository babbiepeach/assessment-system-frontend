import React from 'react';
import { Link } from 'react-router-dom';
import { ROLE_LECTURER, assignmentTypes } from '../../../redux/utils';
import { useGetAllAssignmentsQuery } from '../../../redux/apis/api-slice';
import { useDispatch } from 'react-redux';
import { setAssignmentInfo } from '../../../redux/slices/storage-slice';

const ClassAssignment = () => {
    const dispatch = useDispatch()

    const { data: assignments, isLoading } = useGetAllAssignmentsQuery()

    return (
        <div className="flex flex-col h-screen">

            <div className="flex-1 overflow-y-auto hide-scrollbar p-4 pb-32 bg-gray-50">
                <div className="w-full max-w-5xl mx-auto font-poppins">
                    {/* Create Button */}
                    <div className="mb-8">
                        <Link
                            to={`/${ROLE_LECTURER}/classes/assignment/create-assignment`}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
                        >
                            Create Assignment
                        </Link>
                    </div>

                    <hr className="mb-8 border-gray-300" />

                    {isLoading && (
                        <React.Fragment>
                            <div className='w-full h-24 mb-4 rounded-lg bg-gray-300 animate-pulse' />
                            <div className='w-full h-24 mb-4 rounded-lg bg-gray-300 animate-pulse' />
                            <div className='w-full h-24 mb-4 rounded-lg bg-gray-300 animate-pulse' />
                        </React.Fragment>
                    )}
                    {(assignments?.length === 0) && (!isLoading) && (
                        <p>You have created <span className="text-dark-blue">0</span> assignments.</p>
                    )}

                    {/* Display Assignments */}
                    {assignments?.map(assignment => (
                        <Link 
                        to={`/${ROLE_LECTURER}/classes/assignment/view/${assignment?.title}`} 
                        key={assignment?.id} 
                        onClick={() => dispatch(setAssignmentInfo(assignment))}>
                            <div className="bg-white rounded-xl p-6 shadow-md space-y-4 mb-6 relative">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">{assignment?.title}</h2>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <p><strong>Description:</strong> {assignment?.description}</p>
                                    <p>
                                        <strong>Assignment Type:</strong> {' '}
                                        {assignmentTypes.map(type => type.id === assignment?.type && type.value)}
                                    </p>
                                    {assignment?.file && (
                                        <p>
                                            <strong>Attached:</strong>{' '}
                                            <a href={assignment?.file} download={assignment?.fileName} className="text-blue-600 underline">
                                                {assignment?.fileName}
                                            </a>
                                        </p>
                                    )}
                                    {/* <p><strong>Points:</strong> {assignment?.points || 'N/A'}</p>
                                    <p><strong>Due Date:</strong> {assignment?.dueDate || 'N/A'}</p>
                                    <p><strong>Topic:</strong> {assignment?.topic || 'N/A'}</p> */}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClassAssignment;



