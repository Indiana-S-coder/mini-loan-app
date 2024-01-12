import React from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useEffect, useState} from 'react'
import img from '../assets/8292064.jpg'
import Loader from '../components/Loader'

function Home() {
  const navigate = useNavigate();

  return (
    <>
          <div className='flex justify-between items-center'>
            <div className=' flex flex-col pl-[15rem] text-center'>
                <span className='font-700 text-5xl pb-5 text-slate-400'>Mini Loan App</span>
                <button className='px-3 py-2 w-[80%] bg-red-400' onClick={() => navigate('/login')}>Get Started</button>
            </div>
            <div className='pt-9 w-[40%]'>
                <img src={img} alt="" />
            </div>
        </div>
        
    </>
  )
}

export default Home