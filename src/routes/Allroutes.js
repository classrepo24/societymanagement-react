import { Routes,Route} from "react-router-dom";

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
import  Visitors  from "../pages/visitors/Visitors";
import VisitorLog from "../pages/visitors/component/VisitorLog";

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
      <Route path="/visitors" element={<Visitors />} />
      <Route path="/visitors/visitorlog" element={<VisitorLog />} />


      </Routes>

  );
};

export default Allroutes;