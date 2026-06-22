import React, { useState } from "react";
import InsideVisitorsTable from "./component/InsideVisitorsTable";
import VisitorsTable from "./component/VisitorsTable";
import VisitorCharts from "./component/VisitorCharts";
import VisitorsHeaderSection from "./component/VisitorsHeaderSection";
const Visitors = () => {
const [activeTab, setActiveTab] = useState("All Visitors");
const [currentPage, setCurrentPage] = useState(1);
const [showAllVisitors, setShowAllVisitors] = useState(false);

const itemsPerPage = 5;
  const visitors = [
  {
    name: "Rahul Sharma",
    phone: "9876543210",
    date: "2026-06-22",
    whom: "Mr. Verma",
    flat: "A-101",
    purpose: "Delivery",
    inTime: "10:30 AM",
    outTime: "11:00 AM",
    status: "inside",
  },
  {
    name: "Amit Patil",
    phone: "9123456780",
    date: "2026-06-21",
    whom: "Society Office",
    flat: "B-205",
    purpose: "Meeting",
    inTime: "12:00 PM",
    outTime: "1:00 PM",
    status: "exited",
  },
  {
    name: "John Doe",
    phone: "9998887776",
    date: "2026-06-21",
    whom: "Mrs. Kapoor",
    flat: "C-012",
    purpose: "Guest",
    inTime: "2:00 PM",
    outTime: "-",
    status: "inside",
  },
  {
    name: "Priya Singh",
    phone: "9812345678",
    date: "2026-06-20",
    whom: "Mr. Sharma",
    flat: "A-304",
    purpose: "Friend Visit",
    inTime: "9:45 AM",
    outTime: "-",
    status: "inside",
  },
  {
    name: "Vikas Yadav",
    phone: "9871234567",
    date: "2026-06-20",
    whom: "Mrs. Joshi",
    flat: "B-108",
    purpose: "Courier",
    inTime: "11:15 AM",
    outTime: "11:30 AM",
    status: "exited",
  },
  {
    name: "Sneha Kulkarni",
    phone: "9765432101",
    date: "2026-06-19",
    whom: "Mr. Mehta",
    flat: "C-210",
    purpose: "Guest",
    inTime: "3:10 PM",
    outTime: "-",
    status: "inside",
  },
  {
    name: "Rohit Gupta",
    phone: "9988776655",
    date: "2026-06-19",
    whom: "Society Office",
    flat: "Office",
    purpose: "Maintenance",
    inTime: "8:30 AM",
    outTime: "10:00 AM",
    status: "exited",
  },
  {
    name: "Anjali Nair",
    phone: "9876501234",
    date: "2026-06-18",
    whom: "Mrs. Iyer",
    flat: "D-101",
    purpose: "Guest",
    inTime: "4:00 PM",
    outTime: "-",
    status: "inside",
  },
  {
    name: "Karan Malhotra",
    phone: "9874561230",
    date: "2026-06-18",
    whom: "Mr. Arora",
    flat: "A-502",
    purpose: "Business Meeting",
    inTime: "1:20 PM",
    outTime: "2:45 PM",
    status: "exited",
  },
  {
    name: "Neha Jain",
    phone: "9865321470",
    date: "2026-06-17",
    whom: "Mrs. Gupta",
    flat: "B-404",
    purpose: "Friend Visit",
    inTime: "5:15 PM",
    outTime: "-",
    status: "inside",
  },

  {
    name: "Suresh Pawar",
    phone: "9854123698",
    date: "2026-06-17",
    whom: "Mr. Patil",
    flat: "C-310",
    purpose: "Electrician",
    inTime: "9:00 AM",
    outTime: "12:30 PM",
    status: "exited",
  },
  {
    name: "Meera Desai",
    phone: "9811223344",
    date: "2026-06-16",
    whom: "Mrs. Shah",
    flat: "D-203",
    purpose: "Guest",
    inTime: "6:00 PM",
    outTime: "-",
    status: "inside",
  },
  {
    name: "Arjun Reddy",
    phone: "9900112233",
    date: "2026-06-16",
    whom: "Mr. Rao",
    flat: "A-202",
    purpose: "Courier",
    inTime: "10:10 AM",
    outTime: "10:25 AM",
    status: "exited",
  },
  {
    name: "Pooja Verma",
    phone: "9873216540",
    date: "2026-06-15",
    whom: "Mrs. Khanna",
    flat: "B-302",
    purpose: "Guest",
    inTime: "7:00 PM",
    outTime: "-",
    status: "inside",
  },
  {
    name: "Deepak Mishra",
    phone: "9988001122",
    date: "2026-06-15",
    whom: "Mr. Tiwari",
    flat: "C-111",
    purpose: "Plumber",
    inTime: "11:45 AM",
    outTime: "1:15 PM",
    status: "exited",
  },
  {
  name: "Pooja Verma",
  phone: "9873216540",
  date: "2026-06-15",
  whom: "Mrs. Khanna",
  flat: "B-302",
  purpose: "Guest",
  inTime: "7:00 PM",
  outTime: "-",
  status: "inside",
},
{
  name: "Deepak Mishra",
  phone: "9988001122",
  date: "2026-06-15",
  whom: "Mr. Tiwari",
  flat: "C-111",
  purpose: "Plumber",
  inTime: "11:45 AM",
  outTime: "1:15 PM",
  status: "exited",
},
{
  name: "Ritika Sharma",
  phone: "9898989898",
  date: "2026-06-16",
  whom: "Mrs. Batra",
  flat: "D-305",
  purpose: "Guest",
  inTime: "2:40 PM",
  outTime: "-",
  status: "inside",
},
{
  name: "Manoj Kumar",
  phone: "9785612340",
  date: "2026-06-16",
  whom: "Mr. Kapoor",
  flat: "A-401",
  purpose: "Delivery",
  inTime: "3:30 PM",
  outTime: "3:50 PM",
  status: "exited",
},
{
  name: "Kavita Joshi",
  phone: "9822334455",
  date: "2026-06-17",
  whom: "Mrs. Chawla",
  flat: "B-505",
  purpose: "Friend Visit",
  inTime: "5:45 PM",
  outTime: "-",
  status: "inside",
},
{
  name: "Nitin Agarwal",
  phone: "9877412589",
  date: "2026-06-17",
  whom: "Society Office",
  flat: "Office",
  purpose: "Vendor Meeting",
  inTime: "9:20 AM",
  outTime: "10:50 AM",
  status: "exited",
},
{
  name: "Farhan Khan",
  phone: "9818181818",
  date: "2026-06-18",
  whom: "Mr. Siddiqui",
  flat: "C-407",
  purpose: "Guest",
  inTime: "8:10 PM",
  outTime: "-",
  status: "inside",
},
{
  name: "Aditya Kulkarni",
  phone: "9876541201",
  date: "2026-06-18",
  whom: "Mr. Shah",
  flat: "A-102",
  purpose: "Guest",
  inTime: "09:15 AM",
  outTime: "-",
  status: "inside",
},
{
  name: "Pankaj Gupta",
  phone: "9876541202",
  date: "2026-06-19",
  whom: "Mrs. Verma",
  flat: "B-203",
  purpose: "Delivery",
  inTime: "10:05 AM",
  outTime: "10:25 AM",
  status: "exited",
},
{
  name: "Rakesh Yadav",
  phone: "9876541203",
  date: "2026-06-19",
  whom: "Mr. Jain",
  flat: "C-105",
  purpose: "Electrician",
  inTime: "08:30 AM",
  outTime: "11:45 AM",
  status: "exited",
},
];

  const getStatusStyle = (status) => {
    switch (status) {
      case "inside":
        return "bg-green-100 text-green-700";
      case "exited":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };
    const filteredVisitors = visitors.filter((visitor) => {
  if (activeTab === "All Visitors") return true;
  if (activeTab === "Inside Society") return visitor.status === "inside";
  if (activeTab === "Exited") return visitor.status === "exited";
  if (activeTab === "Pre Registered") return visitor.status === "preRegistered"; // future use
  return true;
});

const today = new Date();
const todayStr = today.toISOString().split("T")[0];

const last7Days = new Date();
last7Days.setDate(today.getDate() - 7);

const last30Days = new Date();
last30Days.setDate(today.getDate() - 30);

const totalPages = Math.ceil(filteredVisitors.length / itemsPerPage);

const paginatedVisitors = filteredVisitors.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
const maxButtons = 5;

const startPage =
  Math.floor((currentPage - 1) / maxButtons) * maxButtons + 1;

const endPage = Math.min(
  startPage + maxButtons - 1,
  totalPages
);

const insideVisitors = visitors.filter(
  (visitor) => visitor.status === "inside"
);

      const visitorsToday = visitors.filter(v => v.date === todayStr).length;

       const thisWeek = visitors.filter(v => new Date(v.date) >= last7Days).length;

       const thisMonth = visitors.filter(v => new Date(v.date) >= last30Days).length;
      const currentlyInside = visitors.filter(v => v.status === "inside").length;

       const totalVisitors = visitors.length;

const todayGrowth = visitorsToday; // temporary
const weekGrowth = thisWeek;
const monthGrowth = thisMonth;

return (
    <div className=" bg-gray-50 min-h-screen">

      {/* HEADER */}

       <VisitorsHeaderSection
  visitorsToday={visitorsToday}
  thisWeek={thisWeek}
  thisMonth={thisMonth}
  currentlyInside={currentlyInside}
  todayGrowth={todayGrowth}
  weekGrowth={weekGrowth}
  monthGrowth={monthGrowth}
/> 

      {/* GRID: TABLE + CHART SPACE */}
      <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">

        <VisitorsTable
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            filteredVisitors={filteredVisitors}
             paginatedVisitors={paginatedVisitors}
            totalPages={totalPages}
            startPage={startPage}
            endPage={endPage}
            itemsPerPage={itemsPerPage}
            getStatusStyle={getStatusStyle}
        />
        </div>
        <VisitorCharts 
         totalVisitors={totalVisitors}/>

      {/* CURRENTLY INSIDE VISITORS */}

      </div>
      <InsideVisitorsTable 
      showAllVisitors={showAllVisitors}
      setShowAllVisitors={setShowAllVisitors}
      insideVisitors={insideVisitors}
      />
    </div>
  );
};

export default Visitors;




  