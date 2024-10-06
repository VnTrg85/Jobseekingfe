import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CompanyManager.scss";

const CompanyManager = () => {
	const [companies, setCompanies] = useState([]);
	const [selectedFilter, setSelectedFilter] = useState("industry");
	const [filterValue, setFilterValue] = useState("");
	const [filteredCompanies, setFilteredCompanies] = useState([]);

	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				const response = await axios.get("http://localhost:8080/company/getAll");
				setCompanies(response.data);
				setFilteredCompanies(response.data);
			} catch (error) {
				console.error("Error fetching companies:", error);
			}
		};
		fetchCompanies();
	}, []);

	const filterSearch = () => {
		const results = companies.filter(company => {
			if (selectedFilter === "industry") {
				return company.industry.some(ind => ind.toLowerCase().includes(filterValue.toLowerCase()));
			} else if (selectedFilter === "location") {
				return company.location.toLowerCase().includes(filterValue.toLowerCase());
			} else {
				return true;
			}
		});
		setFilteredCompanies(results);
	};

	return (
		<div className="company-manager">
			<h1>Company Manager</h1>
			<div className="filter-container">
				<select value={selectedFilter} onChange={e => setSelectedFilter(e.target.value)} className="filter-select">
					<option value="industry">Industry</option>
					<option value="location">Location</option>
				</select>

				<input
					type="text"
					placeholder={`Enter ${selectedFilter}`}
					value={filterValue}
					onChange={e => setFilterValue(e.target.value)}
					className="filter-input"
				/>

				<button onClick={filterSearch} className="search-button">
					Search
				</button>
			</div>
			<CompanyList companies={filteredCompanies} />
		</div>
	);

	function CompanyList({ companies }) {
		return (
			<table className="company-list">
				<thead>
					<tr>
						<th>Logo</th>
						<th>Website</th>
						<th>Location</th>
						<th>Size</th>
						<th>Industry</th>
						<th>Descriptions</th>
					</tr>
				</thead>
				<tbody>
					{companies.map(company => (
						<tr key={company.id}>
							<td>
								<img src={company.logo} alt={company.website} className="company-logo" />
							</td>
							<td>{company.website}</td>
							<td>{company.location}</td>
							<td>{company.companySize}</td>
							<td>{company.industry.join(", ")}</td>
							<td style={{ width: "600px" }}>{company.description}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
};

export default CompanyManager;
