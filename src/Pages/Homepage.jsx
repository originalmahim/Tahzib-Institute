import React from "react";
import Header from "../Components/Home/Header";
import Journey from "../Components/Home/Journey";
 import PopularCourses from "../Components/Home/PopularCourses";
import CourseCategory from "../Components/Home/CourseCategory";
import Support from "../Components/Home/Support";
import Seminar from "../Components/Home/Seminar";
import Faq from "../Components/Home/Faq";
import SocialSupport from "../Components/Home/SocialSupport";
import OurSeminars from "../Components/Home/OurSeminars";
import OurTeam from "../Components/Home/OurTeam";
import Courselist from "../Components/Home/Courselist";

const Homepage = ({ darkTheme }) => {
  return (
    <div id="homepage" className={!darkTheme ? "dark" : "light"}>
      <Header />
      <Journey />
      <OurSeminars />
      <CourseCategory />
      <Support />
      <PopularCourses />
      <Seminar />
      <Faq />
      <SocialSupport />
      <OurTeam />
    </div>
  );
};

export default Homepage;
