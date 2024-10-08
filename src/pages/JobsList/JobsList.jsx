import "./JobsList.scss";
import JobItem from "../../components/JobItem/JobItem.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
function JobsList() {
	const [jobs, setJobs] = useState(null);
	useEffect(() => {
		const getData = async () => {
			await axios.get("http://localhost:8080/job/getAll").then(res => {
				setJobs(res.data);
			});
		};
		getData();
	}, [jobs]);
	return (
		<div className="job-list">
			<div className="job-list-left">
				<h3>Filters jobs</h3>
				<div className="filter-item">
					<h4>Location</h4>
					<div>
						<input id="vn" type="checkbox"></input>
						<label htmlFor="vn">Viet Nam</label>
					</div>
					<div>
						<input id="vn2" type="checkbox"></input>
						<label htmlFor="vn2">Viet Nam</label>
					</div>
				</div>
				<div className="filter-item">
					<h4>Industry</h4>
					<div>
						<input id="i1" type="checkbox"></input>
						<label htmlFor="i1">Software Technology</label>
					</div>
					<div>
						<input id="i2" type="checkbox"></input>
						<label htmlFor="i2">Developer</label>
					</div>
				</div>
				<div className="filter-item">
					<h4>Salary</h4>
					<div>
						<input id="i2" type="checkbox"></input>
						<label htmlFor="vn2">100-200</label>
					</div>
					<div>
						<input id="i2" type="checkbox"></input>
						<label htmlFor="vn2">100-200</label>
					</div>
					<div>
						<input id="i2" type="checkbox"></input>
						<label htmlFor="vn2">100-200</label>
					</div>
				</div>
			</div>
			<div className="job-list-right">{jobs && jobs.map((job, index) => <JobItem key={index} info={job}></JobItem>)}</div>
		</div>
	);
}

export default JobsList;
