import { useEffect } from "react"
import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "./../../../Components/IconBtn"
import Img from './../../../Components/Img';



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

      <h1 className="mb-14 text-4xl font-medium text-transparent font-boogaloo text-center sm:text-left">........</h1>

      <div className="flex items-center justify-between rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-3 sm:px-12">
        <div className="flex items-center gap-x-4">
          <Img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold primary-text capitalize">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm primary-text">{user?.email}</p>
          </div>
        </div>

        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold primary-text">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <p
          className={`${user?.additionalDetails?.about
            ? "primary-text"
            : "primary-text"
            } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
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
              <p className="mb-2 text-sm primary-text">Email</p>
              <p className="text-sm font-semibold primary-text">
                {user?.email}
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