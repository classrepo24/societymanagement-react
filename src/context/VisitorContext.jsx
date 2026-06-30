import { createContext, useContext, useState } from "react";
import visitorsData from "../data/visitors.json";

const VisitorContext = createContext();

export const VisitorProvider = ({ children }) => {
  const [visitors, setVisitors] = useState(visitorsData);


  const getStatusStyle = (status) => {
  switch (status) {
    case "inside":
      return "bg-green-100 text-green-700";
    case "exited":
      return "bg-gray-200 text-gray-700";
    case "preRegistered":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
const itemsPerPage = 5;


  

  return (
    <VisitorContext.Provider value={{ 
        visitors,
     setVisitors,
     getStatusStyle,
     itemsPerPage,
     
      

         
         }}>
      {children}
    </VisitorContext.Provider>
  );
};

export const useVisitors = () => useContext(VisitorContext);