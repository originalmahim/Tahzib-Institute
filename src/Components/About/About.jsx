import React from "react";
import OurTeam from "../Home/OurTeam";
const About = ({ darkTheme }) => {
  

  return (
          <div className={!darkTheme ? "dark" : "light"}>
          <div className="sec-background">
            <div className="lg:h-[70px] h-[50px]" />
            <div className="grad3"></div>
            <OurTeam></OurTeam>
            
          </div>
        </div>
  );
};

export default About;