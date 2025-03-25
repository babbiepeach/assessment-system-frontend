import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAllAssignmentsQuery, useGetNotificationsQuery } from '../../redux/apis/api-slice';
import dayjs from 'dayjs';
import { assignmentTypes, ROLE_STUDENT } from '../../redux/utils';
import { setAssignmentInfo } from '../../redux/slices/storage-slice';

const posts = [
    { id: 1, lecturer: 'Onuiri Ernest', date: 'Jan 30', message: 'Please take note of the following tasks and submissions (also see course outline): Quiz 3 is scheduled online for 5pm this evening on Google Classroom.', attachment: null },
    { id: 2, lecturer: 'Onuiri Ernest', date: 'Jan 31', message: 'Assignment 4 has been posted, due next week.', attachment: null },
    { id: 3, lecturer: 'Onuiri Ernest', date: 'Feb 1', message: 'Please remember to check the new grading policy.', attachment: null },
    { id: 4, lecturer: 'Onuiri Ernest', date: 'Feb 2', message: 'Updated lecture notes are available on the portal.', attachment: null },
    { id: 5, lecturer: 'Onuiri Ernest', date: 'Feb 3', message: 'Reminder: group presentations start on Monday.', attachment: null },
];

const StudentMain = () => {
    const { classInfo } = useSelector(state => state.storage)


    const { data: assignments, isLoading } = useGetAllAssignmentsQuery()
    const { data: announcements, isLoading: isLoadingAnnouncements } = useGetNotificationsQuery()

    return (
        <div className="bg-white font-poppins rounded-xl h-full w-full max-h-screen flex flex-col">
            {/* Header - stays fixed at the top of this card */}
            <div className="bg-cover bg-class-background bg-center rounded-t-xl relative h-[190px] flex items-end p-6 flex-shrink-0">
                <div>
                    <h2 className="text-white text-2xl font-semibold">{classInfo.name}</h2>
                    <p className="text-white text-sm">{classInfo.teacher.fullName}</p>
                </div>
            </div>

            {/* Body section - scrolls */}
            <div className="flex flex-col md:flex-row p-4 gap-6 overflow-y-auto flex-1 scrollbar-hide">
                {/* Sidebar */}
                {isLoading && (
                    <div className='w-1/4 flex flex-col'>
                        <div className='w-full h-12 mb-4 rounded-lg bg-gray-300 animate-pulse' />
                        <div className='w-full h-12 mb-4 rounded-lg bg-gray-300 animate-pulse' />
                        <div className='w-full h-12 mb-4 rounded-lg bg-gray-300 animate-pulse' />
                    </div>
                )}
                {(assignments?.length === 0 || !assignments) && (!isLoading) && (
                    <div className="bg-[#f7f9fa] rounded-xl p-4 w-full md:w-1/4 h-fit flex-shrink-0">
                        <h3 className="text-md font-semibold mb-2">Upcoming</h3>
                        <p className="text-sm text-gray-600 mb-4">Woohoo you do not have any work!!!</p>
                        <a href="#" className="text-blue-500 text-sm font-medium">View All</a>
                    </div>
                )}
                {assignments && (
                    <div className='w-1/4'>
                        {assignments?.map(assignment => (
                            <Link
                                to={`/${ROLE_STUDENT}/classes/assignment/view/${assignment?.title}`}
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
                )}

                {/* Dynamic cards */}
                <div className="flex flex-col gap-4 w-full md:w-3/4">
                {isLoadingAnnouncements && (
                    <div className='w-3/4 flex flex-col'>
                        <div className='w-full h-16 mb-4 rounded-lg bg-gray-300 animate-pulse' />
                        <div className='w-full h-16 mb-4 rounded-lg bg-gray-300 animate-pulse' />
                        <div className='w-full h-16 mb-4 rounded-lg bg-gray-300 animate-pulse' />
                    </div>
                )}
                    {announcements?.map(note => (
                        <div key={note?.id} className="bg-white rounded-lg shadow p-4 border border-blue-500 relative">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                                    {classInfo?.teacher?.fullName?.[0]}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700">{classInfo.teacher.fullName}</h4>
                                    <p className="text-sm text-gray-500">{dayjs(note?.date).format('MMM DD')}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">{note?.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentMain;
