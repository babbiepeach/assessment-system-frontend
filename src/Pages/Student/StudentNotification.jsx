import React, { useState } from "react";
import Notify from "/src/assets/notify.png";
import data from "/src/Pages/Data/data.json";

const StudentNotification = () => {
    const notifications = data.notifications;

    const [selectedNotification, setSelectedNotification] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = (notification) => {
        setSelectedNotification(notification);
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        setSelectedNotification(null);
    };

    return (
        <div className="relative bg-white rounded-xl h-[100%] w-full font-poppins px-9 py-6 flex">
            {/* Main Notification List */}
            <div className={`pr-3  transition-all ${isSidebarOpen ? 'md:w-2/3' : 'w-full'}`}>
                <h2 className="text-xl font-semibold text-black mb-4">Notifications</h2>
                <div className="flex flex-col gap-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            onClick={() => openSidebar(notification)}
                            className="flex items-center bg-white p-4 rounded-lg border border-gray-300 shadow-sm cursor-pointer hover:bg-gray-50"
                        >
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

            {/* Sidebar Panel */}
            {isSidebarOpen && (
                <div className="fixed md:static right-0 top-0 md:top-auto bg-white md:w-1/3 w-[80%] h-full shadow-lg z-50 border-l border-gray-200 transition-transform duration-300">
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Notification Details</h3>
                            <button onClick={closeSidebar} className="text-gray-500 hover:text-black">&times;</button>
                        </div>
                        {selectedNotification && (
                            <>
                                <p className="text-blue-600 font-medium mb-2">{selectedNotification.message}</p>
                                <p className="text-sm text-gray-500 mb-4">{selectedNotification.date}</p>
                                <div className="text-sm text-gray-700">
                                    {selectedNotification.details || "No additional details provided."}
                                </div>
                            </>
                        )}
                        <div className="mt-auto pt-6">
                            <button
                                onClick={closeSidebar}
                                className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentNotification;
