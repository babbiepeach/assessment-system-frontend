import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ROLE_LECTURER } from '../../redux/utils';
import { useGetAllClassesQuery } from '../../redux/apis/api-slice';

const LecturerClasses = () => {
    const location = useLocation();
    const { className } = location.state || {};

    const { data: classList, isLoading } = useGetAllClassesQuery()

    const classes = classList?.createdClasses ?? []

    if (className) {
        classes?.unshift(className);
    }

    return (
        <div className='bg-white font-poppins rounded-xl h-full w-full px-6 py-8'>
            <div className='px-10 flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl font-bold text-dark-gray'>Classes</h1>

                    <Link to={`/${ROLE_LECTURER}/classes/create-class`}>
                        <button className="px-6 py-2 bg-light-blue text-base text-white font-medium rounded-lg shadow-md">
                            Create Class
                        </button>
                    </Link>
                </div>
                <p className='text-gray-500 text-sm'>View your created classes</p>
            </div>
            
            <div className="flex flex-wrap gap-6 overflow-y-auto max-h-[calc(100vh-150px)] pr-2">
                {classes?.map((cls, idx) => (
                    <Link
                        key={idx}
                        to={`/lecturer/class-main`}
                        state={{ className: cls }}
                        className="w-[30%] min-w-[200px] border rounded-lg shadow-sm overflow-hidden hover:scale-105 transition-transform"
                    >
                        <div className="h-24 bg-gradient-to-r from-blue-600 to-green-500 p-3 text-white font-semibold">
                            {cls}
                        </div>
                        <div className="h-24 bg-white relative">
                            <div className="absolute bottom-2 right-2 text-gray-500">
                                <i className="fa-regular fa-folder"></i>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LecturerClasses;

