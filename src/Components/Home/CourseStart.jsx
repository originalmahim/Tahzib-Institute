import React from "react";
import { checked, play } from "../../assets";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import CourseView from "./CourseView";
import { ArrowLeftCircleIcon, ArrowLeftIcon, ArrowRightCircleIcon, ArrowRightEndOnRectangleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const CourseStart = ({ darkTheme, courses }) => {
  const { id } = useParams();
  const course = courses.find((course) => course.id === id);

  return (
    <div className={!darkTheme ? "dark" : "light"}>
      <div  className="sec-background lg:h-[80vh] h-auto">
        <div className="h-[60px]"></div>
        <div className="flex max-w-7xl px-4  lg:px-0 mx-auto flex-col lg:flex-row lg:justify-around lg:items-center "
        >
          <motion.div
            whileInView={{ x: [-50, 0], opacity: [0, 1] }}
            transition={{ duration: 0.1 }}
            className=" w-full lg:w-[55%] flex flex-col items-center lg:items-start"
          >
            <div>
              <motion.h1
                whileInView={{ opacity: [0, 1], x: [-50, 0] }}
                transition={{ duration: 0.1 }}
                className="lg:text-4xl text-3xl primary-text font-bold mt-16 mb-2"
              >
                <span className="textGradient"> Video 1: This Is Title Section </span>
              </motion.h1>
              <div className="rounded-md">
              <iframe
              src="https://player.cloudinary.com/embed/?public_id=dskfjklasdjflaksd&cloud_name=dfq61lhkc&player[autoplay]=true&player[controls]=true&player[showJumpControls]=true&player[showLogo]=false&player[fluid]=true&player[controlBar][volumePanel]=false"
              className="rounded-md w-full lg:h-[360px] h-[250px]"
              allow="autoplay; fullscreen; encrypted-media;"
              allowfullscreen
              frameborder="0"
            ></iframe>
              </div>
              <div className="mt-4 flex justify-between items-center" >
               <div>
                <button className="btn gap-1 flex items-center justify-center bg-blue-400 p-2 text-white" >
                  <ArrowLeftIcon className="w-4 h-4 text-3xl text-white" />
                  Previous
                </button>
               </div>
               <div>
               <button className="btn gap-1 flex items-center justify-center bg-blue-400 p-2 text-white" >
               Next
                  <ArrowRightIcon className="w-4 h-4 text-3xl text-white" />
                  
                </button>
               </div>
              </div>
              <div className="my-4">
                <p className="primary-text text-lg">
                  This is Description Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Ipsa, inventore ducimus, non iure laborum
                  aut, ad enim molestiae doloremque consequuntur recusandae
                  repudiandae magni labore! Magnam neque a sunt officia in!
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
          id="Leftcol"
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="ans-col w-full hidden lg:grid md:grid h-auto lg:w-[38%] "
          >
            <h2 className="text-2xl mt-2 primary-text">কোর্সের পরিপূর্ণ কারিকুলাম</h2>
            <div className="ans-col my-3 h-[38vh] ">
              <CourseView course={course} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CourseStart;

