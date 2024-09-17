import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../../../slices/authSlice';
import { sendOtp } from '../../../services/operations/authAPI';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { login } from '../../../assets';

 
function SignUp() {
          const navigate = useNavigate();
          const dispatch = useDispatch();
        
          // student or instructor
          // const accountType = 'ACCOUNT_TYPE.STUDENT';
        
          const [formData, setFormData] = useState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            accountType:"Student"
          });
        
          const [showPassword, setShowPassword] = useState(false);
          const [showConfirmPassword, setShowConfirmPassword] = useState(false);
        
          const { firstName, lastName, email, password, confirmPassword } = formData;
        
          // Handle input fields, when some value changes
          const handleOnChange = (e) => {
            setFormData((prevData) => ({
              ...prevData,
              [e.target.name]: e.target.value,
            }));
        
           console.log('signup form data - ', formData);
          };
        
          // Handle Form Submission
          const handleOnSubmit = (e) => {
            e.preventDefault();
        
            if (password !== confirmPassword) {
              toast.error("Passwords Do Not Match")
              return;
            }
            const signupData = {
              ...formData
            };
        
            // Setting signup data to state
            // To be used after otp verification
            dispatch(setSignupData(signupData));
            // Send OTP to user for verification
            dispatch(sendOtp(formData.email, navigate));
        
            // Reset form data
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              accountType:"Student"
            })
          };
        
          // data to pass to Tab component
          // const tabData = [
          //   {
          //     id: 1,
          //     tabName: "Student",
          //     type: ACCOUNT_TYPE.STUDENT,
          //   },
          //   {
          //     id: 2,
          //     tabName: "Instructor",
          //     type: ACCOUNT_TYPE.INSTRUCTOR,
          //   },
          // ];
        
          return (
            <div>
        
              {/* Form */}
              <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4 mt-6">
                <div className="flex gap-x-4">
                  {/* First Name */}
                  <label>
                    <p className="mb-1  primary-text">
                      First Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={handleOnChange}
                      placeholder="Enter first name"
                      className="w-full bg-transparent rounded-md p-[12px] pr-12 primary-text ring-2 "
                    />
                  </label>
        
                  {/* Last Name */}
                  <label>
                    <p className="mb-1  primary-text">
                      Last Name <sup className="text-red-600">*</sup>
                    </p>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={handleOnChange}
                      placeholder="Enter last name"
                      
                      className="w-full bg-transparent rounded-md p-[12px] pr-12 primary-text ring-2 "
                    />
                  </label>
                </div>
        
                {/* Email Address */}
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
        
        
                <div className="flex gap-x-4">
                  {/* Create Password */}
                  <label className="relative">
                    <p className="mb-1  primary-text">
                      Create Password <sup className="text-red-600">*</sup>
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
                  </label>
        
                  {/* Confirm Password  */}
                  <label className="relative">
                    <p className="mb-1  primary-text">
                      Confirm Password <sup className="text-red-600">*</sup>
                    </p>
                    <input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleOnChange}
                      placeholder="Confirm Password"
                      className="w-full bg-transparent rounded-md p-[12px] pr-12 primary-text ring-2 "
                    />
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                      ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                      )}
                    </span>
                  </label>
                </div>
        
        
                <button type="submit" className="hbtn flex items-center justify-center gap-2 py-3 ">
                  <img src={login} alt="" className="ico w-6" />
                  <p className='primary-text'>Register</p>
                </button>
                
              </form>
            </div>
          )
        }

        export default SignUp