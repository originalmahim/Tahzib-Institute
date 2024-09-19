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
    <div id="talentProfile" className={!darkTheme ? "dark" : "light"}>
      <main className="background">
        <div className="left">
        <ChangeProfilePicture/>

          <h3 className="primary-text">Skills</h3>
          <div className="skills">
            <small className="skill primary-text">Branding</small>
            <small className="skill primary-text">UI/UX Design</small>
            <small className="skill primary-text">Web Design</small>
            <small className="skill primary-text">HTML</small>
            <small className="skill primary-text">CSS</small>
            <small className="skill primary-text">JavaScript</small>
          </div>
          <div className="line"></div>
          <h3 className="primary-text">Badge Earned</h3>
          <div className="tests">
            <div className="test">
              <div className="testDetails">
                <img src={checked} alt="" />
                <small className="secondary-text">Web Development</small>
              </div>
              <small className="level secondary-text">Expert</small>
            </div>
            <div className="test">
              <div className="testDetails">
                <img src={checked} alt="" />
                <small className="secondary-text">Content Writting</small>
              </div>
              <small className="level secondary-text">Beginner</small>
            </div>
            <div className="test">
              <div className="testDetails">
                <img src={checked} alt="" />
                <small className="secondary-text">Graphic Design</small>
              </div>
              <small className="level secondary-text">Intermidiate</small>
            </div>
          </div>
        </div>
        <div className="right">
          <h1 className="primary-text text-xl">Settings</h1>
         
          <EditProfile/>
          <div className="content-btns">
        
          </div>
            <UpdatePassword></UpdatePassword>
            {user?.accountType !== ACCOUNT_TYPE.ADMIN &&<DeleteAccount/>}
        </div>
      </main>
    </div>
  );
};

export default TalentProfile;
