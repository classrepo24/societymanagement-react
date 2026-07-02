import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useVisitors } from "../../context/VisitorContext";
import InsideVisitorsTable from "./InsideVisitorsTable";
import VisitorsTable from "./VisitorsTable";
import VisitorCharts from "./VisitorCharts";
import VisitorsHeaderSection from "./VisitorsHeaderSection";
import DeleteVisitorModal from "./DeleteVisitorModal";
const Visitors = () => {
  const { visitors,
    setVisitors,
    getStatusStyle,
  } = useVisitors();

  const [activeTab, setActiveTab] = useState("All Visitors");
  const [showAllVisitors, setShowAllVisitors] = useState(false);

  const [insideSortField, setInsideSortField] = useState(null);
  const [insideSortOrder, setInsideSortOrder] = useState("asc");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [visitorToDelete, setVisitorToDelete] = useState(null);

  




  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const last7Days = new Date();
  last7Days.setDate(today.getDate() - 7);

  const last30Days = new Date();
  last30Days.setDate(today.getDate() - 30);


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

  //for quick links
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
                getStatusStyle={getStatusStyle}
                setShowDeleteModal={setShowDeleteModal}
                setVisitorToDelete={setVisitorToDelete}
              />

            </div>

            

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




