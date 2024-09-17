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
                banner='https://tahzibinstitute.com/wp-content/uploads/2024/08/Fundamentals-of-Islami-Aqida-torn-paper-final-e1708185493174.jpg'
                title={t("freeCourses.course1.title")}
                mentor="Ustaza Umme Zuyairiya"
                desc={t("freeCourses.course1.desc")}
                nos="0"
                bestSeller={false}
              />
            </div>
            <div>
              <FreeCourseCard
                banner='https://course.tahzibinstitute.com/wp-content/uploads/2024/02/%E0%A6%AA%E0%A7%82%E0%A6%B0%E0%A7%8D%E0%A6%A3%E0%A6%BE%E0%A6%99%E0%A7%8D%E0%A6%97-%E0%A6%95%E0%A7%81%E0%A6%B0%E0%A6%86%E0%A6%A8-%E0%A6%A4%E0%A6%B0%E0%A6%9C%E0%A6%AE%E0%A6%BE-%E0%A6%93-%E0%A6%B8%E0%A6%82%E0%A6%95%E0%A7%8D%E0%A6%B7%E0%A6%BF%E0%A6%AA%E0%A7%8D%E0%A6%A4-%E0%A6%A4%E0%A6%BE%E0%A6%AB%E0%A6%B8%E0%A6%BF%E0%A6%B0-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A7%8B%E0%A6%97%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%AE-1024x1024-1.jpg'
                title={t("freeCourses.course2.title")}
                mentor="Ustaz Fazle Rabbi"
                desc={t("freeCourses.course2.desc")}
                nos="0"
                bestSeller={false}
              />
            </div>
            {/* <div></div>
            <div></div> */}
            <div>
              <FreeCourseCard
                banner='https://course.tahzibinstitute.com/wp-content/uploads/2024/02/%E0%A6%AA%E0%A7%82%E0%A6%B0%E0%A7%8D%E0%A6%A3%E0%A6%BE%E0%A6%99%E0%A7%8D%E0%A6%97-%E0%A6%95%E0%A7%81%E0%A6%B0%E0%A6%86%E0%A6%A8-%E0%A6%A4%E0%A6%B0%E0%A6%9C%E0%A6%AE%E0%A6%BE-%E0%A6%93-%E0%A6%B8%E0%A6%82%E0%A6%95%E0%A7%8D%E0%A6%B7%E0%A6%BF%E0%A6%AA%E0%A7%8D%E0%A6%A4-%E0%A6%A4%E0%A6%BE%E0%A6%AB%E0%A6%B8%E0%A6%BF%E0%A6%B0-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A7%8B%E0%A6%97%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%AE-1024x1024-1.jpg'
                mentor="Ustaz Fazle Rabbi"
                title= "হালাকাতুল কুরআন"
                desc= "পূর্নাঙ্গ কুরআন তরজমা ও সংক্ষিপ্ত তাফসির কোর্স । কোর্সটি সবাই করতে পারবেন । সৌদি আরব থেকে কোর্সটি পরিচালনা করবেন উস্তাদ ফজলে রাব্বি , তিনি বর্তমানে মদিনা বিশ্ববিদ্যালয়ে পড়াশোনা করছেন । "
                price="2000"
                nos="1567"
                bestSeller={true}
              />
            </div>
            <div>
              <FreeCourseCard
                banner='https://tahzibinstitute.com/wp-content/uploads/2024/08/Fundamentals-of-Islami-Aqida-torn-paper-final-e1708185493174.jpg'
                title={t("freeCourses.course1.title")}
                mentor="Ustaza Umme Zuyairiya"
                desc={t("freeCourses.course1.desc")}
                nos="0"
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
