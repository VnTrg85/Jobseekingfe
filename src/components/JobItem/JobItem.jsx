import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./JobItem.scss";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import parse from "html-react-parser";

function JobItem({ info }) {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const handleClick = async e => {
		if (!user) {
			return navigate("/login/lg");
		}
		await axios
			.post("http://localhost:8080/userJobApplied/add", {
				jobStatus: { id: "2" },
				user: user,
				job: info,
				time: Date.now(),
			})
			.then(response => {
				toast.success("Successfully");
			})
			.catch(err => {
				toast("Have an error");
			});
	};
	return (
		<div className="job-item">
			<ToastContainer closeOnClick position="top-right"></ToastContainer>
			<div className="job-item-top">
				<div className="job-item-time">{info?.dateCreated}</div>
				<div className="job-item-saveforlater">
					<FontAwesomeIcon icon={faBookmark} />
				</div>
			</div>
			<div className="job-item-middle">
				<div className="company-container">
					<div className="company-img">
						<img src={info?.company?.logo}></img>
					</div>
					<div className="company-text">
						<h4>{info?.company?.userCompany.name}</h4>
						<p>{info?.location}</p>
					</div>
				</div>
				<div className="job-info">
					<h4 className="job-name">{info?.title}</h4>

					<div className="job-desc">{parse(`${info?.description}`)}</div>
					<div className="job-requirement">
						<div className="job-requirement-item c-r">{info?.jobType?.name}</div>
					</div>
				</div>
			</div>
			<div className="job-item-bottom">
				<button
					className="normal-btn"
					onClick={() => {
						navigate(`/jobs/${info.id}`);
					}}
				>
					Details
				</button>
				<button
					className="primary-btn"
					onClick={e => {
						handleClick(e);
					}}
				>
					Save For Later
				</button>
			</div>
		</div>
	);
}

export default JobItem;
