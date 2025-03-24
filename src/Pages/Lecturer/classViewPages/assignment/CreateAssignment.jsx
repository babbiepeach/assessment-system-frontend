import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { assignmentTypes, ROLE_LECTURER } from '../../../../redux/utils'
import { useCreateAssignmentMutation } from '../../../../redux/apis/api-slice';

const CreateAssignment = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignmentType: '', 
        // file: null,
        // fileName: '',
    });

    const { classInfo } = useSelector(state => state.storage)

    const [createAssignment, { isSuccess, isLoading }] = useCreateAssignmentMutation()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setFormData({ ...formData, fileName: file.name, file: fileURL });
        }
    };

    const handleCreateAssignment = async (e) => {
        e.preventDefault();

        try {
            await createAssignment({ 
                ...formData, 
                classId: classInfo?.id 
            })

        navigate(`/${ROLE_LECTURER}/classes/${classInfo?.name}`)
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="w-full flex flex-col h-screen">
            <div className="w-full flex-1 flex justify-center overflow-y-auto hide-scrollbar p-6 pb-32 bg-gray-50">
                <form onSubmit={handleCreateAssignment} className="w-3/4 bg-white h-fit rounded-xl p-8  font-poppins shadow-md">
                    <p className='text-dark-blue text-lg mb-5 font-semibold font-poppins'>Create Assignment</p>

                    {/* Title */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter assignment title"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Description</label>
                        <input
                            type="text"
                            name="description"
                            required
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter assignment description"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Assignment Type</label>
                        <select
                            type="text"
                            name="assignmentType"
                            required
                            value={formData.assignmentType}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value=''>Select</option>
                            {assignmentTypes.map(type => (
                                <option key={type.id} value={type.id}>
                                    {type.value}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* Attach */}
                    {/* <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Attach</h3>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="file" onChange={handleFileChange} className="hidden" />
                                <div className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition">
                                    📎
                                </div>
                                <span className="text-gray-600">Upload Document</span>
                            </label>
                        </div>
                        {formData.fileName && <p className="mt-2 text-sm text-gray-600">{formData.fileName}</p>}
                    </div> */}


                    {/* Submit button */}
                    <div className="mt-8 flex gap-4">
                        <button
                            type='submit'
                            disabled={isLoading}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            {isLoading ? 'Creating...' : 'Create Assignment'}
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="text-blue-600 underline self-center"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAssignment;

