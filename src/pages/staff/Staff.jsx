import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useTable from "../../hooks/useTable";
import { useApp } from "../../context/AppContext";
import StatsCards from "../../component/StatsCards";
import SortableHeader from "../../component/SortableHeader";
import ActionMenu from "../../component/ActionMenu";
import Pagination from "../../component/Pagination";
import { exportToExcel } from "../../utils/exportToExcel";
import DeleteModal from "../../component/DeleteModal";
import Breadcrumb from "../../component/Breadcrumb";


const Staff = () => {

  const {
    staffs,
    setStaffs,
    monthGrowth,
  } = useApp();

  const navigate = useNavigate();
  const actionEditRef = useRef(null);

  const [openMenu, setOpenMenu] = useState(null);
  //filter
  const [searching, setsearching] = useState("");
  const [appliedSearching, setAppliedSearching] = useState("")
  const [statusFilter, setStatusFilter] = useState("All");
  const [purposeFilter, setPurposeFilter] = useState("All");
  const [appliedStatus, setAppliedStatus] = useState("All");
  const [appliedPurpose, setAppliedPurpose] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [appliedRole, setAppliedRole] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [editingStaffId, setEditingStaffId] = useState(null);


  //  filter
  const filteredstaffs = staffs.filter((staff) => {
    const statusMatch =
      appliedStatus === "All" || staff.status === appliedStatus;

    const departmentMatch =
      appliedPurpose === "All" || staff.department === appliedPurpose;

    const roleMatch =
      appliedRole === "All" || staff.role === appliedRole;


    const searchMatch =
      appliedSearching.trim() === "" ||
      staff.name.toLowerCase().includes(appliedSearching.toLowerCase()) ||
      staff.role.toLowerCase().includes(appliedSearching.toLowerCase()) ||
      staff.department.toLowerCase().includes(appliedSearching.toLowerCase());

    return statusMatch && departmentMatch && roleMatch && searchMatch;
  });

  const itemsPerPage = 8;
  const {
    currentPage,
    setCurrentPage,
    sortField,
    sortOrder,
    sortedData: sortedstaffs,
    paginatedData: paginatedstaffs,
    totalPages,
    handleSort,
  } = useTable(filteredstaffs, itemsPerPage);



  //total
  const totalStaff = staffs.length;

  const activeStaff = staffs.filter(
    (staff) => staff.status === "Active"
  ).length;

  const onLeaveStaff = staffs.filter(
    (staff) => staff.status === "On Leave"
  ).length;

  const inactiveStaff = staffs.filter(
    (staff) => staff.status === "Inactive"
  ).length;

  const departments = new Set(
    staffs.map((staff) => staff.department)
  ).size;


  const cards = [
    {
      title: "Total Staff",
      value: totalStaff,
      subtitle: "All Staff Members",
      growth: monthGrowth ? `${monthGrowth}%` : "+0%",
      icon: "bi bi-people-fill",
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Active Staff",
      value: activeStaff,
      subtitle: "Currently Working",
      growth: "+10%",
      icon: "bi bi-person-fill-gear",
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "On Leave",
      value: onLeaveStaff,
      subtitle: "Currently on Leave",
      growth: "+5%",
      icon: "bi bi-person-check",
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: "Inactive Staff",
      value: inactiveStaff,
      subtitle: "Currently Inactive",
      growth: "+2%",
      icon: "bi bi-person-x-fill",
      bg: "bg-red-100",
      color: "text-red-600",
    },
    {
      title: "Departments",
      value: departments,
      subtitle: "Different Departments",
      growth: "+8%",
      icon: "bi bi-building",
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
        <div>
          <Breadcrumb
            items={[
              { label: "Dashboard", path: "/dashboard" },
              { label: "Staff" },
            ]}
          />
          <h1 className="text-3xl font-bold mt-2">Staff Management</h1>

          <p className="text-gray-500 mt-1">
            View and manage all society staff members.
          </p>
        </div>

        <div className=" flex  w-[150px]">
          <button
            onClick={() => navigate("/staff/profile/add-staf")}
            className="bg-blue-600 text-white rounded-lg  h-10 px-4 flex-1 whitespace-nowrap text-sm"
          >
            <i className="bi bi-plus-lg"></i> Add New Staff
          </button>
        </div>
      </div>

      {/* Cards */}
      <StatsCards cards={cards} />

      {/* Filter */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2.8fr_1fr_1fr_1fr_2fr] gap-4 items-end">

          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search staff by name, role, department..."
              className="border rounded-lg p-2 w-full mt-2"
              value={searching}
              onChange={(e) => {
                setsearching(e.target.value);


              }}
            />
          </div>

          {/* Department */}
          <div>
            <label className="text-sm font-medium">Department</label>
            <select
              className="border rounded-lg p-2 w-full mt-2"
              value={purposeFilter}
              onChange={(e) => {
                setPurposeFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All</option>
              <option value="Security">Security</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Housekeeping">Housekeeping</option>
              <option value="Administration">Administration</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium">Role</label>
            <select
              className="border rounded-lg p-2 w-full mt-2"
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All</option>
              <option value="Security Guard">Security Guard</option>
              <option value="Security Supervisor">Security Supervisor</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Technician">Technician</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Gardener">Gardener</option>
              <option value="Housekeeping Staff">Housekeeping Staff</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Office Assistant">Office Assistant</option>
              <option value="HR Executive">HR Executive</option>
              <option value="Admin Assistant">Admin Assistant</option>
              <option value="Accountant">Accountant</option>
              <option value="Finance Executive">Finance Executive</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              className="border rounded-lg p-2 w-full mt-2"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex  gap-2">
            <button
              onClick={() => {
                setsearching("");
                setAppliedSearching("");

                setStatusFilter("All");
                setAppliedStatus("All");

                setPurposeFilter("All");
                setAppliedPurpose("All");
                setRoleFilter("All");
                setAppliedRole("All");


                setCurrentPage(1);
              }}
              className="border rounded-lg h-10 px-4 flex-1 hover:bg-gray-100"
            >
              Reset
            </button>

            <button
              onClick={() => {
                setAppliedSearching(searching);
                setAppliedStatus(statusFilter);
                setAppliedPurpose(purposeFilter);
                setAppliedRole(roleFilter);
                setCurrentPage(1);
              }}
              className="bg-blue-600 text-white rounded-lg  h-10 px-4 flex-2 "
            >
              Apply Filter
            </button>

            <button
              onClick={() =>
                exportToExcel(
                  sortedstaffs.map((staff) => ({
                    ID: staff.id,
                    Name: staff.name,
                    Role: staff.role,
                    Department: staff.department,
                    Phone: staff.phone,
                    Status: staff.status,
                    JoiningDate: staff.joiningDate,
                  })),
                  "Staff_List"
                )
              }
              className="border rounded-lg h-10 px-4 flex-1 whitespace-nowrap"
            >
              <i className="bi bi-download me-2"></i>
              Export
            </button>
          </div>


        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <div className="w-max md:min-w-full border">
          <table className="w-max min-w-full text-xs md:text-sm whitespace-nowrap">
            <thead className="bg-gray-100 text-xs md:text-sm">
              <tr className="text-left">
                <SortableHeader
                  label="Staff ID"
                  field="id"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Name"
                  field="name"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Role"
                  field="role"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Department"
                  field="department"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Phone"
                  field="phone"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Status"
                  field="status"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Joining Date"
                  field="joiningDate"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />



                <th className=" px-3 py-3">Actions</th>

              </tr>
            </thead>

            <tbody className="text-xs md:text-sm">
              {paginatedstaffs.map((staff, index) => {

                return (


                  <tr
                    ref={actionEditRef}
                    key={staff.id} className="border-t hover:bg-gray-50">

                    {/* # */}
                    <td className="px-3 py-3">
                      {staff.id}
                    </td>
                    {/* Visitor Details */}
                    <td className="px-3 py-3">
                      {editingStaffId === staff.id ? (
                        <input
                          className="border rounded px-2 py-1 w-full"
                          value={staff.name}
                          onChange={(e) =>
                            setStaffs(prev =>
                              prev.map(item =>
                                item.id === staff.id
                                  ? { ...item, name: e.target.value }
                                  : item
                              )
                            )
                          }
                        />
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                            {staff?.name?.charAt(0)?.toUpperCase() || "?"}
                          </div>

                          <span>{staff.name}</span>
                        </div>
                      )}
                    </td>

                    {/* Role*/}
                    <td
                      className="px-3 py-3">
                      {editingStaffId === staff.id ? (
                        <select
                          className="border rounded px-2 py-1"
                          value={staff.role}
                          onChange={(e) =>
                            setStaffs(prev =>
                              prev.map(item =>
                                item.id === staff.id
                                  ? { ...item, role: e.target.value }
                                  : item
                              )
                            )
                          }
                        >
                          <option>Security Guard</option>
                          <option>Security Supervisor</option>
                          <option>Supervisor</option>
                          <option>Technician</option>
                          <option>Electrician</option>
                          <option>Plumber</option>
                          <option>Gardener</option>
                          <option>Housekeeping Staff</option>
                          <option>Cleaner</option>
                          <option>Receptionist</option>
                          <option>Office Assistant</option>
                          <option>HR Executive</option>
                          <option>Admin Assistant</option>
                          <option>Accountant</option>
                          <option>Finance Executive</option>
                        </select>
                      ) : (
                        staff.role
                      )}
                    </td>
                    {/* Department */}
                    <td className="px-3 py-3">
                      {editingStaffId === staff.id ? (
                        <select
                          className="border rounded px-2 py-1 w-full"
                          value={staff.department}
                          onChange={(e) =>
                            setStaffs((prev) =>
                              prev.map((item) =>
                                item.id === staff.id
                                  ? { ...item, department: e.target.value }
                                  : item
                              )
                            )
                          }
                        >
                          <option>Security</option>
                          <option>Maintenance</option>
                          <option>Housekeeping</option>
                          <option>Administration</option>
                          <option>Finance</option>
                        </select>
                      ) : (
                        staff.department
                      )}
                    </td>
                    {/* Phone */}
                    <td className="px-3 py-3">
                      {editingStaffId === staff.id ? (
                        <input
                          type="text"
                          className="border rounded px-2 py-1 w-full"
                          value={staff.phone}
                          onChange={(e) =>
                            setStaffs((prev) =>
                              prev.map((item) =>
                                item.id === staff.id
                                  ? { ...item, phone: e.target.value }
                                  : item
                              )
                            )
                          }
                        />
                      ) : (
                        staff.phone
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3">
                      {editingStaffId === staff.id ? (
                        <select
                          className="border rounded px-2 py-1 w-full"
                          value={staff.status}
                          onChange={(e) =>
                            setStaffs((prev) =>
                              prev.map((item) =>
                                item.id === staff.id
                                  ? { ...item, status: e.target.value }
                                  : item
                              )
                            )
                          }
                        >
                          <option>Active</option>
                          <option>On Leave</option>
                          <option>Inactive</option>
                        </select>
                      ) : (
                        staff.status
                      )}
                    </td>


                    {/* Joining date */}
                    <td className="px-3 py-3">
                      {editingStaffId === staff.id ? (
                        <input
                          type="date"
                          className="border rounded px-2 py-1 w-full"
                          value={staff.joiningDate}
                          onChange={(e) =>
                            setStaffs((prev) =>
                              prev.map((item) =>
                                item.id === staff.id
                                  ? { ...item, joiningDate: e.target.value }
                                  : item
                              )
                            )
                          }
                        />
                      ) : (
                        staff.joiningDate
                      )}
                    </td>


                    {/* Actions */}
                    <td className="px-3 py-3">
                      {editingStaffId === staff.id ? (
                        <div className="flex gap-2">
                          <button
                            className="bg-green-600 text-white px-3 py-1 rounded"
                            onClick={() => setEditingStaffId(null)}
                          >
                            Save
                          </button>

                          <button
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                            onClick={() => setEditingStaffId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <ActionMenu 
                        viewLabel="View Profile"
                          isOpen={openMenu === staff.id}
                          onToggle={() =>
                            setOpenMenu((prev) => (prev === staff.id ? null : staff.id))
                          }
                          onClose={() => setOpenMenu(null)}

                          onView={() => navigate(`/staff/profile/${staff.id}`)}

                          onEdit={() => setEditingStaffId(staff.id)}

                          onDelete={() => {
                            setStaffToDelete(staff);
                            setShowDeleteModal(true);
                          }}

                          showDelete={true}
                        />
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={filteredstaffs.length}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <DeleteModal
        show={showDeleteModal}
        title="Delete Staff"
        message="Are you sure you want to delete this staff?"
        onClose={() => {
          setShowDeleteModal(false);
          setStaffToDelete(null);
        }}
        onDelete={() => {
          setStaffs(prev =>
            prev.filter(item => item.id !== staffToDelete.id)
          );
          setShowDeleteModal(false);
          setStaffToDelete(null);
        }}
      />
    </div>


  );
};

export default Staff;

