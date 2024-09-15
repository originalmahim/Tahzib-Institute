import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { aboutus, checked, play } from "../../assets";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import CauntDown from "./CauntDown";
import Popup from "./Popup";
import Coursecontents from "./Coursecontents";
import Faq from "./Faq";

const benefits = [
  "৮০+ ভিডিও কন্টেন্ট",
  "৪৮টি লাইভ সাপোর্ট সেশন",
  "বেসিক থেকে অ্যাডভান্সড লেভেল",
  "৪ মাসের ব্যাচ",
  "কুইজ ও অ্যাসাইনমেন্ট",
  "রিয়েল-লাইফ কেস স্টাডি",
  "মেন্টর সাপোর্ট",
  "২ বছরের কন্টেন্ট অ্যাক্সেস",
  "প্রফেশনাল সার্টিফিকেট"
];

const CourseDetaisPage = ({ darkTheme, courses }) => {
  const [popup, setPopup] = useState(false);

  const { id } = useParams();
  const course = courses.find(course => course.id === id);

  const handleButtonClick = (url) => {
    setPopup(true);
  };

  return (
    <div className={!darkTheme ? "dark" : "light"}>
      <div className="sec-background">
        <div className="lg:h-[70px] h-[50px]" />
        <div className="grad3"></div>
        <div className="items-center justify-between mx-5 max-w-7xl lg:mx-auto lg:flex text-center">
          <div className="lg:w-[63%] h-full flex flex-col items-start">
            <motion.h1
              whileInView={{ opacity: [0, 1], x: [-50, 0] }}
              transition={{ duration: 0.1 }}
              className="lg:text-4xl text-3xl primary-text font-bold mt-16 mb-2"
            >
              <span className="textGradient"> {course?.courseName} </span>
            </motion.h1>
            <div className="relative">
              <motion.img
                whileInView={{ opacity: [0, 1], x: [20, 0] }}
                transition={{ duration: 0.2, delay: 0.1 }}
                src={course?.bannerImage?.url}
                alt=""
                className="rounded-md"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="bg-white text-black rounded-full p-3 bg-opacity-70 hover:bg-opacity-100 transition"
                  onClick={() => handleButtonClick('https://res.cloudinary.com/dfq61lhkc/video/upload/v1718371491/ahpr07eu902q5ajbdkru.mp4')}
                >
                  <img src={play} alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="lg:w-[35%]  mt-5 border border-black dark:border-none rounded-md h-auto relative">
            <div className="lg:h-[70px]" />
            <div className="gradient1"></div>
            <div className="gradient2"></div>
            <div id="courseCard" className="p-course h-auto overflow-hidden rounded-md p-4">
              <h2 className="text-2xl primary-text">এই কোর্সের ভেতরে যা যা রয়েছে</h2>
              <ul role="list" className="mt-2 text-left grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-5 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center justify-center gap-x-3 text-[15px] text-slate-400">
                    <CheckCircleIcon className="h-4 w-4 flex-none text-green-500" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="flex items-center w-full h-[5vh]">
                <img src={aboutus} alt="" className="w-[6%] mr-2" />
                <p className="font-medium star">কোর্সটি করছেন ৭৫৭ জন</p>
              </div>
              <div className="flex btn-group justify-between items-center mt-2 w-full h-[5vh]">
                <div className="w-[40%] left-btn sbtn h-full rounded-md flex items-center justify-center">
                  <img src={checked} alt="" className="w-[15%] mr-2" />
                  <p className="font-semibold primary-text">{course?.price} tk</p>
                </div>
                <div className="w-[55%] right-btn hbtn flex items-center justify-center rounded-md cursor-pointer transition duration-300 hover:bg-green-600">
                  <Link to={`/Learn/${course?.id}`} className="flex items-center justify-center p-2">
                    <BsCart2 className="text-white mr-2" />
                    <p className="font-semibold primary-text">এখনি ভর্তি হোন</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="my-2 border rounded-md">
              <CauntDown />
            </div>
          </div>
        </div>
        <div className="max-w-7xl lg:flex items-center justify-between lg:mx-auto mt-4 sm:mx-4 md:mx-4">
          <div className="lg:w-[63%] h-full ">
            <div className="gradient1"></div>
            <div className="gradient2"></div>
            <div className="w-full rounded-md h-auto">
              <div className="h-auto  overflow-hidden rounded-md p-4">
                <h2 className="text-2xl primary-text">কোর্সটি করে যা শিখবেন</h2>
                <div className="border rounded-md my-2">
                  <div className="my-3 mx-2 text-left">
                    <ul role="list" className="mt-2 text-left grid grid-cols-2 gap-x-8 gap-y-3 text-base leading-5 sm:grid-cols-2">
                      {benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center justify-center gap-x-3 text-[15px] text-slate-400">
                          <CheckCircleIcon className="h-4 w-4 flex-none text-green-500" aria-hidden="true" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="h-auto overflow-hidden rounded-md p-4">
                <h2 className="text-2xl primary-text">কোর্সটি যাদের জন্য</h2>
                <div className="border rounded-md my-2">
                  <div className="my-3 mx-2">
                    <h1 className="primary-text">{course?.description?.text}</h1>
                  </div>
                </div>
              </div>
              <div className="h-auto overflow-hidden rounded-md p-4">
                
                <div className="my-3">
                    <Coursecontents course={course} />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[37%] h-full"></div>
        </div>
      </div>
      {popup && <Popup videoUrl='https://res.cloudinary.com/dfq61lhkc/video/upload/v1718371491/ahpr07eu902q5ajbdkru.mp4' onClose={() => setPopup(false)} />}
    </div>
  );
};

export default CourseDetaisPage;

