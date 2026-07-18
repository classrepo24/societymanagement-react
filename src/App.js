import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNoticeStatus } from "./redux/noticeSlice";

import { Sidebar } from "./layouts/Sidebar";
import { Header } from "./layouts/Header";
import AllRoutes from "./routes/Allroutes";

function App() {
  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // Initial check
    dispatch(updateNoticeStatus());

    // Check every 10 seconds
    const interval = setInterval(() => {
      dispatch(updateNoticeStatus());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
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
        <main className="flex-1 overflow-auto min-w-0 p-4">
          <AllRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;