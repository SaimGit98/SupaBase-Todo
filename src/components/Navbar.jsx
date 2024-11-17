import React from 'react'
import LongMenu from './Menu'

const Navbar = () => {
  return (
    <div>
      <nav className=' flex justify-between items-center pl-2 mt-2'>
        <h2 className='text-xl font-semibold'>TodoSphere</h2>
        <LongMenu />
      </nav>
    </div>
  )
}

export default Navbar
