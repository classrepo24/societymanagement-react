import { Sidebar } from "../../layouts/Sidebar";
import { Header } from "../../layouts/Header";
import { DashboardCard } from "./DashboardCard";
import { useState } from "react";
import { MonthlyCollection } from "./MonthlyCollection";
import { ComplaintTrends } from "./ComplaintTrends";
import {VisitorStatistics} from "./VisitorStatistics"
import { QuickActions } from "./QuickActions";
import {StaffAttendanceOverview} from './StaffAttendanceOverview'
import {Complaints } from './Complaints'


const today = new Date().toISOString().split("T")[0];
export const Dashboard = () => {

  const[isSidebarOpen,setIsSidebarOpen] = useState(false)
  return (
    
    <>

<Sidebar isSidebarOpen={isSidebarOpen} />



<div className={isSidebarOpen ? "ml-64 bg-blue-50 min-h-screen" : "ml-24 bg-blue-50 min-h-screen"}>


<Header setIsSidebarOpen={setIsSidebarOpen} />


<div className="px-6 pt-6 flex justify-between items-start">
  <div>
    <h1 className="text-3xl font-bold m-0">
      Dashboard
    </h1>

    <p className="text-gray-500 mt-1">
      Welcome back, Admin! Here's what's happening in your society.
    </p>
  </div>

  <input
    type="date"
    defaultValue={today}
    className="border px-3 py-2 rounded-lg"
  />
</div>



<div className="flex justify-between gap-4 mt-6 px-6">

  <DashboardCard
    icon={
      <div className="w-10 h-10 flex items-center justify-center bg-purple-400 text-white rounded-full p-6">
        <i className="bi bi-people-fill"></i>
      </div>
    }
    title="Total Residents"
    count={0}
    Percentage="3.08%" 
  />
  

  <DashboardCard
    icon={
      <div className="w-10 h-10 flex items-center justify-center bg-blue-400 text-white rounded-full p-6">
        <i className="bi bi-building"></i>
      </div>
    }
    title="Total Flats"
    count={0}
    Percentage="3.08%"
  />

  <DashboardCard
    icon={
      <div className="w-10 h-10 flex items-center justify-center bg-orange-400 text-white rounded-full p-6">
        <i className="bi bi-hourglass-split"></i>
      </div>
    }
    title="Pending Maintenance"
    count={0}
    Percentage="3.08%"
  />

  <DashboardCard
    icon={
      <div className="w-10 h-10 flex items-center justify-center bg-red-400 text-white rounded-full p-6">
        <i className="bi bi-chat-dots-fill"></i>
      </div>
    }
    title="Open Complaints"
    count={0}
    Percentage="3.08%"
  />

  <DashboardCard
    icon={
      <div className="w-10 h-10 flex items-center justify-center bg-green-400 text-white rounded-full p-6">
        <i className="bi bi-people-fill"></i>
      </div>
    }
    title="Visitors Today"
    count={0}
    Percentage="3.08%"
  />

  <DashboardCard
    icon={
      <div className="w-10 h-10 flex items-center justify-center bg-blue-700 text-white rounded-full p-6">
        <i className="bi bi-person-add"></i>
      </div>
    }
    title="Staff Attendance"
    count={0}
    Percentage="3.08%"
  />

</div>


<div className="flex gap-6 px-6 mt-6">
          <div className="flex-[2]">
            <MonthlyCollection />
          </div>

          <div className="flex-[2]">
            <ComplaintTrends />
          </div>

          <div className="flex-1">
            <QuickActions />
         </div>
</div>



        <div className="flex gap-6 px-6 mt-6 mb-8">
          <div className="flex-[2]">
            <VisitorStatistics />
          </div>

          <div className="flex-[2]">
            <StaffAttendanceOverview />
          </div>

          <div className="flex-1">
            <Complaints />
          </div>
        </div>
      </div>

     
    </>
  );
};