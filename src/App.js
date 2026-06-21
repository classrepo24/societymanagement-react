import { useState } from "react";
import { Sidebar } from "./layouts/Sidebar";
import { Header } from "./layouts/Header";
import Allroutes from "./routes/Allroutes";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Right Side */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Allroutes />
        </main>

      </div>
    </div>
  );
}

export default App;