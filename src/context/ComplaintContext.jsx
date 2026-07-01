import { createContext, useContext, useState } from "react";


// Create Complaint Context
const ComplaintContext = createContext();

export const ComplaintProvider = ({ children }) => {


  // Complaint list state
 const [complaints, setComplaints] = useState([
  {
    id: "CMP-2026-155",
    title: "Water leakage in bathroom",
    description: "Water is leaking continuously from the bathroom tap.",
    category: "Plumbing",
    categoryIcon: "bi-droplet-fill",
    categoryColor: "#2563eb",
    raisedBy: "Supriya Sonawale",
    flatNo: "A-101",
    priority: "High",
    status: "Open",
    raisedOn: "21 Jun 2026",
    raisedTime: "09:15 AM",
    updatedOn: "21 Jun 2026",
    updatedTime: "09:15 AM",
  },
  {
    id: "CMP-2026-156",
    title: "Living room light not working",
    description: "Living room light stopped working suddenly.",
    category: "Electrical",
    categoryIcon: "bi-lightning-charge-fill",
    categoryColor: "#f59e0b",
    raisedBy: "Rahul Patil",
    flatNo: "B-203",
    priority: "Medium",
    status: "In Progress",
    raisedOn: "20 Jun 2026",
    raisedTime: "11:30 AM",
    updatedOn: "21 Jun 2026",
    updatedTime: "10:00 AM",
  },
  {
    id: "CMP-2026-157",
    title: "Lift not responding",
    description: "Lift is stuck on the 5th floor and not responding.",
    category: "Lift Issue",
    categoryIcon: "bi-arrow-up-square-fill",
    categoryColor: "#7c3aed",
    raisedBy: "Anita Desai",
    flatNo: "C-012",
    priority: "High",
    status: "Open",
    raisedOn: "22 Jun 2026",
    raisedTime: "08:45 AM",
    updatedOn: "22 Jun 2026",
    updatedTime: "08:45 AM",
  },
  {
  id: "CMP-2026-158",
  title: "Garbage not collected",
  description: "Garbage has not been collected for two days.",
  category: "Housekeeping",
categoryIcon: "bi-brush-fill",
  categoryColor: "#10b981",
  raisedBy: "Sunita Sonawale",
  flatNo: "C-013",
  priority: "High",
  status: "Overdue",
  raisedOn: "20 Jun 2026",
  raisedTime: "07:30 AM",
  updatedOn: "22 Jun 2026",
  updatedTime: "09:40 AM",
},
  {
    id: "CMP-2026-159",
    title: "Unauthorized parking",
    description: "Another vehicle is parked in my allotted parking slot.",
    category: "Parking",
    categoryIcon: "bi-p-square-fill",
    categoryColor: "#ef4444",
    raisedBy: "Ramesh Jadhav",
    flatNo: "A-201",
    priority: "Medium",
    status: "Open",
    raisedOn: "22 Jun 2026",
    raisedTime: "02:10 PM",
    updatedOn: "22 Jun 2026",
    updatedTime: "02:10 PM",
  },
  {
    id: "CMP-2026-160",
    title: "Door hinge repair",
    description: "Main door hinge is loose and needs repair.",
    category: "Carpentry",
    categoryIcon: "bi-hammer",
    categoryColor: "#b45309",
    raisedBy: "Priya Desai",
    flatNo: "B-102",
    priority: "Low",
    status: "In Progress",
    raisedOn: "21 Jun 2026",
    raisedTime: "01:40 PM",
    updatedOn: "22 Jun 2026",
    updatedTime: "08:30 AM",
  },
  {
    id: "CMP-2026-161",
    title: "Main gate lock issue",
    description: "Security gate lock is damaged.",
    category: "Security",
    categoryIcon: "bi-shield-lock-fill",
    categoryColor: "#0891b2",
    raisedBy: "Vikram Mehta",
    flatNo: "D-104",
    priority: "High",
    status: "Open",
    raisedOn: "22 Jun 2026",
    raisedTime: "10:15 AM",
    updatedOn: "22 Jun 2026",
    updatedTime: "10:15 AM",
  },
  {
    id: "CMP-2026-162",
    title: "Swimming pool cleaning issue",
    description: "Swimming pool water is not properly cleaned.",
    category: "Amenities",
    categoryIcon: "bi-building-fill",
    categoryColor: "#db2777",
    raisedBy: "Neha Kulkarni",
    flatNo: "A-303",
    priority: "Medium",
    status: "Resolved",
    raisedOn: "19 Jun 2026",
    raisedTime: "06:20 PM",
    updatedOn: "20 Jun 2026",
    updatedTime: "11:15 AM",
  },
  {
    id: "CMP-2026-163",
    title: "Mosquito problem in garden",
    description: "Too many mosquitoes near the garden area.",
    category: "Pest Control",
    categoryIcon: "bi-bug-fill",
    categoryColor: "#65a30d",
    raisedBy: "Amit Shah",
    flatNo: "B-110",
    priority: "Medium",
    status: "In Progress",
    raisedOn: "21 Jun 2026",
    raisedTime: "09:00 AM",
    updatedOn: "22 Jun 2026",
    updatedTime: "12:20 PM",
  },
  {
    id: "CMP-2026-164",
    title: "Other maintenance request",
    description: "General maintenance issue not covered in any category.",
    category: "Others",
    categoryIcon: "bi-three-dots",
    categoryColor: "#64748b",
    raisedBy: "Kiran Joshi",
    flatNo: "D-202",
    priority: "Low",
    status: "Open",
    raisedOn: "22 Jun 2026",
    raisedTime: "08:30 PM",
    updatedOn: "22 Jun 2026",
    updatedTime: "08:30 PM",
  },
]);


// Complaint category
const [categories, setCategories] = useState([
  {
    id: 1,
    name: "Plumbing",
    description:
      "Water leakage, pipe leakage, tap issues and plumbing related complaints.",
    icon: "bi-droplet-fill",
    color: "#2563eb",
    status: "Active",
  },
  {
    id: 2,
    name: "Electrical",
    description:
      "Light, fan, switch, wiring and power related issues.",
    icon: "bi-lightning-charge-fill",
    color: "#f59e0b",
    status: "Active",
  },
  {
    id: 3,
    name: "Lift Issue",
    description:
      "Lift breakdown, maintenance and repair related complaints.",
    icon: "bi-arrow-up-square-fill",
    color: "#7c3aed",
    status: "Active",
  },
  {
    id: 4,
    name: "Housekeeping",
    description:
      "Cleaning, garbage collection and hygiene related issues.",
    icon: "bi bi-brush",
    color: "#10b981",
    status: "Active",
  },
  {
    id: 5,
    name: "Parking",
    description:
      "Parking allocation, unauthorized parking and vehicle related issues.",
    icon: "bi-p-square-fill",
    color: "#ef4444",
    status: "Active",
  },
  {
    id: 6,
    name: "Carpentry",
    description:
      "Door, window, furniture and woodwork related complaints.",
    icon: "bi-hammer",
    color: "#b45309",
    status: "Active",
  },
  {
    id: 7,
    name: "Security",
    description:
      "Gate access, CCTV and security related concerns.",
    icon: "bi-shield-lock-fill",
    color: "#0891b2",
    status: "Active",
  },
  {
    id: 8,
    name: "Amenities",
    description:
      "Clubhouse, gym, swimming pool and common amenities issues.",
    icon: "bi-building-fill",
    color: "#db2777",
    status: "Active",
  },
  {
    id: 9,
    name: "Pest Control",
    description:
      "Mosquitoes, insects and pest control related complaints.",
    icon: "bi-bug-fill",
    color: "#65a30d",
    status: "Active",
  },
  {
    id: 10,
    name: "Others",
    description:
      "Miscellaneous complaints not covered under other categories.",
    icon: "bi-three-dots",
    color: "#64748b",
    status: "Active",
  },
]);

  return (
    <ComplaintContext.Provider
     value={{
  complaints,
  setComplaints,
  categories,
  setCategories
}}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

// Custom hook to access complaint data anywhere in the app
export const useComplaint = () => useContext(ComplaintContext);