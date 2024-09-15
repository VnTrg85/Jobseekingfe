import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faUserPen, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Profile.scss";
import AppliedTable from "../../components/AppliedTable/AppliedTable";
function Profile() {
	return (
		<div className="profile">
			<div className="user-infor">
				<div className="user-infor-header">
					<div className="user-name-des-img">
						<img src="https://img.idesign.vn/2023/02/idesign_logogg_1.jpg"></img>
						<div className="user-name-des">
							<h3>Full name</h3>
							<p>Hello, this iasdnasdas asidasjd asdasjdas asdjasdasd asdhasas ldsaausdfjs sfhsdfu fshufsdn fosdfshqiksf dfdhmashcdn</p>
						</div>
					</div>
					<div className="btn-edit">
						<FontAwesomeIcon icon={faUserPen} />
					</div>
				</div>
				<div className="user-email">
					<FontAwesomeIcon icon={faEnvelope} />
					<span>fullname@gmail.com</span>
				</div>
				<div className="user-phone">
					<FontAwesomeIcon icon={faPhone} />
					<span>0358059467</span>
				</div>
				<div className="user-skills">
					<h4>Skills</h4>
					<span className="skill-item">Html</span>
					<span className="skill-item">JavaScript</span>
					<span className="skill-item">Css</span>
					<span className="skill-item">C#</span>
				</div>
				<div className="user-resume">
					<h4>Resume</h4>
					<div>abcs</div>
				</div>
			</div>
			<div className="applied-jobs-container">
				<h3>Applied jobs</h3>
				<AppliedTable></AppliedTable>
			</div>
		</div>
	);
}

export default Profile;
