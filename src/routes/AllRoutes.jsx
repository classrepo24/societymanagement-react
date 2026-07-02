import { Routes, Route } from "react-router-dom";
import { ResidentProfileForm } from "../pages/resident/forms/ResidentProfileForm";
import { ResidentProfileView } from "../pages/resident/viewPage/ResidentProfileView";
import { ImportResident } from "../pages/resident/viewPage/ImportResident";
import { MaintenanceManagement } from "../pages/maintenanceManagement/MaintenanceManagement";
import { SocietyMembers } from "../pages/resident/viewPage/SocietyMembers";
import MaintenanceSettings from "../pages/maintenanceManagement/MaintenanceSettings";
import { GeneralSetting } from "../pages/maintenanceManagement/maintenancesetting/general/GeneralSetting";
import { Navigate } from "react-router-dom";
// import { Components } from "../pages/maintenanceManagement";
import { RaiseMaintenanceRequest } from "../pages/maintenanceManagement/quickLinks/raiseMaintenance/RaiseMaintenanceRequest";
import {MyRequest} from "../pages/maintenanceManagement/quickLinks/myRequest/MyRequest";
import { MaintenanceHistory } from "../pages/maintenanceManagement/quickLinks/maintenanceHistory/MaintenanceHistory";
import { HelpAndSupport } from "../pages/maintenanceManagement/quickLinks/helpAndSupports/HelpAndSupport";


const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/residents"
        element={<ResidentProfileView />}
      />
      <Route
        path="/resident/add"
        element={<ResidentProfileForm />}
      />
      <Route
        path="/resident/import-resident"
        element={<ImportResident />}
      />
      <Route
        path="/resident/society-members"
        element={<SocietyMembers />}
      />
      <Route
        path="/maintenance-management"
        element={<MaintenanceManagement />}
      />
      <Route
      path="/mainteance-general-settings"
      element={<GeneralSetting />} />

      <Route
        path="/maintenance-management/maintenance-settings"
        element={<MaintenanceSettings />}
      />

      <Route
        path="/maintenance-management/raise-maintenance-request"
        element={<RaiseMaintenanceRequest />}
      />
      <Route
        path="/maintenance-management/my-request"
        element={<MyRequest />}
      />
      <Route
        path="/maintenance-management/history"
        element={<MaintenanceHistory />}
      />
      <Route path="/maintenance-management/help&support"
      element={<HelpAndSupport />}/>
      
    </Routes>

  );
};

export default AllRoutes;