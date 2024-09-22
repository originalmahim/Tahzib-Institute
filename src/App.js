import React, { useEffect, useState } from "react";
import "./styles/app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/UI/Navbar";
import Homepage from "./Pages/Homepage";
import Footer from "./Components/UI/Footer";

import Construction from "./Components/UI/Construction";
import Marketplace from "./Components/MarketPlace/Marketplace";
import SingleAnimatedCategory from "./Components/MarketPlace/SingleAnimatedCategory";
import PostJob from "./Components/MarketPlace/PostJob";
import SingleJob from "./Components/MarketPlace/SingleJob";
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
import VideoDetails from './Components/core/ViewCourse/VideoDetails';
import ViewCourse from "./Components/core/Dashboard/ViewCourse";
import AllCourses from "./Components/core/Dashboard/InstructorDashboard/AllCourses";
import NewCourseDetails from "./Components/Home/NewCourseDetails";


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
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage darkTheme={darkTheme} />} />
          <Route path="/about-us" element={<About darkTheme={darkTheme} />} />
          {/* <Route path="/marketplace/animated" element={<SingleAnimatedCategory darkTheme={darkTheme} />} /> */}
          {/* <Route path="/post-job" element={<PostJob darkTheme={darkTheme} />} /> */}
          {/* <Route path="/all-jobs" element={<AllJobs darkTheme={darkTheme} />} /> */}
          {/* <Route path="/single-job" element={<SingleJob darkTheme={darkTheme} />} /> */}
          
        
          <Route path="/Details/:id" element={<CourseDetaisPage courses={courses} darkTheme={darkTheme} />} />
          <Route path="/Learn/:id" element={<CourseStart courses={courses} darkTheme={darkTheme} />} />
          <Route path="/all-courses" element={<Allcourses darkTheme={darkTheme} />} />
          <Route path="/blogs" element={<Blogs darkTheme={darkTheme} />} />
          <Route path="/Login" element={<Login darkTheme={darkTheme} />} />
          <Route path="/verify-email" element={<VerifyEmail darkTheme={darkTheme} />} />
          <Route path="/forgot-password" element={<ForgotPassword darkTheme={darkTheme} />} />
          <Route path="/update-password/:id" element={<UpdatePassword darkTheme={darkTheme} />}/>
          <Route path="courses/:courseId" element={<NewCourseDetails darkTheme={darkTheme} />}/>

          {/* Protected Routes */}
        {/* Protected Route - for Only Logged in User */}
        {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="/my-dashboard" element={ <ProtectedRoute>
          <TalentDashboard darkTheme={darkTheme} /></ProtectedRoute> } />
          <Route path="/mySettings" element={ <ProtectedRoute>
            <TalentProfile darkTheme={darkTheme} />
          </ProtectedRoute> } />
            </>
          )}
        {/* Dashboard */}

        
        <Route path="/dashboard" element={
          <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
}>
  <Route index element={<MyProfile/>} />
  {/* Default route for /dashboard */}

  {/* Route only for Admin */}
  {user?.accountType === ACCOUNT_TYPE.ADMIN && (
    <>
      <Route path="my-profile" element={<MyProfile />} />
      <Route path="my-courses" element={<MyCourses />} />
      <Route path="settings" element={<TalentProfile darkTheme={darkTheme} />} />
      <Route path="create-category" element={<CreateCategory />} />
      <Route path="all-students" element={<AllStudents />} />
      <Route path="all-instructors" element={<AllInstructors />} />
      <Route path="add-course" element={<AddCourse darkTheme={darkTheme} />} />
      <Route path="all-courses" element={<AllCourses />} />
      <Route path="edit-course/:courseId" element={<EditCourse darkTheme={darkTheme} />} />
    </>
  )}

  {/* Route only for Students */}
  {user?.accountType === ACCOUNT_TYPE.STUDENT && (
    <>
      <Route path="cart" element={<Cart />} />
    </>
  )}

  {/* Route only for Instructors */}
  {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
    <>
      <Route path="my-profile" element={<MyProfile />} />
      <Route path="instructor" element={<Instructor />} />
      <Route path="add-course" element={<AddCourse darkTheme={darkTheme} />} />
      <Route path="my-courses" element={<MyCourses />} />
      <Route path="edit-course/:courseId" element={<EditCourse darkTheme={darkTheme} />} />
      <Route path="settings" element={<TalentProfile darkTheme={darkTheme} />} />
    </>
  )}
</Route>


        {/* For the watching course lectures */}
        <Route
          element={
            <ProtectedRoute>
              <ViewCourse darkTheme={darkTheme} />
            </ProtectedRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails />}
            />
          )}
        </Route>
          <Route path="*" errorElement element={<Construction darkTheme={darkTheme} />} />
        </Routes>
        <Footer darkTheme={darkTheme} />
      </Router>
    </div>
  );
}

export default App;
