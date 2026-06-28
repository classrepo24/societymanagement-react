import { Routes, Route } from "react-router-dom";
import { ResidentProfileForm } from "../pages/resident/forms/ResidentProfileForm";
import { ResidentProfileView } from "../pages/resident/list/ResidentProfileView";
import { ImportResident } from "../pages/resident/pages/ImportResident";
import { MaintenanceManagement } from "../pages/maintenanceManagement/pages/MaintenanceManagement";
import { SocietyMembers } from "../pages/resident/pages/SocietyMembers";
import MaintenanceSettings from "../pages/maintenanceManagement/pages/MaintenanceSettings";
import { GeneralSetting } from "../pages/maintenanceManagement/components/maintenancesetting/general/GeneralSetting";
import { Navigate } from "react-router-dom";
import { Components } from "../pages/maintenanceManagement/components/maintenancesetting/components/Components";
import { BillingAndDueDates } from "../pages/maintenanceManagement/components/maintenancesetting/billingAndDueDates/BillingAndDueDates";
import { LateFeeAndInterest } from "../pages/maintenanceManagement/components/maintenancesetting/lateFeeAndInterest/LateFeeAndInterest";
import { RaiseMaintenanceRequest } from "../pages/maintenanceManagement/pages/raiseMaintenanceRequestComponents/RaiseMaintenanceRequest";
import {MyRequest} from "../pages/maintenanceManagement/pages/myRequest/MyRequest";
import { MaintenanceHistory } from "../pages/maintenanceManagement/pages/maintenanceHistory/MaintenanceHistory";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/residents"
        element={<ResidentProfileView />}
      />
      <Route
        path="/add"
        element={<ResidentProfileForm />}
      />
      <Route
        path="/import-resident"
        element={<ImportResident />}
      />
      <Route
        path="/society-members"
        element={<SocietyMembers />}
      />
      <Route
        path="/maintenance-management"
        element={<MaintenanceManagement />}
      />

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
    </Routes>

  );
};

export default AllRoutes;