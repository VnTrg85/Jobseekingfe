import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import "./UserManager.scss";

const UserManager = () => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [filterField, setFilterField] = useState("name");
	const [filterValue, setFilterValue] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const userResponse = await axios.get("http://localhost:8080/user/getAll");
				setUsers(userResponse.data);
			} catch (error) {
				console.error("Failed to fetch users:", error);
				setError("Failed to fetch users.");
			}
		};

		const fetchRoles = async () => {
			try {
				const roleResponse = await axios.get("http://localhost:8080/user/getAll");
				setRoles(roleResponse.data);
			} catch (error) {
				console.error("Failed to fetch roles:", error);
				setError("Failed to fetch roles.");
			}
		};

		fetchUsers();
		fetchRoles();
	}, []);

	const getRoleName = useCallback(
		userRoleId => {
			if (!userRoleId) return "N/A";
			const role = roles.find(role => role.id === userRoleId);
			return role ? role.name : "N/A";
		},
		[roles],
	);

	const filteredUsers = useMemo(() => {
		return users.filter(user => {
			const userRoleName = getRoleName(user.userRole?.id);

			switch (filterField) {
				case "name":
					return user.name.toLowerCase().includes(filterValue.toLowerCase());
				case "email":
					return user.email.toLowerCase().includes(filterValue.toLowerCase());
				case "phone":
					return user.phone.includes(filterValue);
				case "role":
					return userRoleName.toLowerCase().includes(filterValue.toLowerCase());
				default:
					return true;
			}
		});
	}, [users, filterField, filterValue, getRoleName]);

	return (
		<div className="user-manager">
			<h1>User Manager</h1>
			{error && <div className="error-message">{error}</div>}

			<section className="filter-container">
				<div>
					<select id="filterField" value={filterField} onChange={e => setFilterField(e.target.value)}>
						<option value="name">Name</option>
						<option value="email">Email</option>
						<option value="phone">Phone</option>
						<option value="role">Role</option>
					</select>
				</div>
				<div>
					<input
						id="filterValue"
						type="text"
						placeholder={`Enter ${filterField}`}
						value={filterValue}
						onChange={e => setFilterValue(e.target.value)}
					/>
				</div>
			</section>

			<table className="user-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Role</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map(user => (
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.phone}</td>
							<td>{user?.userRole?.name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserManager;
