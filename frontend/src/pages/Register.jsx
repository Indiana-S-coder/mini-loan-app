import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const Register = () => {
   
  const navigate = useNavigate();
  const [data, setData] = useState({
    userName:"",
    email:"",
    password:"",
  })
  
  const {userName, email, password} = data;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({ ...data, [name]: value });
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
      
      const {data} = await axios.post('http://localhost:4000/api/users', 
      {
        ...data,
      }, {
        withCredentials: true
      });
      const {success, message} = data;
      if(success){
        handleSuccess(message);
        setTimeout(() => {
          navigate('/')
        }, 1000);
      }else {
        handleError(message);
      }
    }catch(err){
      console.log(err);
    }
    setData({
      ...data,
      email:"",
      password:"",
      userName:"",
    })
  }

  return (
    <div className='flex pt-12 justify-center align-center min-h-[100vh] bg-[#f5f5f5]'>
        <div className='mb-6 h-[70vh] flex rounded-lg shadow-sm'>
            <div className='px-12 flex flex-col items-center justify-center bg-white rounded-r-lg'>
                    <h1 className='text-[40px] mt-0 mb-4'>Register</h1>
                  <form action="" className='flex flex-col items-center' onSubmit={handleSubmit}>
                    <div className='flex flex-col items-start my-1'>
                    <label htmlFor="userName">Username</label>
                    <input type="text"
                    placeholder='UserName'
                    name='userName'
                    onChange={handleChange}
                    value={userName}
                    required
                    className='border-none p-2 rounded-md bg-[#edf5f3] my-1 text-md' />
                    </div>

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
                        SignUp
                    </button>
                    <hr className=' mt-4 w-[120%] border-slate-300' />
                    <span className=''>Already have an account ?<Link to={'/login'} className='text-blue-500'>Login</Link></span>
                </form>
                <ToastContainer />
            </div>
        </div>
    </div>
  )
}

export default Register