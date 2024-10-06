import { useEffect, useState } from "react";
import "./Login.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Login() {
		const state = useLocation().pathname.split("/")[2];
		const [login, setLogin] = useState(state);
		const [formData, setFormData] = useState({
			name: '',
			email: '',
			password: '',
			phone: '',
			role: ''
		});
		const [errorMessage, setErrorMessage] = useState('');
		const [emailError, setEmailError] = useState('');

		useEffect(() => {
			setLogin(state);
		}, [state]);

		const changeForm = (e) => {
			const { name, value } = e.target;
			setFormData(prev => ({ ...prev, [name]: value }));
		
			if (name === 'email') {
				const error = validateEmail(value);
				setEmailError(error);
			}
		};

		const validateEmail = (email) => {
			const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!regex.test(email)) {
				setEmailError("Email không hợp lệ");
			} else {
				setEmailError("");
			}
		};

		const callApi = async (e) => {
			e.preventDefault();
			setErrorMessage('');
			if (emailError) {
				setErrorMessage(emailError);
				return;
			}

			try {
				if (login === "lg") {
					const response = await axios.post('http://localhost:8080/api/users/login', {
						email: formData.email,
						password: formData.password,
					});
					console.log("Login successful:", response.data);
				} else {
					const response = await axios.post(`http://localhost:8080/api/users/register?roleId=${formData.role}`, {
						name: formData.name,
						email: formData.email,
						phone: formData.phone,
						password: formData.password,
					});
					console.log("Registration successful:", response.data);
				}
			} catch (error) {
				console.error("Error:", error);
				setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
			}
		};

		return (
			<div className="login">
				<div className="login-container">
					<h3 className="login-label">{login === "lg" ? "Đăng nhập" : "Đăng ký"}</h3>
					<form onSubmit={callApi}>
						{login === "sg" && (
							<div className="login-item">
								<h5>Tên</h5>
								<input type="text" name="name" placeholder="Nhập tên của bạn" value={formData.name} onChange={changeForm} required />
							</div>
						)}
						<div className="login-item">
							<h5>Email</h5>
							<input type="text" name="email" placeholder="Nhập email của bạn" value={formData.email} onChange={changeForm} required />
							{emailError && <div className="error-message">{emailError}</div>}
						</div>
						<div className="login-item">
							<h5>Mật khẩu</h5>
							<input type="password" name="password" placeholder="Nhập mật khẩu" value={formData.password} onChange={changeForm} required />
						</div>
						{login === "sg" && (
							<div className="login-item">
								<h5>Số điện thoại</h5>
								<input type="text" name="phone" placeholder="Nhập số điện thoại" value={formData.phone} onChange={changeForm} required />
							</div>
						)}
						{login === "sg" && (
							<div className="account-role">
								<h5>Vai trò</h5>
								<input type="radio" name="role" value="Recruiter" id="Recruiter" onChange={changeForm} />
								<label htmlFor="Recruiter">Nhà tuyển dụng</label>
								
								<input type="radio" name="role" value="Employee" id="Employee" onChange={changeForm} />
								<label htmlFor="Employee">Nhân viên</label>
							</div>
						)}
						<button className="login-btn" type="submit">{login === "lg" ? "Đăng nhập" : "Đăng ký"}</button>
						{errorMessage && <div className="error-message">{errorMessage}</div>}
						<div className="login-more">
							{login === "lg" ? (
								<>
									Bạn chưa có tài khoản?{" "}
									<span onClick={() => setLogin("sg")}>Đăng ký</span>
								</>
							) : (
								<>
									Bạn đã có tài khoản?{" "}
									<span onClick={() => setLogin("lg")}>Đăng nhập</span>
								</>
							)}
						</div>
					</form>
				</div>
			</div>
		);
}

export default Login;
