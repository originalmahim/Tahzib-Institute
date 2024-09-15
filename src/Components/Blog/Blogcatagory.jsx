import React from 'react';
import PopularServicesCard from '../MarketPlace/PopularServicesCard';
import { animated, data_entry, illustration, logo_design, social, wordpress } from '../../assets';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const Blogcatagory = () => {
          const settings = {
                    arrows: false,
                    dots: true,
                    infinite: true,
                    autoplay: true,
                    speed: 1000,
                    autoplaySpeed: 5000,
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    responsive: [
                      {
                        breakpoint: 1024,
                        settings: {
                          slidesToShow: 4,
                          slidesToScroll: 1,
                        },
                      },
                      {
                        breakpoint: 600,
                        settings: {
                          slidesToShow: 2,
                          slidesToScroll: 1,
                        },
                      },
                      {
                        breakpoint: 575,
                        settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                        },
                      },
                    ],
                  };
          return (
          <div>
          <div className="BlogCatagory">
          <div>
        <h1
          // whileInView={{ opacity: [0, 1], y: [-50, 0] }}
          // transition={{ duration: 0.7, delay: 0 }}
          className="primary-text mt-1"
        >
          আমাদের <span className="textGradient">ব্লগ</span> সমূহ
        </h1>
        <p
          // whileInView={{ opacity: [0, 1], y: [-50, 0] }}
          // transition={{ duration: 0.7, delay: 0.3 }}
          className="secondary-text"
        >
          আমরা বাংলাদেশের বিভিন্ন শিক্ষা প্রতিষ্ঠানে ফ্রি সেমিনারের মাধ্যমে শিক্ষার্থীদের মধ্যে মডার্ন টেকনোলজি সম্পর্কে ধারণা দিয়ে থাকি
        </p>
         </div>
          

          <Slider {...settings}>
            <div>
              <PopularServicesCard
                banner={animated}
                title="Video Editor"
                subTitle="Engage your audience"
                link="/marketplace/animated"
              />
            </div>
            <div>
              <PopularServicesCard
                banner={logo_design}
                title="Logo Design"
                subTitle="Build your brand"
                link="/marketplace/logo-design"
              />
            </div>
            <div>
              <PopularServicesCard
                banner={wordpress}
                title="Web Development"
                subTitle="Customize your site"
                link="/marketplace/web-development"
              />
            </div>
            <div>
              <PopularServicesCard
                banner={illustration}
                title="Illustration"
                subTitle="Color your dreams"
                link="/marketplace/illustration"
              />
            </div>
            <div>
              <PopularServicesCard
                banner={social}
                title="Social Media"
                subTitle="Reach more customer"
                link="/marketplace/social"
              />
            </div>
            <div>
              <PopularServicesCard
                banner={data_entry}
                title="Data Entry"
                subTitle="Learn your business"
                link="/marketplace/data-entry"
              />
            </div>
          </Slider>
        </div>                    
          </div>
          );
};

export default Blogcatagory;