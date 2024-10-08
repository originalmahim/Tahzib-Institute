import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import Img from './../../../Components/Img';
import Skeleton from "react-loading-skeleton"



export default function EnrolledCourses({darkTheme}) {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  // fetch all users enrolled courses
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, [])

  // Loading Skeleton
  const sklItem = () => {
    return (
      <div className={!darkTheme ? "dark navColor" : "light "}>
      <div className="sec-background flex rounded-md my-2 border border-richblack-700 px-5 py-3 w-full">
        <div className="flex flex-1 gap-x-4 ">
          <div className='h-14 w-14 rounded-lg skeleton '><Skeleton baseColor="#202020" highlightColor="#444" height={50}/></div>

          <div className="flex flex-col w-[40%] ">
            <p className="h-2 w-[50%] rounded-xl  skeleton"><Skeleton baseColor="#202020" highlightColor="#444" height={10}/></p>
            <p className="h-2 w-[70%] rounded-xl mt-3 skeleton"><Skeleton baseColor="#202020" highlightColor="#444" height={10}/></p>
          </div>
        </div>

        <div className="flex flex-[0.4] flex-col ">
          <p className="h-2 w-[60%] rounded-xl skeleton mt-2"><Skeleton baseColor="#202020" highlightColor="#444" height={10}/></p>
        </div>
      </div>
      </div>
    )
  }

  // return if data is null
  if (enrolledCourses?.length === 0) {
    return (
      <p className="w-full place-content-center text-center text-[#00a89c] text-xl ">
        You have not enrolled in any course yet.
      </p>)
  }



  return (
    <>
      <div className="text-2xl mt-2 primary-text text-center sm:text-left">Enrolled Courses</div>
      {
        <div className="my-2 primary-text">
          {/* Headings */}
          <div className="flex rounded-md bg-richblack-800 ">
            <p className="w-[45%] lg:flex hidden px-5 py-3">Course Name</p>
            <p className="w-1/4 lg:flex hidden px-2 py-3">Duration</p>
            <p className="lg:flex hidden px-2 py-3">Progress</p>
          </div>


          {/* loading Skeleton */}
          {!enrolledCourses && <div >
            {sklItem()}
          </div>}

          {/* Course Names */}
          {
            enrolledCourses?.map((course, i, arr) => (
              <div
                className={`flex flex-col sm:flex-row sm:items-center border border-stone-300 ${i === arr.length - 1 ? "rounded-md" : "rounded-none"}`}
                key={i}
              >
                <div
                  className="flex sm:w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  
                >
                  <Img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg object-cover"
                  />

                  <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-semibold">{course.courseName}</p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.length > 50
                        ? `${course?.courseDescription.slice(0, 50)}...`
                        : course?.courseDescription}
                    </p>
                  </div>
                </div>

                {/* only for smaller devices */}
                {/* duration -  progress */}
                <div className='sm:hidden'>
                  {/* <div className=" px-2 py-3">{course?.totalDuration}</div> */}

                  {/* <div className="flex sm:w-1/5 flex-col gap-2 px-2 py-3">
                    <p>Progress: {course.progressPercentage || 0}%</p>
                    <ProgressBar
                      completed={course.progressPercentage || 0}
                      height="8px"
                      isLabelVisible={false}
                    />
                  </div> */}
                  <div className="my-4 flex items-center justify-center">
                  <button onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }} className="bg-yellow-400 p-2 text-black">
                    Start Course
                  </button>
                </div>
                </div>

                {/* only for larger devices */}
                {/* duration -  progress */}
                <div className="hidden w-1/5 sm:flex px-2 py-3">{course?.totalDuration}</div>
                <div className="hidden sm:flex w-1/5 flex-col gap-2 px-2 py-3">
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
                <div className="hidden lg:flex md:flex">
                  <button onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }} className="bg-yellow-400 p-2 text-black">
                    Start Course
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      }
    </>
  )
}