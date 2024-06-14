import React, { useEffect, useState } from 'react';
import vedioapi from '../../app/vedioapi';
import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { aboutus, checked } from "../../assets";

const Courselist = () => {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = () => {
    vedioapi.getCourses().then(resp => {
      setCourses(resp.courses);
    });
  };

  return (
    <div id="popularCourses" className="sec-background  gap-6  items-center justify-center  grid grid-cols-4">
      {courses &&
        courses.map((course, index) => (
          <div key={index} className="  max-w-sm rounded overflow-hidden ">
            {/* Banner Section */}
            <div id="courseCard" className="p-course h-auto overflow-hidden rounded-md ">
          <img src={course?.bannerImage?.url} alt="" />
              <div className='p-4'>
              <h2 className="text-2xl primary-text">{course?.courseName}</h2>
              <small className='secondary-text'>
            A course by <span className="star">{course?.author}</span>
          </small>
              <p className="secondary-text mt-2 text-[0.9rem] font-light h-[30%]">
                ৪৮টি লাইভ সাপোর্ট সেশন
                বেসিক থেকে অ্যাডভান্সড লেভেল
                ৪ মাসের ব্যাচ
                কুইজ ও অ্যাসাইনমেন্ট
                রিয়েল-লাইফ কেস স্টাডি
                মেন্টর সাপোর্ট
                ২ বছরের কন্টেন্ট অ্যাক্সেস
                প্রফেশনাল সার্টিফিকেট
              </p>
              <div className="flex items-center w-full h-[5vh]">
                <img src={aboutus} alt="" className="w-[6%] mr-2" />
                <p className="font-medium star">কোর্সটি করছেন ৭৫৭ জন</p>
              </div>
              <div className="flex btn-group justify-between items-center mt-2 w-full h-[5vh]">
                <div className="w-[40%] left-btn sbtn h-full rounded-md flex items-center justify-center">
                  <img src={checked} alt="" className="w-[15%] mr-2" />
                  <p className="font-semibold primary-text">1000 tk</p>
                </div>
                <div className="w-[55%] right-btn hbtn flex items-center justify-center rounded-md cursor-pointer transition duration-300 hover:bg-green-600">
                  <Link to="/" className="flex items-center justify-center p-2">
                    <BsCart2 className="text-white mr-2" />
                    <p className="font-semibold primary-text">এখনি ভর্তি হোন</p>
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </div>
        ))}
        
    </div>
  );
};

export default Courselist;
