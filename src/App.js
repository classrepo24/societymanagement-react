import { useState } from "react";
import AllRoutes from "./routes/AllRoutes";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import "bootstrap-icons/font/bootstrap-icons.css";
import { RaiseMaintenanceRequest } from "./pages/maintenanceManagement/pages/raiseMaintenanceRequestComponents/RaiseMaintenanceRequest";
import { MyRequest } from "../src/pages/maintenanceManagement/pages/myRequest/MyRequest";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* HEADER */}
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        {/* CONTENT */}
        <main className="flex-1 overflow-auto min-w-0">
          <AllRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;
