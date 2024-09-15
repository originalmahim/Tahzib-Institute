import React, { useState } from 'react';
import { cover, dashboard, information, login } from '../../../assets';
import { Link } from 'react-router-dom';

const Login = ({ darkTheme })  => {
  const [btn1, setbtn1] = useState(true);
  const [btn2, setbtn2] = useState(false);
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
              <h1 className='subTitle secondary-text'>Enter Email</h1>
              <input className="Box jc3 secondary-text" type="email" placeholder='demo.mail@gmail.com' />
          
            <h1 className='subTitle secondary-text'>Enter Password</h1>
              <input className="Box jc3 secondary-text" type="password" placeholder='..........................' />
              <div className='subTitle flex items-center gap-2 secondary-text'>
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
              <div className="btn-group">
              <Link to="" className="linkBtn">
                <button className="hbtn">
                  <img src={login} alt="" className="ico" />
                  <p>Login</p>
                </button>
              </Link>
            </div>
            
            </>
          )}

        {btn2 && (
            <>
            <h1 className='heading'> <span className="style textGradient">Wellcome TO Academy</span></h1>
            <h1 className='subTitle secondary-text'>Enter Your Name</h1>
            <input className="Box jc3 secondary-text" type="text" placeholder='Sheikh Hasina' />
            <h1 className='subTitle secondary-text'>Enter Your Email</h1>
            <input className="Box jc3 secondary-text" type="email" placeholder='demo.mail@gmail.com' />
        
          <h1 className='subTitle secondary-text'>Enter Your Password</h1>
            <input className="Box jc3 secondary-text" type="password" placeholder='..........................' />
          <h1 className='subTitle secondary-text'>Confirm Your Password</h1>
            <input className="Box jc3 secondary-text" type="password" placeholder='..........................' />
            <div className='flex subTitle items-center text-left gap-2 secondary-text'>
         <p>Have a Account ?</p>
          <button
              className={
                btn1 && !btn2 ? "active  textGradient" : "textGradient"
              }
              onClick={() => {
                setbtn1(true);
                setbtn2(false);
              }}
            > 
              {/* <img src={dashboard} alt="" /> */}
              Login Now
            </button>
          </div>
            <div className="btn-group">

            <Link to="/batch" className="linkBtn">
              <button className="sbtn">
                <img src={login} alt="" className="ico" />
                <p className="secondary-text">Register</p>
              </button>
            </Link>
          </div>
          
          </>
          )}

              {/* <div className="content-btns">
            
            <button
              className={
                btn2 && !btn1 ? "active secondary-text" : "secondary-text"
              }
              onClick={() => {
                setbtn1(false);
                setbtn2(true);
              }}
            >
              <img src={information
              } alt="" />
              Register
            </button>
          </div> */}

        

            
          </header>
        </div>                   
          </div>
          </div>
          );
};

export default Login;