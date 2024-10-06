import { useContext, useEffect, useState } from "react";
import "./Login.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
function Login() {
	const state = useLocation().pathname.split("/")[2];
	const { dispatch } = useContext(AuthContext);
	const [login, setLogin] = useState(state);
	const [err, setErr] = useState(false);
	const [dataLogin, setDataLogin] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	var initialValue = {
		name: "",
		email: "",
		password: "",
		phone: "",
		userRole: { id: "" },
	};
	const [signupData, setSignupData] = useState(initialValue);

	const handleChange = e => {
		setDataLogin(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleChangeSignUp = e => {
		if (e.target.name == "userRole") {
			setSignupData(prev => ({ ...prev, [e.target.name]: { id: e.target.value } }));
		} else setSignupData(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleLogin = async () => {
		let currentUserId;
		let errorMessage;
		let cookies;
		await axios
			.post("http://localhost:8080/auth/login", dataLogin)
			.then(response => {
				const data = response.data;
				currentUserId = data.split(",")[0];
				errorMessage = data.split(",")[0];
				cookies = data.split(",")[1];

				if (cookies == null) {
					dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
					setErr(true);
					return false;
				}
				cookie.set("auth_token", cookies);
				return true;
			})
			.then(async status => {
				if (status) {
					await axios.get(`http://localhost:8080/user/get/${currentUserId}`).then(response => {
						dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
						setSignupData(initialValue);
						setErr(false);
						console.log(response.data.id);

						if (response.data.userRole.id == "5") {
							navigate("/jobrescruiting");
						} else if (response.data.userRole.id == "4") {
							navigate("/");
						} else {
							navigate("/admin/companies");
						}
					});
				}
			})
			.catch(() => {
				setErr(true);
			});
	};

	const handleSignUp = async () => {
		if (signupData.name == "" || signupData.email == "" || signupData.password == "" || signupData.phone == "" || signupData.userRole.id == "") {
			alert("Please fill all fields");
		} else {
			await axios
				.post("http://localhost:8080/auth/register", signupData)
				.then(res => {
					console.log(res.data);

					return axios.post("http://localhost:8080/employee/add", { userEmployee: { id: res.data } });
				})
				.then(() => {
					setLogin("lg");
					setErr(false);
				})
				.catch(() => {
					setErr(true);
				});
		}
	};
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
							<input
								type="text"
								name="email"
								onChange={e => {
									handleChange(e);
								}}
								placeholder="Enter your email"
							></input>
						</div>
						<div className="login-item">
							<h5>Password</h5>
							<input
								type="password"
								name="password"
								placeholder="Enter your password"
								onChange={e => {
									handleChange(e);
								}}
							></input>
						</div>
						{err && <div>Login failed</div>}
						<button className="login-btn" onClick={handleLogin}>
							Login
						</button>
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
							<input
								onChange={e => {
									handleChangeSignUp(e);
								}}
								name="name"
								type="text"
								placeholder="Enter your name"
							></input>
						</div>
						<div className="login-item">
							<h5>Email</h5>
							<input
								onChange={e => {
									handleChangeSignUp(e);
								}}
								name="email"
								type="text"
								placeholder="Enter your email"
							></input>
						</div>
						<div className="login-item">
							<h5>Password</h5>
							<input
								onChange={e => {
									handleChangeSignUp(e);
								}}
								name="password"
								type="password"
								placeholder="Enter your password"
							></input>
						</div>
						<div className="login-item">
							<h5>Phone number</h5>
							<input
								onChange={e => {
									handleChangeSignUp(e);
								}}
								name="phone"
								type="text"
								placeholder="Enter your phone number"
							></input>
						</div>
						<div className="account-role">
							<input
								onChange={e => {
									handleChangeSignUp(e);
								}}
								name="userRole"
								type="radio"
								value="4"
								id="Recruiter"
							></input>
							<label htmlFor="Recruiter">Recruiter</label>
							<input
								onChange={e => {
									handleChangeSignUp(e);
								}}
								name="userRole"
								type="radio"
								value="5"
								id="Employee"
							></input>
							<label htmlFor="Employee">Employee</label>
						</div>
						{err && <div>Sign up failed</div>}
						<button className="login-btn" onClick={handleSignUp}>
							Sign up
						</button>
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
