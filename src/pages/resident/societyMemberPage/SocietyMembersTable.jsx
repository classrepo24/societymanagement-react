import React, { useEffect, useState } from 'react'
import { FiSearch, FiFilter, FiMoreVertical, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { membersData } from '../membersData';
import { tab } from '@testing-library/user-event/dist/tab';
import { DeletePopup } from '../../../components/DeletePopup';

export const SocietyMembersTable = () => {
    const [activeTab, setActiveTab] = useState("All Members");
    const tabs = [
        "All Members",
        "Committee Members",
        "Active",
        "Inactive",
    ];
    const [openMenu, setOpenMenu] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");
    useEffect(() => {
        setTableData(membersData);
    }, [membersData])
    const filteredMembers = tableData.filter((member) => {
        // Tabs Filter
        const tabMatch =
            activeTab === "All Members"
                ? true
                : activeTab === "Committee Members"
                    ? member.type === "Committee Member"
                    : member.status === activeTab;

        // Search Filter
        const searchMatch =
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.contact.includes(searchTerm);

        // Dropdown Filter
        const statusMatch =
            statusFilter === "All"
                ? true
                : member.status === statusFilter;

        return tabMatch && searchMatch && statusMatch;
    });
    const handleDetele = (id) => {
        setTableData(tableData.filter((item) => item.id !== id));
    }
    const handleEdit = (id) => {
        setEditId(id);
    }
    const handleSave = (id) => {
        setEditId(null);
    }
    const confirmDelete = () => {
        setTableData(
            membersData.filter((item) => item.id !== deleteId)
        );

        setShowDeletePopup(false);
        setDeleteId(null);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const membersPerPage = 5;
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;

    const currentMembers = filteredMembers.slice(
        indexOfFirstMember,
        indexOfLastMember
    );
    const totalPages = Math.ceil(
        filteredMembers.length / membersPerPage
    );


    return (
        <div className="bg-white rounded-xl shadow-sm border m-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-5 border-b gap-4">
                <div className="flex gap-8 overflow-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setCurrentPage(1);
                            }}
                            className={`pb-3 text-sm font-medium whitespace-nowrap ${activeTab === tab
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-600"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search member..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-10 pr-4 py-2 border rounded-lg w-72 outline-none"
                        />
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowFilter(!showFilter)}
                            className="flex items-center gap-2 border px-4 py-2 rounded-lg"
                        >
                            <FiFilter />
                            Filters
                        </button>

                        {showFilter && (
                            <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg p-3 w-48 z-50">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full border rounded p-2"
                                >
                                    <option value="All">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50 text-left text-sm">
                            <th className="p-4">Member Name</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Member Type</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Join Date</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentMembers.map((member) => (
                            <tr
                                key={member.id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="p-4">
                                    {editId === member.id ? (
                                        <input
                                            type="text"
                                            value={member.name}
                                            onChange={(e) =>
                                                setTableData(
                                                    tableData.map((item) =>
                                                        item.id === member.id
                                                            ? { ...item, name: e.target.value }
                                                            : item
                                                    )
                                                )
                                            }
                                            className="border px-2 py-1 rounded"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={member.image}
                                                alt=""
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <span>{member.name}</span>
                                        </div>
                                    )}
                                </td>

                                <td className="p-4">
                                    {editId === member.id ? (
                                        <input
                                            type="text"
                                            value={member.role}
                                            onChange={(e) =>
                                                setTableData(
                                                    tableData.map((item) =>
                                                        item.id === member.id
                                                            ? { ...item, role: e.target.value }
                                                            : item
                                                    )
                                                )
                                            }
                                            className="border px-2 py-1 rounded"
                                        />
                                    ) : (
                                        member.role
                                    )}
                                </td>

                                <td className="p-4">
                                    {editId === member.id ? (
                                        <select
                                            value={member.type}
                                            onChange={(e) =>
                                                setTableData(
                                                    tableData.map((item) =>
                                                        item.id === member.id
                                                            ? { ...item, type: e.target.value }
                                                            : item
                                                    )
                                                )
                                            }
                                            className="border px-2 py-1 rounded"
                                        >
                                            <option value="Committee Member">
                                                Committee Member
                                            </option>
                                            <option value="General Member">
                                                General Member
                                            </option>
                                        </select>
                                    ) : (
                                        member.type
                                    )}
                                </td>

                                <td className="p-4">
                                    {editId === member.id ? (
                                        <input
                                            type="text"
                                            value={member.contact}
                                            onChange={(e) =>
                                                setTableData(
                                                    tableData.map((item) =>
                                                        item.id === member.id
                                                            ? { ...item, contact: e.target.value }
                                                            : item
                                                    )
                                                )
                                            }
                                            className="border px-2 py-1 rounded"
                                        />
                                    ) : (
                                        member.contact
                                    )}
                                </td>

                                <td className="p-4">
                                    {editId === member.id ? (
                                        <input
                                            type="email"
                                            value={member.email}
                                            onChange={(e) =>
                                                setTableData(
                                                    tableData.map((item) =>
                                                        item.id === member.id
                                                            ? { ...item, email: e.target.value }
                                                            : item
                                                    )
                                                )
                                            }
                                            className="border px-2 py-1 rounded"
                                        />
                                    ) : (
                                        member.email
                                    )}
                                </td>

                                <td className="p-4">
                                    {editId === member.id ? (
                                        <select
                                            value={member.status}
                                            onChange={(e) =>
                                                setTableData(
                                                    tableData.map((item) =>
                                                        item.id === member.id
                                                            ? { ...item, status: e.target.value }
                                                            : item
                                                    )
                                                )
                                            }
                                            className="border px-2 py-1 rounded"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    ) : (
                                        <span
                                            className={`px-3 py-1 rounded-md text-xs font-medium ${member.status === "Active"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-orange-100 text-orange-600"
                                                }`}
                                        >
                                            {member.status}
                                        </span>
                                    )}
                                </td>

                                <td className="p-4">
                                    {editId === member.id ? (
                                        <input
                                            type="date"
                                            value={member.joinDate}
                                            onChange={(e) =>
                                                setTableData(
                                                    tableData.map((item) =>
                                                        item.id === member.id
                                                            ? { ...item, joinDate: e.target.value }
                                                            : item
                                                    )
                                                )
                                            }
                                            className="border px-2 py-1 rounded"
                                        />
                                    ) : (
                                        member.joinDate
                                    )}
                                </td>

                                <td className="p-5 relative">
                                    <button
                                        onClick={() =>
                                            setOpenMenu(openMenu === member.id ? null : member.id)
                                        }
                                        className="border rounded-xl p-3"
                                    >
                                        <FiMoreVertical />
                                    </button>

                                    {openMenu === member.id && (
                                        <div className="absolute right-5 mt-2 bg-white border rounded-lg shadow-lg w-28 z-10">

                                            {editId === member.id ? (
                                                <button
                                                    onClick={handleSave}
                                                    className="w-full text-left px-4 py-2 text-green-600"
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEdit(member.id)}
                                                    className="w-full text-left px-4 py-2"
                                                >
                                                    Edit
                                                </button>
                                            )}

                                            <button
                                                onClick={() => {
                                                    setDeleteId(member.id);
                                                    setShowDeletePopup(true);
                                                    setOpenMenu(null);
                                                }}
                                                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-5 border-t">
                <p className="text-sm text-gray-600">
                    Showing {indexOfFirstMember + 1} to{" "}
                    {Math.min(indexOfLastMember, membersData.length)} of{" "}
                    {membersData.length} members
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="border w-10 h-10 rounded-lg flex items-center justify-center"
                    >
                        <FiChevronLeft />
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`w-10 h-10 rounded-lg ${currentPage === index + 1
                                ? "bg-blue-600 text-white"
                                : "border"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="border w-10 h-10 rounded-lg flex items-center justify-center"
                    >
                        <FiChevronRight />
                    </button>
                </div>
            </div>
            {showDeletePopup && (
                <DeletePopup
                    onClose={() => {
                        setShowDeletePopup(false);
                        setDeleteId(null);
                    }}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    )
}
