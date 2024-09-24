import {
  checked,
} from "../../assets";
import UpdatePassword from "../core/Dashboard/Settings/UpdatePassword";
import EditProfile from "../core/Dashboard/Settings/EditProfile";
import DeleteAccount from "../core/Dashboard/Settings/DeleteAccount";
import ChangeProfilePicture from "../core/Dashboard/Settings/ChangeProfilePicture";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { useSelector } from "react-redux";

const TalentProfile = ({ darkTheme }) => {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className={!darkTheme ? "dark" : "light"}>
      <main className="sec-background">
        <div className="h-24"></div>
        <div className=" max-w-7xl mx-auto">
        <div className="px-3 py-4">
          <h1 className="primary-text text-xl">Settings</h1>
        <ChangeProfilePicture/>
         
          <EditProfile/>
          <UpdatePassword></UpdatePassword>
          
        </div>
            {/* {user?.accountType !== ACCOUNT_TYPE.ADMIN &&
             <DeleteAccount/>} */}
        </div>
      </main>
    </div>
  );
};

export default TalentProfile;
