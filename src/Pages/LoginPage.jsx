import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { ROLE_STUDENT, ROLE_LECTURER } from "../redux/utils.jsx";
import { setError } from '../redux/slices/message-slice.js'
import Logo from '/ScLearn.png'

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [passwordType, setPasswordType] = useState('password')
    const [password, setPassword] = useState(null)
    const [studentId, setStudentId] = useState(null)

    // const { user } = useSelector(state => state.auth)
    const [user, setUser] = useState({ role: null }); // before api integration

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(studentId, password)
        setUser({ role: 'student' }) // before api integration
    }

    useEffect(() => {
        if (user.role) {
            const role = user.role
            switch (role) {
                case ROLE_STUDENT:
                    navigate(`/${ROLE_STUDENT}`)
                    break;
                case ROLE_LECTURER:
                    navigate(`/${ROLE_LECTURER}`)
                    break;
                default:
                    dispatch(setError('Invalid User Role'))
                    navigate(`/`)
                    break;
            }
        }
    }, [user.role])

    return (
        <div className='bg-not-white font-poppins flex justify-center items-center w-[100vw] h-[100vh]'>
            <div className='w-3/4 bg-white rounded-2xl h-[85%] flex gap-12'>
                <div className='flex bg-gradient-to-r rounded-2xl from-light-blue to-bright-yellow justify-center items-center bg-cover w-1/2'>
                    <div className='w-[270px] h-[240px] rounded-lg backdrop-blur-md bg-white/20 p-6 text-center max-w-md flex flex-col justify-center items-center'>
                        <p className="text-white text-lg font-semibold">
                            Connecting <br /> Teachers, Inspiring <br /> Students with{" "}
                            <span className="text-bright-yellow font-bold">Sc</span>
                            <span className="text-logo-blue font-bold">Learn.</span>
                        </p>
                        <p className="text-white text-sm mt-2">
                            Transforming Education, One <br /> Click at a Time.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleLogin} className='flex flex-col items-center justify-center w-1/2 relative px-[24px] py-8 gap-5 '>
                    <img src={Logo} className='w-[5rem] absolute top-5 right-5' />

                    <h2 className='text-center text-2xl font-bold text-light-blue'>Login</h2>

                    <div className='w-full flex flex-col gap-4 pr-6'>
                        <fieldset className="flex flex-col gap-3">
                            <label htmlFor='id' className="text-gray-700 font-medium mb-1">
                                Identification Number
                            </label>
                            <input
                                id='id'
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your ID"
                                onChange={(e) => setStudentId(e.target.value)}
                            />
                        </fieldset>

                        <fieldset className="flex flex-col gap-3">
                            <label htmlFor='password' className="text-gray-700 font-medium mb-1">
                                Password
                            </label>
                            <div className='relative w-full'>
                                <input
                                    id='password'
                                    type={passwordType}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {passwordType === 'password' && (
                                    <p onClick={() => setPasswordType('text')} className='absolute right-2 top-3 text-gray-400 cursor-pointer'>
                                        Show
                                    </p>
                                )}
                                {passwordType === 'text' && (
                                    <p onClick={() => setPasswordType('password')} className='absolute right-2 top-3 text-gray-400 cursor-pointer'>
                                        Hide
                                    </p>
                                )}
                            </div>
                        </fieldset>

                        <Link to='/#' className="text-sm pt-2 text-dark-blue hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <div className='w-full flex justify-center'>
                        {/* <button 
                        type='submit' 
                        // disabled={isLoading}  // button disabled while api fetches
                        className="w-[60%] text-white font-medium py-2 rounded-lg bg-soft-pink transition">
                            Sign Up
                        </button> */}
                        <button
                            type='submit'
                            // disabled={isLoading}  // button disabled while api fetches
                            className="w-[60%] text-white font-medium py-2 rounded-lg bg-dark-blue transition">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;