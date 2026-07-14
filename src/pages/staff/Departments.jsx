import { useState } from "react";
import StatsCards from "../../component/StatsCards";
import departments from "../../data/department.json"
import useTable from "../../hooks/useTable";
import SortableHeader from "../../component/SortableHeader";
import Pagination from "../../component/Pagination";
import { exportToExcel } from "../../utils/exportToExcel";


const cards = [
    {
        title: "Total Departments",
        value: 8,
        subtitle: "All departments",
        icon: "bi-building",
        bg: "bg-blue-100",
        color: "text-blue-600",
    },
    {
        title: "Total Staff",
        value: 48,
        subtitle: "Across all departments",
        icon: "bi-people",
        bg: "bg-green-100",
        color: "text-green-600",
    },
    {
        title: "Active Departments",
        value: 7,
        subtitle: "Currently active",
        icon: "bi-diagram-3",
        bg: "bg-orange-100",
        color: "text-orange-500",
    },
    {
        title: "Inactive Departments",
        value: 1,
        subtitle: "Currently inactive",
        icon: "bi-archive",
        bg: "bg-red-100",
        color: "text-red-500",
    },
];


const itemsPerPage = 8;

const Departments = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All Status");

    //filter

    const filteredDepartments = departments.filter((item) => {
        const matchesSearch =
            item.departmentName.toLowerCase().includes(search.toLowerCase()) ||
            item.departmentHead.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            status === "All Status" || item.status === status;

        return matchesSearch && matchesStatus;
    });

    //export
    const exportData = filteredDepartments.map((item) => ({
        ID: item.id,
        "Department Name": item.departmentName,
        "Department Head": item.departmentHead,
        Email: item.email,
        "Staff Count": item.staffCount,
        Description: item.description,
        Status: item.status,
    }));

    const {
        paginatedData,
        currentPage,
        setCurrentPage,
        startPage,
        sortField,
        sortOrder,
        handleSort,
    } = useTable(filteredDepartments, itemsPerPage);

    return (
        <div className="p-6 bg-[#f8faff] min-h-screen">

            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-2">
                Dashboard <span className="mx-2">/</span> Settings{" "}
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-bold">Department</span>
            </div>

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-[#0B1F66]">
                        Department
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Manage all departments and organize your society operations
                        effectively.
                    </p>
                </div>

                <button className="bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-900">
                    <i className="bi bi-plus-lg mr-2"></i>
                    Add Department
                </button>
            </div>

            {/* Cards */}

            <StatsCards cards={cards} />

            {/* Search */}

            <div className="bg-white border rounded-xl p-5">

                <div className="flex justify-between flex-wrap gap-4 mb-5">

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search department..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border rounded-lg pl-4 pr-10 py-2 w-80 outline-none"
                        />

                        <i className="bi bi-search absolute right-3 top-3 text-gray-500"></i>
                    </div>

                    <div className="flex gap-3">

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded-lg px-4 py-2"
                        >
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>

                       
                        <button onClick={() => exportToExcel(exportData, "Departments")}
                            className="border rounded-lg px-5">
                            <i className="bi bi-download mr-2"></i>
                            Export
                        </button>

                    </div>
                </div>

                {/* Table */}

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>
                            <tr className="border-b bg-gray-100  text-[#0B1F66]">

                                <SortableHeader
                                    label="#"
                                    field="id"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                    className="py-4"
                                />

                                <SortableHeader
                                    label="Department Name"
                                    field="departmentName"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                />

                                <SortableHeader
                                    label="Department Head"
                                    field="departmentHead"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                />

                                <SortableHeader
                                    label="Staff Count"
                                    field="staffCount"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                />

                                <SortableHeader
                                    label="Description"
                                    field="description"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                />

                                <SortableHeader
                                    label="Status"
                                    field="status"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                />

                                <th>Actions</th>

                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">

                                    <td className="py-4">{item.id}</td>

                                    <td className="font-semibold">
                                        {item.departmentName}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold uppercase">
                                                {item.departmentHead.charAt(0)}
                                            </div>

                                            <div>
                                                <h5 className="font-semibold">
                                                    {item.departmentHead}
                                                </h5>

                                                <p className="text-sm text-gray-500">
                                                    {item.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td>{item.staffCount}</td>

                                    <td className="text-gray-600 max-w-xs">
                                        {item.description}
                                    </td>

                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Active"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="text-center">
                                        <button className="border rounded-lg px-2 py-2 hover:bg-gray-100">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <Pagination
                        setCurrentPage={setCurrentPage}
                        totalItems={filteredDepartments.length}
                        startPage={startPage}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                    />

                </div>


            </div>

        </div>
    );
};

export default Departments;