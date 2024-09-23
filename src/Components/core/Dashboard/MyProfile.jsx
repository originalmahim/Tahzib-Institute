
import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "./../../../Components/IconBtn"
import Img from './../../../Components/Img';
import { BiEdit } from "react-icons/bi"
import { VscVerified } from "react-icons/vsc"



export default function MyProfile({darkTheme}) {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();
 console.log(user);


  // Scroll to the top of the page when the component mounts
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [])

  return (
    <div className={!darkTheme ? "dark" : "light"}>
      <div className="sec-background h-auto">

      <h1 className="mb-14 text-4xl font-medium text-transparent font-boogaloo text-center sm:text-left">.</h1>

      <div className="primary-text">
      <div className="">
      <div className="relative rounded-md w-full h-52 ">
        <img
          src='https://scontent.fdac165-1.fna.fbcdn.net/v/t39.30808-6/306284355_464405405724091_7484475457980942930_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dOsiZ5Bj6oIQ7kNvgHttKFE&_nc_ht=scontent.fdac165-1.fna&_nc_gid=ALfkagcI9YXVBrhSzZvMBro&oh=00_AYAeI9ds-G4dzM0mBme0QLjpNVf4nSI0j5zqXF-2xguXxQ&oe=66F5DE96'
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute z-10 bottom-2 right-3">
        <Link to="/dashboard/settings">
          <button className="bg-[#00a89c] text-white px-2 py-2 rounded-md">
            Edit <BiEdit className="inline-block ml-2" />
          </button>
        </Link>
      </div>
      </div>

      {/* Profile Picture */}
      <div className="relative  -mt-16 flex justify-center">
        <div className="rounded-full border-4 border-[#00a89c]  w-32 h-32 md:w-40 md:h-40">
          <img
            src={user?.image}
            alt="Profile"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mt-4">
        <h1 className="flex items-center justify-center text-3xl font-semibold">{user?.firstName + " " + user?.lastName} <VscVerified className="text-blue-600"/> </h1>
        <p>{user?.email}</p>
        {/* <small className="block text-gray-500">{user?.accountType}</small> */}
      </div>
        </div>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold primary-text">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex max-w-[500px] justify-between ">
          <div className="flex flex-col gap-y-5">

            <div>
              <p className="mb-2 text-sm primary-text">First Name</p>
              <p className="text-sm font-semibold primary-text capitalize">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm primary-text">Account Type</p>
              <p className="text-sm font-semibold primary-text capitalize">
                {user?.accountType}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm primary-text">Gender</p>
              <p className="text-sm font-semibold primary-text">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm primary-text">Last Name</p>
              <p className="text-sm font-semibold primary-text capitalize">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm primary-text">Phone Number</p>
              <p className="text-sm font-semibold primary-text">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm primary-text">Date Of Birth</p>
              <p className="text-sm font-semibold primary-text">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}