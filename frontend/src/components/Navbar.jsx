import React from 'react'
import Login from '../pages/Login';
import Register from '../pages/Register';

import {useNavigate} from 'react-router-dom';

function Navbar() {
    
    const navigate = useNavigate();

  return (
    <nav className=" text-slate-500 py-4 px-8 shadow-[0_.2px_10px_1px]">
        <div className='flex justify-between align-center '>
            <div >
                <span className='text-2xl text-slate-700'>MLA</span>
            </div>
            <div className="" >
                <button className="text-slate-100 rounded-md border-none hover:bg-slate-100 hover:text-slate-900" >SignUp/Login</button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar