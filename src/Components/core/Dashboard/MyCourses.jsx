import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import CoursesTable from "./InstructorCourses/CoursesTable"



export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const result = await fetchInstructorCourses(token)
      // console.log('Instructors all courses  ', result);
      setLoading(false);
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
  }, [])


  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="primary-text">
      <div className="lg:mb-24 mb-28 flex justify-between">
      </div>

      {/* course Table */}
      {courses && <CoursesTable courses={courses} setCourses={setCourses} loading={loading} setLoading={setLoading} />}
    </div>
  )
}