import React, { useEffect, useState } from "react";
import {
  aboutus,
  courses,
  home,
  logo,
  login,
  en,
  bn,
  profile,
  under10,
  eng,
  career,
  all,
  ssc,
  job,
  box,
  dashboard,
  exam,
} from "../../assets";
import {
  BsFillCaretDownFill,
  BsFillCaretRightFill,
  BsMoon,
  BsSun,
} from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";
import { AiOutlineAlignRight } from "react-icons/ai";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseCategories } from './../../services/operations/courseDetailsAPI';
import { ACCOUNT_TYPE } from './../../utils/constants';
import { logout } from "./../../services/operations/authAPI"
import { IoSettings } from "react-icons/io5";
import { FolderIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { BiGroup } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";

const Navbar = ({ setDarkTheme, darkTheme }) => {
  const themeChange = () => {
    setDarkTheme(!darkTheme);
  };

  const [mobileActive, setMobileActive] = useState(false);
  const [profileView, setProfileView] = useState(false);
  const [langEN, setLangEN] = useState(false);
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLangEN(!langEN);
  };

//  login and sign up related codes 
 const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    // console.log('USER data from Navbar (store) = ', user)
    // const { totalItems } = useSelector((state) => state.cart)
    // const location = useLocation();

    // const [subLinks, setSubLinks] = useState([]);
    // const [loading, setLoading] = useState(false);


    // const fetchSublinks = async () => {
    //     try {
    //         setLoading(true)
    //         const res = await fetchCourseCategories();
    //         // (res);setSubLinks
    //     }
    //     catch (error) {
    //         console.log("Could not fetch the category list = ", error);
    //     }
    //     setLoading(false)
    // }


    // useEffect(() => {
    //     fetchSublinks();
    // }, [])

  return (
    <div id="navbar" className={!darkTheme ? "dark navColor" : "light "  }>
      <div className="desktop_menu nav-bg">
        <Link to="/" className="logo">
          <img src={logo} alt="" />
        </Link>
        <ul className="menu">
          <NavLink to="/" className="link">
            <img src={home} alt="" className="logo" />
            <p className="primary-text">{t("navbar.item1")}</p>
          </NavLink>

          <NavLink to="/about-us" className="link">
            <img src={aboutus} alt="" className="logo" />
            <p className="primary-text">{t("navbar.item2")}</p>
          </NavLink>

          <NavLink to="/blogs" className="link">
            <img src={box} alt="" className="ico" />
            <p className="secondary-text">{t("navbar.item4")}</p>
          </NavLink>

          {/* <NavLink to="/newsletter" className="link">
            <img src={exam} alt="" className="ico" />
            <p className="secondary-text">{t("navbar.item5")}</p>
          </NavLink> */}

          <p className="link d-link">
            <img src={dashboard} alt="" className="logo" />
            <p className="primary-text">{t("navbar.item3")}</p>
            <BsFillCaretDownFill className="downArrow" />
            <ul className="drop-bg">
              {/* <li>
                {" "}
                <Link className="menuLink secondary-text" to="/under-10">
                  <img src={under10} alt="" />
                  <p className="secondary-text">{t("navbar.course1")}</p>
                  <BsFillCaretRightFill className="rightArrow" />
                </Link>
              </li>{" "}
              <li>
                <Link className="menuLink secondary-text" to="/ssc-hsc">
                  <img src={ssc} alt="" />

                  <p className="secondary-text">{t("navbar.course2")}</p>
                  <BsFillCaretRightFill className="rightArrow" />
                </Link>
              </li>
              <li>
                <Link className="menuLink secondary-text" to="/engineering">
                  <img src={eng} alt="" />
                  <p className="secondary-text">{t("navbar.course3")}</p>
                  <BsFillCaretRightFill className="rightArrow" />
                </Link>
              </li>
              <li>
                <Link className="menuLink secondary-text" to="/career">
                  <img src={career} alt="" />
                  <p className="secondary-text">{t("navbar.course4")}</p>
                  <BsFillCaretRightFill className="rightArrow" />
                </Link>
              </li> */}
              <li>
                <Link className="menuLink secondary-text" to="/all-courses">
                  <img src={all} alt="" />
                  <p className="all-course">{t("navbar.course5")}</p>
                  <BsFillCaretRightFill className="rightArrow" />
                </Link>
              </li>
            </ul>
          </p>
        </ul>
        <div className="navButtons">
          {/* <Link to="/login" className="linkBtn">
            <button className="sbtn">
              <img src={peoples} alt="" className="ico" />
              <p className="secondary-text">{t("navbar.item7")}</p>
            </button>
          </Link> */}

          {token === null && (
            <Link
              to="/Login"
              className="linkBtn"
            >
              <button className="hbtn">
                <img src={login} alt="" className="ico" />
                <p className="primary-text" >{t("navbar.item6")}</p>
              </button>
            </Link>
          )}

          {token !== null && (
            <div className="profile">
              <div
                className={
                  token !== null ? "visible visibleBrdr drop-bg" : "visible drop-bg"
                }
                onClick={() => setProfileView(!profileView)}
              >
                <img src={profile} alt="" />
                <small className="primary-text">{user?.firstName}</small>
              </div>

              {profileView && (
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  className="profileOverview drop-bg"
                >
                  { user?.accountType === ACCOUNT_TYPE.STUDENT &&
                  <>
                  <Link
                    to="/my-dashboard"
                    className="activity hover:text-blue-400 secondary-text"
                    onClick={() => setProfileView(false)}
                  >
                    <p>Dashboard</p>
                  </Link>
                  <Link
                    to="/settings"
                    className="activity hover:text-blue-400 secondary-text"
                    onClick={() => setProfileView(false)}
                  >
                    <p>Settings</p>
                  </Link> 
                  </>}
                  { user?.accountType === ACCOUNT_TYPE.ADMIN &&
                  <>
                  <Link
                    to="/dashboard"
                    className="activity hover:text-blue-400 secondary-text"
                    onClick={() => setProfileView(false)}
                  >
                    <p>Dashboard</p>
                  </Link>
                  </>}
                  
            

                  <div className="line"></div>

                  <button
                    className="logout"
                    onClick={() => {
                      dispatch(logout(navigate))
                      setProfileView(false);
                    }}
                  >
                    logout
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {!darkTheme ? (
            <BsSun className="sun" onClick={themeChange} />
          ) : (
            <BsMoon className="moon" onClick={themeChange} />
          )}

          {langEN ? (
            <img
              src={bn}
              alt="en"
              onClick={() => handleLanguage("bang")}
              className="lang"
            />
          ) : (
            <img
              src={en}
              alt="en"
              onClick={() => handleLanguage("en")}
              className="lang"
            />
          )}
        </div>
      </div>

      <div
        className={
          mobileActive ? "mobile_menu nav-bg activeMenu" : "mobile_menu nav-bg"
        }
      >
        <Link to="/" className="logo">
          <img src={logo} alt="" />
        </Link>
        {mobileActive && (
          <motion.ul
            whileInView={{ x: [50, 0], opacity: [0, 1] }}
            transition={{ duration: 0.3 }}
            className="menu nav-bg"
          >
            { user?.accountType === ACCOUNT_TYPE.STUDENT ? <NavLink
              to="/"
              className="link"
              onClick={() => setMobileActive(false)}
            >
              <img src={home} alt="" className="ico" />
              <p className="secondary-text">{t("navbar.item1")}</p>
            </NavLink> : ''}

            {user ? '' :
              <NavLink
              to="/about-us"
              onClick={() => setMobileActive(false)}
              className="link"
            >
              <img src={aboutus} alt="" className="ico" />
              <p className="secondary-text">{t("navbar.item2")}</p>
            </NavLink>}

            

           {token !== null && (
            <div className="profile">

                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  className=""
                >
                  { user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <motion.ul>
                  <NavLink
                  onClick={() => setMobileActive(false)}
                    to="/my-dashboard"
                    className="activity link flex gap-1 items-center hover:text-blue-400 secondary-text"
                  >
                    <img src={dashboard} alt="" className="w-6" />
                    <p>Dashboard</p>
                  </NavLink>
                  <NavLink
                    to="/settings"
                    onClick={() => setMobileActive(false)}
                    className="activity link flex gap-1 items-center  hover:text-blue-400 secondary-text"
                  >
                    <IoSettings className="text-2xl"/>
                    <p>Settings</p>
                  </NavLink> 
                  </motion.ul>
                  )}
                  { user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <motion.ul>
                  <NavLink
                  onClick={() => setMobileActive(false)}
                    to="/dashboard/my-profile"
                    className="activity link flex gap-1 items-center hover:text-blue-400 secondary-text"
                  >
                    <img src={aboutus} alt="" className="w-6" />
                    <p>My Profile</p>
                  </NavLink>
                  <NavLink
                    to="/dashboard/create-category"
                    onClick={() => setMobileActive(false)}
                    className="activity link flex gap-1 items-center  hover:text-blue-400 secondary-text"
                  >
                    <FolderIcon className="w-6" />
                    <p>Create Catagory</p>
                  </NavLink> 
                  <NavLink
                    to="/dashboard/all-students"
                    onClick={() => setMobileActive(false)}
                    className="activity link flex gap-1 items-center  hover:text-blue-400 secondary-text"
                  >
                    <BiGroup className="text-2xl"/>
                    <p>All Students</p>
                  </NavLink> 
                  <NavLink
                    to="/dashboard/all-instructors"
                    onClick={() => setMobileActive(false)}
                    className="activity link flex gap-1 items-center  hover:text-blue-400 secondary-text"
                  >
                    <FaChalkboardTeacher className="text-2xl"/>
                    <p>All Instractors</p>
                  </NavLink> 
                  <NavLink
                    to="/dashboard/all-courses"
                    onClick={() => setMobileActive(false)}
                    className="activity link flex gap-1 items-center  hover:text-blue-400 secondary-text"
                  >
                    <BookOpenIcon className="w-6"/>
                    <p>All Course</p>
                  </NavLink> 
                  <NavLink
                    to="/dashboard/add-course"
                    onClick={() => setMobileActive(false)}
                    className="activity link flex gap-1 items-center  hover:text-blue-400 secondary-text"
                  >
                    <PlusCircleIcon className="w-6"/>
                    <p>Add Course</p>
                  </NavLink> 
                  <NavLink
                    to="/dashboard/settings"
                    onClick={() => setMobileActive(false)}
                    className="activity link flex gap-1 items-center  hover:text-blue-400 secondary-text"
                  >
                    <IoSettings className="text-2xl"/>
                    <p>Settings</p>
                  </NavLink> 
                  </motion.ul>
                  )}
                  
            
                </motion.div>
            </div>
          )}


            { user?.accountType === ACCOUNT_TYPE.ADMIN || user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? '' : <p to="" className="link d-link">
              <img src={courses} alt="" className="ico" />
              <p className="secondary-text">{t("navbar.item3")}</p>
              {/* <BsFillCaretDownFill className="downArrow" />
              <ul className="">
                <li>
                  {" "}
                  <Link
                    className="menuLink secondary-text"
                    to="/under-10"
                    onClick={() => setMobileActive(false)}
                  >
                    <img src={under10} alt="" />
                    <p className="secondary-text">{t("navbar.course1")}</p>
                    <BsFillCaretRightFill className="rightArrow" />
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    className="menuLink secondary-text"
                    to="/ssc-hsc"
                    onClick={() => setMobileActive(false)}
                  >
                    <img src={ssc} alt="" />

                    <p className="secondary-text">{t("navbar.course2")}</p>
                    <BsFillCaretRightFill className="rightArrow" />
                  </Link>
                </li>
                <li>
                  <Link
                    className="menuLink secondary-text"
                    to="/engineering"
                    onClick={() => setMobileActive(false)}
                  >
                    <img src={eng} alt="" />
                    <p className="secondary-text">{t("navbar.course3")}</p>
                    <BsFillCaretRightFill className="rightArrow" />
                  </Link>
                </li>
                <li>
                  <Link
                    className="menuLink secondary-text"
                    to="/career"
                    onClick={() => setMobileActive(false)}
                  >
                    <img src={career} alt="" />
                    <p className="secondary-text">{t("navbar.course4")}</p>
                    <BsFillCaretRightFill className="rightArrow" />
                  </Link>
                </li>
                <li>
                  <Link
                    className="menuLink secondary-text"
                    to="/all-courses"
                    onClick={() => setMobileActive(false)}
                  >
                    <img src={all} alt="" />
                    <p className="all-course">{t("navbar.course5")}</p>
                    <BsFillCaretRightFill className="rightArrow" />
                  </Link>
                </li>
              </ul> */}
            </p> }

            { token !== null  ? <div className="link-btns">
              <Link
              to='/'
              onClick={() => setMobileActive(false)}
                className="linkBtn"
              >
                <button onClick={() => {
                      dispatch(logout(navigate))
                      setProfileView(false);
                    }}>
                  <img src={login} alt="" className="ico" />
                  <p className="secondary-text">Logout</p>
                </button>
              </Link>
            </div> : <div className="link-btns">
              <Link
                to="/login"
                onClick={() => setMobileActive(false)}
                className="linkBtn"
              >
                <button className="">
                  <img src={login} alt="" className="ico" />
                  <p className="secondary-text">{t("navbar.item6")}</p>
                </button>
              </Link>
            </div>}
          </motion.ul>
        )}
        <div className="navButtons">
          {langEN ? (
            <img
              src={bn}
              alt="en"
              onClick={() => handleLanguage("bang")}
              className="lang"
            />
          ) : (
            <img
              src={en}
              alt="en"
              onClick={() => handleLanguage("en")}
              className="lang"
            />
          )}
          
          {!darkTheme ? (
            <BsSun className="sun" onClick={themeChange} />
          ) : (
            <BsMoon className="moon" onClick={themeChange} />
          )}

          

          {!mobileActive ? (
            <AiOutlineAlignRight
              className="menuToggoler primary-text"
              onClick={() => setMobileActive(true)}
            />
          ) : (
            <RiCloseCircleFill
              className="menuToggoler primary-text"
              onClick={() => setMobileActive(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
