import React from "react";
import PopularCourses from "../Home/PopularCourses";
import Upcommintseminar from "../Home/Upcommintseminar";
import Seminar from "../Home/Seminar";
const Allcourses = ({ darkTheme }) => {
  

  return (
          <div className={!darkTheme ? "dark" : "light"}>
          <div className="sec-background">
            <div className="lg:h-[70px] h-[50px]" />
            <div className="grad3"></div>
            <PopularCourses></PopularCourses>
            <Seminar/>
          </div>
        </div>
  );
};

export default Allcourses;