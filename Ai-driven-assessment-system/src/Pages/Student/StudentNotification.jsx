// import React from 'react'

// const StudentNotification = () => {
//     return (
//         <div className='bg-white rounded-xl h-[100%] w-[100%]'>

//         </div>
//     )
// }

// export default StudentNotification


import React from "react";
import Notify from "/src/assets/notify.png"; // Importing custom notification icon
import data from "/src/Pages/Data/data.json"; // Import the JSON file

const StudentNotification = () => {
    const notifications = data.notifications; // Extract notifications

    return (
        <div className="bg-white rounded-xl h-[100%] w-[100%] font-poppins px-9 py-6 ">
            <h2 className="text-xl font-semibold text-black mb-4">Notifications</h2>
            <div className="flex flex-col gap-4">
                {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-center bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img src={Notify} alt="Notification" className="w-8 h-8" />
                        </div>
                        <div className="flex-1 ml-4">
                            <p className="text-blue-600 font-medium">{notification.message}</p>
                        </div>
                        <p className="text-sm text-gray-500">{notification.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentNotification;