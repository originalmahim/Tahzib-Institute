import { useEffect, useRef, useState } from "react"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

import { IoMdArrowDropdown } from "react-icons/io"


export default function CourseAccordionBar({ course, isActive, handleActive }) {

  const contentEl = useRef(null)
  const [active, setActive] = useState(false)  // Accordian state
  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])


  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])



  return (
    <div className='overflow-hidden border border-solid border-blue-600 primary-text rounded-md my-3  last:mb-0 duration-200 '>
      <div className="">
        <div
          className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-6 py-3 transition-[0.3s]`}
          onClick={() => { handleActive(course._id) }}
        >
          <div className="flex items-center gap-2">
            
            <p>{course?.sectionName}</p>
          </div>
          <div className="flex items-center gap-2">
          <i
              className={isActive.includes(course._id) ? "rotate-180 duration-300" : "rotate-0 duration-300"}
            >
              <IoMdArrowDropdown size={25} />
            </i>
          </div>
        </div>
      </div>

      <div
        ref={contentEl}
        className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
        style={{ height: sectionHeight, }}
      >
        <div className="text-textHead flex flex-col gap-2 px-10 py-2 font-semibold">
          {course?.subSection?.map((subSec, i) => {
            return <CourseSubSectionAccordion subSec={subSec} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}