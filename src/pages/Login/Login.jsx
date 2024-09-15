import { useEffect, useState } from "react";
import "./Login.scss";
import { Link, useLocation } from "react-router-dom";
function Login() {
	const state = useLocation().pathname.split("/")[2];
	const [login, setLogin] = useState(state);
	useEffect(() => {
		setLogin(state);
	}, [state]);
	return (
		<>
			{" "}
			{login == "lg" ? (
				<div className="login">
					<div className="login-container">
						<h3 className="login-label">Login</h3>
						<div className="login-item">
							<h5>Email</h5>
							<input type="text" placeholder="Enter your email"></input>
						</div>
						<div className="login-item">
							<h5>Password</h5>
							<input type="password" placeholder="Enter your password"></input>
						</div>
						<button className="login-btn">Login</button>
						<div className="login-more">
							Don't have an account?{" "}
							<span
								onClick={() => {
									setLogin("sg");
								}}
							>
								Sign up
							</span>{" "}
						</div>
					</div>
				</div>
			) : (
				<div className="login">
					<div className="login-container">
						<h3 className="login-label">Sign up</h3>
						<div className="login-item">
							<h5>Name</h5>
							<input type="text" placeholder="Enter your name"></input>
						</div>
						<div className="login-item">
							<h5>Email</h5>
							<input type="text" placeholder="Enter your email"></input>
						</div>
						<div className="login-item">
							<h5>Password</h5>
							<input type="password" placeholder="Enter your password"></input>
						</div>
						<div className="login-item">
							<h5>Phone number</h5>
							<input type="text" placeholder="Enter your phone number"></input>
						</div>
						<div className="account-role">
							<input type="radio" name="role" value="Recruiter" id="Recruiter"></input>
							<label htmlFor="Recruiter">Recruiter</label>
							<input type="radio" name="role" value="Employee" id="Employee"></input>
							<label htmlFor="Employee">Employee</label>
						</div>
						<button className="login-btn">Sign up</button>
						<div className="login-more">
							Already have an account?{" "}
							<span
								onClick={() => {
									setLogin("lg");
								}}
							>
								Login
							</span>{" "}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Login;
