import { useContext, useEffect, useState } from "react";
import "./JobApplies.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import EmployeeInfo from "../../components/EmployeeInfo/EmployeeInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function JobApplies() {
	const [data, setData] = useState([]);
	const [active, setActive] = useState(false);
	const [currentInfo, setCurrentInfo] = useState(null);

	const [secondData, setSecondData] = useState(null);
	const jobId = useLocation().pathname.split("/")[2];
	const navigate = useNavigate();
	useEffect(() => {
		const getData = async () => {
			axios
				.get(`http://localhost:8080/userJobApplied/getListByJobId/${jobId}`)
				.then(async res => {
					var finalData = [];
					var finalData = res.data.filter(item => item.jobStatus.id == 1);
					setData(finalData);
				})
				.catch(() => {});
		};
		getData();
	}, [jobId]);
	const handleClick = item => {
		setActive(true);
		setCurrentInfo(item.user);
	};
	const handleClose = () => {
		setActive(false);
		setCurrentInfo(null);
	};

	return (
		<div className="job-applied-container">
			{!active && (
				<div className="job-applied-dialog">
					<div>
						<span
							onClick={() => {
								navigate("/jobrescruiting");
							}}
							className="x-btn"
						>
							Back to Jobrescruiting
						</span>
					</div>
					<div className="job-applied-header">
						<h4 className="job-time head">Time applied</h4>
						<h4 className="job-user-name head">User Information</h4>
					</div>
					{data.map((item, index) => (
						<div className="job-applied-header" key={index}>
							<h4 className="job-time">{item.time}</h4>
							<h4 onClick={() => handleClick(item)} className="job-user-name">
								{item.user.name}
							</h4>
						</div>
					))}
					{data.length == 0 && <h3>No data</h3>}
				</div>
			)}

			{active && (
				<div className="employee-dialog">
					<span onClick={handleClose} className="x-btn">
						<FontAwesomeIcon icon={faX} />
					</span>
					<EmployeeInfo data={currentInfo}></EmployeeInfo>
				</div>
			)}
		</div>
	);
}

export default JobApplies;

/*
 */
