import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  login,
  bn,
  search,
  animated,
  logo_design,
  wordpress,
  illustration,
  social,
  data_entry,
  cover,
  checked,
  cover2,
  forClient,
  forTalent,
} from "../../assets";
import Slider from "react-slick";
import PopularServicesCard from "./PopularServicesCard";
import Faq from "../Home/Faq";

const Marketplace = ({ darkTheme }) => {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 5,
    slidesToScroll: 4,
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

  const navigate = useNavigate();
  return (
    <div id="marketplace" className={!darkTheme ? "dark" : "light"}>
      <main className="background">
        <div className="firstSection">
          <div className="gradient1"></div>
          <div className="gradient2"></div>
          <div className="banner">
            <img src={cover} alt="" />
          </div>
          <header>
            <div className="topBox jc3">
              <img src={bn} alt="" />
              <small className="secondary-text">
                First Freelancing Platform in Bangladesh
              </small>
            </div>

            <h1 className="heading primary-text">
              Find the best{" "}
              <span className="style textGradient">freelance</span> service,
              right here
            </h1>

            <p className="subTitle secondary-text">
              Find the right service for every price point. No hourly rates,
              just project-based pricing.
            </p>

          </header>

          {/* <div className="searchBar">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search here for any service..."
            />
            <button>
              <img src={search} alt="" />
            </button>
          </div> */}
        </div>

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

        <div className="howWeWork">
        <div className="gradient1"></div>
        <div className="gradient2"></div>
          <div className="left">
            <h1 className="primary-text">
              How work
              <br />
              <span className="textGradient">should work</span>
            </h1>
            <p className="primary-text">
              Forget the old rules. You can have the best people. Right now.
              Right here.
            </p>
            <button className="getStarted hbtn">Get Started</button>
          </div>
          <img src={cover2} alt="" className="middle" />
          <div className="right">
            <ul>
              <li>
                <img src={checked} alt="" />
                <div className="item">
                  <h3 className="primary-text" >No cost to join</h3>
                  <small className="primary-text" >
                    Register and browse professionals, explore projects, or even
                    book a consultation.
                  </small>
                </div>
              </li>
              <li>
                <img src={checked} alt="" />
                <div className="item">
                  <h3 className="primary-text" >Post a job and hire top talent</h3>
                  <small className="primary-text" >
                    Finding talent doesn’t have to be a chore. Post a job or we
                    can search for you!
                  </small>
                </div>
              </li>
              <li>
                <img src={checked} alt="" />
                <div className="item">
                  <h3 className="primary-text" >Get quality work done quickly</h3>
                  <small className="primary-text" >
                    Hand your project over to a talented freelancer in minutes,
                    get long-lasting results.
                  </small>
                </div>
              </li>
              <li>
                <img src={checked} alt="" />
                <div className="item">
                  <h3 className="primary-text" >Pay when you're happy</h3>
                  <small className="primary-text" >
                    Upfront quotes mean no surprises. Payments only get released
                    when you approve.
                  </small>
                </div>
              </li>
            </ul>
          </div>
        </div>

        

        <div className="categories">
          <div className="title">
            <h1 className="primary-text">Popular Services</h1>
            <Link
              to="/all-jobs"
              className="allCategory primary-text"
            >
              View All
            </Link>
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

        {/* <div className="startContent">
          <div className="gradient2"></div>
          <div className="gradient1"></div>

          <div className="title">
            <h1 className="primary-text">
              It all starts <span className="textGradient">with a click</span>
            </h1>
            <p className="secondary-text">
              Whether you're brand new or on brand two (or three!), we've got a
              solution that'll suit your business and elevate your branding.
            </p>
          </div>

          <div className="sections">
            <div className="client">
              <img src={forClient} alt="" className="topBanner" />
              <h2 className="primary-text">For Client</h2>
              <p className="secondary-text">
                Work with the largest network of independent professionals and
                get things done—from quick turnarounds to big transformations.
              </p>
              <ul className="benefits">
                <li className="">
                  <div className="ball"></div>
                  <small className="primary-text">
                    Post a job and hire a pro
                  </small>
                </li>
                <li className="">
                  <div className="ball"></div>
                  <small className="primary-text">
                    Access expert talent to fill your skill gaps
                  </small>
                </li>
              </ul>

              <button
                className="postBtn hbtn"
                onClick={() => navigate("/post-job")}
              >
                Post Job
              </button>
            </div>

            <div className="talent">
              <img src={forTalent} alt="" className="topBanner" />
              <h2 className="primary-text">For Talent</h2>
              <p className="secondary-text">
                Meet clients you’re excited to work with and take your career or
                business to new heights.
              </p>
              <ul className="benefits">
                <li className="">
                  <div className="ball"></div>
                  <small className="primary-text">
                    Find opportunities for every stage of your freelance career
                  </small>
                </li>
                <li className="">
                  <div className="ball"></div>
                  <small className="primary-text">
                    Explore different ways to earn
                  </small>
                </li>
                <li className="">
                  <div className="ball"></div>
                  <small className="primary-text">
                    Control when, where, and how you work
                  </small>
                </li>
              </ul>

              <button
                className="postBtn hbtn"
                onClick={() => navigate("/find-job")}
              >
                Find Job
              </button>
            </div>
          </div>
        </div> */}

        <Faq></Faq>
      </main>
    </div>
  );
};

export default Marketplace;
