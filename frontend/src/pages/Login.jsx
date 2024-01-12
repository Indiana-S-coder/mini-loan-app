import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email:"",
    password:"",
  })

  const {email, password} = data;
 
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  }

  const handleError = (err) => toast.error(err, {
    position: "top-right",
  });

  const handleSuccess = (msg) => 
  toast.success(msg, {
      position: "top-right",
    });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post('http://localhost:4000/login', {
        ...data,
      },
      {
        withCredentials: true
      });
       console.log(data);
      const {success, message} = data;
      if(success){
        handleSuccess(message);
        setTimeout(() => {
          navigate('/')
        }, 1000);
      } else {
        handleError(message);
      }
      
    }catch(err){
        console.log(err);  
    }
    setInputValue({
      ...data,
      email:"",
      password:"",
    })
  }

  return (
    <div className='flex pt-12 justify-center align-center min-h-[100vh] bg-[#f5f5f5]'>
        <div className='mb-6 h-[60vh] flex rounded-lg shadow-sm'>
            <div className='px-12 flex flex-col items-center justify-center bg-white rounded-r-lg'>
                    <h1 className='text-[40px] mt-0 mb-4'>Login</h1>
                <form action="" className='flex flex-col items-center' onSubmit={handleSubmit}>
                   <div className='flex flex-col items-start my-1'>
                   <label htmlFor="email">Email</label>
                    <input type="email"
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}
                    value={email}
                    required
                    className='border-none p-2 rounded-md bg-[#edf5f3] my-1 text-md' />
                    </div>

                    <div className='flex flex-col items-start my-1'>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                    placeholder='Password'
                    name='password'
                    onChange={handleChange}
                    value={password}
                    required
                    className='border-none p-2 rounded-md bg-[#edf5f3] my-1 text-md' />
                    </div>

                    <button type='submit' className='border-none mt-2 text-white py-2 px-5 bg-red-400 font-bold cursor-pointer'>
                        Login
                    </button>
                    <hr className='mt-5 w-[120%] h-1 border-slate-300'/>
                    <span className=''>
                        Don't have an account? <Link to='/register' className='text-blue-500'>Register</Link>
                    </span>
                </form>
                <ToastContainer/>
            </div>
        </div>
    </div>
  )
}

export default Login