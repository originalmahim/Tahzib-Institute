import React, { useState } from 'react';
 import { cover, login } from '../../../assets';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { signin } from "./../../../services/operations/authAPI"
import SignUp from './SignUp';

const Login = ({ darkTheme })  => {
  const [btn1, setbtn1] = useState(true);
  const [btn2, setbtn2] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const [showPassword, setShowPassword] = useState(false)
  
    const { email, password } = formData;
  
    const handleOnChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
    }
  
    const handleOnSubmit = (e) => {
      e.preventDefault();
      dispatch(signin(email, password, navigate))
      // console.log('Login Details Send To Backend',formData);
    }
          return (
          <div className={!darkTheme ? "dark" : "light"}>
          <div className="sec-background">
          <div className="lg:h-[70px] h-[50px]" />
          <div  className="fSection">
          <div className="gradient1"></div>
          <div className="gradient2"></div>
          <div className="banner">
            <img src={cover} alt="" />
          </div>
          <header>
          
            

            {btn1 && (
            <>
            <h1 className='heading'> <span className="style textGradient">Wellcome Back</span></h1>
            <div className='px-8 text-center my-1'>
            <p className='primary-text'>Build skills for today, tomorrow, and beyond. Education to future-proof your career.</p>
            </div>
            <form
      onSubmit={handleOnSubmit}
      className="mt-4 flex w-full flex-col gap-y-4 px-8"
    >
      <label className="w-full">
        <p className="mb-1  primary-text">
          Email Address <sup className="text-red-600">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full bg-transparent rounded-md p-[12px] pr-12 primary-text ring-2 "
        />
      </label>

      <label className="relative">
        <p className="mb-1 primary-text">
          Password <sup className="text-red-600">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="w-full bg-transparent rounded-md p-[12px] pr-12 primary-text ring-2 "
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <div className='flex items-center justify-between mt-2 px-2'>
        <div className='flex items-center  gap-1 secondary-text'>
        <p>New Here ?</p>
         <button
              className={
                btn2 && !btn1 ? "active  textGradient" : " textGradient "
              }
              onClick={() => {
                setbtn1(false);
                setbtn2(true);
              }}
            >
              Register Now
            </button>
          </div>
        <Link to="/forgot-password">
          <p className="primary-text text-[15px]">
            Forgot Password
          </p>
        </Link>
        </div>
      </label>


                <button type="submit" className="hbtn flex items-center justify-center gap-2 py-3 ">
                  <img src={login} alt="" className="ico w-6" />
                  <p className='primary-text'>Login</p>
                </button>
    </form>
              
              
            
            </>
          )}

        {btn2 && (
            <>
            <h1 className='heading'> <span className="style textGradient">Wellcome TO Tahzib</span></h1>
            
            
            <SignUp></SignUp>
            <div className='flex items-center  gap-1 secondary-text'>
        <p>Already Have a Account ?</p>
         <button
              className={
                btn1 && !btn2 ? "active  textGradient" : " textGradient "
              }
              onClick={() => {
                setbtn1(true);
                setbtn2(false);
              }}
            >
              Login
            </button>
          </div>
          </>
          )}


        

            
          </header>
        </div>                   
          </div>
          </div>
          );
};

export default Login;