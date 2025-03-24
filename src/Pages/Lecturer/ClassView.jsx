import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ClassStream from './classViewPages/ClassStream';
import ClassAssignment from './classViewPages/ClassAssignment';
import ClassGrades from './classViewPages/ClassGrades';
import ClassHistory from './classViewPages/ClassHistory';
import { setClassActiveTab } from '../../redux/slices/storage-slice';

const ClassView = () => {
    const dispatch = useDispatch()

    const { classId, classInfo, classActiveTab } = useSelector(state => state.storage)
    const activeTab = classActiveTab || 'tab1'
   
    const tabs = [
        {
            id: 'tab1',
            name: 'Stream',
            component: <ClassStream classId={classId} />
        },
        {
            id: 'tab2',
            name: 'Assignment',
            component: <ClassAssignment />
        },
        {
            id: 'tab3',
            name: 'Grading',
            component: <ClassGrades />
        },
        {
            id: 'tab4',
            name: 'History',
            component: <ClassHistory id={classId} isActive={classInfo?.isActive} />
        },
    ];

    return (
        <div className="h-[calc(100vh-64px)] w-full overflow-y-auto">
            <div className="flex flex-col font-poppins gap-6 bg-white min-h-full">
                <div className="bg-cover bg-class-background text-white bg-center rounded-t-xl relative h-[190px] flex items-end px-6">
                        <div className="px-4">
                            <h2 className="text-2xl font-semibold mb-3">{classInfo.name}</h2>

                            <div className="flex items-center w-full justify-between border-t border-b border-gray-200 px-6 py-3 bg-white">
                                <div className="flex items-center space-x-8">
                                    {tabs.map((tab) => {
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => dispatch(setClassActiveTab(tab.id))}
                                                className={`font-medium transition relative ${isActive
                                                    ? 'text-blue-600 after:content-[""] after:block after:h-[2px] after:bg-blue-600 after:w-full after:mt-1'
                                                    : 'text-gray-600 hover:text-blue-600'
                                                    }`}
                                            >
                                                {tab.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                {tabs.map((tab) => (
                    <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
                        {tab.component}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ClassView;