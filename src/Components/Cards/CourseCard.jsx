import React from "react";
import { aboutus, checked } from "../../assets";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const CourseCard = ({
  banner,
  title,
  mentor,
  price,
  desc,
  nos,
  bestSeller,
  courseId,
  loading
}) => {
  return (
    <div>
      <div id="courseCard" className="p-course">
        <div className="courseBanner">
          {loading ? (
            <Skeleton height={200} />
          ) : (
            <>
              {bestSeller && (
                <div className="bestSeller">
                  <p>Best Seller</p>
                </div>
              )}
              <img src={banner} alt="" />
            </>
          )}
        </div>
        <div className="course-details">
          <h2 className="primary-text">
            {loading ? <Skeleton width={200} /> : title}
          </h2>
          <small>
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <>
                A course by <span className="star">{mentor}</span>
              </>
            )}
          </small>
          <p className="secondary-text desc">
            {loading ? <Skeleton count={3} /> : desc}
          </p>
          <div className="enrollNum">
            {loading ? (
              <Skeleton width={150} />
            ) : (
              <>
                <img src={aboutus} alt="" />
                <p className="star">{nos} students enrolled</p>
              </>
            )}
          </div>
          <div className="btn-group">
            <div className="left-btn sbtn">
              {loading ? (
                <Skeleton width={60} height={40} />
              ) : (
                <>
                  <img src={checked} alt="" />
                  <p className="primary-text">{price} tk</p>
                </>
              )}
            </div>
            <div className="right-btn hbtn">
              {loading ? (
                <Skeleton width={100} height={40} />
              ) : (
                <Link to={`/Details/${courseId}`}>
                  <BsCart2 className="cart" />
                  <p>এনরল করো</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

