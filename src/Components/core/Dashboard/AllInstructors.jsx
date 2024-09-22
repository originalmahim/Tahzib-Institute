import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getAllInstructorDetails } from "../../../services/operations/adminApi";
import IconBtn from "./../../../Components/IconBtn";
import user_logo from "./../../../assets/user.jpg"; // Placeholder image

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="border-t border-blue-400 p-5 flex justify-between items-center transition-all">
    <div className="flex items-center gap-6">
      <Skeleton baseColor="#202020" highlightColor="#444" circle={false} height={64} width={64} />
      <div className="flex flex-col gap-2">
        <Skeleton baseColor="#202020" highlightColor="#444" height={20} width={160} />
        <Skeleton baseColor="#202020" highlightColor="#444" height={15} width={120} />
        <Skeleton baseColor="#202020" highlightColor="#444" height={15} width={100} />
      </div>
    </div>
    <Skeleton baseColor="#202020" highlightColor="#444" height={20} width={200} className="text-center" />
    <div className="text-center text-lg primary-text">
      <Skeleton baseColor="#202020" highlightColor="#444" height={20} width={160} />
    </div>
  </div>
);

function AllInstructors() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [allInstructors, setAllInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructorsData = async () => {
      setLoading(true);
      const { allInstructorsDetails } = await getAllInstructorDetails(token);
      setAllInstructors(allInstructorsDetails);
      setLoading(false);
    };

    fetchInstructorsData();
  }, [token]);

  return (
    <div className="sec-background primary-text p-3 min-h-screen flex flex-col">
      <div className="h-20"></div>
      <div className="mb-14 flex items-center justify-between text-white">
        <IconBtn text="Add Instructor" onclick={() => navigate("/add-instructor")}>
          <VscAdd />
        </IconBtn>
      </div>

      {/* Scrollable Container */}
      <div className="border border-blue-400 rounded-md ">
        <div className="hidden md:block w-full">
          <div className="flex justify-between text-sm uppercase font-bold primary-text p-5">
            <div>Instructor Details</div>
            <div className="text-left">Status</div>
            <div className="text-left">Build Course</div>
          </div>

          {loading ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : allInstructors.length === 0 ? (
            <div className="text-center py-10 primary-text">No Data Available</div>
          ) : (
            allInstructors.map((instructor) => (
              <div key={instructor._id} className="border-t border-blue-400 p-5 flex justify-between items-start transition-all">
                <div className="flex items-center gap-6">
                  <img
                    src={instructor?.image !== "/" ? instructor?.image : user_logo}
                    alt="instructor"
                    className="h-16 w-16 rounded-md object-cover shadow-md"
                  />
                  <div>
                    <p className="font-semibold text-xl primary-text text-left">{instructor?.firstName} {instructor?.lastName}</p>
                    <p className="primary-text text-sm text-left">Gender: {instructor?.additionalDetails?.gender || "Not defined"}</p>
                    <p className="primary-text text-sm text-left">Mobile No: {instructor?.additionalDetails?.contactNumber || "No Data"}</p>
                  </div>
                </div>
                <div className="text-left text-md primary-text">{instructor?.active ? "Active" : "Inactive"}</div>
                <div className="text-left text-lg primary-text">
                {instructor?.courses ? instructor?.courses?.map((course) => (
                        <div className="text-white text-sm" key={course._id}>
                          <p>{course?.courseName}</p>
                          <p className="text-sm font-normal">Price:  {course.price} TK</p>
                        </div>
                      )) : <div>
                        <p>Did Not Build Any Course Yet</p>
                        </div>}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          {loading ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : allInstructors.length === 0 ? (
            <div className="text-center py-5 primary-text">No Data Available</div>
          ) : (
            allInstructors.map((instructor) => (
              <div key={instructor._id} className=" mb-6 p-5 rounded-lg ">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={instructor.image !== "/" ? instructor.image : user_logo}
                    alt="instructor"
                    className="h-16 w-16 rounded-full object-cover shadow-md"
                  />
                  <div>
                    <p className="font-semibold text-xl primary-text">{instructor.firstName} {instructor.lastName}</p>
                    <p className="primary-text text-sm">{instructor.email}</p>
                  </div>
                </div>
                <div className="text-sm primary-text mb-2">
                  <p><strong>Gender: </strong>{instructor.additionalDetails?.gender || "Not defined"}</p>
                  <p><strong>Mobile No: </strong>{instructor?.additionalDetails?.contactNumber || "No Data"}</p>
                  {instructor?.courses?.map((course) => (
                        <div className="text-white text-sm" key={course._id}>
                          <p>{course?.courseName}</p>
                          <p className="text-sm font-normal">Price:  {course.price} TK</p>
                        </div>
                      ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AllInstructors;

