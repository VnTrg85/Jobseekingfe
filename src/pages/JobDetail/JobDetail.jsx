import "./JobDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndustry, faLocationDot, faMapLocationDot, faPeopleGroup, faWallet } from "@fortawesome/free-solid-svg-icons";
import JobItem from "../../components/JobItem/JobItem.jsx";
function JobDetail() {
	return (
		<div className="container">
			<div className="jobs-container">
				<div className="jobs-container-left">
					<div className="jobs-header">
						<div className="company-img">
							<img src="https://img.idesign.vn/2023/02/idesign_logogg_1.jpg"></img>
						</div>
						<div className="job-header-text">
							<h3 className="job-name">Backend Developer (.Net Core)</h3>
							<h4 className="company-name">Công ty TNHH Chứng khoán Maybank</h4>
							<div className="company-location">
								<FontAwesomeIcon icon={faLocationDot} />
								<span>05 Lê Quý Đôn, Phường Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh</span>
							</div>
							<div className="job-salary">
								<FontAwesomeIcon icon={faWallet} />
								<span>Negotiable</span>
							</div>
						</div>
					</div>
					<div className="jobs-container-left-middle">
						<div className="jobs-container-left-title">
							<span className="active-item jobs-container-item ">Job Description</span>
							<span className="jobs-container-item">About company</span>
						</div>
						<div className="job-role-res">
							Involve in building trading systems and trading-related services as a software engineer to provide evaluation of technical
							feasibility, develop high availability and low latency system architectures for trading runtime, provide connectivity with
							trading core and 3 rd party services. Receive handover and continue develop existing software systems, to include
							troubleshooting bugs and adding new features. Prepare the document for the application to develop. This shall include but
							not limit to requirement specification, test procedure, installation guideline, data migration/preparation guideline
							operation guideline, and system requirement. Ensure the application achieved user acceptable quality standard. He /She
							shall test the application properly before asking users for his/her acceptance test. Review and cross-review code with
							team members.
						</div>
					</div>
					<div className="jobs-container-left-bottom">
						<div className="company-title">
							<h3>Công ty TNHH Chứng khoán Maybank</h3>
							<div className="company-jobs-opening">1 job opening</div>
						</div>
						<div className="company-info">
							<div className="company-info-item">
								<FontAwesomeIcon icon={faIndustry} />
								<div>
									Industry
									<p>Tài Chính, Chứng khoán</p>
								</div>
							</div>
							<div className="company-info-item">
								<FontAwesomeIcon icon={faPeopleGroup} />
								<div>
									Company size
									<p>100-499 Employees</p>
								</div>
							</div>
							<div className="company-info-item">
								<FontAwesomeIcon icon={faMapLocationDot} />
								<div>
									Nationality
									<p>Malaysia</p>
								</div>
							</div>
						</div>
						<div className="company-desc">
							Maybank Investment Bank Vietnam was previously known as Kim Eng Vietnam Securities Joint Stock Company - the first stock
							firm that has foreign partner in Vietnam. It provides all securities services such as securities brokerage service,
							securities depository service, investment consultant service,...
							<a>read more</a>
						</div>
						<img src="https://salt.topdev.vn/jyaU-AGn8RDkx8mtl8h1iWa7yuAEudGW7C5mLO2Lu4Q/fit/640/1000/ce/1/aHR0cHM6Ly9hc3NldHMudG9wZGV2LnZuL2ltYWdlcy8yMDIzLzEyLzI2L1RvcERldi02YTExYjUxZDViODY4MWNkNDkwZDA3ZmQ2NmE3N2Q4ZC0xNzAzNTgxNTc2LnBuZw"></img>
						<button className="primary-btn view-btn" href="">
							View company
						</button>
					</div>
				</div>
				<div className="jobs-container-right">
					<button className="primary-btn apply-btn">Apply Now</button>
					<button className="normal-btn save-btn">Save for later</button>
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
					<JobItem></JobItem>
					<JobItem></JobItem>
					<JobItem></JobItem>
					<JobItem></JobItem>
					<JobItem></JobItem>
					<JobItem></JobItem>
					<JobItem></JobItem>
					<JobItem></JobItem>
				</div>
			</div>
		</div>
	);
}

export default JobDetail;
