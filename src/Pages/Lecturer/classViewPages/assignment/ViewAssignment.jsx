import React, { useRef, useState } from 'react';
import Plus from "../../../../assets/plus.png";
import Xmark from "../../../../assets/xmarks.jpg";
import ListNote from "../../../../assets/list.png"
import { useSelector } from 'react-redux';
import { useGetAllAssignmentSubmissionsQuery } from '../../../../redux/apis/api-slice';


const ViewAssignment = () => {
    const { assignmentInfo, classInfo } = useSelector(state => state.storage)

    const { data: submissions, isLoading } = useGetAllAssignmentSubmissionsQuery({
        assignmentId: assignmentInfo.id
    })

    return (
        <div className="bg-white rounded-xl h-full w-full font-poppins p-6 flex flex-col md:flex-row gap-6 shadow-sm">
            {/* Left Section */}
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white w-6 text-xl"><img src={ListNote} /></span>
                    </div>
                    <h2 className="text-xl font-semibold">{classInfo.name}</h2>
                </div>
                <p className="text-gray-600 text-sm mb-1">{assignmentInfo.title}</p>
                <p className="text-xs text-gray-500 mb-4">Dr Ernest &nbsp;&nbsp; • &nbsp;&nbsp; Feb 6</p>

                {/* <div className="flex justify-between mb-4">
                    <p className="font-semibold">10 points</p>
                    <p className="font-semibold">Due Feb 9, 10:59pm</p>
                </div> */}

                <hr className="mb-4" />

                <p className="text-sm text-gray-700 mb-4">
                    {assignmentInfo.description}
                </p>

                <hr />

                {isLoading && (
                    <React.Fragment>
                        <div className='w-full h-24 mb-4 rounded-lg bg-gray-300 animate-pulse' />
                        <div className='w-full h-24 mb-4 rounded-lg bg-gray-300 animate-pulse' />
                        <div className='w-full h-24 mb-4 rounded-lg bg-gray-300 animate-pulse' />
                    </React.Fragment>
                )}
                {(submissions?.length === 0 || !submissions) && (!isLoading) && (
                    <p className='py-5 pl-5 text-gray-500'>There are no submissions yet.</p>
                )}

                {/* Display Submissions */}
                {submissions?.map(assignment => (
                    <div></div>
                ))}
            </div>

        </div>
    );
};

export default ViewAssignment;