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
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ResponsiveCoursesTable({ courses, setCourses, loading, setLoading }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 25;

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

  const SkeletonItem = () => (
    <div className="p-5 flex justify-between items-center transition-all">
      <div className="flex items-center gap-6">
        <Skeleton baseColor="#202020" highlightColor="#444" circle={false} height={124} width={224} style={{ borderRadius: '0.5rem' }} />
        <div className="flex flex-col gap-2">
          <Skeleton baseColor="#202020" highlightColor="#444" height={17} width={160} style={{ borderRadius: '0.5rem' }} />
          <Skeleton baseColor="#202020" highlightColor="#444" height={14} width={240} style={{ borderRadius: '0.5rem' }} />
          <Skeleton baseColor="#202020" highlightColor="#444" height={10} width={100} style={{ borderRadius: '0.5rem' }} />
          <Skeleton baseColor="#202020" highlightColor="#444" height={10} width={100} style={{ borderRadius: '0.5rem' }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* PC View */}
      <div className="hidden lg:block rounded-lg primary-text sec-background overflow-hidden">
        <table className="w-full border border-blue-500 rounded-md">
          <thead className="bg-blue-500 primary-text">
            <tr className="text-left text-sm font-medium">
              <th className="p-4">Courses</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                {Array(3).fill().map((_, index) => <SkeletonItem key={index} />)}
              </>
            ) : courses?.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-10 text-yellow-500">No courses found</td>
              </tr>
            ) : (
              courses?.map((course) => (
                <tr key={course._id} className="border-b border-blue-500  transition duration-300">
                  <td className="p-4 flex gap-4 items-start">
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
                  <td className="p-4">{loading ? <Skeleton baseColor="#202020" highlightColor="#444" height={14} width={40} style={{ borderRadius: '0.5rem' }} /> : '2hr 30min'}</td>
                  <td className="p-4">₹{course.price}</td>
                  <td className="p-4 flex items-center">
                    <button
                      onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                      className="mr-4 text-blue-500 hover:scale-110 transition-transform"
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
                      className="text-red-500 hover:scale-110 transition-transform"
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
        {loading ? (
          <>
            {Array(3).fill().map((_, index) => <SkeletonItem key={index} />)}
          </>
        ) : courses?.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No courses found</div>
        ) : (
          courses?.map((course) => (
            <div key={course._id} className="border  rounded-md p-4 mb-4 ">
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
                    className="text-blue-500 hover:scale-110 transition-transform"
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
                    className="text-red-500 hover:scale-110 transition-transform"
                  >
                    <RiDeleteBin6Line size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
