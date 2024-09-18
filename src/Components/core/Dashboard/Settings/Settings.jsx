import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings({darkTheme}) {
  return (
    <div className={!darkTheme ? "dark" : "light"}>
      <div className="sec-background">
      <h1 className="mb-14 text-3xl font-medium text-transparent font-boogaloo text-center sm:text-left">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
      </div>
    </div>
  )
}