import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
function Header() {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	return (
		<div className="header">
			<div
				className="header-left"
				onClick={() => {
					navigate("/");
				}}
			>
				JobSeeking
			</div>
			<div className="header-right">
				<div className="header-items">
					{
							<div className="header-items">
							<div className="header-item" onClick={() => {navigate("/admin/companies");}}>Companies</div>
							<div className="header-item" onClick={() => {navigate("/admin/jobtype");}}>Jobtype</div>
							<div className="header-item" onClick={() => {navigate("/admin/role");}}>Roles</div>
							<div className="header-item" onClick={() => {navigate("/admin/user");}}>User</div>

							</div>
						
					}
				</div>
				{user != null ? (
					<div className="header-user">
						<img src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="></img>
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
