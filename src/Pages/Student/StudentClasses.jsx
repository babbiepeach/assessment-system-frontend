import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import folderIcon from '../../assets/folder.png';

import { ROLE_STUDENT } from '../../redux/utils';
import { useGetAllClassesQuery } from '../../redux/apis/api-slice';

const StudentClasses = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const joinedClassName = params.get('name');
    const joinedClassCode = params.get('code');

    const { data: classes, isLoading } = useGetAllClassesQuery()
    const classList = classes?.enrolledClasses || []

    return (
        <div className='h-full bg-white rounded-xl w-full'>
            <div className='py-5 px-10 flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl font-bold text-dark-gray'>My Classes</h1>

                    <Link to={`/${ROLE_STUDENT}/classes/join-class`}>
                        <button className="px-6 py-2 bg-light-blue text-base text-white font-medium rounded-lg shadow-md">
                            Join Class
                        </button>
                    </Link>
                </div>
                <p className='text-gray-500 text-sm'>View your joined classes</p>
            </div>
            <div className='flex flex-wrap px-10 gap-5'>
                {classList?.length === 0 && !isLoading && (
                    <p className="text-gray-500">No classes joined yet.</p>
                )}
                {joinedClassName && (
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
                )}
            </div>
        </div>
    );
};

export default StudentClasses;

