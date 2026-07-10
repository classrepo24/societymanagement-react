import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import InsideVisitorsTable from "./InsideVisitorsTable";
import VisitorsTable from "./VisitorsTable";
import VisitorCharts from "./VisitorCharts";
import VisitorsHeaderSection from "./VisitorsHeaderSection";
import DeleteVisitorModal from "../../component/DeleteModal";
const Visitors = () => {
  const { visitors,
    setvisitors,
    getStatusStyle,
  } = useApp();

  const [activeTab, setActiveTab] = useState("All visitors");
  const [showAllvisitors, setShowAllvisitors] = useState(false);

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

  const totalvisitors = visitors.length;



  //card growth
  const yesterdayvisitors = visitors.filter(v => {
    const d = new Date(v.date);
    const y = new Date();
    y.setDate(y.getDate() - 1);

    return d.toDateString() === y.toDateString();
  }).length;


  // yesterday vs today
  const todayGrowth =
    yesterdayvisitors === 0
      ? 0
      : Math.round(
        ((visitorsToday - yesterdayvisitors) / yesterdayvisitors) * 100
      );


  // previous week
  const previousWeek = visitors.filter(v => {
    const d = new Date(v.date);

    const start = new Date();
    start.setDate(start.getDate() - 14);

    const end = new Date();
    end.setDate(end.getDate() - 7);

    return d >= start && d < end;

  }).length;


  const weekGrowth =
    previousWeek === 0
      ? 0
      : Math.round(
        ((thisWeek - previousWeek) / previousWeek) * 100
      );



  // previous month
  const previousMonth = visitors.filter(v => {
    const d = new Date(v.date);

    const start = new Date();
    start.setDate(start.getDate() - 60);

    const end = new Date();
    end.setDate(end.getDate() - 30);

    return d >= start && d < end;

  }).length;


  const monthGrowth =
    previousMonth === 0
      ? 0
      : Math.round(
        ((thisMonth - previousMonth) / previousMonth) * 100
      );


  const handleDeleteVisitor = () => {
    console.log(visitorToDelete);

    setvisitors((prev) =>
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
              totalvisitors={totalvisitors}
              visitors={visitors}
            />

            {/* CURRENTLY INSIDE visitors */}

          </div>
          <InsideVisitorsTable
            showAllvisitors={showAllvisitors}
            setShowAllvisitors={setShowAllvisitors}
            insidevisitors={visitors.filter(v => v.status === "inside")}

            setvisitors={setvisitors}
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




