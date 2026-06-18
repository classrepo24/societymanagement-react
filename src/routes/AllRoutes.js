import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import {Complaints} from "../pages/Complaints/Complaints";


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/complaints" element={<Complaints />} />
    </Routes>
  );
};

export default AllRoutes;