import { Routes, Route } from "react-router-dom";

import Login from "../pages/authentication/Login";
import Personalinfo from "../pages/authentication/Personalinfo";
import Societyinfo from "../pages/authentication/Societyinfo";
import Additionalinfo from "../pages/authentication/Additionalinfo";
import Verification from "../pages/authentication/Verification";

import Forgot from "../pages/authentication/Forgot";
import ForgotCodeVerification from "../pages/authentication/ForgotCodeVerification";
import ResetPassword from "../pages/authentication/ResetPassword";
import PassSuccess from "../pages/authentication/PassSuccess";

import Registration from "../pages/authentication/Registration";
import Visitors from "../pages/visitors/Visitors";
import VisitorLog from "../pages/visitors/VisitorLog";
import AddVisitorModal from "../pages/visitors/AddVisitorModal";
import PreRegisterVisitorModal from "../pages/visitors/PreRegisterVisitorModal";

import Staff from "../pages/staff/Staff";
import StaffProfile from "../pages/staff/profile/StaffProfile";
import Documents from "../pages/staff/profile/Documents";
import Attendance from "../pages/staff/profile/Attendance";
import LeaveHistory from "../pages/staff/profile/LeaveHistory";
import SalaryPayroll from "../pages/staff/profile/SalaryPayroll";
import ActivityLog from "../pages/staff/profile/ActivityLog";
import AddStaf from "../pages/staff/AddStaf";
import LeaveRequest from "../pages/staff/LeaveRequest";
import PayrollSettings from "../pages/staff/PayrollSettings";
import ViewPayslip from "../pages/staff/ViewPayslip";

const Allroutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Registration Flow */}
      <Route path="/register" element={<Registration />}>
        <Route path="personalinfo" element={<Personalinfo />} />
        <Route path="societyinfo" element={<Societyinfo />} />
        <Route path="additionalinfo" element={<Additionalinfo />} />
        <Route path="verification" element={<Verification />} />
      </Route>

      {/* Forgot Password Flow */}
      <Route path="/forgot" element={<Forgot />} />
      <Route
        path="/forgotcodeverification"
        element={<ForgotCodeVerification />}
      />
      <Route
        path="/resetpassword"
        element={<ResetPassword />}
      />
      <Route
        path="/passsuccess"
        element={<PassSuccess />}
      />

      {/* visitors */}
      <Route path="/visitors" element={<Visitors />}>
        <Route path="visitoradd" element={<AddVisitorModal />} />
        <Route path="visitorlog" element={<VisitorLog />} />
        <Route path="visitor-preregister" element={<PreRegisterVisitorModal />} />
      </Route>

      {/* staff */}

      <Route path="staff" element={<Staff />} />
      <Route path="/staff/profile/:id" element={<StaffProfile />} />
      <Route path="/staff/profile/:id/documents" element={<Documents />} />
      <Route path="/staff/profile/attendance" element={<Attendance />} />
      <Route path="/staff/profile/leave-history" element={<LeaveHistory />} />
      <Route path="/staff/profile/salary-payroll" element={<SalaryPayroll />} />
      <Route path="/staff/profile/salary-payroll/view-payslip/:id" element={<ViewPayslip />} />
      <Route path="/staff/profile/salary-payroll/payroll-settings" element={<PayrollSettings />} />
      <Route path="/staff/profile/activity-log" element={<ActivityLog />} />
      <Route path="/staff/profile/add-staf" element={<AddStaf />} />
      <Route path="/staff/profile/leave-request" element={<LeaveRequest />} />


    </Routes>

  );
};

export default Allroutes;