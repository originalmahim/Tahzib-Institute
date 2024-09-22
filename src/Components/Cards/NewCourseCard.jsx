import React from "react";
import { aboutus, checked } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const NewCourseCard = ({ course, handleBuyCourse }) => {
  const [t] = useTranslation("global");
  const bestSeller = false;
  const { user } = useSelector((state) => state.profile)
  // const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const {
          thumbnail: ThumbnailImage,
          price: CurrentPrice,
        } = course

  return (
    <div>
      <div id="freeCourseCard" className="p-course rounded-md">
        <div className="courseBanner">
          {bestSeller && (
            <div className="bestSeller">
              <p>Best Seller</p>
            </div>
          )}
          <img className="rounded-t-md w-full h-60 object-cover" src={ThumbnailImage} alt="" />
        </div>
        <div className="course-details">
          {/* <p className="secondary-text desc">{desc}</p> */}
          <div className="flex gap-2 items-center ">
            <img className="w-6" src={aboutus} alt="" />
            <p className="star">1000 students enrolled</p>
          </div>
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-3 rounded-md p-2 sbtn">
              <img className="w-6" src={checked} alt="" />
              <p className="primary-text">{CurrentPrice} TK</p>
            </div>
            <div className=" rounded-md p-2 hbtn">
              <Link className="flex items-center gap-1" to="/">
                <BsCart2 className="cart" />
                <p>ভর্তি হতে চাই</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCourseCard;
