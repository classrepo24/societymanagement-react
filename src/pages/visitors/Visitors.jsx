import React, { useState } from "react";
import InsideVisitorsTable from "./component/InsideVisitorsTable";
import VisitorsTable from "./component/VisitorsTable";
import VisitorCharts from "./component/VisitorCharts";

const Visitors = () => {
const [activeTab, setActiveTab] = useState("All Visitors");
const [currentPage, setCurrentPage] = useState(1);
const [showAllVisitors, setShowAllVisitors] = useState(false);

const itemsPerPage = 5;
  const visitors = [
  {
    
    name: "Rahul Sharma",
    phone: "9876543210",
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
    whom: "Mr. Jain",
    flat: "C-105",
    purpose: "Electrician",
    inTime: "08:30 AM",
    outTime: "11:45 AM",
    status: "exited",
  },
  {
    name: "Shweta Patil",
    phone: "9876541204",
    whom: "Mrs. Mehta",
    flat: "D-302",
    purpose: "Friend Visit",
    inTime: "01:20 PM",
    outTime: "-",
    status: "inside",
  },
  {
    name: "Mohit Sharma",
    phone: "9876541205",
    whom: "Society Office",
    flat: "Office",
    purpose: "Vendor Meeting",
    inTime: "11:00 AM",
    outTime: "12:15 PM",
    status: "exited",
  },
  {
    name: "Kiran Nair",
    phone: "9876541206",
    whom: "Mr. Iyer",
    flat: "A-405",
    purpose: "Guest",
    inTime: "03:10 PM",
    outTime: "-",
    status: "inside",
  },
  {
    name: "Sanjay Mishra",
    phone: "9876541207",
    whom: "Mr. Singh",
    flat: "B-307",
    purpose: "Courier",
    inTime: "12:40 PM",
    outTime: "12:55 PM",
    status: "exited",
  },
  {
    name: "Nikita Joshi",
    phone: "9876541208",
    whom: "Mrs. Kapoor",
    flat: "C-208",
    purpose: "Guest",
    inTime: "05:25 PM",
    outTime: "-",
    status: "inside",
  },
  {
    name: "Akash Deshmukh",
    phone: "9876541209",
    whom: "Mr. Patil",
    flat: "D-401",
    purpose: "Plumber",
    inTime: "09:50 AM",
    outTime: "11:20 AM",
    status: "exited",
  },
  {
    name: "Ritu Arora",
    phone: "9876541210",
    whom: "Mrs. Chawla",
    flat: "A-501",
    purpose: "Friend Visit",
    inTime: "06:10 PM",
    outTime: "-",
    status: "inside",
  },
  {
    name: "Vivek Tiwari",
    phone: "9876541211",
    whom: "Mr. Rao",
    flat: "B-110",
    purpose: "Delivery",
    inTime: "10:15 AM",
    outTime: "10:35 AM",
    status: "exited",
  },
  {
    name: "Ananya Sen",
    phone: "9876541212",
    whom: "Mrs. Dutta",
    flat: "C-309",
    purpose: "Guest",
    inTime: "04:00 PM",
    outTime: "-",
    status: "inside",
  },
  {
    name: "Harsh Vora",
    phone: "9876541213",
    whom: "Mr. Shah",
    flat: "D-104",
    purpose: "Maintenance",
    inTime: "08:45 AM",
    outTime: "10:50 AM",
    status: "exited",
  },
  {
    name: "Komal Bhatia",
    phone: "9876541214",
    whom: "Mrs. Malhotra",
    flat: "A-303",
    purpose: "Guest",
    inTime: "02:15 PM",
    outTime: "-",
    status: "inside",
  },
  {
    name: "Yash Thakur",
    phone: "9876541215",
    whom: "Mr. Oberoi",
    flat: "B-502",
    purpose: "Business Meeting",
    inTime: "01:00 PM",
    outTime: "02:30 PM",
    status: "exited",
  },
  {
    name: "Preeti Sinha",
    phone: "9876541216",
    whom: "Mrs. Khanna",
    flat: "C-402",
    purpose: "Guest",
    inTime: "07:00 PM",
    outTime: "-",
    status: "inside",
  },
  {
    name: "Rahul Chavan",
    phone: "9876541217",
    whom: "Mr. Kulkarni",
    flat: "D-205",
    purpose: "Courier",
    inTime: "11:30 AM",
    outTime: "11:45 AM",
    status: "exited",
  },
  {
    name: "Divya Menon",
    phone: "9876541218",
    whom: "Mrs. Nair",
    flat: "A-204",
    purpose: "Guest",
    inTime: "03:45 PM",
    outTime: "-",
    status: "inside",
  },
  {
    name: "Ajay Parmar",
    phone: "9876541219",
    whom: "Mr. Trivedi",
    flat: "B-406",
    purpose: "Carpenter",
    inTime: "09:20 AM",
    outTime: "12:10 PM",
    status: "exited",
  },
  {
    name: "Sakshi Gupta",
    phone: "9876541220",
    whom: "Mrs. Sharma",
    flat: "C-501",
    purpose: "Friend Visit",
    inTime: "06:30 PM",
    outTime: "-",
    status: "inside",
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
  return (
    <div className=" bg-gray-50 min-h-screen">

      {/* HEADER */}

      {/* <VisitorStatsCards/> */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p>Dashboard / <span className="font-bold">Visitors</span> </p>
          <h1 className="text-2xl font-semibold mt-2">Visitor Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Track and manage all visitors in the society.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-lg text-sm">
            Pre-Register Visitor
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            + Add New Visitor
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-xl shadow flex items-start gap-4 h-32">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
            👥
          </div>
          <div>
            <p className="text-gray-500 text-sm">Visitors Today</p>
            <h2 className="text-2xl font-bold">23</h2>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-xl shadow flex items-start gap-4 h-32">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">
            📅
          </div>
          <div>
            <p className="text-gray-500 text-sm">This Week</p>
            <h2 className="text-2xl font-bold">128</h2>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-xl shadow flex items-start gap-4 h-32">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl">
            📊
          </div>
          <div>
            <p className="text-gray-500 text-sm">This Month</p>
            <h2 className="text-2xl font-bold">542</h2>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-xl shadow flex items-start gap-4 h-32">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl">
            🕤
          </div>
          <div>
            <p className="text-gray-500 text-sm">Currently Inside</p>
            <h2 className="text-2xl font-bold">7</h2>
          </div>
        </div>
      </div>

      {/* GRID: TABLE + CHART SPACE */}
      <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">

        <VisitorsTable
            ctiveTab={activeTab}
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
        <VisitorCharts/>
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




  