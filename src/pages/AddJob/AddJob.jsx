import { useContext, useEffect, useState } from "react";
import "./AddJob.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddJob() {
	const { user } = useContext(AuthContext);
	const [JobType, setJobType] = useState(null);
	const [desc, setDesc] = useState("");
	const [formData, setFormData] = useState({
		title: "",
		location: "",
		salary: "",
		dateCreated: Date.now(),
		status: "recruiting",
		jobType: {},
		company: {},
	});
	const navigate = useNavigate();
	const handleSelect = e => {
		if (!e.target.value != "df") {
			setFormData(prev => ({ ...prev, jobType: { id: e.target.value } }));
		}
	};
	useEffect(() => {
		const getData = async () => {
			if (user) {
				await axios.get("http://localhost:8080/jobtype/getAll", { timeout: 1000000 }).then(res => {
					setJobType(res.data);
				});
				await axios
					.get(`http://localhost:8080/company/getByUserID/${user.id}`, { timeout: 1000000 })
					.then(res => {
						setFormData(prev => ({ ...prev, company: { id: res.data.id } }));
					})
					.catch(() => {});
			}
		};
		getData();
	}, [user]);

	const handleChange = e => {
		if (e.target.name == "skillFields") {
			setFormData(prev => ({ ...prev, [e.target.name]: e.target.value.split(",") }));
		} else {
			setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
		}
	};

	const handleSaveJob = async () => {
		let form = { ...formData, description: desc };
		console.log(desc);

		await axios
			.post("http://localhost:8080/job/add", form)
			.then(() => {
				toast.success("Add job successfully");
				navigate("/jobrescruiting");
			})
			.catch(error => {
				console.log(error);

				toast.error("Job add failed");
			});
	};
	return (
		<div className="add-job-container">
			<div className="add-job-dialog">
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<div style={{ width: "300px" }}>
						<h3>Title</h3>
						<input
							onChange={e => {
								handleChange(e);
							}}
							name="title"
							type="text"
						></input>
					</div>
					<div>
						<h3>Type</h3>
						<select
							onChange={e => {
								handleSelect(e);
							}}
							name="jobType"
							style={{ width: "200px", height: "30px", outline: "none" }}
							id="type"
						>
							<option value="def">Choose type</option>
							{JobType?.map((item, index) => (
								<option key={index} value={item.id}>
									{item.name}
								</option>
							))}
						</select>
					</div>
				</div>
				<div>
					<h3>Description</h3>
					<div style={{ height: "400px" }}>
						<ReactQuill value={desc} onChange={setDesc} style={{ height: "90%" }}></ReactQuill>
					</div>
				</div>
				<div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
					<div style={{ flex: 2 }}>
						<h3>Skills</h3>
						<input
							onChange={e => {
								handleChange(e);
							}}
							name="skillFields"
							type="text"
							required
						></input>
					</div>
					<div style={{ flex: 1 }}>
						<h3>Location</h3>
						<input
							onChange={e => {
								handleChange(e);
							}}
							name="location"
							type="text"
							required
						></input>
					</div>

					<div style={{ flex: 1 }}>
						<h3>Salary</h3>
						<input
							onChange={e => {
								handleChange(e);
							}}
							name="salary"
							type="text"
							required
						></input>
					</div>
				</div>
				<div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
					<button onClick={handleSaveJob} className="save-btn">
						Save
					</button>
					<button
						className="save-btn"
						onClick={() => {
							navigate("/jobrescruiting");
						}}
					>
						Cancel
					</button>
				</div>
				<ToastContainer></ToastContainer>
			</div>
		</div>
	);
}

export default AddJob;
