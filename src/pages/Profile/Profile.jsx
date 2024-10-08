import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faUserPen, faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Profile.scss";
import AppliedTable from "../../components/AppliedTable/AppliedTable";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SaveForLaterTable from "../../components/SaveForLaterTable/SaveForLaterTable";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";

function Profile() {
	const [update, setUpdate] = useState(false);
	const { user, dispatch } = useContext(AuthContext);
	const [employee, setEmployee] = useState(null);
	const [listJobApplieds, setListJobApplieds] = useState([]);
	const [listJobSave, setListJobSave] = useState([]);
	const [file, setFile] = useState({
		image: "",
		resume: "",
	});

	const [updateEmployeeData, setUpdateEmployeeData] = useState({});
	const [updateUserData, setUpdateUserData] = useState({
		id: user?.id,
		name: user?.name,
		phone: user?.phone,
		userRole: user?.userRole,
		email: user?.email,
		password: user?.password,
	});

	const navigate = useNavigate();
	const url = "https://api.cloudinary.com/v1_1/vantruong/image/upload";
	useEffect(() => {
		const getData = async () => {
			await axios.get(`http://localhost:8080/employee/getByUserId/${user?.id}`).then(res => {
				setEmployee(res.data);
				setUpdateEmployeeData(res.data);
			});
			await axios.get(`http://localhost:8080/userJobApplied/getListByUserId/${user?.id}`).then(res => {
				setListJobApplieds(res.data.filter(job => job.jobStatus.id == 1));
				setListJobSave(res.data.filter(job => job.jobStatus.id == 2));
			});
		};
		getData();
	}, [user]);

	const handleUpdateClick = async () => {
		//resume
		toast.loading("Updating...", { containerId: "A" });
		var urlRes = employee?.resume;
		if (file.resume != "") {
			const formData = new FormData();
			formData.append("file", file.resume);
			formData.append("upload_preset", "jobseeking");
			const res = await axios.post(url, formData);
			urlRes = res.data.url;
		}

		//image
		var urlResImg = employee?.image;
		if (file.image != "") {
			const formDataImg = new FormData();
			formDataImg.append("file", file.image);
			formDataImg.append("upload_preset", "jobseeking");
			const resImg = await axios.post(url, formDataImg);
			urlResImg = resImg.data.url;
		}

		await axios
			.put("http://localhost:8080/user/update", updateUserData)
			.then(async () => {
				return await axios.post("http://localhost:8080/employee/add", { ...updateEmployeeData, resume: urlRes, image: urlResImg });
			})
			.then(() => {
				dispatch({ type: "LOGIN_SUCCESS", payload: updateUserData });
				setEmployee(updateEmployeeData);
				setUpdate(false);
				toast.dismiss({ containerId: "A" });
				toast.success("Updated successfully", { containerId: "B" });
			})
			.catch(() => {
				toast.error("Failed to update");
			});
	};
	const handleInputUserChange = e => {
		setUpdateUserData(prev => ({ ...prev, [e.target.id]: e.target.value }));
	};
	const handleInputEmployeeChange = e => {
		if (e.target.id == "skills") {
			setUpdateEmployeeData(prev => ({ ...prev, [e.target.id]: e.target.value.split(",") }));
		} else setUpdateEmployeeData(prev => ({ ...prev, [e.target.id]: e.target.value }));
	};
	return (
		<div className="profile">
			{update && (
				<div className="update-profile-container">
					<div className="edit-profile-catalog">
						<div>
							<h3>Update profile</h3>
							<div
								onClick={() => {
									setUpdate(false);
								}}
							>
								<FontAwesomeIcon icon={faXmark} />
							</div>
						</div>
						<div>
							<h4>Image</h4>
							<input
								id="image"
								type="file"
								onChange={e => {
									setFile(prev => ({ ...prev, [e.target.id]: e.target.files[0] }));
								}}
							></input>{" "}
						</div>
						<div>
							<h4>Name</h4>
							<input id="name" type="text" value={updateUserData.name} onChange={e => handleInputUserChange(e)}></input>
						</div>
						<div>
							<h4>Phone</h4>
							<input id="phone" type="text" value={updateUserData.phone} onChange={e => handleInputUserChange(e)}></input>
						</div>
						<div>
							<h4>Bio</h4>
							<input id="bio" type="text" value={updateEmployeeData.bio} onChange={e => handleInputEmployeeChange(e)}></input>
						</div>
						<div>
							<h4>Skills</h4>
							<input id="skills" type="text" value={updateEmployeeData.skills} onChange={e => handleInputEmployeeChange(e)}></input>
						</div>
						<div>
							<h4>Resume</h4>
							<input
								id="resume"
								type="file"
								onChange={e => {
									setFile(prev => ({ ...prev, [e.target.id]: e.target.files[0] }));
								}}
							></input>
						</div>
						<button onClick={handleUpdateClick}>Update</button>
					</div>
				</div>
			)}
			<ToastContainer closeOnClick autoClose={1000} position="bottom-center" containerId="A"></ToastContainer>
			<ToastContainer closeOnClick autoClose={1000} position="bottom-center" containerId="B"></ToastContainer>

			<div className="user-infor">
				<div className="user-infor-header">
					<div className="user-name-des-img">
						<img src={employee?.image || "https://img.icons8.com/nolan/600w/000000/user-default.png"}></img>
						<div className="user-name-des">
							<h3>{user?.name}</h3>
							<p>{employee?.bio}</p>
						</div>
					</div>
					<div
						className="btn-edit"
						onClick={() => {
							setUpdate(true);
						}}
					>
						<FontAwesomeIcon icon={faUserPen} />
					</div>
				</div>
				<div className="user-email">
					<FontAwesomeIcon icon={faEnvelope} />
					<span>{user?.email}</span>
				</div>
				<div className="user-phone">
					<FontAwesomeIcon icon={faPhone} />
					<span>{user?.phone}</span>
				</div>
				<div className="user-skills">
					<h4>Skills</h4>

					{employee?.skills?.map((skill, index) => (
						<span key={index} className="skill-item">
							{skill}
						</span>
					))}
				</div>
				<div className="user-resume">
					<h4>Resume</h4>
					<a target="_blank" href={employee?.resume}>
						my-cv
					</a>
				</div>
				<button
					style={{
						marginLeft: "88%",
						background: "black",
						padding: "10px",
						color: "white",
						borderRadius: "5px",
						fontWeight: "600",
						cursor: "pointer",
						outline: "none",
					}}
					onClick={async () => {
						await axios.post("http://localhost:8080/auth/logout").then(() => {
							dispatch({ type: "LOGOUT" });
							cookie.remove("auth_token");
							navigate("/");
						});
					}}
				>
					Log out
				</button>
			</div>
			<div className="applied-jobs-container">
				<h3>Applied jobs</h3>
				<AppliedTable data={listJobApplieds}></AppliedTable>
			</div>
			<div className="applied-jobs-container">
				<h3>Save jobs</h3>
				<SaveForLaterTable data={listJobSave}></SaveForLaterTable>
			</div>
		</div>
	);
}

export default Profile;
