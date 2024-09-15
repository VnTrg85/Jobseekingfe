import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
function AppliedTable() {
	const columns = [
		{ field: "Date", headerName: "Date", width: 120 },
		{ field: "JobRole", headerName: "Job Role", width: 300 },
		{ field: "Company", headerName: "Company", width: 200 },
		{ field: "Status", headerName: "Status", width: 100 },
	];
	const rows = [
		{ id: 1, Date: "12-02-2024", JobRole: "Software engineering", Company: "Google", Status: "selected" },
		{ id: 1, Date: "12-02-2024", JobRole: "Software engineering", Company: "Google", Status: "selected" },
		{ id: 1, Date: "12-02-2024", JobRole: "Software engineering", Company: "Google", Status: "selected" },
		{ id: 1, Date: "12-02-2024", JobRole: "Software engineering", Company: "Google", Status: "selected" },
		{ id: 1, Date: "12-02-2024", JobRole: "Software engineering", Company: "Google", Status: "selected" },
		{ id: 1, Date: "12-02-2024", JobRole: "Software engineering", Company: "Google", Status: "selected" },
		{ id: 1, Date: "12-02-2024", JobRole: "Software engineering", Company: "Google", Status: "selected" },
	];
	const paginationModel = { page: 0, pageSize: 5 };
	return (
		<div className="applied-table">
			<Paper sx={{ height: 400, width: "100%" }}>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{ pagination: { paginationModel } }}
					pageSizeOptions={[5, 10]}
					sx={{ border: 1 }}
				/>
			</Paper>
		</div>
	);
}

export default AppliedTable;
