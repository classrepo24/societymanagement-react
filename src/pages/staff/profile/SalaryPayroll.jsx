import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsCards from "../../../component/StatsCards";
import payrollData from "../../../data/salarypayroll.json";
import useTable from "../../../hooks/useTable";
import Pagination from "../../../component/Pagination";
import SortableHeader from "../../../component/SortableHeader";
import { exportToExcel } from "../../../utils/exportToExcel";
import ActionMenu from "../../../component/ActionMenu";
const SalaryPayroll = () => {

    const [month, setMonth] = useState("");
    const [department, setDepartment] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [payrollStatus, setPayrollStatus] = useState("");
    const [openMenuId, setOpenMenuId] = useState(null);

    const itemsPerPage = 10;
    const filteredData = useMemo(() => {
        return payrollData.filter((item) => {
            const monthMatch =
                !month ||
                item.month === month; // JSON me month: "2025-05"

            const departmentMatch =
                !department || item.department === department;

            const paymentMatch =
                !paymentStatus ||
                item.paymentStatus === paymentStatus;

            const payrollMatch =
                !payrollStatus ||
                item.payrollStatus === payrollStatus;

            return (
                monthMatch &&
                departmentMatch &&
                paymentMatch &&
                payrollMatch
            );
        });
    }, [month, department, paymentStatus, payrollStatus]);

    const {
        paginatedData,
        currentPage,
        totalPages,
        setCurrentPage,
        sortField,
        sortOrder,
        handleSort,
    } = useTable(filteredData, itemsPerPage);

    const navigate = useNavigate();
    const payrollCards = [
        {
            title: "Total Employees",
            value: 28,
            subtitle: "Active Employees",
            icon: "bi bi-people",
            bg: "bg-blue-100",
            color: "text-blue-600",
        },
        {
            title: "Gross Salary",
            value: "₹8,45,000.00",
            subtitle: "For May 2025",
            icon: "bi bi-cash-stack",
            bg: "bg-green-100",
            color: "text-green-600",
        },
        {
            title: "Total Deductions",
            value: "₹1,26,850.00",
            subtitle: "14.99% of gross salary",
            icon: "bi bi-file-earmark-text",
            bg: "bg-red-100",
            color: "text-red-600",
        },
        {
            title: "Net Payable",
            value: "₹7,18,150.00",
            subtitle: "After deductions",
            icon: "bi bi-wallet2",
            bg: "bg-violet-100",
            color: "text-violet-600",
        },
        {
            title: "Paid Employees",
            value: 18,
            subtitle: "64.29% paid",
            icon: "bi bi-wallet",
            bg: "bg-orange-100",
            color: "text-orange-500",
        },
    ];
    return (
        <div className="p-6 bg-[#F8FAFC] min-h-screen">
            {/* Breadcrumb */}
            <p className="text-sm text-gray-500 mb-2">
                <button onClick={() => navigate("/dashboard")}>Dashboard</button> /
                <button onClick={() => navigate("/staff")}> Staff</button> /
                <span className="font-bold text-gray-700">
                    Salary & Payroll
                </span>
            </p>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Salary & Payroll
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage staff salaries and payroll processing.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate("/staff/profile/salary-payroll/payroll-settings")}
                        className="border px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50"
                    >
                        <i className="bi bi-gear"></i>
                        Payroll Settings
                    </button>

                    <button
                        onClick={() => exportToExcel(filteredData, "Salary_Payroll")}
                        className="border px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50"
                    >
                        <i className="bi bi-download"></i>
                        Export
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2">
                        <i className="bi bi-plus-lg"></i>
                        Run Payroll
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow p-5 mb-5">
                <div className="grid grid-cols-5 gap-4">
                    <div>
                        <label className="text-sm font-medium block mb-2">
                            Payroll Month
                        </label>

                        <input
                            type="month"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className="w-full border rounded-lg px-4 h-11"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-2">
                            Department
                        </label>

                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full border rounded-lg px-4 h-11"
                        >
                            <option value="">All Departments</option>
                            <option>HR</option>
                            <option>Maintenance</option>
                            <option>Administration</option>
                            <option>Security</option>
                            <option>Housekeeping</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-2">
                            Payment Status
                        </label>
                        <select
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                            className="w-full border rounded-lg px-4 h-11"
                        >
                            <option value="">All</option>
                            <option>Paid</option>
                            <option>Pending</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-2">
                            Payroll Status
                        </label>

                        <select
                            value={payrollStatus}
                            onChange={(e) => setPayrollStatus(e.target.value)}
                            className="w-full border rounded-lg px-4 h-11"
                        >
                            <option value="">All</option>
                            <option>Processed</option>
                            <option>Pending</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={() => {
                                setMonth("");
                                setDepartment("");
                                setPaymentStatus("");
                                setPayrollStatus("");
                                setCurrentPage(1);
                            }}
                            className="border w-full h-11 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
                        >
                            <i className="bi bi-arrow-clockwise"></i>
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className=" gap-5">
                {/* Left */}
                <div>

                    <StatsCards
                        cards={payrollCards}
                        compact
                    />
                    {/* Payroll Table */}
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        {/* Table Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h2 className="text-lg font-semibold">Payroll Overview</h2>


                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-gray-100">
                                    <tr className="text-[#0B1F66]  text-sm font-semibold">


                                        <SortableHeader
                                            label="#"
                                            field="id"
                                            sortField={sortField}
                                            sortOrder={sortOrder}
                                            handleSort={handleSort}
                                            className="px-4 py-4 text-left"
                                        />

                                        <SortableHeader
                                            label="Employee"
                                            field="employee"
                                            sortField={sortField}
                                            sortOrder={sortOrder}
                                            handleSort={handleSort}
                                            className="px-4 py-4 text-left"
                                        />

                                        <SortableHeader
                                            label="Department"
                                            field="department"
                                            sortField={sortField}
                                            sortOrder={sortOrder}
                                            handleSort={handleSort}
                                            className="px-4 py-4 text-left"
                                        />

                                        <SortableHeader
                                            label="Basic Salary"
                                            field="basic"
                                            sortField={sortField}
                                            sortOrder={sortOrder}
                                            handleSort={handleSort}
                                            className="px-4 py-4 text-right"
                                        />

                                        <SortableHeader
                                            label="Allowance"
                                            field="allowance"
                                            sortField={sortField}
                                            sortOrder={sortOrder}
                                            handleSort={handleSort}
                                            className="px-4 py-4 text-right"
                                        />

                                        <SortableHeader
                                            label="Deduction"
                                            field="deduction"
                                            sortField={sortField}
                                            sortOrder={sortOrder}
                                            handleSort={handleSort}
                                            className="px-4 py-4 text-right"
                                        />

                                        <SortableHeader
                                            label="Net Salary"
                                            field="netSalary"
                                            sortField={sortField}
                                            sortOrder={sortOrder}
                                            handleSort={handleSort}
                                            className="px-4 py-4 text-right"
                                        />

                                        <SortableHeader
                                            label="Payment Status"
                                            field="paymentStatus"
                                            sortField={sortField}
                                            sortOrder={sortOrder}
                                            handleSort={handleSort}
                                            className="px-4 py-4 text-center"
                                        />

                                        <SortableHeader
                                            label="Payroll Status"
                                            field="payrollStatus"
                                            sortField={sortField}
                                            sortOrder={sortOrder}
                                            handleSort={handleSort}
                                            className="px-4 py-4 text-center"
                                        />

                                        <th className="px-4 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-4 text-center">
                                                {item.id}
                                            </td>

                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center">
                                                        {item.employee
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")
                                                            .slice(0, 2)}
                                                    </div>

                                                    <div>
                                                        <p className="font-medium text-gray-800">
                                                            {item.employee}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {item.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4">{item.department}</td>

                                            <td className="px-4 py-4 text-right">
                                                ₹{item.basic.toLocaleString()}
                                            </td>

                                            <td className="px-4 py-4 text-right text-green-600">
                                                ₹{item.allowance.toLocaleString()}
                                            </td>

                                            <td className="px-4 py-4 text-right text-red-600">
                                                ₹{item.deduction.toLocaleString()}
                                            </td>

                                            <td className="px-4 py-4 text-right font-semibold">
                                                ₹{item.netSalary.toLocaleString()}
                                            </td>

                                            <td className="px-4 py-4 text-center">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${item.paymentStatus === "Paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {item.paymentStatus}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 text-center">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${item.payrollStatus === "Processed"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    {item.payrollStatus}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 text-center">
                                                <ActionMenu
                                                    isOpen={openMenuId === item.id}
                                                    onToggle={() =>
                                                        setOpenMenuId(openMenuId === item.id ? null : item.id)
                                                    }
                                                    onClose={() => setOpenMenuId(null)}

                                                    onView={() =>
                                                        navigate(`/staff/profile/salary-payroll/view-payslip/${item.id}`)
                                                    }

                                                    onEdit={() =>
                                                        navigate(`/staff/profile/salary-payroll/edit/${item.id}`)
                                                    }

                                                    onDelete={() => {
                                                        console.log("Delete", item.id);
                                                    }}

                                                    payrollMenu
                                                    showDelete={false}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                                totalItems={filteredData.length}
                                itemsPerPage={itemsPerPage}

                            />
                        </div>
                    </div>

                </div>

                {/* Right Sidebar */}

            </div>
        </div>
    );
};

export default SalaryPayroll;