import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from './../../IconBtn';
import { setCourseViewSidebar } from "../../../slices/sidebarSlice";

import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdClose } from 'react-icons/io';
import { HiMenuAlt1 } from 'react-icons/hi';
import { PlayCircleIcon } from "@heroicons/react/20/solid";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState(""); // store curr section id
  const [videoBarActive, setVideoBarActive] = useState(""); // store curr SubSection Id
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const { courseViewSidebar } = useSelector(state => state.sidebar);

  useEffect(() => {
    const updateActiveStatus = () => {
      if (!courseSectionData.length) return;
      const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId);
      const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId = courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id;
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
      setVideoBarActive(activeSubSectionId);
    };

    updateActiveStatus();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] lg:w-[400px] w-full flex-col primary-text border-r-[1px] relative border-r-gray-700 bg-transparent">
      <div className="lg:hidden h-10 sec-background"></div>
      <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-gray-600 py-5 text-lg font-bold primary-text">
        <div className="flex w-full items-center justify-between">
          {/* Open - close sidebar icons */}
          <div
            className="sm:hidden primary-text cursor-pointer"
            onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}
          >
            {courseViewSidebar ? <IoMdClose size={33} /> : <HiMenuAlt1 size={33} />}
          </div>

          {/* Go back to dashboard */}
          <button
            onClick={() => navigate(`/`)}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white p-1 text-gray-800 hover:scale-90"
            title="back"
          >
            <IoIosArrowBack size={30} />
          </button>

          {/* Add review button */}
          <IconBtn
            text="Add Review"
            onclick={() => setReviewModal(true)}
            customClasses="bg-blue-500 hover:bg-blue-600 primary-text px-4 py-2 rounded-lg"
          />
        </div>

        {/* Course Name - total No Of Lectures */}
        <div className="flex flex-col primary-text">
          <p className="text-xl">{courseEntireData?.courseName}</p>
          <p className="text-sm font-semibold primary-text">
            {completedLectures?.length} / {totalNoOfLectures} lectures completed
          </p>
        </div>
      </div>

      {/* Render all section - subSection */}
      <div className="h-[calc(100vh - 5rem)] overflow-y-auto primary-text ">
        {courseSectionData.map((section, index) => (
          <div
            className="mt-2 text-sm text-gray-300"
            key={index}
          >
            {/* Section */}
            <div
              className={`flex justify-between px-5 py-4 ${activeStatus === section._id ? "bg-transparent" : ""} transition-all duration-200 cursor-pointer`}
              onClick={() => setActiveStatus(section._id)}
            >
              <div className="font-semibold primary-text">
                {section.sectionName}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium">
                  {section.subSection.length} Lessons
                </span>
                <BsChevronDown className={`${activeStatus === section._id ? "rotate-0" : "rotate-180"} transition-transform duration-500`} />
              </div>
            </div>

            {/* Sub Sections */}
            {activeStatus === section._id && (
              <div className="primary-text bg-transparent primary-text transition-[height] duration-500 ease-in-out">
                {section.subSection.map((topic, i) => (
                  <div
                    className={`flex items-center gap-3 px-5 py-3 ${videoBarActive === topic._id ? " text-green-500" : ""} transition-colors duration-200 cursor-pointer`}
                    key={i}
                    onClick={() => {
                      navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic._id}`);
                      setVideoBarActive(topic._id);
                      if (courseViewSidebar && window.innerWidth <= 640) {
                        dispatch(setCourseViewSidebar(false));
                      }
                    }}
                  >
                    <PlayCircleIcon className={`w-6 h-6 text-blue-500 ${videoBarActive === topic._id ? "text-green-500" : ""}`}/>
                    {topic.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


