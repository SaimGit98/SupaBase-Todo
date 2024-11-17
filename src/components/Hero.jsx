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
        <div className=' w-auto cursor-pointer pl-2 mt-14 leading-none '>
            <div className='flex items-center justify-center w-full mt-5 m-auto '>
                <div className=' w-1/3 md:w-2/3 md:ml-7 lg:ml-10'>
                    <p className=' text-cyan-500 font-bold text-2xl md:text-4xl lg:text-5xl'>
                        Reshape
                    </p>
                    <p className=' text-slate-500 text-2xl font-semibold md:text-4xl lg:text-5xl '>Your Lifestyle <br />
                        with <span className='text-cyan-500 font-bold text-2xl md:text-4xl lg:text-5xl'>Discipline</span>
                    </p>
                </div>
                <div className='w-auto object-cover cursor-pointer'>
                    <Image src={svg} className='w-full md:w-96  lg:w-96 lg:h-auto' alt='svg' />
                </div>

            </div>

            <div className='mt-16 md:ml-7 '>
                <p className='text-slate-500 text-2xl font-medium lg:text-3xl'>Design Your Working <span className=" text-cyan-500  rounded font-semibold">Schedule</span> with us :
                </p>
                <div className='mt-2'>
                    <Link href='/Signup'>
                        <button className='text-white bg-cyan-500 py-3 px-2 rounded-md  '>Create Your Account</button>
                    </Link>

                </div>
            </div>
           
        </div>
    )
}

export default Hero
