import React, { useRef, useState } from 'react';
import Plus from "/src/assets/plus.png";
import Xmark from "/src/assets/xmarks.jpg";
import ListNote from "/src/assets/list.png"


const AssignmentView = () => {
    const fileInputRef = useRef(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isMarked, setIsMarked] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setUploadedFiles((prev) => [...prev, ...filesArray]);
            e.target.value = null; // Reset input value so user can upload same file again
        }
    };

    const handleAddWorkClick = () => {
        fileInputRef.current.click();
    };

    const handleRemoveFile = (index) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);
        if (newFiles.length === 0) {
            setIsMarked(false);
        }
    };

    const toggleMark = () => {
        setIsMarked((prev) => !prev);
    };

    return (
        <div className="bg-white rounded-xl h-[100%] w-[100%] font-poppins p-6 flex flex-col md:flex-row gap-6 shadow-sm">
            {/* Left Section */}
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white w-6 text-xl"><img src={ListNote} /></span>
                    </div>
                    <h2 className="text-xl font-semibold">Modelling and Simulation</h2>
                </div>
                <p className="text-gray-600 text-sm mb-1">Assignment One</p>
                <p className="text-xs text-gray-500 mb-4">Dr Ernest &nbsp;&nbsp; • &nbsp;&nbsp; Feb 6</p>

                <div className="flex justify-between mb-4">
                    <p className="font-semibold">10 points</p>
                    <p className="font-semibold">Due Feb 9, 10:59pm</p>
                </div>

                <hr className="mb-4" />

                <p className="text-sm text-gray-700 mb-4">
                    Create a PHP script to output your Last Name, First Name, Phone Number, Email, and your favorite colour. Display each of these on separate line.
                </p>

                <hr />
            </div>

            {/* Right Section */}
            <div className="w-full md:w-[250px] border rounded-xl p-4">
                <h3 className="text-sm font-semibold mb-4">Your Work</h3>

                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                />

                {/* Add Work Button */}
                <button
                    onClick={handleAddWorkClick}
                    className="w-full border border-gray-300 text-blue-600 font-medium text-sm py-2 rounded-lg mb-4 flex items-center justify-center gap-2 hover:bg-gray-50"
                >
                    <span className='w-6'><img src={Plus} alt="plus sign" /></span> Add your Work
                </button>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                    <div className="space-y-2 mb-4">
                        {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between text-xs text-gray-600 bg-gray-100 p-2 rounded-md">
                                <span className="truncate w-[80%]">📄 {file.name}</span>
                                <button onClick={() => handleRemoveFile(index)} className="ml-2">
                                    <img src={Xmark} alt="remove" className="w-4 h-4 object-cover" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Mark as Done / Unmark */}
                <button
                    onClick={toggleMark}
                    disabled={uploadedFiles.length === 0}
                    className={`w-full ${uploadedFiles.length === 0 ? 'bg-gray-300 cursor-not-allowed' : isMarked ? 'bg-green-500' : 'bg-blue-400'
                        } text-white font-semibold text-sm py-2 rounded-lg mb-2 hover:opacity-90 transition`}
                >
                    {isMarked ? 'Unmark' : 'Mark as done'}
                </button>

                <p className="text-[11px] text-gray-400 mt-2">
                    Work cannot be turned in after due date
                </p>
            </div>
        </div>
    );
};

export default AssignmentView;

