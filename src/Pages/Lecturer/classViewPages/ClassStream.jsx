import React, { useEffect, useState } from 'react';
import DocImage from '../../../assets/docs.jpg';
import Xmark from '../../../assets/xmarks.jpg';
import { MoreVertical } from 'lucide-react';

const ClassStream = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const [file, setFile] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [menuIndex, setMenuIndex] = useState(null);

    useEffect(() => {
        const savedAnnouncements = localStorage.getItem('announcements');
        if (savedAnnouncements) {
            setAnnouncements(JSON.parse(savedAnnouncements));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('announcements', JSON.stringify(announcements));
    }, [announcements]);

    const handleAddOrEditAnnouncement = () => {
        if (newAnnouncement.trim() === '' && !file) return;

        let fileData = null;

        if (file) {
            fileData = {
                name: file.name,
                type: file.type,
                url: URL.createObjectURL(file),
            };
        }

        let updated;

        if (editIndex !== null) {
            updated = announcements.map((item, idx) => (
                idx === editIndex ? { ...item, text: newAnnouncement, file: fileData } : item
            ));
        } else {
            updated = [...announcements, {
                text: newAnnouncement,
                file: fileData,
                date: new Date().toLocaleDateString()
            }];
        }

        setAnnouncements(updated);
        setNewAnnouncement('');
        setFile(null);
        setEditIndex(null);
        setShowModal(false);
    };

    const handleDelete = (index) => {
        setAnnouncements(announcements.filter((_, i) => i !== index));
        setMenuIndex(null);
    };

    const handleEdit = (index) => {
        const item = announcements[index];
        setNewAnnouncement(item.text);
        setFile(null); // Avoid re-upload on edit; show as is
        setEditIndex(index);
        setShowModal(true);
        setMenuIndex(null);
    };

    const handleRemoveFile = () => setFile(null);

    return (
        <div className="flex gap-12 flex-1 overflow-hidden">
            <div className="flex gap-12 flex-1 overflow-hidden">
                <div className="bg-[#f7f9fa] h-48 shadow rounded-lg p-4 flex flex-col items-center flex-shrink-0">
                    <h3 className="text-gray-700 mb-2 font-medium">New Announcement</h3>
                    <p className="text-sm text-gray-500 mb-4 text-center">Add Announcements for your students to see</p>
                    <button
                        onClick={() => { setShowModal(true); setEditIndex(null); }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
                    >
                        Add
                    </button>
                </div>

                {/* SCROLLABLE ANNOUNCEMENTS */}
                <div className="w-[75%] flex flex-col space-y-4 overflow-y-auto max-h-[500px] custom-scroll pr-2">
                    {announcements.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-4 border border-blue-500 relative">
                            <div className="absolute top-4 right-4 cursor-pointer">
                                <MoreVertical onClick={() => setMenuIndex(menuIndex === index ? null : index)} />
                                {menuIndex === index && (
                                    <div className="absolute right-0 mt-2 w-24 bg-white shadow rounded-md border z-10">
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        >Edit</button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                                        >Delete</button>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">O</div>
                                <div>
                                    <h4 className="font-semibold text-gray-700">Onuiri Ernest</h4>
                                    <p className="text-sm text-gray-500">{item.date}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">{item.text}</p>

                            {item.file && (
                                <a
                                    href={item.file.url}
                                    download={item.file.name}
                                    className="flex items-center space-x-4 bg-gray-100 p-3 rounded-md hover:bg-gray-200"
                                >
                                    <img
                                        src={DocImage}
                                        alt="Attachment"
                                        className="w-12 h-12 rounded-md object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-700">{item.file.name}</p>
                                        <p className="text-xs text-gray-500">{item.file.type.toUpperCase()}</p>
                                    </div>
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg w-[400px] space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700">{editIndex !== null ? 'Edit Announcement' : 'New Announcement'}</h3>
                        <textarea
                            value={newAnnouncement}
                            onChange={(e) => setNewAnnouncement(e.target.value)}
                            placeholder="Write your announcement here..."
                            className="w-full p-2 border rounded-md h-24 resize-none"
                        />
                        {file ? (
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
                        )}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => { setShowModal(false); setEditIndex(null); setNewAnnouncement(''); setFile(null); }}
                                className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddOrEditAnnouncement}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                {editIndex !== null ? 'Update' : 'Send'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassStream;
