import { useSelector } from "react-redux";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../services/formatDate";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../../Components/ConfirmationModal";
import Img from './../../../Img';
import toast from 'react-hot-toast';

export default function ResponsiveCoursesTable({ courses, setCourses, loading, setLoading }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 25;

  // Delete course handler
  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    const toastId = toast.loading("Deleting...");
    await deleteCourse({ courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) setCourses(result);
    setConfirmationModal(null);
    setLoading(false);
    toast.dismiss(toastId);
  };

  // Loading Skeleton
  const skItem = () => (
    <div className="flex border-b border-blue-500 px-6 py-8 w-full">
      <div className="flex flex-1 gap-x-4">
        <div className="h-[148px] min-w-[300px] rounded-xl skeleton"></div>
        <div className="flex flex-col w-[40%]">
          <p className="h-5 w-[50%] rounded-xl skeleton"></p>
          <p className="h-20 w-[60%] rounded-xl mt-3 skeleton"></p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* PC View */}
      <div className="hidden lg:block">
        <table className="w-full border border-blue-400 rounded-md">
          <thead className="bg-blue-200">
            <tr className="text-left text-sm font-medium text-black">
              <th className="p-4">Courses</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && [skItem(), skItem(), skItem()]}
            {!loading && courses?.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-10">No courses found</td>
              </tr>
            ) : (
              courses?.map((course) => (
                <tr key={course._id} className="border-b border-gray-300">
                  <td className="p-4 flex gap-4 items-start">
                    {/* Fix Image Size */}
                    <Img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="h-[148px] w-full lg:w-[270px] rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold">{course.courseName}</p>
                      <p className="text-xs text-gray-500">
                        {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                          ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                          : course.courseDescription}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Created: {formatDate(course?.createdAt)}
                      </p>
                      <p className="text-xs text-gray-400">Updated: {formatDate(course?.updatedAt)}</p>
                      {course.status === COURSE_STATUS.DRAFT ? (
                        <p className="flex items-center gap-1 text-xs text-pink-500 mt-1">
                          <HiClock /> Drafted
                        </p>
                      ) : (
                        <p className="flex items-center gap-1 text-xs text-green-500 mt-1">
                          <FaCheck /> Published
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">2hr 30min</td>
                  <td className="p-4">₹{course.price}</td>
                  <td className="p-4">
                    <button
                      onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                      className="mr-4 text-blue-500 hover:scale-110"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2: "All the data related to this course will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleCourseDelete(course._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                      className="text-red-500 hover:scale-110"
                    >
                      <RiDeleteBin6Line size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        {loading && [skItem(), skItem(), skItem()]}
        {!loading && courses?.length === 0 ? (
          <div className="p-10 text-center">No courses found</div>
        ) : (
          courses?.map((course) => (
            <div key={course._id} className="border border-gray-300 rounded-md p-4 mb-4">
              {/* Fix Image Size */}
              <Img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-[240px] w-[360px] object-cover rounded-md"
              />
              <div className="mt-4">
                <p className="text-lg font-semibold">{course.courseName}</p>
                <p className="text-sm text-gray-500">
                  {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                    ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                    : course.courseDescription}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Created: {formatDate(course?.createdAt)}
                </p>
                <p className="text-xs text-gray-400">Updated: {formatDate(course?.updatedAt)}</p>
                {course.status === COURSE_STATUS.DRAFT ? (
                  <p className="flex items-center gap-1 text-xs text-pink-500 mt-1">
                    <HiClock /> Drafted
                  </p>
                ) : (
                  <p className="flex items-center gap-1 text-xs text-green-500 mt-1">
                    <FaCheck /> Published
                  </p>
                )}
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                    className="text-blue-500 hover:scale-110"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2: "All the data related to this course will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleCourseDelete(course._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                    className="text-red-500 hover:scale-110"
                  >
                    <RiDeleteBin6Line size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
