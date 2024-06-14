import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import CourseCard from '../Cards/CourseCard';
import { motion } from 'framer-motion';
import vedioapi from '../../app/vedioapi'; 
const PopularCourses = () => {
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
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
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
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
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
        {/* <div className="grad3"></div> */}
      </motion.div>
      <div className="front">
        <motion.h1
          whileInView={{ y: [-50, 0], opacity: [0, 1] }}
          transition={{ duration: 0 }}
          className="primary-text"
        >
          পপুলার <span className="textGradient"> কোর্স </span>সমূহ
        </motion.h1>
        <motion.p
          whileInView={{ y: [-20, 0], opacity: [0, 1] }}
          transition={{ duration: 0, delay: 0.1 }}
          className="secondary-text sec-subTitle"
        >
          যেকোনো বিষয়ে যেকোনো কিছু শিখতে চলে যাও তোমার পছন্দের সেকশনে
        </motion.p>

        <motion.div
          className="slider"
          whileInView={{ y: [50, 0], opacity: [0, 1] }}
          transition={{ duration: 0, delay: 0.1 }}
        >
          {loading ? (
            <p>Loading...</p>
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

