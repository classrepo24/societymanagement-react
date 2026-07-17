import { createContext, useContext, useEffect, useState } from "react";
import visitorsData from "../data/visitors.json";
import staffsData from "../data/staff.json";
import noticesData from "../data/notices.json";

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

  const getStatusStyle = (status) => {
    switch (status) {
      //visitor status
      case "inside":
        return "bg-green-100 text-green-700";
      case "exited":
        return "bg-gray-200 text-gray-700";
      case "preRegistered":
        return "bg-blue-100 text-blue-700";

      //staff document status
      case "Verified":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Expired":
        return "bg-red-100 text-red-700";

      //staff document category
      case "Identity Proof":
        return "bg-blue-100 text-blue-700";

      case "License":
        return "bg-violet-100 text-violet-700";

      case "Verification":
        return "bg-green-100 text-green-700";

      case "Address Proof":
        return "bg-orange-100 text-orange-700";

      //notices
      case "Published":
        return "bg-green-100 text-green-700";
      case "Scheduled":
        return "bg-yellow-100 text-yellow-700";
      case "Expired":
        return "bg-red-100 text-red-700";


      default:
        return "bg-gray-100 text-gray-700";


    }
  };

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