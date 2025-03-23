import React, { useState } from 'react';
import { useCheckPlagiarismMutation } from '../../redux/apis/ai-check-slice';
import { useSelector } from 'react-redux';

const SimilarityChecker = () => {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);

    const handleFileChange = (event, setFile) => {
        setFile(event.target.files[0]);
    };

    const { accessToken } = useSelector(state => state.auth)
    const { similarityScore } = useSelector(state => state.storage)
    const [checkPlagiarism, { isLoading }] = useCheckPlagiarismMutation()

    // Handles form submission
    const handleSimilarityCheck = async (e) => {
        e.preventDefault();
        if (!file1 || !file2) {
            alert("Please upload both files before submitting.");
            return;
        } else {
            try {
                await checkPlagiarism({
                    file1, file2, token: accessToken
                })
            } catch (error) {
                console.error(error)
            }
        }
    };

    return (
        <div className='font-poppins relative w-full h-full rounded-xl bg-white flex flex-col gap-6 p-10 '>
            <div className=''>
                <p className='text-lg text-dark-blue font-semibold'>Similarity Checker</p>
                <p>This uses a custom AI service</p>
            </div>

            {similarityScore && (
                <div className='flex items-center gap-2'>
                    <p>Last Check Result:</p>
                    <p className='border border-black w-fit p-2 rounded-lg'>{Number(similarityScore)}%</p>
                </div>
            )}

            <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-semibold mb-4">Upload Files for Similarity Check</h2>
                <form onSubmit={handleSimilarityCheck} className="flex flex-col gap-4">
                    {/* File Input 1 */}
                    <div>
                        <label className="block text-gray-700">Upload File 1:</label>
                        <input
                            type="file"
                            accept='.txt,.docx,.pdf'
                            onChange={(e) => handleFileChange(e, setFile1)}
                            className="mt-1 block w-full border rounded-md p-2"
                            required
                        />
                        {file1 && <p className="text-sm text-green-600 mt-1">Selected: {file1.name}</p>}
                    </div>

                    {/* File Input 2 */}
                    <div>
                        <label className="block text-gray-700">Upload File 2:</label>
                        <input
                            type="file"
                            accept='.txt,.docx,.pdf'
                            onChange={(e) => handleFileChange(e, setFile2)}
                            className="mt-1 block w-full border rounded-md p-2"
                            required
                        />
                        {file2 && <p className="text-sm text-green-600 mt-1">Selected: {file2.name}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-light-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        {isLoading ? 'Checking...' : 'Upload & Check Similarity'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SimilarityChecker;