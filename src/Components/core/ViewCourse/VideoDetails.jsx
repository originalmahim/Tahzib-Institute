import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from './../../IconBtn';
import { setCourseViewSidebar } from "../../../slices/sidebarSlice";
import { HiMenuAlt1 } from 'react-icons/hi';
import ReactPlayer from 'react-player';
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { markLectureAsComplete } from './../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";

// Inline styles for the component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px',
    height: 'auto',
  },
  sidebarToggle: {
    color: 'white',
    cursor: 'pointer',
    margin: '10px',
  },
  videoPlayerContainer: {
    position: 'relative',
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
  },
  aspectRatioContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '50%', // 16:9 Aspect Ratio
  },
  aspectRatioInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  videoEndedOverlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: '12px',
  },
  button: {
    backgroundColor: '#1E293B',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    margin: '4px',
    cursor: 'pointer',
    border: 'none',
  },
  buttonHover: {
    backgroundColor: '#374151',
  },
  title: {
    marginTop: '24px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  description: {
    color: '#D1D5DB',
    paddingTop: '1px',
    paddingBottom: '24px',
  },
};

export default function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams()

  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([])
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
   (async () => {
      if (!courseSectionData.length) return
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        // console.log("courseSectionData", courseSectionData)
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
        // console.log("filteredData", filteredData)
        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        )
        // console.log("filteredVideoData = ", filteredVideoData)
        if (filteredVideoData) setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
      }
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  // check if the lecture is the first video of the course
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)

    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true
    } else {
      return false
    }
  }

  // go to the next video
  const goToNextVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)

    const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId)

    // console.log("no of subsections", noOfSubsections)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx + 1]._id

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId = courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  // check if the lecture is the last video of the course
  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)

    const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }
  }

  // go to the previous video
  const goToPrevVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx - 1]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength = courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId = courseSectionData[currentSectionIndx - 1].subSection[prevSubSectionLength - 1]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  // handle Lecture Completion
  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  const { courseViewSidebar } = useSelector(state => state.sidebar)
  

  return (
    <div className="sec-background">
      {/* Sidebar Toggle Button */}
      
      <h1 className="primary-text mb-2 text-xl">{videoData?.title}</h1>
      {/* Video Player */}
      <div style={styles.videoPlayerContainer}>
        <div style={styles.aspectRatioContainer}>
          <div style={styles.aspectRatioInner}>
            <ReactPlayer
              url={videoData?.videoUrl}
              playing
              controls
              width="100%"
              height="100%"
              onEnded={() => setVideoEnded(true)}
              style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
            />
          </div>
        </div>
        {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={() => handleLectureCompletion()}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    // set the current time of the video to 0
                    playerRef?.current?.seek(0)
                    setVideoEnded(false)
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />

              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
      </div>

      {/* Video Title and Description */}
      
      <p className="text-center mt-2 primary-text">{videoData?.description}</p>
      <div className="mt-4 flex justify-around items-center">
                <div>
                   <button onClick={goToPrevVideo} className="btn gap-1 flex items-center justify-center bg-blue-400 p-2 text-sm lg:text-xl text-white">
            <ArrowLeftIcon className="w-4 h-4 text-3xl text-white" />
            Previous
            </button>
            </div>
            <div>
            <button onClick={goToNextVideo} className="btn gap-1 flex items-center justify-center bg-blue-400 p-2 text-sm lg:text-xl text-white">
            Next
            <ArrowRightIcon className="w-4 h-4 text-3xl text-white" />
            </button>
            </div>
            </div>
      <div className=" lg:hidden flex" style={styles.sidebarToggle} onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}>
        {courseViewSidebar ? ''  : <HiMenuAlt1 size={30} />}
      </div>
    </div>
  );
}

