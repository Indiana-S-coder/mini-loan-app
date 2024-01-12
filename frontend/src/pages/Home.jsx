import React from 'react'
import Navbar from '../components/Navbar'
import img from '../assets/8292064.jpg'

function Home() {
  return (
    <>
        <Navbar />
        <div className='flex justify-between items-center'>
            <div className=' flex flex-col pl-[15rem] text-center'>
                <p className='font-700 text-5xl pb-5'>Mini Loan App</p>
                <button className='px-3 py-2 w-[80%] bg-red-400'>Get Started</button>
            </div>
            <div className='pt-9 w-[40%]'>
                <img src={img} alt="" />
            </div>
        </div>
    </>
  )
}

export default Home