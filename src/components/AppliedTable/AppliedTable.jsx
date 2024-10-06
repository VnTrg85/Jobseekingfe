import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import "./AppliedTable.scss";
function AppliedTable({ data }) {
	const columns = [
		{ field: "Date", headerClassName: "css-header", headerName: "Date", width: 120 },
		{ field: "JobName", headerName: "Job name", width: 300 },
		{ field: "Company", headerName: "Company", width: 200 },
		{ field: "Status", headerName: "Status", width: 100 },
	];
	const rows = data.map((item, index) => ({
		id: index,
		Date: item?.time,
		JobName: item?.job?.title,
		Company: item?.job?.company?.userCompany?.name,
		Status: item?.jobStatus?.name,
	}));
	const paginationModel = { page: 0, pageSize: 5 };
	return (
		<div className="applied-table">
			<Box sx={{ height: 400, width: "100%" }}>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{ pagination: { paginationModel } }}
					pageSizeOptions={[5, 10]}
					sx={{ border: 1 }}
				/>
			</Box>
		</div>
	);
}

export default AppliedTable;
