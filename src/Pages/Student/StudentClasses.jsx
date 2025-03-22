import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import folderIcon from '/src/assets/folder.png';

const StudentClasses = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const joinedClassName = params.get('name');
    const joinedClassCode = params.get('code');

    return (
        <div className='h-full bg-white rounded-xl w-full'>
            <div className='py-5 px-10 flex flex-col gap-2'>
                <h1 className='text-xl font-bold text-dark-gray'>My Classes</h1>
                <p className='text-gray-500 text-sm'>View your joined classes</p>
            </div>
            <div className='flex flex-wrap px-10 gap-5'>
                {joinedClassName ? (
                    <Link
                        to="/student/student-main"
                        className="flex flex-col border border-dark-gray bg-white rounded-xl shadow-sm relative w-[280px] h-[210px] hover:scale-[1.02] transition-transform"
                    >
                        <div className='flex flex-col gap-1 bg-class-background rounded-tl-xl rounded-tr-xl px-3 pt-2 h-20 text-white'>
                            <h3 className="text-md font-semibold">{joinedClassName}</h3>
                            <p className="text-sm">Class Code: {joinedClassCode}</p>
                        </div>
                        <div className="absolute top-14 right-5 h-10 w-10 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
                            {joinedClassName[0]}
                        </div>
                        <img
                            src={folderIcon}
                            alt="folder"
                            className="absolute bottom-3 right-3 w-5"
                        />
                    </Link>
                ) : (
                    <p className="text-gray-500">No classes joined yet.</p>
                )}
            </div>
        </div>
    );
};

export default StudentClasses;

