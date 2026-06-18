import { useState } from "react";
import { Sidebar } from "./layouts/Sidebar";
import { Header } from "./layouts/Header";
import AllRoutes from "./routes/AllRoutes";

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

        <AllRoutes />
      </div>
    </div>
  );
}

export default App;