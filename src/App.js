import React, { useEffect, useState } from "react";
import "./styles/app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/UI/Navbar";
import Homepage from "./Pages/Homepage";
import Footer from "./Components/UI/Footer";

import Construction from "./Components/UI/Construction";
import ScrollTop from "./Components/UI/ScrollTop";
import Marketplace from "./Components/MarketPlace/Marketplace";
import SingleAnimatedCategory from "./Components/MarketPlace/SingleAnimatedCategory";
import PostJob from "./Components/MarketPlace/PostJob";
import SingleJob from "./Components/MarketPlace/SingleJob";
import ClientProfile from "./Components/MarketPlace/ClientProfile";
import TalentProfile from "./Components/MarketPlace/TalentProfile";
import TalentDashboard from "./Components/MarketPlace/TalentDashboard";
import AllJobs from "./Components/MarketPlace/AllJobs";
import CourseDetaisPage from "./Components/Home/CourseDetaisPage";
import vedioapi from "./app/vedioapi";
import CourseStart from "./Components/Home/CourseStart";
import About from "./Components/About/About";
import Allcourses from './Components/AllCourses/Allcourses';
import Login from "./styles/Pages_style/Login-Register/Login";
import Blogs from './Components/Blog/Blogs';
import VerifyEmail from "./styles/Pages_style/Login-Register/VerifyEmail";
import UpdatePassword from "./styles/Pages_style/Login-Register/UpdatePassword";
import ForgotPassword from "./styles/Pages_style/Login-Register/ForgotPassword";
import { useSelector } from "react-redux";
import Dashboard from "./Components/core/Dashboard/Dashboard";
import MyProfile from './Components/core/Dashboard/MyProfile';
import Settings from './Components/core/Dashboard/Settings/Settings';
import CreateCategory from './Components/core/Dashboard/CreateCategory';
import AllStudents from './Components/core/Dashboard/AllStudents';
import AllInstructors from './Components/core/Dashboard/AllInstructors';
import Cart from './Components/core/Dashboard/Cart/Cart';
import EnrolledCourses from './Components/core/Dashboard/EnrolledCourses';
import Instructor from './Components/core/Dashboard/Instructor';
import AddCourse from './Components/core/Dashboard/AddCourse/AddCourse';
import MyCourses from './Components/core/Dashboard/MyCourses';
import EditCourse from './Components/core/Dashboard/EditCourse/EditCourse';
import ProtectedRoute from "./Components/core/Dashboard/ProtectedRoute";
import { ACCOUNT_TYPE } from './utils/constants';


function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const { user } = useSelector((state) => state.profile)
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = () => {
    vedioapi.getCourses().then(resp => {
      setCourses(resp.courses);
    });
  };

  return (
    <div className="app">
            <Router>
        <Navbar setDarkTheme={setDarkTheme} darkTheme={darkTheme} />
        <ScrollTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage darkTheme={darkTheme} />} />
          <Route path="/about-us" element={<About darkTheme={darkTheme} />} />
          <Route path="/marketplace/animated" element={<SingleAnimatedCategory darkTheme={darkTheme} />} />
          <Route path="/post-job" element={<PostJob darkTheme={darkTheme} />} />
          <Route path="/all-jobs" element={<AllJobs darkTheme={darkTheme} />} />
          <Route path="/single-job" element={<SingleJob darkTheme={darkTheme} />} />
          <Route path="/talent" element={<TalentProfile darkTheme={darkTheme} />} />
          <Route path="/talent-dashboard" element={<TalentDashboard darkTheme={darkTheme} />} />
          <Route path="/client" element={<ClientProfile darkTheme={darkTheme} />} />
          <Route path="/Details/:id" element={<CourseDetaisPage courses={courses} darkTheme={darkTheme} />} />
          <Route path="/Learn/:id" element={<CourseStart courses={courses} darkTheme={darkTheme} />} />
          <Route path="/all-courses" element={<Allcourses darkTheme={darkTheme} />} />
          <Route path="/blogs" element={<Blogs darkTheme={darkTheme} />} />
          <Route path="/Login" element={<Login darkTheme={darkTheme} />} />
          <Route path="/verify-email" element={<VerifyEmail darkTheme={darkTheme} />} />
          <Route path="/forgot-password" element={<ForgotPassword darkTheme={darkTheme} />} />
          <Route path="/update-password/:id" element={<UpdatePassword darkTheme={darkTheme} />} />

          {/* Protected Routes */}
          
          <Route path="dashboard" element={<Dashboard darkTheme={darkTheme} />}/>
            <Route path="dashboard/my-profile" element={<MyProfile darkTheme={darkTheme} />} />
            <Route path="dashboard/Settings" element={<Settings darkTheme={darkTheme} />} />

            {/* Route only for Admin */}
            {user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <>
                <Route path="dashboard/create-category" element={<CreateCategory darkTheme={darkTheme} />} />
                <Route path="dashboard/all-students" element={<AllStudents darkTheme={darkTheme} />} />
                <Route path="dashboard/all-instructors" element={<AllInstructors darkTheme={darkTheme} />} />
              </>
            )}

            {/* Route only for Students */}
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart darkTheme={darkTheme} />} />
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses darkTheme={darkTheme} />} />
              </>
            )}

            {/* Route only for Instructors */}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>
            )}

          {/* Fallback route */}
          <Route path="*" element={<Construction darkTheme={darkTheme} />} />
        </Routes>
        <Footer darkTheme={darkTheme} />
      </Router>
    </div>
  );
}

export default App;
