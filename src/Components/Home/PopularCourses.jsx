import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import CourseCard from '../Cards/CourseCard';
import { motion } from 'framer-motion';
import vedioapi from '../../app/vedioapi'; 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTranslation } from 'react-i18next';

const CourseCardSkeleton = () => {
  return (
    <div id="courseCard" className="p-course">
      <div className="courseBanner">
        <Skeleton baseColor="#202020" highlightColor="#444" height={200} />
      </div>
      <div className="course-details">
        <div className="skeleton-title">
          <Skeleton baseColor="#202020" highlightColor="#444"  width={200} />
        </div>
        <div className="skeleton-subtitle">
          <Skeleton baseColor="#202020" highlightColor="#444"  width={100} />
        </div>
        <div className="skeleton-desc">
          <Skeleton baseColor="#202020" highlightColor="#444"  count={3} />
        </div>
        <div className="enrollNum">
          <Skeleton baseColor="#202020" highlightColor="#444"  width={150} />
        </div>
        <div className="btn-group">
          <div className="">
            <Skeleton baseColor="#202020" highlightColor="#444"  width={110} height={42} />
          </div>
          <div className="">
            <Skeleton baseColor="#202020" highlightColor="#444"  width={150} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

const PopularCourses = () => {
  const [t] = useTranslation("global");
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = () => {
    vedioapi.getCourses().then(resp => {
      setCourses(resp.courses);
      setLoading(false);
    });
  };

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
    <div id="popularCourses" className="sec-background">
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0, delay: 0.1 }}
        className="back"
      >
        <div className="grad1"></div>
        {/* <div className="grad2"></div> */}
        {/* <div className="grad3"></div> */}-- 
      </motion.div>
      <div className="front">
      <motion.h1
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0 }}
            className="primary-text"
          >
            {t("popularCourses.title1")}
            <span className="textGradient"> {t("popularCourses.title2")} </span>
            {t("popularCourses.title3")}
          </motion.h1>
        <motion.p
          whileInView={{ y: [-20, 0], opacity: [0, 1] }}
          transition={{ duration: 0, delay: 0.1 }}
          className="secondary-text sec-subTitle"
        >
          {t("popularCourses.desc")}
        </motion.p>

        <motion.div
          className="slider"
          whileInView={{ y: [50, 0], opacity: [0, 1] }}
          transition={{ duration: 0, delay: 0.1 }}
        >
          {loading ? (
            <Slider {...settings}>
              {[...Array(4)].map((_, index) => (
                <div key={index}>
                  <CourseCardSkeleton />
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {courses.map((course, index) => (
                <div key={index}>
                  <CourseCard
                    banner={course?.bannerImage?.url} 
                    title={course?.courseName}
                    mentor={course?.author}
                    price={course?.price}
                    desc='৪৮টি লাইভ সাপোর্ট সেশন
                বেসিক থেকে অ্যাডভান্সড লেভেল
                ৪ মাসের ব্যাচ
                কুইজ ও অ্যাসাইনমেন্ট
                রিয়েল-লাইফ কেস স্টাডি
                মেন্টর সাপোর্ট
                ২ বছরের কন্টেন্ট অ্যাক্সেস
                প্রফেশনাল সার্টিফিকেট'
                    nos='200'
                    bestSeller='true'
                    courseId={course.id}
                  />
                </div>
              ))}
            </Slider>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PopularCourses;


