import React, { useState, useEffect } from 'react';
import { cover, login } from '../../../assets';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { signin } from "./../../../services/operations/authAPI"
import SignUp from './SignUp';
import { ACCOUNT_TYPE } from './../../../utils/constants';

const Login = ({ darkTheme }) => {
  const [btn1, setbtn1] = useState(true);
  const [btn2, setbtn2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  // Select authentication status from Redux store or localStorage
  // const { token } = useSelector((state) => state.auth); 

  const { user } = useSelector((state) => state.profile);

  // Redirect if the user is already logged in
  useEffect(() => {
    if (!user) { // Check if token is null, undefined, or falsy
      navigate('/Login'); // Redirect to login if there's no token
    } else { user?.accountType === ACCOUNT_TYPE.ADMIN || user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ?
      navigate('/dashboard') :  navigate('/my-dashboard')
    }
  }, [user, navigate]);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password, navigate));
  };

  return (
    <div className={!darkTheme ? "dark" : "light"}>
      <div className="sec-background flex flex-col items-center justify-center min-h-screen">
        <div className="gradient1"></div>
        <div className="gradient2"></div>
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between p-6 lg:p-12">
          <div className="banner hidden lg:block w-1/2">
            <img src={cover} alt="cover" className="object-cover w-full h-full" />
          </div>
          <header className="w-full lg:w-1/2 flex flex-col gap-8 p-6 primary-text">
            {btn1 && (
              <>
                <h1 className="text-center text-2xl sm:text-4xl font-bold">
                  <span className="textGradient">Welcome Back</span>
                </h1>
                <p className="text-center primary-text mb-1">
                  Build skills for today, tomorrow, and beyond.
                </p>
                <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
                  <label>
                    <span>Email Address</span>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleOnChange}
                      className="w-full p-3 border bg-transparent border-gray-300 rounded-md"
                      placeholder="Enter your email"
                      required
                    />
                  </label>
                  <label className="relative">
                    <span>Password</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                      className="w-full p-3 border bg-transparent border-gray-300 rounded-md"
                      placeholder="Enter your password"
                      required
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 cursor-pointer">
                      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                  </label>
                  <div className="flex justify-between items-center mt-2">
                    <p className='flex items-center gap-2'>New Here? 
                      <button
                        className="text-blue-600"
                        onClick={() => { setbtn1(false); setbtn2(true); }}>
                        Register Now
                      </button>
                    </p>
                    <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center gap-2 justify-center py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                      <img src={login} alt="" className="ico w-6" />
                    Login
                  </button>
                </form>
              </>
            )}
            {btn2 && (
              <>
                <h1 className="text-center text-2xl sm:text-4xl font-bold">
                  <span className="textGradient">Welcome to Tahzib</span>
                </h1>
                <SignUp />
                <p className="text-center flex items-center gap-2 justify-center">
                  Already Have an Account ? 
                  <button
                    className="text-blue-600"
                    onClick={() => { setbtn1(true); setbtn2(false); }}>
                    Login
                  </button>
                </p>
              </>
            )}
          </header>
        </div>
      </div>
    </div>
  );
};

export default Login;

