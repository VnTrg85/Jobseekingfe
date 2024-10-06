import "./Home.scss";
import Banner from "../../components/banner/Banner";
import JobItem from "../../components/JobItem/JobItem";
import { useEffect, useState } from "react";
import axios from "axios";
function Home() {
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
		<div className="home">
			<Banner></Banner>
			<div className="home-section-jobs">
				<div className="section-label">
					Latest and Top<span>Jobs Opening</span>
				</div>
				<div className="jobs-container">{jobs && jobs.map((job, index) => <JobItem key={index} info={job}></JobItem>)}</div>
			</div>
		</div>
	);
}

export default Home;
