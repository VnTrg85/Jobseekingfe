import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./JobItem.scss";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

function JobItem() {
	const navigate = useNavigate();

	return (
		<div className="job-item">
			<div className="job-item-top">
				<div className="job-item-time">Today</div>
				<div className="job-item-saveforlater">
					<FontAwesomeIcon icon={faBookmark} />
				</div>
			</div>
			<div className="job-item-middle">
				<div className="company-container">
					<div className="company-img">
						<img src="https://img.idesign.vn/2023/02/idesign_logogg_1.jpg"></img>
					</div>
					<div className="company-text">
						<h4>Google</h4>
						<p>USA</p>
					</div>
				</div>
				<div className="job-info">
					<h4 className="job-name">Fullstack developer</h4>
					<div className="job-desc">I need senior full stack developer. The person can help me handle some particular problem</div>
					<div className="job-requirement">
						<div className="job-requirement-item c-r">abasdjasdjas</div>
						<div className="job-requirement-item c-b">javascript</div>
						<div className="job-requirement-item c-p">c#</div>
					</div>
				</div>
			</div>
			<div className="job-item-bottom">
				<button
					className="normal-btn"
					onClick={() => {
						navigate("/jobs/1");
					}}
				>
					Details
				</button>
				<button className="primary-btn">Save For Later</button>
			</div>
		</div>
	);
}

export default JobItem;
