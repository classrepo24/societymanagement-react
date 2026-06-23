import { Routes, Route } from "react-router-dom";
import {ResidentProfileForm} from "../pages/resident/forms/ResidentProfileForm";
import { ResidentProfileView } from "../pages/resident/list/ResidentProfileView";
import { ImportResident } from "../pages/resident/pages/ImportResident";
import { MaintenanceManagement } from "../pages/maintenanceManagement/pages/MaintenanceManagement";


const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/resident-view"
        element={<ResidentProfileView />}
      />
      <Route
        path="/resident-form"
        element={<ResidentProfileForm/>}
      />
      <Route
        path="/import-resident"
        element={<ImportResident />}
      />
      <Route 
      path="/maintenance-management"
      element ={<MaintenanceManagement />} />
    </Routes>

  );
};

export default AllRoutes;