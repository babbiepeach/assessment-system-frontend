import React from 'react';

const posts = [
    { id: 1, lecturer: 'Onuiri Ernest', date: 'Jan 30', message: 'Please take note of the following tasks and submissions (also see course outline): Quiz 3 is scheduled online for 5pm this evening on Google Classroom.', attachment: null },
    { id: 2, lecturer: 'Onuiri Ernest', date: 'Jan 31', message: 'Assignment 4 has been posted, due next week.', attachment: null },
    { id: 3, lecturer: 'Onuiri Ernest', date: 'Feb 1', message: 'Please remember to check the new grading policy.', attachment: null },
    { id: 4, lecturer: 'Onuiri Ernest', date: 'Feb 2', message: 'Updated lecture notes are available on the portal.', attachment: null },
    { id: 5, lecturer: 'Onuiri Ernest', date: 'Feb 3', message: 'Reminder: group presentations start on Monday.', attachment: null },
];

const StudentMain = () => {
    return (

        <div className="bg-white font-poppins rounded-xl h-full w-full max-h-screen flex flex-col">
            {/* Header - stays fixed at the top of this card */}
            <div className="bg-cover bg-class-background bg-center rounded-t-xl relative h-[190px] flex items-end p-6 flex-shrink-0">
                <div>
                    <h2 className="text-white text-2xl font-semibold">Modelling and Simulation</h2>
                    <p className="text-white text-sm">Dr Ernest</p>
                </div>
            </div>

            {/* Body section - scrolls */}
            <div className="flex flex-col md:flex-row p-6 gap-6 overflow-y-auto flex-1 scrollbar-hide">
                {/* Sidebar */}
                <div className="bg-[#f7f9fa] rounded-xl p-4 w-full md:w-[20%] h-fit flex-shrink-0">
                    <h3 className="text-md font-semibold mb-2">Upcoming</h3>
                    <p className="text-sm text-gray-600 mb-4">Woohoo you do not have any work!!!</p>
                    <a href="#" className="text-blue-500 text-sm font-medium">View All</a>
                </div>

                {/* Dynamic cards */}
                <div className="flex flex-col gap-4 w-full md:w-[70%]">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl border p-4 flex gap-4 shadow-sm">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full"></div>
                            <div className="w-full">
                                <h4 className="font-semibold text-sm">{post.lecturer}</h4>
                                <p className="text-xs text-gray-400 mb-2">{post.date}</p>
                                <p className="text-sm text-gray-700 mb-2">{post.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentMain;
