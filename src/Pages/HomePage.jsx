import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div>
            <h1 className='p-2 m-2'>Homepage</h1>
            <Link to={'/login'} className='bg-blue-600 p-2 m-2 text-white'>Login</Link>
        </div>
    )
}

export default HomePage

