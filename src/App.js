import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import JobDetail from "./pages/JobDetail/JobDetail";
import JobsList from "./pages/JobsList/JobsList";
import Profile from "./pages/Profile/Profile";
import CompanyManager from "./pages/Admin/CompaniesManager/CompanyManager";
import UserManager from "./pages/Admin/AccountManager/UserManager";
import JobTypeManager from "./pages/Admin/JobTypeManager/JobTypeManager";
import RoleManager from "./pages/Admin/UserRoleManager/RoleManager";
import CompanyDetail from "./pages/CompanyDetail/CompanyDetail";
import JobsRecruiting from "./pages/JobsRecruiting/JobsRecruiting";
import AddJob from "./pages/AddJob/AddJob";
import JobApplies from "./pages/JobApplies/JobApplies";
import CompanyProfile from "./pages/CompanyProfile/CompanyProfile";
import Browse from "./pages/Browse/Browse";
const Layout = () => {
	return (
		<div className="layout">
			<Header></Header>
			<Outlet></Outlet>
			<Footer></Footer>
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout></Layout>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/login/:state",
				element: <Login></Login>,
			},
			{
				path: "/jobs/:id",
				element: <JobDetail></JobDetail>,
			},
			{
				path: "/jobslist",
				element: <JobsList></JobsList>,
			},
			{
				path: "/Profile",
				element: <Profile></Profile>,
			},
			{
				path: "/Browse",
				element: <Browse></Browse>,
			},
			{
				path: "/company/:id",
				element: <CompanyDetail></CompanyDetail>,
			},
			{
				path: "/jobrescruiting",
				element: <JobsRecruiting></JobsRecruiting>,
			},
			{ path: "/addJob", element: <AddJob></AddJob> },
			{
				path: "/jobapplieds/:id",
				element: <JobApplies></JobApplies>,
			},
			{
				path: "/companyProfile",
				element: <CompanyProfile></CompanyProfile>,
			},
			,
			{
				path: "/Admin/Companies",
				element: <CompanyManager></CompanyManager>,
			},
			{
				path: "/Admin/User",
				element: <UserManager></UserManager>,
			},
			{
				path: "/Admin/JobType",
				element: <JobTypeManager></JobTypeManager>,
			},
			{
				path: "/Admin/Role",
				element: <RoleManager></RoleManager>,
			},
		],
	},
]);
function App() {
	return (
		<div className="App">
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
}

export default App;
