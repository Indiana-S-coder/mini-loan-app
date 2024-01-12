import React from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import {useCookies} from 'react-cookie'
import {useEffect, useState} from 'react'
import img from '../assets/8292064.jpg'

function Home() {
  const [cookies, removeCookie] = useCookies(['token']);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async() => {
      if(!cookies.token){
        navigate('/');
      }
      const {data} = await axios.get('http://localhost:4000/api/users/me', {
        withCredentials: true
      });
      const {status, user} = data;
      setUser(user);
      return status ?
      toast(`Hello ${user}`, {
        position: "top-right",
      })
      :(removeCookie("token"), navigate('/login'));
    }
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const LogOut = () => {
    removeCookie('token');
    navigate('/register');
  }

  return (
    <>
        
        <div className='flex justify-between items-center'>
            <div className=' flex flex-col pl-[15rem] text-center'>
                <p className='font-700 text-5xl pb-5'>Mini Loan App</p>
                <button className='px-3 py-2 w-[80%] bg-red-400'>Get Started</button>
            </div>
            <div className='pt-9 w-[40%]'>
                <img src={img} alt="" />
            </div>
        </div>
        <ToastContainer/>
    </>
  )
}

export default Home