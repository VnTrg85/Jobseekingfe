import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CompanyDetail.scss";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import JobOpenItem from "../../components/JobOpenItem/JobOpenItem";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";

function CompanyDetail() {
	const [jobs, setJobs] = useState(null);
	const [company, setCompany] = useState(null);
	const companyId = useLocation().pathname.split("/")[2];
	console.log(company);

	useLayoutEffect(() => {
		const getData = async () => {
			await axios.get(`http://localhost:8080/company/get/${companyId}`).then(response => {
				setCompany(response.data);
			});
			await axios.get(`http://localhost:8080/job/getJobsByCompany/${companyId}`).then(response => {
				setJobs(response.data);
			});
		};
		getData();
	}, [companyId]);

	return (
		<div className="company-container">
			<div className="company-left">
				<img src="https://static.vecteezy.com/system/resources/previews/017/642/007/large_2x/modern-blue-horizontal-banner-design-template-business-background-with-space-for-the-text-or-picture-vector.jpg"></img>
				<div className="job-banner">
					<div className="job-banner-img">
						<img src={company?.logo}></img>
					</div>
					<div>
						<h3>{company?.userCompany?.name}</h3>
						<p>Our company is always looking for potential candidates for the company's development.</p>
						<div>
							<FontAwesomeIcon icon={faFolderOpen} />
							<span className="job-numbers">8 job opening</span>
						</div>
						<div className="banner-bottom">
							<button className="follow-btn">Welcome</button>
							<div>
								<FontAwesomeIcon icon={faShareFromSquare} />
							</div>
						</div>
					</div>
				</div>
				<div>
					<h3>ABOUT US</h3>
					<p>{company?.description}</p>
				</div>
				<div>
					<h5>JOBS OPENING</h5>
					{jobs?.map(item => (
						<JobOpenItem job={item} name={company.userCompany.name} logo={company.logo}></JobOpenItem>
					))}
				</div>
			</div>
			<div className="company-right">
				<div>
					<h3>General Information</h3>
					<div>
						<h5>Industry</h5>
						{company?.industry?.map(item => (
							<span style={{ padding: "10px 5px 10px 0" }}>{item}</span>
						))}
					</div>
					<div>
						<h5>Company Size</h5>
						<p>{company?.companySize}</p>
					</div>
					<div>
						<h5>Nationality</h5>
						<p>{company?.location}</p>
					</div>
				</div>
				<div>
					<h3>Contact information</h3>
					<div>
						<h5>Website</h5>
						<p style={{ color: "lightblue", fontWeight: "600" }}>{company?.website}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CompanyDetail;
