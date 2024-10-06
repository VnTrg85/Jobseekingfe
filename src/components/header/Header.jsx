import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
function Header() {
	const navigate = useNavigate();
	const [employee, setEmployee] = useState(null);
	const [company, setCompany] = useState(null);

	const { user } = useContext(AuthContext);

	useEffect(() => {
		const getData = async () => {
			if (user) {
				if (user.userRole.id == "4") {
					await axios.get(`http://localhost:8080/employee/getByUserId/${user?.id}`).then(res => {
						setEmployee(res.data);
					});
				} else if (user.userRole.id == "5") {
					await axios.get(`http://localhost:8080/company/getByUserID/${user?.id}`).then(res => {
						setCompany(res.data);
					});
				}
			}
		};
		getData();
	}, [user]);
	console.log(user);

	return (
		<div className="header">
			<div
				className="header-left"
				onClick={() => {
					if (user?.userRole.id == "5") {
						navigate("/jobrescruiting");
					} else if (user?.userRole.id == "3") {
						navigate("/admin/companies");
					} else {
						navigate("/");
					}
				}}
			>
				JobSeeking
			</div>
			<div className="header-right">
				{user?.userRole.id == "3" && (
					<div className="header-items">
						<div
							className="header-item"
							onClick={() => {
								navigate("/admin/companies");
							}}
						>
							Companies
						</div>
						<div
							className="header-item"
							onClick={() => {
								navigate("/admin/jobtype");
							}}
						>
							Jobtype
						</div>
						<div
							className="header-item"
							onClick={() => {
								navigate("/admin/role");
							}}
						>
							Roles
						</div>
						<div
							className="header-item"
							onClick={() => {
								navigate("/admin/user");
							}}
						>
							User
						</div>
					</div>
				)}
				{user?.userRole.id == "4" && (
					<div className="header-items">
						<div
							className="header-item"
							onClick={() => {
								navigate("/");
							}}
						>
							Home
						</div>
						<div
							className="header-item"
							onClick={() => {
								navigate("/jobslist");
							}}
						>
							Jobs
						</div>
						<div
							onClick={() => {
								navigate("/Browse");
							}}
							className="header-item "
						>
							Browse
						</div>
					</div>
				)}
				{user?.userRole.id == "5" && (
					<div className="header-items">
						<div
							className="header-item"
							onClick={() => {
								navigate("/jobrescruiting");
							}}
						>
							Jobs recruiting
						</div>
					</div>
				)}
				{user != null ? (
					<div
						className="header-user"
						onClick={() => {
							if (user?.userRole.id == "5") {
								navigate("/companyProfile");
							} else {
								navigate("/profile");
							}
						}}
					>
						{user?.userRole.id == "4" && <img src={employee?.image || "https://img.icons8.com/nolan/600w/000000/user-default.png"}></img>}
						{user?.userRole.id == "5" && <img src={company?.logo || "https://img.icons8.com/nolan/600w/000000/user-default.png"}></img>}
					</div>
				) : (
					<div>
						<button
							className="normal-btn header-btn"
							onClick={() => {
								navigate("login/lg");
							}}
						>
							Login
						</button>
						<button
							className="primary-btn header-btn"
							onClick={() => {
								navigate("login/sg");
							}}
						>
							Signup
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Header;
