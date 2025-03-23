import React from 'react'

const YesNoPrompt = ({ promptMessage, handleSubmit, handleCancel, isLoading, isNegativePrompt }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-[400px] flex flex-col justify-center items-center">

                <p className='w-3/4 text-center' dangerouslySetInnerHTML={{ __html: promptMessage || 'Are you sure you want to continue?' }} />

                <div className="flex justify-center gap-2 mt-6">
                    <button
                        disabled={isLoading}
                        onClick={handleCancel}
                        className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={handleSubmit}
                        style={{ backgroundColor: isNegativePrompt ? '#c50000' : '#2563eb' }}
                        className="px-4 py-2 text-white rounded-md"
                    >
                        Yes, Continue
                    </button>
                </div>
            </div>
        </div>
    )
}

export default YesNoPrompt