import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import {Complaints} from "../pages/Complaints/Complaints";
import {ComplaintSettings} from "../pages/Complaints/ComplaintSettings";
import RaiseComplaint from "../pages/Complaints/RaiseComplaint";

const AllRoutes = () => {
  return (
   <Routes>
  <Route path="/" element={<Navigate to="/dashboard" />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/complaints" element={<Complaints />} />
  <Route path="/complaints/settings" element={<ComplaintSettings />} />

  <Route path="/complaints/raise" element={<RaiseComplaint />}/>
{/* <Route path="/complaints/my-complaints" element={<MyComplaints />} />
<Route path="/complaints/categories" element={<ComplaintCategories />} /> */}
</Routes>




  );
};

export default AllRoutes;