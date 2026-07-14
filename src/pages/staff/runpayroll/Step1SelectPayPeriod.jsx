import React, { useState } from "react";
import SortableHeader from "../../../component/SortableHeader";
import Pagination from "../../../component/Pagination";
import useTable from "../../../hooks/useTable";
import { exportToExcel } from "../../../utils/exportToExcel";

const Step1SelectPayPeriod = ({
  employees,
  selectedEmployees,
  setSelectedEmployees,
  nextStep,
}) => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All Departments" ||
      emp.department === department;

    return matchesSearch && matchesDepartment;
  });

  const handleSelectEmployee = (id) => {
    setSelectedEmployees((prev) =>
      prev.includes(id)
        ? prev.filter((empId) => empId !== id)
        : [...prev, id]
    );
  };

  const selectedData = filteredEmployees.filter((emp) =>
    selectedEmployees.includes(emp.id)
  );

  const exportData = selectedData.map((emp) => ({
    "Employee ID": emp.id,
    "Employee Name": emp.name,
    Role: emp.role,
    Department: emp.department,
    "Basic Salary": emp.basic,
    "Gross Salary": emp.gross,
    Deductions: emp.deduction,
    "Net Salary": emp.net,
  }));

  const {
    currentPage,
    setCurrentPage,
    sortField,
    sortOrder,
    handleSort,
    totalPages,
    paginatedData,
  } = useTable(filteredEmployees, 5);

  return (
    <>
      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

        {/* Pay Period */}
        <div className="lg:col-span-6 bg-white rounded-xl border p-6">

          <h3 className="text-xl font-semibold text-[#1E2A78] mb-6">
            Pay Period Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3">

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <i className="bi bi-calendar2-week text-purple-600 text-xl"></i>
              </div>

              <div>
                <p className="text-xs text-gray-500">Pay Period</p>
                <h4 className="font-bold text-lg">May 2025</h4>
                <p className="text-xs text-gray-500">
                  01 May 2025 - 31 May 2025
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-l pl-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <i className="bi bi-calendar-check text-green-600 text-xl"></i>
              </div>

              <div>
                <p className="text-xs text-gray-500">Pay Day</p>
                <h4 className="font-bold text-lg">31 May 2025</h4>
                <p className="text-xs text-gray-500">Saturday</p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-l pl-6">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <i className="bi bi-people text-orange-600 text-xl"></i>
              </div>

              <div>
                <p className="text-xs text-gray-500">Pay Frequency</p>
                <h4 className="font-bold text-lg">Monthly</h4>
                <p className="text-xs text-gray-500">Every Month</p>
              </div>
            </div>

          </div>

        </div>

        {/* Summary Cards */}

        {/* Summary Cards */}
<div className="lg:col-span-6 bg-white rounded-xl border border-gray-200 p-6">
  <div className="grid grid-cols-4 h-full">

    {/* Total Employees */}
    <div className="flex items-center gap-3 pr-4">
      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
        <i className="bi bi-people text-blue-600 text-xl"></i>
      </div>

      <div>
        <p className="text-xs text-gray-500 whitespace-nowrap">
          Total Employees
        </p>
        <h3 className="text-2xl font-bold">
          {filteredEmployees.length}
        </h3>
        <p className="text-sm whitespace-nowrap">
          Active Employees
        </p>
      </div>
    </div>

    {/* Total Earnings */}
    <div className="flex items-center gap-3 px-4 border-l">
      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
        <i className="bi bi-cash-stack text-green-600 text-xl"></i>
      </div>

      <div>
        <p className="text-xs text-gray-500 whitespace-nowrap">
          Total Earnings
        </p>
        <h3 className="text-md font-bold whitespace-nowrap">
          ₹24,58,000
        </h3>
      </div>
    </div>

    {/* Total Deductions */}
    <div className="flex items-center gap-3 px-4 border-l">
      <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
        <i className="bi bi-dash-circle text-red-600 text-xl"></i>
      </div>

      <div>
        <p className="text-xs text-gray-500 whitespace-nowrap">
          Total Deductions
        </p>
        <h3 className="text-md font-bold text-red-600 whitespace-nowrap">
          ₹4,76,300
        </h3>
      </div>
    </div>

    {/* Net Pay */}
    <div className="flex items-center gap-3 px-4 border-l">
      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
        <i className="bi bi-wallet2 text-purple-600 text-xl"></i>
      </div>

      <div>
        <p className="text-xs text-gray-500 whitespace-nowrap">
          Net Pay
        </p>
        <h3 className="text-md font-bold text-green-600 whitespace-nowrap">
          ₹19,81,700
        </h3>
      </div>
    </div>

  </div>
</div>
</div>
            {/* Employee Table + Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* Employee Table */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-200 p-5 overflow-x-auto">

          <h2 className="font-bold text-xl mb-5">
            Employees ({filteredEmployees.length})
          </h2>

          {/* Filters */}
          <div className="flex items-center justify-between gap-4 mb-5">

            {/* Search */}
            <div className="relative w-[320px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="text"
                placeholder="Search employee..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg py-2 pl-10 pr-4"
              />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">

              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="border rounded-lg px-4 py-2"
              >
                <option>All Departments</option>
                <option>Administration</option>
                <option>Finance</option>
                <option>Maintenance</option>
              </select>

              <button
                onClick={() =>
                  exportToExcel(exportData, "Selected_Employees")
                }
                disabled={selectedEmployees.length === 0}
                className="border rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <i className="bi bi-download"></i>
                Download
              </button>

            </div>
          </div>

          {/* Table */}

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-gray-50 border-y">

                <tr>

                  <th className="px-4 py-3">

                    <input
                      type="checkbox"
                      checked={
                        paginatedData.length > 0 &&
                        paginatedData.every((emp) =>
                          selectedEmployees.includes(emp.id)
                        )
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEmployees([
                            ...new Set([
                              ...selectedEmployees,
                              ...paginatedData.map((emp) => emp.id),
                            ]),
                          ]);
                        } else {
                          setSelectedEmployees(
                            selectedEmployees.filter(
                              (id) =>
                                !paginatedData.some((emp) => emp.id === id)
                            )
                          );
                        }
                      }}
                    />

                  </th>

                  <SortableHeader
                    label="Employee ID"
                    field="id"
                    sortField={sortField}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                    className="px-4 py-3"
                  />

                  <SortableHeader
                    label="Employee"
                    field="name"
                    sortField={sortField}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                    className="px-4 py-3"
                  />

                  <SortableHeader
                    label="Department"
                    field="department"
                    sortField={sortField}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                    className="px-4 py-3"
                  />

                  <SortableHeader
                    label="Basic Salary"
                    field="basic"
                    sortField={sortField}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                    className="px-4 py-3 text-right"
                  />

                  <SortableHeader
                    label="Gross Salary"
                    field="gross"
                    sortField={sortField}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                    className="px-4 py-3 text-right"
                  />

                  <SortableHeader
                    label="Deductions"
                    field="deduction"
                    sortField={sortField}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                    className="px-4 py-3 text-right"
                  />

                  <SortableHeader
                    label="Net Salary"
                    field="net"
                    sortField={sortField}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                    className="px-4 py-3 text-right"
                  />

                </tr>

              </thead>

              <tbody>
                                {paginatedData.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(emp.id)}
                        onChange={() => handleSelectEmployee(emp.id)}
                      />
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-700">
                      {emp.id}
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                          {emp.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {emp.name}
                          </h4>

                          <p className="text-xs text-gray-500">
                            {emp.role}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-4 py-4">
                      {emp.department}
                    </td>

                    <td className="px-4 py-4 text-right">
                      {emp.basic}
                    </td>

                    <td className="px-4 py-4 text-right">
                      {emp.gross}
                    </td>

                    <td className="px-4 py-4 text-right font-semibold text-red-600">
                      {emp.deduction}
                    </td>

                    <td className="px-4 py-4 text-right font-semibold text-green-600">
                      {emp.net}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

            <Pagination
              totalItems={filteredEmployees.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={5}
              totalPages={totalPages}
            />

          </div>

        </div>
                      {/* Payroll Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">

          <h2 className="text-2xl font-bold mb-5">
            Payroll Summary
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">
              <span>Total Employees</span>
              <b>{filteredEmployees.length}</b>
            </div>

            <div className="flex justify-between">
              <span>Total Earnings</span>
              <b>₹24,58,000</b>
            </div>

            <div className="flex justify-between text-red-600">
              <span>Total Deductions</span>
              <b>₹4,76,300</b>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold text-green-600">
              <span>Net Payable</span>
              <span>₹19,81,700</span>
            </div>

          </div>

          {/* Info Box */}

          <div className="mt-6 bg-blue-50 rounded-lg p-4 flex gap-3">

            <i className="bi bi-info-circle-fill text-blue-700 text-lg"></i>

            <p className="text-sm text-gray-700">
              Please review all employee details before continuing.
              Payroll can be reviewed in the next step.
            </p>

          </div>

          {/* Buttons */}

          <button
            onClick={nextStep}
            className="w-full mt-6 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition"
          >
            Proceed to Review Summary
          </button>

          <button
            className="w-full mt-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Save as Draft
          </button>

        </div>

      </div>
    </>
  );
};

export default Step1SelectPayPeriod;