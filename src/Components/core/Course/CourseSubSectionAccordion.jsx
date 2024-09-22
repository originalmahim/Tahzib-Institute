
import { LockClosedIcon } from "@heroicons/react/20/solid"
import { LockOpenIcon } from "@heroicons/react/24/outline"
import { HiLockClosed, HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div>
      <div className="flex justify-between py-1">
        <div className={`flex items-center gap-2`}>
          <span>
            <HiOutlineVideoCamera />
          </span>
          <p>{subSec?.title}</p>
        </div>
        <div className={`flex items-center gap-2`}>
          <span>
            <HiLockClosed></HiLockClosed>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion