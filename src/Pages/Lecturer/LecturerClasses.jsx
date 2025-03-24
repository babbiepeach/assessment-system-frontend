import React from 'react';
import { Link } from 'react-router-dom';

import { ROLE_LECTURER } from '../../redux/utils';
import { useGetAllClassesQuery } from '../../redux/apis/api-slice';
import { useDispatch } from 'react-redux';
import { setClassId, setClassInfo } from '../../redux/slices/storage-slice';

const LecturerClasses = () => {
    const dispatch = useDispatch()

    const { data: classList, isLoading } = useGetAllClassesQuery()

    const classes = classList?.createdClasses ?? []

    return (
        <div className='bg-white font-poppins rounded-xl h-full w-full px-10 py-8'>
            <div className='flex flex-col gap-2 mb-2'>
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

            <div className="flex flex-wrap gap-6 overflow-y-auto max-h-[calc(100vh-150px)]">
                {isLoading && (
                    <React.Fragment>
                        <div className='w-1/4 h-[15rem] rounded-lg bg-gray-300 animate-pulse' />
                        <div className='w-1/4 h-[15rem] rounded-lg bg-gray-300 animate-pulse' />
                        <div className='w-1/4 h-[15rem] rounded-lg bg-gray-300 animate-pulse' />
                    </React.Fragment>
                )}
                {(classes?.length === 0) && (!isLoading) && (
                    <p>You have not created any class</p>
                )}
                {!classes && (
                    <p>You have not created any class</p>
                )}
                {classes?.map(cls => (
                    <Link
                        key={cls?.id}
                        to={`/${ROLE_LECTURER}/classes/${cls?.name}`}
                        onClick={() => {
                            dispatch(setClassId(cls?.id))
                            dispatch(setClassInfo(cls))
                        }}
                        className="w-[30%] min-w-[200px] border rounded-lg shadow-sm overflow-hidden hover:scale-105 transition-transform"
                    >
                        <div className="h-24 bg-class-background pl-3 pt-3 text-xl rounded-lg text-white font-semibold">
                            <span className='capitalize'>{cls?.name}</span>
                        </div>
                        <div className='pl-2 pt-2'>
                            <p className='capitalize'>{cls?.description}</p>
                            <p className='text-gray-400'>{cls?.classCode}</p>
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

