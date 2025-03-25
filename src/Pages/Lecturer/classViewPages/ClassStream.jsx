import React, { useEffect, useState } from 'react';
import DocImage from '../../../assets/docs.jpg';
import Xmark from '../../../assets/xmarks.jpg';
import { MoreVertical } from 'lucide-react';
import dayjs from 'dayjs';

import {
    useGetNotificationsQuery,
    useMarkNotificationAsReadMutation,
    useSendNotificationToClassMutation
} from '../../../redux/apis/api-slice';
import { useSelector } from 'react-redux';

const ClassStream = ({ classId }) => {
    const [showModal, setShowModal] = useState(false);

    const [noteTitle, setNoteTitle] = useState('');
    const [noteBody, setNoteBody] = useState('');
    const [file, setFile] = useState(null);
    const [menuIndex, setMenuIndex] = useState(null);

    const { userDetails } = useSelector(state => state.auth)

    const { data: announcements, isLoading } = useGetNotificationsQuery()
    const [sendNotificationToClass, { isLoading: isLoadingSend, isSuccess: isSuccessSend }] = useSendNotificationToClassMutation()
    const [deleteNotification, { isLoading: isLoadingDelete, isSuccess: isSuccessDelete }] = useSendNotificationToClassMutation()


    const handleSendNotification = async (e) => {
        e.preventDefault()

        try {
            await sendNotificationToClass({
                classId,
                title: noteTitle,
                message: noteBody
            })

            setNoteTitle('');
            setNoteBody('');
            setFile(null);
            setShowModal(false);
        } catch (error) {
            console.error(error)
        } 
    };

    const handleDelete = async ({id}) => {
        try {
            await deleteNotification({
                id: id
            })

            setMenuIndex(null)
        } catch (error) {
            console.error(error)
        } 
    };

    const handleRemoveFile = () => setFile(null);

    return (
        <div>
            <div className="flex gap-12 flex-1 overflow-hidden px-6">
                <div className="bg-[#f7f9fa] h-48 shadow rounded-lg p-4 flex flex-col items-center flex-shrink-0">
                    <h3 className="text-gray-700 mb-2 font-medium">New Announcement</h3>
                    <p className="text-sm text-gray-500 mb-4 text-center">Add Announcements for your students to see</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
                    >
                        Add
                    </button>
                </div>

                {/* SCROLLABLE ANNOUNCEMENTS */}
                <div className="w-3/4 flex flex-col space-y-4 overflow-y-auto max-h-[500px] custom-scroll pr-2">
                    {announcements?.map(note => (
                        <div key={note?.id} className="bg-white rounded-lg shadow p-4 border border-blue-500 relative">
                            <div className="absolute top-4 right-4 cursor-pointer">
                                <MoreVertical onClick={() => setMenuIndex(menuIndex === note?.id ? null : note?.id)} />
                                {menuIndex === note?.id && (
                                    <div className="absolute right-0 mt-2 w-24 bg-white shadow rounded-md border z-10">
                                        <button
                                            onClick={() => handleDelete(note?.id)}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                                        >Delete</button>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                                    {userDetails?.fullName?.[0]}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700">{userDetails?.fullName}</h4>
                                    <p className="text-sm text-gray-500">{dayjs(note?.date).format('MMM DD')}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">{note?.message}</p>

                            {/* {note?.file && (
                                <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-md">
                                    <img
                                        src={DocImage}
                                        alt="Attachment"
                                        className="w-12 h-12 rounded-md object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-700">{note?.file.name}</p>
                                        <p className="text-xs text-gray-500">{note?.file.type.toUpperCase()}</p>
                                    </div>
                                </div>
                            )} */}
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <form onSubmit={handleSendNotification} className="bg-white p-6 rounded-lg w-[400px] space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700">New Announcement</h3>

                        <div className='w-full flex gap-2 items-center'>
                            <p>Title:</p>
                            <input
                                value={noteTitle}
                                onChange={(e) => setNoteTitle(e.target.value)}
                                required
                                placeholder='Enter title'
                                className='h-10 border border-gray-200 rounded-md p-2 w-full'
                            />
                        </div>

                        <textarea
                            value={noteBody}
                            required
                            onChange={(e) => setNoteBody(e.target.value)}
                            placeholder="Write your announcement here..."
                            className="w-full p-2 border rounded-md h-24 resize-none"
                        />

                        {/* {file ? (
                            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                                <span className="text-sm">{file.name}</span>
                                <img
                                    src={Xmark}
                                    alt="Remove file"
                                    onClick={handleRemoveFile}
                                    className="w-5 h-5 cursor-pointer"
                                />
                            </div>
                        ) : (
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full text-sm text-gray-600"
                            />
                        )} */}

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setNoteBody('');
                                    setFile(null);
                                }}
                                className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isLoadingSend}
                                type='submit'
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                {isLoadingSend ? 'Sending...' : 'Send'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ClassStream;
