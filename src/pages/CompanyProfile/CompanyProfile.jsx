import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPhone, faUserPen, faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./CompanyProfile.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
function CompanyProfile() {
	const [desc, setDesc] = useState("");

	const [update, setUpdate] = useState(false);
	const { user, dispatch } = useContext(AuthContext);
	const [company, setCompany] = useState(null);

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
			await axios
				.get(`http://localhost:8080/company/getByUserID/${user?.id}`)
				.then(res => {
					setCompany(res.data);
					setUpdateEmployeeData(res.data);
				})
				.catch(() => {});
		};
		getData();
	}, [user]);
	const handleUpdateClick = async () => {
		//image
		var urlResImg = company?.logo;
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
				return await axios.post("http://localhost:8080/company/add", { ...updateEmployeeData, logo: urlResImg });
			})
			.then(() => {
				dispatch({ type: "LOGIN_SUCCESS", payload: updateUserData });
				setCompany(updateEmployeeData);
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
		if (e.target.id == "industry") {
			setUpdateEmployeeData(prev => ({ ...prev, [e.target.id]: e.target.value.split(",") }));
		} else setUpdateEmployeeData(prev => ({ ...prev, [e.target.id]: e.target.value }));
	};
	return (
		<div className="company-profile">
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
							<h4>Logo</h4>
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
							<h4>Description</h4>
							<input
								id="description"
								type="text"
								value={updateEmployeeData.description}
								onChange={e => handleInputEmployeeChange(e)}
							></input>
						</div>
						<div>
							<h4>Industry</h4>
							<input id="industry" type="text" value={updateEmployeeData.industry} onChange={e => handleInputEmployeeChange(e)}></input>
						</div>
						<div>
							<h4>Company Size</h4>
							<input
								id="companySize"
								type="text"
								value={updateEmployeeData.companySize}
								onChange={e => handleInputEmployeeChange(e)}
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
						<img src={company?.logo || "https://img.icons8.com/nolan/600w/000000/user-default.png"}></img>
						<div className="user-name-des">
							<h3>{user?.name}</h3>
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
				<div className="company-desc">
					<h4>Company Description</h4>
					<p>{company?.description}</p>
				</div>
				<div className="user-skills">
					<h4>Industry</h4>

					{company?.industry?.map((item, index) => (
						<span key={index} className="skill-item">
							{item}
						</span>
					))}
				</div>
				<div className="user-skills">
					<h4>Company size</h4>
					<p>{company?.companySize}</p>
				</div>
				<div className="user-skills">
					<h4>Website</h4>
					<a target="_blank" href={company?.website}>
						We
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
		</div>
	);
}

export default CompanyProfile;
