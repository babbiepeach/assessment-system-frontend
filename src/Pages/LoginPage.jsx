import React from 'react'

const LoginPage = () => {
    return (
        <div className='bg-not-white flex justify-center items-center w-[100vw] h-[100vh]'>
            <div className='w-[70%] bg-white h-[85%] flex gap-12'>
                <div className='flex justify-center items-center bg-hero-login bg-cover w-[50%]'>
                    <div className='w-[270px] h-[240px] rounded-lg backdrop-blur-md bg-white/20 p-6 text-center max-w-md flex flex-col justify-center items-center'>
                        <p className="text-white text-lg font-semibold">
                            Connecting <br /> Teachers, Inspiring <br /> Students with{" "}
                            <span className="text-blue-500 font-bold">Sc</span>
                            <span className="text-red-500 font-bold">Learn.</span>
                        </p>
                        <p className="text-white text-sm mt-2">
                            Transforming Education, One <br /> Click at a Time.
                        </p>
                    </div>
                </div>
                <div className='flex px-[24px] py-8 gap-5 flex-col w-[50%]'>
                    <div className="flex justify-end items-end" >
                        <img src="src/assets/ScLearn-logo.png" className='w-[4.5rem] flex' />
                    </div>
                    <h2 className='text-center text-darkest-blue'>Login</h2>
                    <div className='flex flex-col gap-4 pr-6'>
                        <div className="pb-4">
                            <label className="block text-gray-700 font-medium mb-1">
                                Identification Number
                            </label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your ID"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                            <div className="text-sm pt-2">
                                <a href="#" className="text-blue-500 hover:underline">
                                    Forget Password?
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button className="w-[60%] text-white font-medium py-2 rounded-lg bg-pink transition">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;