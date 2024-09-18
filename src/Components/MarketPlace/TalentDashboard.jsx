import React, { useState } from "react";
import {
  checked,
  dashboard,
  information,
  map,
  noResult,
} from "../../assets";
import { BiEdit } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TalentDashboard = ({ darkTheme }) => {
  const [btn1, setbtn1] = useState(true);
  const [btn2, setbtn2] = useState(false);
  const { user } = useSelector((state) => state.profile);

  const createdDate = user?.createdAt;

  let formattedDate = "Date not available";

  console.log("Raw createdDate:", createdDate); // Check if the date is being retrieved

  if (createdDate) {
    // Parse the ISO date string correctly
    const date = new Date(createdDate);

    console.log("Parsed date object:", date); // Check the parsed date object

    // Check if the date is valid
    if (!isNaN(date.getTime())) {
      // Format the date as "09 September 2024"
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      formattedDate = date.toLocaleDateString('en-GB', options);
    } else {
      console.log("Invalid date parsed from createdDate:", createdDate);
    }
  }


  return (
    <div id="talentProfile" className={!darkTheme ? "dark" : "light"}>
      <main className="background">
        <div className="left">
          <div className="profilePic ">
            <img className="rounded-full" src={user?.image} alt="" />
          </div>
          {/* <h3 className="primary-text">Activity</h3>
          <div className="line"></div> */}

          <h3 className="primary-text">Skills</h3>
          <div className="skills">
            <small className="skill primary-text">Branding</small>
            <small className="skill primary-text">UI/UX Design</small>
            <small className="skill primary-text">Web Design</small>
            <small className="skill primary-text">HTML</small>
            <small className="skill primary-text">CSS</small>
            <small className="skill primary-text">JavaScript</small>
          </div>
          <div className="line"></div>
          <h3 className="primary-text">Badge Earned</h3>
          <div className="tests">
            <div className="test">
              <div className="testDetails">
                <img src={checked} alt="" />
                <small className="secondary-text">Learner</small>
              </div>
              <small className="level secondary-text">Basic</small>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="userDetails">
            <div className="bar">
              <div className="top-line">
                <h1 className="primary-text">{user?.firstName + " " + user?.lastName}</h1>
                <div className="location">
                  <img src={map} alt="" />
                  <small className="secondary-text">Bangladesh</small>
                </div>
              </div>

              <button className="editProfile">
                <BiEdit className="editBtn primary-text" />
                <small className="primary-text">Edit</small>
              </button>
            </div>
            <small className="tag">{user?.accountType}</small>
            <p className="bio secondary-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
              aperiam ab harum, vitae deleniti ducimus minus quas odit odio hic
              similique recusandae provident nobis in! Eveniet architecto modi
              facere nostrum.
            </p>
          </div>

          <div className="content-btns">
            <button
              className={btn1 && !btn2 ? "active secondary-text" : "secondary-text"}
              onClick={() => {
                setbtn1(true);
                setbtn2(false);
              }}
            >
              <img src={information} alt="" />
              About
            </button>
            <button
              className={btn2 && !btn1 ? "active secondary-text" : "secondary-text"}
              onClick={() => {
                setbtn1(false);
                setbtn2(true);
              }}
            >
              <img src={dashboard} alt="" />
              Timeline
            </button>
          </div>

          {btn2 && (
            <div className="timeline-content">
            <div className="noContent">
                  <img src={noResult} alt="" />
                  <small className="secondary-text">No result found</small>
                </div>

            </div>
          )}

          {btn1 && (
            <div className="about-content">
              <p className="barTitle">Basic Information</p>
              <div className="info">
                <small className="primary-text">Birthday: 12 Jan, 2001</small>
                <small className="primary-text">Gender: Male</small>
                <small className="primary-text">Member Since: {formattedDate}</small>
                <small className="primary-text">
                  Education: Dhaka University of Bangladesh
                </small>
              </div>

              <p className="barTitle2">Contact Information</p>

              <div className="info">
                <small className="primary-text">Email: {user?.email}</small>
                <small className="primary-text">Phone: +880 1879866202</small>
              </div>

              <p className="barTitle3">Social Media</p>

              <div className="social">
                <Link to="">
                  <FaFacebookF className="primary-text sio" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TalentDashboard;
