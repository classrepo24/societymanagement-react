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
import { MyRequest } from "../pages/maintenanceManagement/quickLinks/myRequest/MyRequest";
import { MaintenanceHistory } from "../pages/maintenanceManagement/quickLinks/maintenanceHistory/MaintenanceHistory";
import { HelpAndSupport } from "../pages/maintenanceManagement/quickLinks/helpAndSupports/HelpAndSupport";
import { FinanceOverview } from "../pages/finance/FinanceOverview";
import { AddIncomeExpense } from "../pages/finance/AddIncomeExpense";
import { GenerateInvoice } from "../pages/finance/GenerateInvoice";
import { TopPayersViewAll } from "../pages/finance/financeComponents/topPayers/TopPayersViewAll";
import { PaymentReminder } from "../pages/finance/PaymentReminder";
import { OutstandingAmount } from "../pages/finance/OutstandingAmounts";
import { OutstandingDetails } from "../pages/finance/OutstandingDetails";

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
        element={<HelpAndSupport />}
      />
      <Route
        path="/finance"
        element={<FinanceOverview />}
      />
      <Route
        path="/finance/add-income&expense"
        element={<AddIncomeExpense />}
      />
      <Route
        path="/finance/generate-invoice"
        element={<GenerateInvoice />}
      />
      <Route
        path="/finance/top_payers/view_all"
        element={<TopPayersViewAll />}
      />
      <Route path="/finance/payment_reminder"
        element={<PaymentReminder />}
      />
      <Route
        path="/finance/outstanding_amount/view_all"
        element={<OutstandingAmount />}
      />
      <Route
        path="/finance/outstanding_details/:invoice"
        element={<OutstandingDetails />}
      />

    </Routes>

  );
};

export default AllRoutes;