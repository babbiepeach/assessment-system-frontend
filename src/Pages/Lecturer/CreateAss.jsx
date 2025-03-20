import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassNavbar from '../../components/ClassNavbar';

const CreateAss = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        instructions: '',
        fileName: '',
        points: '',
        dueDate: '',
        topic: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, fileName: file.name });
        }
    };

    const handleSubmit = () => {
        localStorage.setItem('assignment', JSON.stringify(formData));
        navigate('/class-assignment');
    };

    return (
        <div className="flex flex-col h-screen">
            <ClassNavbar />
            <div className="flex-1 overflow-y-auto hide-scrollbar p-4 pb-32 bg-gray-50">
                <div className="bg-white rounded-xl p-8 w-full max-w-5xl mx-auto font-poppins shadow-md">
                    {/* Title */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter assignment title"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Instructions */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Instructions (optional)</label>
                        <textarea
                            name="instructions"
                            value={formData.instructions}
                            onChange={handleChange}
                            placeholder="Add instructions for students"
                            rows="5"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    {/* Attach */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Attach</h3>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="file" onChange={handleFileChange} className="hidden" />
                                <div className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-700"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l3-3m-3 3l-3-3m0-4a4 4 0 118 0 4 4 0 01-8 0z" />
                                    </svg>
                                </div>
                                <span className="text-gray-600">Upload Document</span>
                            </label>
                        </div>
                        {formData.fileName && <p className="mt-2 text-sm text-gray-600">{formData.fileName}</p>}
                    </div>

                    {/* Points */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Points (max 100)</label>
                        <input
                            type="number"
                            name="points"
                            value={formData.points}
                            onChange={handleChange}
                            max="100"
                            min="0"
                            placeholder="e.g. 50"
                            className="w-32 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Due Date */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-64 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Topic */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Topic</label>
                        <input
                            type="text"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            placeholder="e.g. Assignment 1"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit button */}
                    <div className="mt-8">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Create Assignment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAss;