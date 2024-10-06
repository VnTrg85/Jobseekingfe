import axios from "axios";
import { useEffect, useState } from "react";
import "./EmployeeInfo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faTag, faX } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faFile } from "@fortawesome/free-regular-svg-icons";
function EmployeeInfo({ data }) {
	const [employee, setEmployee] = useState();
	useEffect(() => {
		const getData = async () => {
			await axios.get(`http://localhost:8080/employee/getByUserId/${data.id}`).then(res => {
				setEmployee(res.data);
			});
		};
		getData();
	}, [data]);
	console.log(data);

	return (
		<div className="employee-container">
			<div className="employee-header">
				<h2>Employee Information</h2>
			</div>
			<div>
				<FontAwesomeIcon icon={faTag} />
				<h4>Name</h4>
				<p>{data.name}</p>
			</div>
			<div>
				<FontAwesomeIcon icon={faPhone} />
				<h4>Phone</h4>
				<p>{data.phone}</p>
			</div>
			<div>
				<FontAwesomeIcon icon={faEnvelope} />
				<h4>Email</h4>
				<p>{data.email}</p>
			</div>
			<div>
				<FontAwesomeIcon icon={faFile} />
				<h4>Resume</h4>
				<a target="_blank" href={employee?.resume}>
					Cv
				</a>
			</div>
		</div>
	);
}

export default EmployeeInfo;
