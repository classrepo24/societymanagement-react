import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import {Complaints} from "../pages/Complaints/Complaints";
import {ComplaintSettings} from "../pages/Complaints/ComplaintSettings";
import RaiseComplaint from "../pages/Complaints/RaiseComplaint";

import { MyComplaints } from "../pages/Complaints/MyComplaints";
import { ComplaintCategories } from "../pages/Complaints/ComplaintCategories";
import { Messages } from "../pages/dashboard/Messages";
import { HelpAndSupport } from "../pages/dashboard/HelpAndSupport";
import { Amenity } from "../pages/Amenity/Amenity";

const AllRoutes = () => {
  return (
   <Routes>
  <Route path="/" element={<Navigate to="/dashboard" />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path = "/dashboard/messages" element={<Messages />} />
  <Route path="/dashboard/help-support" element={<HelpAndSupport />} />

  {/* Complaints modeule */}
  <Route path="/complaints" element={<Complaints />} />
  <Route path="/complaints/settings" element={<ComplaintSettings />} />

  <Route path="/complaints/raise" element={<RaiseComplaint />}/>
<Route path="/complaints/my-complaints" element={<MyComplaints />} />
<Route path="/complaints/categories" element={<ComplaintCategories />} />

{/* Amenity */}
<Route path="/amenities" element={<Amenity/>} />




</Routes>




  );
};

export default AllRoutes;