import { useContext, useEffect, useState } from "react";
import "./JobsRecruiting.scss";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

function JobsRecruiting() {
	const [track, setTrack] = useState(false);
	const [jobs, setJobs] = useState(null);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	console.log(1);

	const handleUpdateStatus = async job => {
		await axios
			.post(`http://localhost:8080/job/updateStatus/${job.id}`)
			.then(res => {
				toast.success(res.data);
				setTrack(!track);
			})
			.then(err => {
				toast.error(err);
			});
	};
	useEffect(() => {
		const getData = async () => {
			if (user) {
				await axios
					.get(`http://localhost:8080/company/getByUserID/${user.id}`)
					.then(res => {
						return axios.get(`http://localhost:8080/job/getJobsByCompany/${res.data.id}`);
					})
					.then(res => {
						setJobs(res.data);
					})
					.catch(() => {});
			}
		};
		getData();
	}, [user, track]);
	return (
		<div className="job-recruiting-container">
			<ToastContainer></ToastContainer>
			<div className="recrui-header">
				<h3>Jobs</h3>
				<button
					className="add-jobs-btn"
					onClick={() => {
						navigate("/addJob");
					}}
				>
					Add job
				</button>
			</div>
			<div className="job-header css-header">
				<h4 className="detail">View</h4>
				<h4 className="time">Date</h4>
				<h4 className="title"> Title</h4>
				<h4 className="location">Location</h4>
				<h4 className="salary">Salary</h4>
				<h4 className="status">Status</h4>
				<h4 className="btn-title">Change status</h4>
			</div>
			{jobs?.map((job, index) => (
				<div key={index} className="job-header">
					<h4
						onClick={() => {
							navigate(`/jobapplieds/${job.id}`);
						}}
						className="detail"
					>
						<FontAwesomeIcon icon={faCircleInfo} />
					</h4>
					<h4 className="time ">{job.dateCreated}</h4>
					<h4 className="title">{job?.title}</h4>
					<h4 className="location ">{job?.location}</h4>
					<h4 className="salary ">{job?.salary}</h4>
					<h4 className="status ">{job?.status}</h4>
					<button onClick={() => handleUpdateStatus(job)} className="btn-change ">
						Change to {job?.status == "rescruiting" ? "lock" : "rescruiting"}
					</button>
				</div>
			))}
		</div>
	);
}

export default JobsRecruiting;
