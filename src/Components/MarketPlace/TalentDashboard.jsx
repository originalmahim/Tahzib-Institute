import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import EnrolledCourses from "../core/Dashboard/EnrolledCourses";
import { Link } from "react-router-dom";

const TalentDashboard = ({ darkTheme }) => {
  const [tab, setTab] = useState("about");
  const { user } = useSelector((state) => state.profile);

  const createdDate = user?.createdAt;
  let formattedDate = "Date not available";

  if (createdDate) {
    const date = new Date(createdDate);
    if (!isNaN(date.getTime())) {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      formattedDate = date.toLocaleDateString('en-GB', options);
    }
  }

  return (
    <div className={!darkTheme ? "dark" : "light"}>
      <div className="sec-background primary-text">
        <div className="lg:h-28 h-24"></div>
        <div className=" max-w-6xl mx-auto">
      <div className="relative rounded-md w-full h-52 ">
        <img
          src='https://scontent.fdac165-1.fna.fbcdn.net/v/t39.30808-6/306284355_464405405724091_7484475457980942930_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dOsiZ5Bj6oIQ7kNvgHttKFE&_nc_ht=scontent.fdac165-1.fna&_nc_gid=ALfkagcI9YXVBrhSzZvMBro&oh=00_AYAeI9ds-G4dzM0mBme0QLjpNVf4nSI0j5zqXF-2xguXxQ&oe=66F5DE96'
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute z-10 bottom-2 right-3">
        <Link to="/mySettings">
          <button className="bg-[#00a89c] text-white px-2 py-2 rounded-md">
            Edit Profile <BiEdit className="inline-block ml-2" />
          </button>
        </Link>
      </div>
      </div>

      {/* Profile Picture */}
      <div className="relative  -mt-16 flex justify-center">
        <div className="rounded-full border-4 border-[#00a89c]  w-32 h-32 md:w-40 md:h-40">
          <img
            src={user?.image}
            alt="Profile"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mt-4">
        <h1 className="text-3xl font-semibold">{user?.firstName + " " + user?.lastName}</h1>
        <p>{user?.email}</p>
        <p>Member Since: {formattedDate}</p>
        {/* <small className="block text-gray-500">{user?.accountType}</small> */}
      </div>
      <div className="px-2">
{user?.accountType === 'Student' && (
        <div className="my-6">
          <EnrolledCourses />
        </div>
      )}
      </div>

      {/* Tabs */}
      <div className="flex justify-center mt-6 ">
        <button
          className={`px-4 py-2 ${tab === 'about' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setTab('about')}
        >
          About
        </button>
        <button
          className={`px-4 py-2 ${tab === 'timeline' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setTab('timeline')}
        >
          Timeline
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {tab === 'about' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">Basic Information</h3>
              <p>Birthday: 12 Jan, 2001</p>
              <p>Gender: Male</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Contact Information</h3>
              
              <p>Phone: +880 1879866202</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <img src="path_to_no_result_image" alt="No result" className="mx-auto my-6 w-24 h-24" />
            <p>No result found</p>
          </div>
        )}
      </div>


      
        </div>
      </div>
      
    </div>
  );
};

export default TalentDashboard;
