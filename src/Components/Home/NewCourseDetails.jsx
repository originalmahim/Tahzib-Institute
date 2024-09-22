import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RatingStars from "./../../Components/RatingStars";
import CourseAccordionBar from "./../../Components/core/Course/CourseAccordionBar";
import { fetchCourseDetails } from "./../../services/operations/courseDetailsAPI";
import { buyCourse } from "./../../services/operations/studentFeaturesAPI";
import GetAvgRating from "./../../utils/avgRating";
import { MdOutlineVerified } from 'react-icons/md';
import ConfirmationModal from "../ConfirmationModal";
import Img from "../Img";
import NewCourseCard from "../Cards/NewCourseCard";
import { checked } from "../../assets";
import CauntDown from "./CauntDown";
import Faqs from "./Faqs";
import AskedQuestions from "../core/Course/AskedQuestions";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function NewCourseDetails({ darkTheme }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [isActive, setIsActive] = useState([]);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  useEffect(() => {
    const fetchCourseDetailsData = async () => {
      try {
        setLoading(true);
        const res = await fetchCourseDetails(courseId);
        setCourseDetails(res.data.courseDetails);
        setAvgReviewCount(GetAvgRating(res.data.courseDetails.ratingAndReviews));
        setLoading(false);
      } catch (error) {
        console.error("Could not fetch Course Details", error);
        setError("Failed to load course details.");
        setLoading(false);
      }
    };
    fetchCourseDetailsData();
  }, [courseId]);

  useEffect(() => {
    if (courseDetails) {
      const lectures = courseDetails.courseContent.reduce((acc, sec) => acc + (sec.subSection.length || 0), 0);
      setTotalNoOfLectures(lectures);
    }
  }, [courseDetails]);

  const handleActive = (id) => {
    setIsActive(isActive.includes(id) ? isActive.filter(e => e !== id) : [...isActive, id]);
  };

  const handleBuyCourse = () => {
    if (token) {
      const coursesId = [courseId];
      buyCourse(token, coursesId, user, navigate, dispatch);
    } else {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to purchase the course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  const LoadingSkeleton = () => (
    <div className="sec-background flex flex-col lg:flex-row px-4 lg:w-[1260px] mx-auto">
  <div className="flex-1 lg:w-[65%] lg:mr-4">
    {/* Skeleton for Title */}
    <Skeleton baseColor="#202020" highlightColor="#444" height={40} width="90%" />
    
    {/* Skeleton for Course Description */}
    <Skeleton count={3} baseColor="#202020" highlightColor="#444" />

    <Skeleton baseColor="#202020" highlightColor="#444" height={30} width="30%" />
    <div className="flex items-center ja">
    <div>
      {/* Skeleton for Course Image */}
    <Skeleton baseColor="#202020" highlightColor="#444" height={150} width={150} className="my-4" />
    </div>
      <div>
      <Skeleton baseColor="#202020" highlightColor="#444" height={30} width="40%" />
      <Skeleton baseColor="#202020" highlightColor="#444" height={30} width="20%" /> 
      </div>
    </div>
    
    {/* Skeleton for Instructor Section */}
    <Skeleton baseColor="#202020" highlightColor="#444" height={30} width="60%" />
    <Skeleton baseColor="#202020" highlightColor="#444" height={150} className="my-4" />
    <Skeleton baseColor="#202020" highlightColor="#444" height={40} width="20%" className="my-4" />
    
    {/* Skeleton for Accordion Section */}
    <Skeleton baseColor="#202020" highlightColor="#444" count={5} className="my-2" />
    
    {/* Skeleton for CTA Button */}
    <Skeleton baseColor="#202020" highlightColor="#444" height={40} width="40%" className="my-4" />
  </div>
  
  <div className="flex-1 lg:w-[25%]">
    {/* Skeleton for Additional Content or Image */}
    <Skeleton baseColor="#202020" highlightColor="#444" height={300}  className="my-4" />
    <Skeleton baseColor="#202020" highlightColor="#444" height={80} className="my-4" />
  </div>
</div>

  
    );


  return (
    <div className={!darkTheme ? "dark" : "light"}>
      <div className='sec-background primary-text'>
        <div className="lg:h-28 h-24"></div>
        { loading ? 
        <LoadingSkeleton/>
         : <div className=" w-full">
          <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:py-4">
              {/* Left Column */}
              <div className="w-full lg:w-[65%]">
                <div className="relative block lg:hidden mb-4">
                  <div className="mb-2">
                    <CauntDown/>
                  </div>
                  <Img src={courseDetails?.thumbnail} alt="course thumbnail" className="rounded-xl shadow-lg w-full" />
                </div>

                <div className="mb-1">
                  <h1 className="lg:text-4xl text-3xl font-extrabold">{courseDetails?.courseName}</h1>
                  <p className="text-lg mt-4">{courseDetails.courseDescription}</p>
                  <div className=" gap-2 mt-4">
                    <div className="flex mb-2 items-center gap-2">
                    <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                    <span>{courseDetails.ratingAndReviews?.length} reviews</span>
                    </div>
                    <div>
                    <span className="text-xl text-yellow-400">{`কোর্সটিতে ভর্তি হয়েছেন ${courseDetails.studentsEnrolled?.length} জন `}</span>
                    </div>
                    <div>
                    <span className="text-xl text-yellow-400">কোর্সের মেয়াদ আজীবন থাকবে </span>
                    </div>
                  </div>
                  {/* <p className="mt-4 text-lg"> Created by <span className="font-semibold underline">{courseDetails.instructor.firstName} {courseDetails.instructor.lastName}</span></p> */}
                  {/* <div className="flex gap-4 mt-4">
                    <p className="flex items-center gap-2"><BiInfoCircle /> {formatDate(courseDetails.createdAt)}</p>
                    <p className="flex items-center gap-2"><HiOutlineGlobeAlt /> English</p>
                  </div> */}
                  <div className="mb-4 py-2">
              <p className="lg:text-3xl text-2xl font-semibold">কোর্স ইন্সট্রাক্টর</p>
              <div className="flex  items-center gap-4 py-2">
                <Img
                  src={courseDetails?.instructor?.image}
                  alt="Author"
                  className="h-28 w-28 border-2 border-blue-400 rounded-md object-cover"
                />
                <div>
                  <p className="text-lg capitalize flex items-center gap-2 font-semibold">{`${courseDetails?.instructor?.firstName} ${courseDetails?.instructor?.lastName}`}
                    <span><MdOutlineVerified className='w-5 h-5 text-[#00BFFF]' /></span>
                  </p>
                  <p className="text-richblack-50">{courseDetails?.instructor?.additionalDetails?.about}</p>
                </div>
              </div>
            </div>
                </div>

                <div className="relative block lg:hidden mb-4">
                  <h1 className="text-center text-3xl">কোর্স ফি</h1>
                <div className="flex items-center justify-center ">
                  <div className="flex mb-3 items-center justify-center gap-4">
                    <div className="text-red-500 line-through text-3xl font-bold">10000</div>
                    <div className="text-green-500 text-4xl font-bold">4000/- </div>
                  </div>
                </div>
                  <button className="w-full flex items-center justify-center gap-2 p-2 text-black text-2xl font-bold text-center bg-yellow-400 rounded-md">
                   কোর্সে ভর্তি হতে চাই
                  </button>
                </div>

                <div className=" mt-4">
                  <h2 className="lg:text-3xl text-2xl font-semibold mb-4">কোর্সটি করে যা শিখবেন </h2>
                  <div className="border w-full border-blue-500 rounded-md p-4">
                  <ul className="space-y-3">
                    {courseDetails?.whatYouWillLearn?.split('\n')?.map((line, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span><img className="w-5" src={checked} alt="" /></span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
                <div className=" mt-4">
                  <h2 className="lg:text-3xl text-2xl font-semibold mb-4">কোর্সটি যাদের জন্য </h2>
                  <div className="border w-full border-blue-500 rounded-md p-4">
                  <ul className="space-y-3">
                    {courseDetails.tag?.map((line, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span><img className="w-5" src={checked} alt="" /></span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
                <div className="bg-secondary mt-2 rounded-xl">
            <h2 className="lg:text-3xl text-2xl font-semibold mt-6 mb-1">কোর্স কনটেন্ট প্রিভিউ</h2>
            <div className="text-right mb-1">
              <button onClick={() => setIsActive([])} className="text-blue-600">Collapse All</button>
            </div>
            <div>
              {courseDetails.courseContent.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>
          </div>
          <div className=" mt-4">
                  <h2 className="text-3xl font-semibold mb-4">কোর্সটি করতে প্রয়োজন হবে </h2>
                  <div className="border w-full border-blue-500 rounded-md p-4">
                  <ul className="space-y-3">
                    {courseDetails?.instructions?.map((line, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span><img className="w-5" src={checked} alt="" /></span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
                <AskedQuestions/>
                <Faqs/>
              </div>

              {/* Right Column */}
              <div className="hidden lg:block w-full lg:w-[35%]">
                {/* <CourseDetailsCard
                  course={courseDetails}
                  setConfirmationModal={setConfirmationModal}
                  handleBuyCourse={handleBuyCourse}
                /> */}
                <NewCourseCard
                course={courseDetails}
                />
                <div className="my-2 border rounded-md">
              <CauntDown />
            </div>
              </div>
            </div>
          </div>
        </div>}

        {confirmationModal && (
          <ConfirmationModal
            text1={confirmationModal.text1}
            text2={confirmationModal.text2}
            btn1Text={confirmationModal.btn1Text}
            btn2Text={confirmationModal.btn2Text}
            btn1Handler={confirmationModal.btn1Handler}
            btn2Handler={confirmationModal.btn2Handler}
          />
        )}
      </div>
    </div>
  );
}

export default NewCourseDetails;





