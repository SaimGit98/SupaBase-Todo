'use client'
import React, { useContext, useEffect, useState } from 'react'
import FormModal from './FormModal'
import Image from 'next/image'
import svg from '@/assest/images/svg.svg'
import Link from 'next/link'
import { UserContext } from '@/context/userContext';



const Hero = () => {
    const { user } = useContext(UserContext)
    const [mount, setIsMount] = useState(false)
    console.log(user)

    useEffect(() => {
        setIsMount(true)
    }, []);
    if (!mount) {
        return null
    }


    return (
        <div className=' w-auto h-full cursor-pointer pl-2 mt-14 leading-none '>
            <div className=' w-full mt-5 md:flex md:items-center m-auto '>
                <div className=' w-auto pl-5 md:w-2/3 md:ml-7 lg:ml-10'>
                    <p className=' text-cyan-500 font-bold text-4xl md:text-5xl lg:text-6xl'>
                        Reshape
                    </p>
                    <p className=' text-slate-500 text-4xl font-bold md:text-5xl lg:text-6xl '>Your Lifestyle <br />
                        with <span className='text-cyan-500 font-bold text-4xl md:text-5xl lg:text-6xl'>Discipline</span>
                    </p>
                </div>
                <div className='w-auto mt-8 object-cover cursor-pointer'>
                    <Image src={svg} className='w-full md:w-96  lg:w-96 lg:h-auto' alt='svg' />
                </div>

            </div>

            <div className='mt-14 md:ml-7 '>
                <p className='text-slate-500 text-2xl font-medium lg:text-3xl'>Design Your Working <span className=" text-cyan-500  rounded font-semibold">Schedule</span> with us :
                </p>
                <div className='flex gap-2'>
                    <div className='mt-2'>
                        <Link href='/Signup'>
                            <button className='text-white bg-cyan-500 py-3 px-2 rounded-md md:text-md active:bg-cyan-700  '>Create Your Account</button>
                        </Link>

                    </div>
                    <div className='mt-2'>
                        <Link href='/Login'>
                            <button className='text-white bg-cyan-500 py-3 px-7 rounded-md md:text-md active:bg-cyan-700   '>Login</button>
                        </Link>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Hero
