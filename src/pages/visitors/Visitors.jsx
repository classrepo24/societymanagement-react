import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useVisitors } from "../../context/VisitorContext";
import InsideVisitorsTable from "./component/InsideVisitorsTable";
import VisitorsTable from "./component/VisitorsTable";
import VisitorCharts from "./component/VisitorCharts";
import VisitorsHeaderSection from "./component/VisitorsHeaderSection";
import AddVisitorModal from "./component/AddVisitorModal";
import PreRegisterVisitorModal from "./component/PreRegisterVisitorModal";
import ViewVisitorModal from "./component/ViewVisitorModal";
import DeleteVisitorModal from "./component/DeleteVisitorModal";
import VisitorLog from "./component/VisitorLog";
import VisitorPurpose from "./component/VisitorPurpose";
const Visitors = () => {
  const { visitors,
     setVisitors,
    itemsPerPage,
    getStatusStyle,
     } = useVisitors();

  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Visitors");
     const [currentPage, setCurrentPage] = useState(1);

  const [showAllVisitors, setShowAllVisitors] = useState(false);
  
  const [showAddVisitorModal, setShowAddVisitorModal] = useState(false);
  const [showPreRegisterVisitorModal, setShowPreRegisterVisitorModal] = useState(false);
  
  const [showVisitorPurpose, setShowVisitorPurpose] = useState(false)


  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showSortIcons, setShowSortIcons] = useState({});
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [showVisitorModal, setShowVisitorModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [visitorToDelete, setVisitorToDelete] = useState(null);


  

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modal = params.get("modal");

    if (modal === "add") {
      setShowAddVisitorModal(true);
    }

    if (modal === "preregister") {
      setShowPreRegisterVisitorModal(true);
    }

    if (modal === "purpose") {
      setShowVisitorPurpose(true);
    }
  }, [location]);
     const filteredVisitors = visitors.filter((visitor) => {
    if (activeTab === "All Visitors") return true;
    if (activeTab === "Inside Society") return visitor.status === "inside";
    if (activeTab === "Exited") return visitor.status === "exited";
    if (activeTab === "Pre Registered") return visitor.status === "preRegistered"; // future use
    return true;
  });

  const sortedVisitors = [...filteredVisitors].sort((a, b) => {
    if (!sortField) return 0;

    const aVal = a[sortField];
    const bVal = b[sortField];

    if (sortOrder === "asc") {
      return aVal > bVal ? 1 : -1;
    }

    return aVal < bVal ? 1 : -1;
  });

  const paginatedVisitors = sortedVisitors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const last7Days = new Date();
  last7Days.setDate(today.getDate() - 7);

  const last30Days = new Date();
  last30Days.setDate(today.getDate() - 30);

  const totalPages = Math.ceil(sortedVisitors.length / itemsPerPage);

  const maxButtons = 5;

  const startPage =
    Math.floor((currentPage - 1) / maxButtons) * maxButtons + 1;

  const endPage = Math.min(
    startPage + maxButtons - 1,
    totalPages
  );


  const visitorsToday = visitors.filter(v => v.date === todayStr).length;

  const thisWeek = visitors.filter(v => new Date(v.date) >= last7Days).length;

  const thisMonth = visitors.filter(v => new Date(v.date) >= last30Days).length;
  const currentlyInside = visitors.filter(v => v.status === "inside").length;

  const totalVisitors = visitors.length;

  const yesterdayVisitors = visitors.filter(v => {
    const d = new Date(v.date);
    const y = new Date();
    y.setDate(y.getDate() - 1);
    return d.toDateString() === y.toDateString();
  }).length;

  const todayGrowth =
    yesterdayVisitors === 0
      ? 100
      : ((visitorsToday - yesterdayVisitors) / yesterdayVisitors) * 100;
  const weekGrowth = thisWeek;
  const monthGrowth = thisMonth;

  const handleDeleteVisitor = () => {
    console.log(visitorToDelete);

    setVisitors((prev) =>
      prev.filter((v) => v !== visitorToDelete)
    );

    setShowDeleteModal(false);
    setVisitorToDelete(null);
  };
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
        setShowAddVisitorModal={setShowAddVisitorModal}
        setShowPreRegisterVisitorModal={setShowPreRegisterVisitorModal}
      />


      {showAddVisitorModal && (
        <AddVisitorModal
          onClose={() => {
            setShowAddVisitorModal(false);
            navigate("/visitors");
          }}
        />
      )}

      {location.pathname === "/visitors/visitorlog" && (
 <VisitorLog
  visitors={visitors}
  
  setSelectedVisitor={setSelectedVisitor}
  setShowVisitorModal={setShowVisitorModal}
   monthGrowth={monthGrowth}

/>
)}

      {showPreRegisterVisitorModal && (
        <PreRegisterVisitorModal
          onClose={() => {
            setShowPreRegisterVisitorModal(false);
            navigate("/visitors");
          }}
        />
      )}

      {showVisitorPurpose && (
        <VisitorPurpose
          onClose={() => {
            setShowVisitorPurpose(false);
            navigate("/visitors");
          }}
        />
      )}

      {/* GRID: TABLE + CHART SPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-1 lg:col-span-2">

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
            sortField={sortField}
            sortOrder={sortOrder}
            setSortField={setSortField}
            setSortOrder={setSortOrder}
            sortedVisitors={sortedVisitors}
            showSortIcons={showSortIcons}
            setShowSortIcons={setShowSortIcons}
            setSelectedVisitor={setSelectedVisitor}
            setShowVisitorModal={setShowVisitorModal}
            setShowDeleteModal={setShowDeleteModal}
            setVisitorToDelete={setVisitorToDelete}
          />
        </div>
        {showVisitorModal && (
          <ViewVisitorModal
            visitor={selectedVisitor}
            onClose={() => {
              setShowVisitorModal(false);
              setSelectedVisitor(null);
            }}
          />
        )}

        <DeleteVisitorModal
          show={showDeleteModal}
          visitor={visitorToDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setVisitorToDelete(null);
          }}
          onDelete={handleDeleteVisitor}
        />
        <VisitorCharts
          totalVisitors={totalVisitors}
          visitors={visitors}
        />

        {/* CURRENTLY INSIDE VISITORS */}

      </div>
      <InsideVisitorsTable
        showAllVisitors={showAllVisitors}
        setShowAllVisitors={setShowAllVisitors}
        insideVisitors={visitors.filter(v => v.status === "inside")}

        setVisitors={setVisitors}
        setSelectedVisitor={setSelectedVisitor}
        setShowVisitorModal={setShowVisitorModal}
      />
    </div>
  );
};

export default Visitors;




