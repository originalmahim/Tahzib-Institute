import React from "react";
import {
  course5,
  course7,
  course8,
  seminar,
  seminarBanner,
  web_mastery,
} from "../../assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import FreeCourseCard from "../Cards/FreeCourseCard";
import { useTranslation } from "react-i18next";

const Seminar = () => {
  const [t] = useTranslation("global");

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div id="seminar" className="sec-background">
      <div className="gradient1"></div>
      {/* <Upcommintseminar/> */}

      <div className="freeCourses">
        <div className="top-row">
          <motion.h1
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0 }}
            className="primary-text"
          >
            {t("freeCourses.title1")}
            <span className="textGradient"> {t("freeCourses.title2")} </span>
            {t("freeCourses.title3")}
          </motion.h1>
          <motion.p
            whileInView={{ y: [-20, 0], opacity: [0, 1] }}
            transition={{ duration: 0, delay: 0 }}
            className="secondary-text sec-subTitle"
          >
            {t("freeCourses.desc")}
          </motion.p>
        </div>
        <motion.div
          whileInView={{ y: [50, 0], opacity: [0, 1] }}
          transition={{ duration: 0, delay: 0 }}
          className="bottom-row"
        >
          <Slider {...settings}>
            <div>
              <FreeCourseCard
                banner={course5}
                title={t("freeCourses.course1.title")}
                mentor="ACADEMY"
                desc={t("freeCourses.course1.desc")}
                nos="0"
                bestSeller={false}
              />
            </div>
            <div>
              <FreeCourseCard
                banner={web_mastery}
                title={t("freeCourses.course2.title")}
                mentor="ACADEMY"
                desc={t("freeCourses.course2.desc")}
                nos="0"
                bestSeller={false}
              />
            </div>
            {/* <div></div>
            <div></div> */}
            <div>
              <FreeCourseCard
                banner={course7}
                title="ডিজিটাল প্রোডাক্ট ম্যানেজমেন্ট"
                mentor="Tareq Aziz Mahim"
                desc="এই ডিজিটাল প্রোডাক্ট ম্যানেজমেন্ট কোর্সে প্রোডাক্ট ম্যানেজমেন্ট অনেক সহজ করে বোঝানো হয়েছে এবং বেসিক থেকে এডভান্স সব টপিক কভার করা হয়েছে"
                price="2000"
                nos="1567"
                bestSeller={true}
              />
            </div>
            <div>
              <FreeCourseCard
                banner={course8}
                title="এডভান্স পাইথন প্রোগ্রামিং"
                mentor="Mehedi Hasan"
                price="2000"
                desc="এই পাইথন কোর্সে প্রগ্রামিং কে অনেক সহজ করে বোঝানো হয়েছে এবং বেসিক থেকে এডভান্স সব টপিক কভার করা হয়েছে"
                nos="67"
                bestSeller={false}
              />
            </div>
            {/* <div>
              <FreeCourseCard
                banner={course5}
                title="এডভান্স পাইথন প্রোগ্রামিং"
                mentor="Mehedi Hasan"
                price="2000"
                desc="এই পাইথন কোর্সে প্রগ্রামিং কে অনেক সহজ করে বোঝানো হয়েছে এবং বেসিক থেকে এডভান্স সব টপিক কভার করা হয়েছে"
                nos="67"
                bestSeller={false}
              />
            </div> */}
          </Slider>
        </motion.div>
      </div>
    </div>
  );
};

export default Seminar;
