import axios from "axios";
import "./SaveForLaterTable.scss";
import { ToastContainer, toast } from "react-toastify";

function SaveForLaterTable({ data }) {
	const handleUnSave = async id => {
		await axios
			.delete(`http://localhost:8080/userJobApplied/delete/${id}`)
			.then(res => {
				toast.success("Successfully unsaved");
			})
			.catch(err => toast.error(err));
		document.location.reload();
	};

	return (
		<div className="saveforlater-container">
			<ToastContainer closeOnClick position="top-right"></ToastContainer>
			<div className="saveforlater-table">
				<h3 className="saveforlater-date">Date</h3>
				<h3 className="saveforlater-name">Job Name</h3>
				<h3 className="saveforlater-company">Company</h3>
				<h3 className="saveforlater-action">Action</h3>
			</div>
			{data.map((item, index) => (
				<div className="saveforlater-table">
					<h3 className="saveforlater-date saveforlater-item">{item?.time}</h3>
					<h3 className="saveforlater-name saveforlater-item">{item?.job?.title}</h3>
					<h3 className="saveforlater-company saveforlater-item">{item?.job?.company?.userCompany?.name}</h3>
					<h3
						className="saveforlater-action saveforlater-item btn-unsave"
						onClick={() => {
							handleUnSave(item?.id);
						}}
					>
						Unsave
					</h3>
				</div>
			))}
		</div>
	);
}

export default SaveForLaterTable;
