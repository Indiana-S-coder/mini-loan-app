import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {clearErrors, register} from '../redux/userActions';
import Loader from '../components/Loader';


const Register = () => {
   
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {loading, isAuthenticated, error} = useSelector(state => state.user);

  const [user, setUser] = useState({
    userName:"",
    email:"",
    password:"",
  })
  
  const {userName, email, password} = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(user));
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({ ...user, [name]: value });
  }

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

                      <button type='submit' className='border-none mt-2 text-white py-2 px-5 bg-slate-600 font-bold cursor-pointer'>
                          SignUp
                      </button>
                      <hr className=' mt-4 w-[120%] border-slate-300' />
                      <span className=''>Already have an account ?<Link to={'/login'} className='text-blue-500'>Login</Link></span>
                  </form>
              </div>
          </div>
      </div>
      )}
    </>
  );
};

export default Register