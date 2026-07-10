import { createContext, useContext, useState } from "react";
import visitorsData from "../data/visitors.json";
import staffsData from "../data/staff.json";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [visitors, setvisitors] = useState(visitorsData);
  const [staffs, setStaffs] = useState(staffsData.staff);

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
        getStatusStyle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);