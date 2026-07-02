import { useState } from "react";
import AllRoutes from "./routes/AllRoutes";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import "bootstrap-icons/font/bootstrap-icons.css";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* HEADER */}
        <Header
          setIsSidebarOpen={setIsSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />

        {/* CONTENT */}
        <main className="flex-1 overflow-auto min-w-0  pb-4">
          <AllRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;
