import "./JobDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndustry, faLocationDot, faMapLocationDot, faPeopleGroup, faWallet } from "@fortawesome/free-solid-svg-icons";
import JobItem from "../../components/JobItem/JobItem.jsx";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import parse from "html-react-parser";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";
function JobDetail() {
	const [job, setJob] = useState(null);
	const [companySection, setCompanySection] = useState(false);
	const [company, setCompany] = useState(null);
	const jobId = useLocation().pathname.split("/")[2];
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleClick = async e => {
		if (!user) {
			return navigate("/login/lg");
		}

		await axios
			.post("http://localhost:8080/userJobApplied/add", {
				jobStatus: { id: e.target.id == "apply" ? "1" : "2" },
				user: user,
				job: job,
				time: Date.now(),
			})
			.then(response => {
				toast.success("Successfully");
			})
			.catch(err => {
				toast("Have an error");
			});
	};

	useLayoutEffect(() => {
		const getData = async () => {
			await axios
				.get(`http://localhost:8080/job/get/${jobId}`)
				.then(response => {
					setJob(response.data);
					return response.data;
				})
				.then(async res => {
					await axios.get(`http://localhost:8080/company/get/${res.company.id}`).then(response => {
						setCompany(response.data);
					});
				});
		};

		getData();
	}, [job]);

	return (
		<div className="container">
			<ToastContainer closeOnClick position="top-right"></ToastContainer>
			<div className="jobs-container">
				<div className="jobs-container-left">
					<div className="jobs-header">
						<div className="company-img">
							<img src="https://img.idesign.vn/2023/02/idesign_logogg_1.jpg"></img>
						</div>
						<div className="job-header-text">
							<h3 className="job-name">{job?.title}</h3>
							<h4 className="company-name">{job?.company.userCompany.name}</h4>
							<div className="company-location">
								<FontAwesomeIcon icon={faLocationDot} />
								<span>{job?.location}</span>
							</div>
							<div className="job-salary">
								<FontAwesomeIcon icon={faWallet} />
								<span>{job?.salary}</span>
							</div>
						</div>
					</div>
					<div className="jobs-container-left-middle">
						<div className="jobs-container-left-title">
							<span
								className={`jobs-container-item ${companySection == false ? "active-item" : ""}`}
								onClick={() => {
									setCompanySection(false);
								}}
							>
								Job Description
							</span>
							<span
								className={`jobs-container-item ${companySection ? "active-item" : ""}`}
								onClick={() => {
									setCompanySection(true);
									var e = document.getElementById("cpn").scrollIntoView();
								}}
							>
								About company
							</span>
						</div>
						<div className="job-role-res">{parse(`${job?.description}`)}</div>
					</div>
					<div id="cpn" className="jobs-container-left-bottom">
						<div className="company-title">
							<h3>{job?.company.userCompany.name} Company</h3>
						</div>
						<div className="company-info">
							<div className="company-info-item">
								<FontAwesomeIcon icon={faIndustry} />
								<div>
									Industry
									<p>
										{company?.industry.map(item => (
											<span style={{ margin: "0 5px 0 0", borderRadius: "5px" }}>{item}</span>
										))}
									</p>
								</div>
							</div>
							<div className="company-info-item">
								<FontAwesomeIcon icon={faPeopleGroup} />
								<div>
									Company size
									<p>{company?.companySize} Employees</p>
								</div>
							</div>
							<div className="company-info-item">
								<FontAwesomeIcon icon={faMapLocationDot} />
								<div>
									Nationality
									<p>{company?.location}</p>
								</div>
							</div>
						</div>
						<div className="company-desc">
							{company?.description}
							<a>read more</a>
						</div>
						<img className="company-img" src={company?.logo}></img>
						<button
							className="primary-btn view-btn"
							onClick={() => {
								navigate(`/company/${company?.id}`);
							}}
						>
							View company
						</button>
					</div>
				</div>
				<div className="jobs-container-right">
					<button
						id="apply"
						className="primary-btn apply-btn"
						onClick={e => {
							handleClick(e);
						}}
					>
						Apply Now
					</button>
					<button
						id="save"
						className="normal-btn save-btn"
						onClick={e => {
							handleClick(e);
						}}
					>
						Save for later
					</button>
					<div className="general-info">
						<h3>General Infomation</h3>
						<div>Minimum year of experience From 3 years Level Middle, Senior Job Type In Office Contract type Fulltime Tech stack</div>
						<div className="technologies">
							<span>.NET</span>
							<span>.Back end</span>
							<span>.Net core</span>
						</div>
					</div>
				</div>
			</div>
			<div className="recommend-jobs">
				<h3>✨ Recommended Jobs</h3>
				<div className="jobs-container">
					{/* <JobItem></JobItem>
					<JobItem></JobItem>
					<JobItem></JobItem>
					<JobItem></JobItem>
					<JobItem></JobItem>
					<JobItem></JobItem>
					<JobItem></JobItem>
					<JobItem></JobItem> */}
				</div>
			</div>
		</div>
	);
}

export default JobDetail;
