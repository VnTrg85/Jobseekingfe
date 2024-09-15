import "./Home.scss";
import Banner from "../../components/banner/Banner";
import JobItem from "../../components/JobItem/JobItem";
function Home() {
	return (
		<div className="home">
			<Banner></Banner>
			<div className="home-section-jobs">
				<div className="section-label">
					Latest and Top<span>Jobs Opening</span>
				</div>
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

export default Home;
