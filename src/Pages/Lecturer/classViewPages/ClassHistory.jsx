import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import YesNoPrompt from '../../../common-components/YesNoPrompt'

import { ROLE_LECTURER } from '../../../redux/utils'
import { useDeactivateClassMutation, useDeleteClassMutation, useGetStudentsInClassQuery, useRemoveStudentFromClassMutation } from '../../../redux/apis/api-slice'

const ClassHistory = ({ id }) => {
    const navigate = useNavigate()
    const [studentId, setStudentId] = useState(null)
    const [studentName, setStudentName] = useState('')
    const [showRemoveStudent, setShowRemoveStudent] = useState(false)
    const [showDeleteClass, setShowDeleteClass] = useState(false)
    const [showDisableClass, setShowDisableClass] = useState(false)

    const [removeStudent, { isLoading: isLoadingRemoveStudent }] = useRemoveStudentFromClassMutation()
    const [deleteClass, { isLoading: isLoadingDeleteClass }] = useDeleteClassMutation()
    const [disableClass, { isLoading: isLoadingDisableClass }] = useDeactivateClassMutation()
    const { data: studentsList, isLoading: isLoadingStudentList } = useGetStudentsInClassQuery({ id })

    const removeClick = (id, name) => {
        setStudentId(id)
        setStudentName(name)
        setShowRemoveStudent(true)
    }

    const handleRemoveStudent = async () => {
        try {
            await removeStudent({
                id,
                studentId,
            })
        } catch (error) {
            console.error(error)
        } finally {
            setShowRemoveStudent(false)
        }
    }
    const handleDeleteClass = async () => {
        try {
            await deleteClass({
                id,
            })
        } catch (error) {
            console.error(error)
        } finally {
            navigate(`/${ROLE_LECTURER}/classes`)
            setShowDeleteClass(false)
        }
    }
    const handleDisableClass = async () => {
        try {
            await disableClass({
                id,
            })
        } catch (error) {
            console.error(error)
        } finally {
            navigate(`/${ROLE_LECTURER}/classes`)
            setShowDisableClass(false)
        }
    }

    return (
        <div className='w-full h-full p-6 flex gap-6'>
            <div className='w-1/2 p-4 rounded-lg shadow-sm border border-gray-200'>
                <p className='text-dark-blue mb-2'>Enrolled Students</p>
                <div className='flex flex-col'>
                    {isLoadingStudentList && (
                        <React.Fragment>
                            <div className='w-full h-12 rounded-lg bg-gray-200 my-1 animate-pulse' />
                            <div className='w-full h-12 rounded-lg bg-gray-200 my-1 animate-pulse' />
                            <div className='w-full h-12 rounded-lg bg-gray-200 my-1 animate-pulse' />
                            <div className='w-full h-12 rounded-lg bg-gray-200 my-1 animate-pulse' />
                            <div className='w-full h-12 rounded-lg bg-gray-200 my-1 animate-pulse' />
                        </React.Fragment>
                    )}
                    {(studentsList?.length === 0) && (!isLoadingStudentList) && (
                        <p className='text-gray-200'>No student has enrolled</p>
                    )}
                    {!studentsList && (
                        <p className='text-gray-200'>No student has enrolled</p>
                    )}
                    {studentsList?.map(student => (
                        <div key={student?.id} className='flex items-center justify-between p-3 py-4 border-b border-b-gray-200'>
                            <p>{student?.name}</p>
                            <button onClick={() => removeClick(student?.id, student?.name)} className='bg-red-600 text-white rounded-md p-1 px-2 text-sm'>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className='w-1/2 p-4 rounded-lg shadow-sm border border-red-600'>
                <p className='text-red-600 font-bold text-lg'>Danger Zone</p>

                <p>These actions are irreversible.</p>

                <div className="w-fit  my-2 flex flex-col gap-2">
                    <button
                        onClick={() => setShowDeleteClass(true)}
                        className='bg-red-600 text-white rounded-md p-2 text-sm'>
                        Delete Class
                    </button>

                    <button
                        onClick={() => setShowDeleteClass(true)}
                        className='text-red-600 border border-red-600 rounded-md p-2 text-sm'>
                        Deactivate Class
                    </button>
                </div>
            </div>

            {showRemoveStudent && (
                <YesNoPrompt
                    promptMessage={`Are you sure you want to remove this student: <span className='font-bold'>${studentName}</span>?`}
                    handleSubmit={handleRemoveStudent}
                    handleCancel={() => setShowRemoveStudent(false)}
                    isNegativePrompt={true}
                    isLoading={isLoadingRemoveStudent}
                />
            )}
            {showDeleteClass && (
                <YesNoPrompt
                    promptMessage={`Are you sure you want to delete this class?`}
                    handleSubmit={handleDeleteClass}
                    handleCancel={() => setShowDeleteClass(false)}
                    isNegativePrompt={true}
                    isLoading={isLoadingDeleteClass}
                />
            )}
            {showDisableClass && (
                <YesNoPrompt
                    promptMessage={`Are you sure you want to disable this class?`}
                    handleSubmit={handleDisableClass}
                    handleCancel={() => setShowDisableClass(false)}
                    isNegativePrompt={true}
                    isLoading={isLoadingDisableClass}
                />
            )}
        </div>
    )
}

export default ClassHistory