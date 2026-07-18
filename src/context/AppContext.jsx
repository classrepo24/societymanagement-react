import { createContext, useContext, useEffect, useState } from "react";
import visitorsData from "../data/visitors.json";
import staffsData from "../data/staff.json";
import noticesData from "../data/notices.json";
import { getStatusStyle } from "../utils/statusStyle";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  //visitors
  const [visitors, setvisitors] = useState(visitorsData);

  //staff
  const [staffs, setStaffs] = useState(() => {
    const localData = localStorage.getItem("staff");

    if (localData) {
      return JSON.parse(localData);
    }

    localStorage.setItem("staff", JSON.stringify(staffsData.staff));
    return staffsData.staff;
  });

  useEffect(() => {
    localStorage.setItem("staff", JSON.stringify(staffs));
  }, [staffs]);

  //notices
  const [notices, setNotices] = useState(() => {
    const localData = localStorage.getItem("notices");

    if (localData) {
      return JSON.parse(localData);
    }

    localStorage.setItem("notices", JSON.stringify(noticesData));
    return noticesData;
  });

  useEffect(() => {
    localStorage.setItem("notices", JSON.stringify(notices));
  }, [notices]);

  // Notice Status Auto Update
  useEffect(() => {

    const interval = setInterval(() => {

      setNotices((prevNotices) =>
        prevNotices.map((notice) => {

          const now = new Date();

          // Scheduled time complete -> Published
          if (
            notice.status === "Scheduled" &&
            notice.scheduledAt &&
            new Date(notice.scheduledAt) <= now
          ) {
            return {
              ...notice,
              status: "Published",

              publishDate: now.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),

              publishTime: now.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            };
          }

          // Expiry time complete -> Expired
          if (
            notice.status === "Published" &&
            notice.expiryAt &&
            new Date(notice.expiryAt) <= now
          ) {
            return {
              ...notice,
              status: "Expired",

              expiredDate: now.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),

              expiredTime: now.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            };
          }


          return notice;

        })
      );

    }, 10000); // every 10 sec check


    return () => clearInterval(interval);

  }, []);

  
  return (
    <AppContext.Provider
      value={{
        visitors,
        setvisitors,
        staffs,
        setStaffs,
        notices,
        setNotices,
        getStatusStyle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);