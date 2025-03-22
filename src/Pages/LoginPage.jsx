import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Logo from '/ScLearn.png'

import { ROLE_STUDENT, ROLE_LECTURER, roleList } from "../redux/utils.jsx";
import { setError } from '../redux/slices/message-slice.js'
import { useRegisterMutation, useLoginMutation } from '../redux/apis/api-slice.js'

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showRegisterFrom, setShowRegisterForm] = useState(false)
    const [passwordType, setPasswordType] = useState('password')

    const LoginForm = ({ setPasswordType, passwordType, navigate, dispatch, setShowRegisterForm }) => {
        const [password, setPassword] = useState('')
        const [userId, setUserId] = useState('')

        const { user } = useSelector(state => state.auth)

        const [login, { isLoading }] = useLoginMutation()

        const handleLogin = async (e) => {
            e.preventDefault()
            try {
                await login({
                    matricOrStaffId: userId,
                    password: password,
                })
            } catch (error) {
                console.error(error)
            }
        }

        useEffect(() => {
            if (user) {
                const role = user?.role?.toLowerCase()
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
        }, [user])

        return (
            <form onSubmit={handleLogin} className='flex flex-col items-center justify-center w-full px-[24px] py-8 gap-5 '>
                <div className='w-full flex flex-col gap-4'>
                    <fieldset className="flex flex-col gap-3">
                        <label htmlFor='id' className="text-gray-700 font-medium mb-1">
                            Identification Number
                        </label>
                        <input
                            id='id'
                            type="text"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your Matric Number (Student) or Staff ID (Teacher)"
                            onChange={(e) => setUserId(e.target.value)}
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
                        {password.length < 6 && (<p className='text-red-600'>Password must have a minimum 6 characters.</p>)}
                    </fieldset>
                </div>

                <div className='w-full flex flex-col items-center justify-center pt-4'>
                    <button
                        type='submit'
                        disabled={isLoading}  
                        className={`w-[60%] text-white font-medium py-2 rounded-lg transition ${isLoading ? 'bg-gray-600' :'bg-dark-blue'}`}>
                        Login
                    </button>
                    <p className='pt-3' onClick={() => setShowRegisterForm(true)}>
                        or <span className='underline cursor-pointer'>Register</span>.
                    </p>
                </div>
            </form>
        )
    }

    const RegisterForm = ({ passwordType, setPasswordType, setShowRegisterForm }) => {
        const [password, setPassword] = useState('')
        const [userId, setUserId] = useState('')
        const [email, setEmail] = useState('')
        const [role, setRole] = useState('')
        const [fullName, setFullName] = useState({
            firstName: '',
            lastName: '',
        })

        const [register, { isLoading, isSuccess }] = useRegisterMutation()

        const handleRegister = async (e) => {
            e.preventDefault()

            try {
                await register({
                    fullName: `${fullName.firstName} ${fullName.lastName}`,
                    matricOrStaffId: userId,
                    email: email,
                    password: password,
                    role: role,
                })
            } catch (error) {
                console.error(error)
            }
        }

        useEffect(() => {
            if (isSuccess && !isLoading) {
                setShowRegisterForm(false)
            }
        }, [isSuccess, isLoading])

        return (
            <form onSubmit={handleRegister} className='flex flex-col items-center justify-center w-full px-[24px] py-8 gap-5 '>
                <div className='w-full flex flex-col gap-4'>
                    <div className='flex gap-2 w-full'>
                        <fieldset className="w-1/2 flex flex-col gap-3">
                            <label htmlFor='firstName' className="text-gray-700 font-medium mb-1">
                                First Name
                            </label>
                            <input
                                id='firstName'
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your first name"
                                onChange={(e) => setFullName(prevState => ({ ...prevState, firstName: e.target.value }))}
                            />
                        </fieldset>
                        <fieldset className="w-1/2 flex flex-col gap-3">
                            <label htmlFor='lastName' className="text-gray-700 font-medium mb-1">
                                Last Name
                            </label>
                            <input
                                id='lastName'
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your last name"
                                onChange={(e) => setFullName(prevState => ({ ...prevState, lastName: e.target.value }))}
                            />
                        </fieldset>
                    </div>

                    <fieldset className="flex flex-col gap-3">
                        <label htmlFor='id' className="text-gray-700 font-medium mb-1">
                            Identification Number
                        </label>
                        <input
                            id='id'
                            type="text"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your Matric Number (Student) or Staff ID (Teacher)"
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </fieldset>

                    <fieldset className="flex flex-col gap-3">
                        <label htmlFor='email' className="text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            id='email'
                            type="email"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="email@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </fieldset>

                    <fieldset className="flex flex-col gap-3">
                        <label htmlFor='role' className="text-gray-700 font-medium mb-1">
                            Select Role
                        </label>
                        <select
                            id='role'
                            type="text"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            defaultValue={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value='' className='text-gray-600'> Select </option>
                            {roleList.map(role => (
                                <option key={role.id} value={role.id}>
                                    {role.value}
                                </option>
                            ))}
                        </select>
                    </fieldset>

                    <fieldset className="flex flex-col gap-3">
                        <label htmlFor='password' className="text-gray-700 font-medium mb-1">
                            Create Password
                        </label>
                        <div className='relative w-full'>
                            <input
                                id='password'
                                type={passwordType}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Create your password"
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
                        {password.length < 6 && (<p className='text-red-600'>Password must have a minimum 6 characters.</p>)}
                    </fieldset>
                </div>

                <div className='w-full flex flex-col items-center justify-center pt-4'>
                    <button
                        type='submit'
                        disabled={isLoading}
                        className={`w-[60%] text-white font-medium py-2 rounded-lg transition ${isLoading ? 'bg-gray-600' :'bg-dark-blue'}`}>
                        Register
                    </button>
                    <p className='pt-3' onClick={() => setShowRegisterForm(false)}>
                        or <span className='underline cursor-pointer'>Login</span>.
                    </p>
                </div>
            </form>
        )
    }

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

                <div className='w-1/2 h-full overflow-y-scroll place-content-center place-items-center relative'>
                    <img src={Logo} className='w-[5rem] absolute top-5 right-5' />

                    <h2 className='w-full inline-flex justify-center text-2xl font-bold text-light-blue'>
                        {showRegisterFrom ? 'Register' : 'Login'}
                    </h2>

                    {!showRegisterFrom && (
                        <LoginForm
                            passwordType={passwordType}
                            setPasswordType={setPasswordType}
                            dispatch={dispatch}
                            navigate={navigate}
                            setShowRegisterForm={setShowRegisterForm}
                        />
                    )}
                    {showRegisterFrom && (
                        <RegisterForm
                            passwordType={passwordType}
                            setPasswordType={setPasswordType}
                            setShowRegisterForm={setShowRegisterForm}
                        />
                    )}

                </div>
            </div>
        </div>
    )
}

export default LoginPage;