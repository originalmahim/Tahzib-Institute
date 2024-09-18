import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { updateUserProfileImage } from "../../../../services/operations/SettingsAPI"
import IconBtn from "./../../../../Components/IconBtn"
import Img from './../../../../Components/Img';



export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setProfileImage(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      // console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("profileImage", profileImage)

      dispatch(updateUserProfileImage(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (profileImage) {
      previewFile(profileImage)
    }
  }, [profileImage])


  return (
    <>
      <div className="flex items-center w-full justify-between rounded-md bg-transparent px-1 sm:p-4 primary-text">
        <div className="flex flex-col items-center gap-x-2">
          <Img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="  rounded-sm  object-cover"
          />

          <div className="space-y-2 mt-2 text-center">
            <p className="font-medium">Change Profile Picture</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg, image/jpg"
              />

              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md py-2 px-5 font-semibold bg-green-500 primary-text hover:bg-richblack-900 hover:text-richblack-200 duration-300"
              >
              Select
              </button>

              <IconBtn
                className='text-green-500'
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg" />
                )}
              </IconBtn>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}