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
    <div className="relative w-full">
      {/* Fixed Full-Width Cover Photo */}
      <div className="relative w-full h-48 sm:h-60 bg-cover bg-center" style={{ backgroundImage: `url('https://scontent.fdac165-1.fna.fbcdn.net/v/t39.30808-6/306284355_464405405724091_7484475457980942930_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=_f6_n0gkfCEQ7kNvgFPlfOe&_nc_ht=scontent.fdac165-1.fna&_nc_gid=ATjvDWxMhExvi_FsrxPgziu&oh=00_AYAKn65Uvy8lxAi4S7gn354gDjgy3VxLvaU_plPJ9UmyKw&oe=66F76856')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Profile Picture */}
      <div className="absolute top-36 left-1/2 transform -translate-x-1/2 w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-lg">
        <Img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Edit Profile Picture & Buttons */}
      <div className="mt-24 primary-text text-center">
        <p className="font-medium text-lg sm:text-xl mb-4">Change Profile Picture</p>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/gif, image/jpeg, image/jpg"
        />

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button
            onClick={handleClick}
            disabled={loading}
            className="cursor-pointer rounded-md py-2 px-6 sm:px-8 font-semibold bg-green-500 text-white hover:bg-green-600 transition duration-300"
          >
            Select
          </button>

          <IconBtn
            className="text-green-500"
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
  )
}
