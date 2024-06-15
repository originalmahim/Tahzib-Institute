import React from "react";
import { checked, play } from "../../assets";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import CourseView from "./CourseView";

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
                <div className="absolute inset-0 flex items-center justify-center rounded-md">
                  <button className="bg-white text-black rounded-full p-3 bg-opacity-70 hover:bg-opacity-100 transition">
                    <img src={play} alt="" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="primary-text text-2xl">
                  Video 1: This Is Title Section
                </h1>
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
            className="ans-col w-full h-auto lg:w-[38%] "
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

