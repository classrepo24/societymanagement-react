export const getStatusStyle = (status) => {
  switch (status) {
    // Visitor
    case "inside":
      return "bg-green-100 text-green-700";
    case "exited":
      return "bg-gray-200 text-gray-700";
    case "preRegistered":
      return "bg-blue-100 text-blue-700";

      // Staff Status
case "Active":
  return "bg-green-100 text-green-700";

case "Inactive":
  return "bg-red-100 text-red-700";

case "On Leave":
  return "bg-yellow-100 text-yellow-700";

case "Probation":
  return "bg-blue-100 text-blue-700";

case "Suspended":
  return "bg-gray-100 text-gray-700";

    // Staff Document Status
    case "Verified":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Expired":
      return "bg-red-100 text-red-700";

    // Staff Document Category
    case "Identity Proof":
      return "bg-blue-100 text-blue-700";
    case "License":
      return "bg-violet-100 text-violet-700";
    case "Verification":
      return "bg-green-100 text-green-700";
    case "Address Proof":
      return "bg-orange-100 text-orange-700";

      // Attendance
case "Present":
  return "bg-green-100 text-green-700";

case "Absent":
  return "bg-red-100 text-red-700";

case "Late":
  return "bg-yellow-100 text-yellow-700";

case "Half Day":
  return "bg-orange-100 text-orange-700";

case "Leave":
  return "bg-blue-100 text-blue-700";

case "Holiday":
  return "bg-purple-100 text-purple-700";

  // Leave Type
case "Casual Leave":
  return "bg-blue-100 text-blue-700";

case "Sick Leave":
  return "bg-red-100 text-red-700";

case "Earned Leave":
  return "bg-green-100 text-green-700";

// Leave Status
case "Approved":
  return "bg-green-100 text-green-700";

case "Rejected":
  return "bg-red-100 text-red-700";

case "Cancelled":
  return "bg-orange-100 text-orange-700";

case "Pending":
  return "bg-purple-100 text-purple-700";

  // Salary Payroll - Payment Status
case "Paid":
  return "bg-green-100 text-green-700";

case "Pending":
  return "bg-yellow-100 text-yellow-700";

  //activity-log Role
case "Admin":
  return "bg-blue-100 text-blue-700";

case "HR Manager":
  return "bg-purple-100 text-purple-700";

case "Accountant":
  return "bg-orange-100 text-orange-700";

case "Security":
  return "bg-red-100 text-red-700";

// activity-log Action
case "Created":
  return "bg-green-100 text-green-700";

case "Updated":
  return "bg-blue-100 text-blue-700";

case "Deleted":
  return "bg-red-100 text-red-700";

case "Approved":
  return "bg-emerald-100 text-emerald-700";

case "Rejected":
  return "bg-orange-100 text-orange-700";

case "Processed":
  return "bg-purple-100 text-purple-700";

case "Exported":
  return "bg-cyan-100 text-cyan-700";

case "Marked":
  return "bg-yellow-100 text-yellow-700";

case "Applied":
  return "bg-indigo-100 text-indigo-700";

case "Closed":
  return "bg-gray-100 text-gray-700";

    // Notice Status
    case "Published":
      return "bg-green-100 text-green-700";
    case "Scheduled":
      return "bg-yellow-100 text-yellow-700";

    // Notice Category
    case "General":
      return "bg-blue-100 text-blue-700";
    case "Maintenance":
      return "bg-yellow-100 text-yellow-700";
    case "Emergency":
      return "bg-red-100 text-red-700";
    case "Event":
      return "bg-green-100 text-green-700";
    case "Meeting":
      return "bg-purple-100 text-purple-700";
    case "Parking":
      return "bg-sky-100 text-sky-700";

    // Notice Priority
    case "Normal":
      return "bg-green-100 text-green-700";
    case "High":
      return "bg-orange-100 text-orange-700";
    case "Urgent":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};