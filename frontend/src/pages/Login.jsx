import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login} from "../redux/userActions";
import Loader from '../components/Loader';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated, loading, error} = useSelector(state => state.user);

  const [loginEmail, setEmail] = useState("");
  const [loginPassword, setPassword] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword))
  };


  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

    if(isAuthenticated === true){
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);


  return (
    <>
      {loading === true ? (
      <Loader /> 
      ) : (
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
                      onChange={(e) => setEmail(e.target.value)}
                      value={loginEmail}
                      required
                      className='border-none p-2 rounded-md bg-[#edf5f3] my-1 text-md' />
                      </div>

                      <div className='flex flex-col items-start my-1'>
                      <label htmlFor="password">Password</label>
                      <input type="password"
                      placeholder='Password'
                      name='password'
                      onChange={(e) => setPassword(e.target.value)}
                      value={loginPassword}
                      required
                      className='border-none p-2 rounded-md bg-[#edf5f3] my-1 text-md' />
                      </div>

                      <button type='submit' className='border-none mt-2 text-white py-2 px-5 bg-slate-600 font-bold cursor-pointer'>
                          Login
                      </button>
                      <hr className='mt-5 w-[120%] h-1 border-slate-300'/>
                      <span className=''>
                          Don't have an account? <Link to='/register' className='text-blue-500'>Register</Link>
                      </span>
                  </form>
              </div>
          </div>
      </div>
      )}
    </>
  )
}

export default Login