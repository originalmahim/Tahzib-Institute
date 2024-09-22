import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setCourseViewSidebar } from "../../../slices/sidebarSlice";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdClose } from 'react-icons/io';
import { HiMenuAlt1 } from 'react-icons/hi';
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import Skeleton from "react-loading-skeleton"; // Ensure correct import
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    loading, // Ensure this is defined in your Redux state
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
  }, [courseSectionData, location.pathname]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] lg:w-[400px] w-full flex-col primary-text border-r-[1px] relative border-r-gray-700 bg-transparent">
      <div className="lg:hidden h-10 sec-background"></div>
      <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-gray-600 py-5 text-lg font-bold primary-text">
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => navigate(`/`)}
            className="lg:flex hidden h-[35px] w-[35px] items-center justify-center rounded-full bg-white p-1 text-gray-800 hover:scale-90"
            title="back"
          >
            <IoIosArrowBack size={30} />
          </button>
          <div className="flex flex-col">
            <p className="text-xl">Course Contents</p>
          </div>
          <div
            className="sm:hidden primary-text cursor-pointer"
            onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}
          >
            {courseViewSidebar ? <IoMdClose size={33} /> : <HiMenuAlt1 size={33} />}
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh - 5rem)] overflow-y-auto primary-text">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div className="flex items-center mb-3" key={index}>
              <Skeleton baseColor="#202020" highlightColor="#444"  height={40} width="100%" className="rounded-lg" />
            </div>
          ))
        ) : (
          courseSectionData.map((section, index) => (
            <div className="mt-2 text-sm text-gray-300" key={index}>
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

              {activeStatus === section._id && (
                <div className="primary-text bg-transparent primary-text transition-[height] duration-500 ease-in-out">
                  {loading ? (
                    Array.from({ length: section.subSection.length }).map((_, i) => (
                      <div className="flex items-center gap-3 px-5 py-3" key={i}>
                        <Skeleton baseColor="#202020" highlightColor="#444"  width={30} height={30} className="rounded-full" />
                        <Skeleton baseColor="#202020" highlightColor="#444"  height={20} width={`70%`} />
                      </div>
                    ))
                  ) : (
                    section.subSection.map((topic, i) => (
                      <div
                        className={`flex items-center gap-3 px-5 py-3 ${videoBarActive === topic._id ? "text-green-500" : ""} transition-colors duration-200 cursor-pointer`}
                        key={i}
                        onClick={() => {
                          navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic._id}`);
                          setVideoBarActive(topic._id);
                          if (courseViewSidebar && window.innerWidth <= 640) {
                            dispatch(setCourseViewSidebar(false));
                          }
                        }}
                      >
                        <PlayCircleIcon className={`w-6 h-6 text-blue-500 ${videoBarActive === topic._id ? "text-green-500" : ""}`} />
                        {topic.title}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}


