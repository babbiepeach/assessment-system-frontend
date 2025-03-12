import React from 'react'
import { useNavigate } from 'react-router-dom'

const FourZeroFour = () => {
  const navigate = useNavigate()
  
  return (
    <div className='w-full h-screen bg-black flex flex-col gap-4 items-center justify-center'>
      <h4 className='text-md text-white'>Page not found</h4>
      <button onClick={() => navigate(-1)} className='bg-blue-600 px-4 py-2 text-sm text-white rounded-md'>Back</button>
    </div>
  )
}

export default FourZeroFour