import React from "react";
import OurSeminars from "../Home/OurSeminars";
import Upcommintseminar from "../Home/Upcommintseminar";
import Blogcatagory from "./Blogcatagory";
const Blogs = ({ darkTheme }) => {
  

  return (
          <div className={!darkTheme ? "dark" : "light"}>
          <div className="sec-background">
            <div className="lg:h-[70px] h-[50px]" />
            <div className="grad3"></div>
            <Blogcatagory/>
            <OurSeminars/>
            <div className="animated-texts jc2">
          <ul>
            <li className="secondary-text">Academy</li>
            <li className="secondary-text">
              First Freelancing Website in Bangladesh
            </li>
            <li className="secondary-text">Trusted Platform for freelancers</li>
            <li className="secondary-text">Beginner Freiendly</li>
            <li className="secondary-text">No cost to join</li>
            <li className="secondary-text">Explore different ways to earn</li>
            <li className="secondary-text">
              Access expert talent to fill your skill gaps
            </li>
            <li className="secondary-text">Get quality work done quickly</li>
            <li className="secondary-text">
              Find the right service for every price point
            </li>
          </ul>
        </div>
            <Upcommintseminar/>
            
          </div>
        </div>
  );
};

export default Blogs;