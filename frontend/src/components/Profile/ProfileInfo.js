import { FaBirthdayCake, FaMailBulk } from "react-icons/fa";
import moment from "moment-timezone";
import Profile from "./ProfileIndex";

const ProfileInfo = ({user}) => {
    return (
        <div className="profile-intro-container">
            <div className="intro-header">
                Intro 
            </div>
            <div className="bio-section">
                {user.bio}
            </div>
            <div className="details-header">
                Details
            </div>
            <div className="about-me-details">
                <div className="details-labels-container">
                    <p className="user-labels">
                        <FaMailBulk/>
                    </p>
                    <p className="user-labels">
                        <FaBirthdayCake/> 
                    </p>
                </div>
                <div className="details-info-container">
                    <p className="user-info">
                        {user.email}
                    </p>
                    <p className="user-info">
                        {moment(user.birthday).format('MMMM DD, yyyy')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;