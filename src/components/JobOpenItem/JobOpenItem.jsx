import "./JobOpenItem.scss";

function JobOpenItem({ job, name, logo }) {
	console.log(job.skillFields);

	return (
		<div className="jobOpenItem-container">
			<div className="jobOpenItem-left">
				<img src={logo}></img>
			</div>
			<div className="jobOpenItem-right">
				<div className="jobOpenItem-right-top">
					<h3>{job?.title}</h3>
					<button className="learnmore-btn">Learn more</button>
				</div>
				<h4>{name}</h4>
				<div>
					<span className="job-salary">{job?.salary}</span>
					<span> {`${job?.location}`}</span>
				</div>
				<div className="jobOpenItem-bottom">
					<span>
						{job?.skillFields?.map(item => (
							<span className="skill-item">{item}</span>
						))}
					</span>
					<span className="job-time">{job?.dateCreated}</span>
				</div>
			</div>
		</div>
	);
}

export default JobOpenItem;
