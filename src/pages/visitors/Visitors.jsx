import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useVisitors } from "../../context/VisitorContext";
import InsideVisitorsTable from "./InsideVisitorsTable";
import VisitorsTable from "./VisitorsTable";
import VisitorCharts from "./VisitorCharts";
import VisitorsHeaderSection from "./VisitorsHeaderSection";
import ViewVisitorModal from "./ViewVisitorModal";
import DeleteVisitorModal from "./DeleteVisitorModal";
const Visitors = () => {
  const { visitors,
    setVisitors,
    itemsPerPage,
    getStatusStyle,
  } = useVisitors();


  const [activeTab, setActiveTab] = useState("All Visitors");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAllVisitors, setShowAllVisitors] = useState(false);



  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [insideSortField, setInsideSortField] = useState(null);
  const [insideSortOrder, setInsideSortOrder] = useState("asc");


  const [showSortIcons, setShowSortIcons] = useState({});
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [showVisitorModal, setShowVisitorModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [visitorToDelete, setVisitorToDelete] = useState(null);





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

  const location = useLocation();
  const isDashboard =
    location.pathname === "/visitors";

  const isOverlayPage =
    location.pathname === "/visitors/visitoradd" ||
    location.pathname === "/visitors/visitor-preregister";

  const isReplacePage =
    location.pathname === "/visitors/visitorlog";

  return (
    <div className=" bg-gray-50 min-h-screen">

      {/* HEADER */}
      {(isDashboard || isOverlayPage) && (

        <>

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

            sortField={insideSortField}
            sortOrder={insideSortOrder}
            setSortField={setInsideSortField}
            setSortOrder={setInsideSortOrder}
          />
        </>
      )}
      {isReplacePage && <Outlet />}
      {isOverlayPage && <Outlet />}


    </div>
  );
};

export default Visitors;




