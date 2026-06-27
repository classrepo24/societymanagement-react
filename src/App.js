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
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-[280px]" : "ml-[90px]"
        }`}
      >
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <RaiseMaintenanceRequest />
        <MyRequest />
        


        <AllRoutes />
      </div>
    </div>
  );
}

export default App;