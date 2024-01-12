import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const Navbar = () => {
    const navigate = useNavigate();
    const {auth, isAuth} = useSelector(state => state.auth);

  return (
    <>
    <div className='flex justify-between py-3 px-4'>
        <div className='pr-4'>
            <Link to='/' ><span className=' text-slate-500 text-3xl font-600' >MLA</span></Link>
        </div>

        {isAuth} ? (
          <div>
            <span className='text-lg text-red-400'>Hi, {auth?.name}!</span>
            <button className='px-2 py-1 bg-slate-600 text-white mx-1 rounded-md' onClick={() => navigate('/')}>Logout</button>
          </div>
        ) : (
        <div className='flex justify-between pr-4'>
            <button className='px-2 py-1 bg-slate-600 text-white mx-1 rounded-md' onClick={() => navigate('/login')}>Login</button>
            <button className='px-2 py-1 bg-slate-600 text-white mx-1 rounded-md' onClick={() => navigate('/register')}>SignUp</button>
        </div>
    </div>

    )
    <hr className='w-[100%] '/>
    </>
  )
}

export default Navbar