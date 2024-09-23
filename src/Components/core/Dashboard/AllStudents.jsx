import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getAllStudentsData } from '../../../services/operations/adminApi';
import user_logo from "./../../../assets/user.jpg";

const LoadingSkeleton = () => (
    <>
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
    </>
);

const AllStudents = () => {
  const { token } = useSelector((state) => state.auth);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllStudents = async () => {
      setLoading(true);
      const { allStudentsDetails } = await getAllStudentsData(token);
      setAllStudents(allStudentsDetails);
      setLoading(false);
    };

    fetchAllStudents();
  }, [token]);

  return (
    <div className="sec-background primary-text p-3 min-h-screen flex flex-col">
      <div className='mt-24'></div>

      {/* Scrollable Container */}
      <div className="border border-blue-400 rounded-md overflow-y-auto max-h-screen flex-1">
        <div className="hidden md:block w-full">
          <div className="flex justify-between text-sm uppercase font-bold primary-text p-5">
            <div>Student Details</div>
            <div className="text-left">Mail Address</div>
            <div className="text-left">Enrolled Courses</div>
          </div>

          {loading ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : allStudents.length === 0 ? (
            <div className="text-center py-10 bg-yellow-100 primary-text">No Data Available</div>
          ) : (
            allStudents.map((student) => (
              <div key={student._id} className="border-t border-blue-400 p-5 flex justify-between items-start transition-all">
                <div className="flex items-center gap-6">
                  <img
                    src={student?.image !== "/" ? student?.image : user_logo}
                    alt="student"
                    className="h-16 w-16 rounded-md object-cover shadow-md"
                  />
                  <div>
                    <p className="font-semibold text-xl primary-text text-left">{student?.firstName} {student?.lastName}</p>
                    <p className="primary-text text-sm text-left">Gender: {student?.additionalDetails?.gender || "Not defined"}</p>
                    <p className="primary-text text-sm text-left">Mobile No: {student?.additionalDetails?.contactNumber || "No Data"}</p>
                  </div>
                </div>
                <div className="text-left text-md primary-text">{student?.email || "Not Available"}</div>
                <div className="text-left text-lg primary-text">
                  {student?.courses && student.courses.length ? (
                    <div className="flex flex-col text-left">
                      {student.courses.map((course) => (
                        <div key={course._id} className="primary-text text-sm">
                          <p>{course.courseName}</p>
                          <p className="text-xs">Price: ₹{course.price}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="primary-text text-sm">Not enrolled in any courses</div>
                  )}
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
          ) : allStudents.length === 0 ? (
            <div className="text-center py-5 bg-yellow-100 text-black">No Data Available</div>
          ) : (
            allStudents.map((student) => (
              <div key={student._id} className=" mb-6 p-5 rounded-lg shadow-md ">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={student.image !== "/" ? student.image : user_logo}
                    alt="student"
                    className="h-16 w-16 rounded-full object-cover shadow-md"
                  />
                  <div>
                    <p className="font-semibold text-xl primary-text">{student.firstName} {student.lastName}</p>
                    <p className="primary-text text-sm">{student.email}</p>
                  </div>
                </div>
                <div className="text-sm primary-text mb-2">
                  <p><strong>Gender: </strong>{student.additionalDetails?.gender || "Not defined"}</p>
                  <p><strong>Mobile No: </strong>{student.additionalDetails?.contactNumber || "No Data"}</p>
                  <p><strong>DOB: </strong>{student.additionalDetails?.dateOfBirth || "No Data"}</p>
                </div>
                <div className="mt-4">
                  {student?.courses && student.courses.length ? (
                    <div className="grid grid-cols-2 gap-4">
                      {student.courses.map((course) => (
                        <div key={course._id} className="primary-text text-sm">
                          <p>{course.courseName}</p>
                          <p className="text-xs">Price: ₹{course.price}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="primary-text">No enrolled courses</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllStudents;

