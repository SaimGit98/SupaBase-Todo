import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Card = ({ value, tagline, src, alt }) => {

  const router = useRouter()
  
  const handleClick = () => {
    router.push(`/Detail?value=${value}`)
  }

  return (
    <div onClick={handleClick} className='bg-cyan-100 border-t-slate-800 mb-2 w-72 h-40 rounded-lg flex flex-col justify-center items-center active:bg-cyan-500 md:w-1/3 lg:w-1/4'>
      {src ? (<Image src={src} className='w-20' alt={alt} />) : ("No pic available")}
      <h1 className='font-semibold text-md lg:text-lg'>{value}</h1>
      <p className='text-sm text-gray-500 lg:text-md'>{tagline}</p>
    </div>
  )
}

export default Card
