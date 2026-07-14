import React, { useState } from "react";
import StaffProfileCard from "./StaffProfileCard";
import StaffTabs from "./StaffTabs";
import useTable from "../../../hooks/useTable";
import SortableHeader from "../../../component/SortableHeader";
import documents from "../../../data/documents.json";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../component/Pagination";
import { useApp } from "../../../context/AppContext";
import ActionMenu from "../../../component/ActionMenu";
import Edit from "../../../component/Edit";
import DeleteModal from "../../../component/DeleteModal";
import { useParams } from "react-router-dom";
import staffData from "../../../data/staff.json";
import Breadcrumb from "../../../component/Breadcrumb";

const Documents = () => {
    const [activeTab, setActiveTab] = useState("Overview");
    const [documentList, setDocumentList] = useState(documents);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
const [showDelete, setShowDelete] = useState(false);
   
const navigate = useNavigate();
    const { id } = useParams();


    
    //drag and drop
    const [dragging, setDragging] = useState(false);

    //filter
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Categories");
    const [status, setStatus] = useState("All Status");
    const [openMenu, setOpenMenu] = useState(null);

    const selectedStaff = staffData.staff.find(
  (item) => String(item.id) === String(id)
);

const staff = selectedStaff
  ? {
      ...selectedStaff,
      gender: "Male",
      dob: "15 Aug 1988",
      address: "B-102, Green View Apartments",
      email:
        selectedStaff.email ||
        `${selectedStaff.name.toLowerCase().replace(/\s/g, ".")}@society.com`,
      reporting: "Ramesh Sharma",
    }
  : null;

    const itemsPerPage = 7;

    const filteredDocuments = documentList.filter((doc) => {
        const matchCategory =
            category === "All Categories" || doc.category === category;

        const matchStatus =
            status === "All Status" || doc.status === status;

        const matchSearch =
            doc.documentName.toLowerCase().includes(search.toLowerCase());

        return matchCategory && matchStatus && matchSearch;
    });

    const {
        currentPage,
        setCurrentPage,
        sortField,
        sortOrder,
        paginatedData,
        totalPages,
        handleSort,

    } = useTable(filteredDocuments, itemsPerPage);

    const { getStatusStyle } = useApp();


    //file upload in list
    const handleFileUpload = (files) => {
        const newDocuments = files.map((file, index) => ({
            id: documentList.length + index + 1,
            documentName: file.name,
            category: "Documents",
            uploadDate: new Date().toLocaleDateString(),
            expiryDate: "-",
            status: "Pending",
        }));
    setDocumentList((prev) => [...newDocuments, ...prev]);

            setCurrentPage(1);

    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        const files = [...e.dataTransfer.files];
        handleFileUpload(files);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* Breadcrumb */}
            <Breadcrumb
    items={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Staff", path: "/staff" },
        { label: "Staff Profile", path: `/staff/profile/${id}` },
        { label: "Documents" },
    ]}
/>

            {/* Header */}
            <div className="flex justify-between items-center mt-2 mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Documents</h1>

                    <p className="text-gray-500 text-sm mt-1">
                        View and manage staff documents and certificates.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => navigate("/staff")} className="border rounded-lg px-5 py-2 hover:bg-gray-100">
                        <i className="bi bi-arrow-left"></i> Back to Staff
                    </button>


                </div>
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-12 gap-6">

                {/* Left Profile */}
                <div className="col-span-12 lg:col-span-3">
                    <StaffProfileCard staff={staff} />
                </div>

                {/* Right */}
                <div className="col-span-12 lg:col-span-9">

                    <StaffTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <div className="grid grid-cols-12 gap-6 mt-6">
                        <div className="border col-span-12 lg:col-span-12 h-20 rounded-md bg-blue-50">
                            <div className="flex gap-6">
                                <i className="bi bi-exclamation-circle text-3xl pl-6 mt-2 text-blue-500"></i>
                                <div className="font-bold mt-2 text-xl">Note </div>
                            </div>
                            <div className="ml-16 text-sm ">Upload and manage all important documents and certificates of the staff member.</div>

                        </div>

                        {/* Table */}
                        <div className="col-span-12 lg:col-span-12 border rounded-xl bg-white overflow-hidden">
                            {/* Filter Section */}
                            <div className="flex flex-col md:flex-row px-12 items-center justify-between gap-4 border-b p-4 bg-white">

                                {/* Left Filters */}
                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-96">
                                    {/* Category */}
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="border rounded-lg px-4 w-[200px] py-2 text-sm"
                                    >
                                        <option>All Categories</option>
                                        <option>Documents</option>
                                        <option>Certificates</option>
                                        <option>ID Proof</option>
                                    </select>

                                    {/* Status */}
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="border rounded-lg w-[200px] px-4 py-2 text-sm"
                                    >
                                        <option>All Status</option>
                                        <option>Verified</option>
                                        <option>Pending</option>
                                        <option>Expired</option>
                                    </select>
                                </div>

                                {/* Search */}
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    {/* Search */}
                                    <div className="relative w-full md:w-80">
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search documents..."
                                            className="w-full border rounded-lg px-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        <i className="bi bi-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
                                    </div>

                                    {/* Reset Button */}
                                    <button
                                        onClick={() => {
                                            setSearch("");
                                            setCategory("All Categories");
                                            setStatus("All Status");
                                        }}
                                        className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 text-gray-700 font-medium whitespace-nowrap"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>

                            {/* Content */}

                            <div className="p-4">
                                <div className="overflow-x-auto rounded-lg border">
                                    <table className="min-w-full text-sm">
                                        <thead className="bg-gray-50 border-b text-gray-700">
                                            <tr>
                                                <SortableHeader
                                                    label="#"
                                                    field="id"
                                                    sortField={sortField}
                                                    sortOrder={sortOrder}
                                                    handleSort={handleSort}
                                                    className="px-5 py-3 text-left"
                                                />

                                                <SortableHeader
                                                    label="Document Name"
                                                    field="documentName"
                                                    sortField={sortField}
                                                    sortOrder={sortOrder}
                                                    handleSort={handleSort}
                                                    className="px-5 py-3 text-left"
                                                />

                                                <SortableHeader
                                                    label="Category"
                                                    field="category"
                                                    sortField={sortField}
                                                    sortOrder={sortOrder}
                                                    handleSort={handleSort}
                                                    className="px-5 py-3 text-left"
                                                />



                                                <SortableHeader
                                                    label="Upload Date"
                                                    field="uploadDate"
                                                    sortField={sortField}
                                                    sortOrder={sortOrder}
                                                    handleSort={handleSort}
                                                    className="px-5 py-3 text-left"
                                                />

                                                <SortableHeader
                                                    label="Expiry Date"
                                                    field="expiryDate"
                                                    sortField={sortField}
                                                    sortOrder={sortOrder}
                                                    handleSort={handleSort}
                                                    className="px-5 py-3 text-left"
                                                />
                                                <SortableHeader
                                                    label="Status"
                                                    field="status"
                                                    sortField={sortField}
                                                    sortOrder={sortOrder}
                                                    handleSort={handleSort}
                                                    className="px-5 py-3 text-left"
                                                />

                                                <th className="px-5 py-3 text-center">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {paginatedData.map((doc, index) => (
                                                <tr
                                                    key={doc.id}
                                                    className="border-b hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-5 py-4">{doc.id}</td>

                                                    <td className="px-5 py-4">{doc.documentName}</td>

                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex px-3 py-1 rounded text-xs font-medium ${getStatusStyle(doc.category)}`}
                                                        >
                                                            {doc.category}
                                                        </span>

                                                    </td>


                                                    <td className="px-5 py-4">{doc.uploadDate}</td>

                                                    <td className="px-5 py-4">{doc.expiryDate}</td>
                                                    <td className="px-5 py-4 ">
                                                        <span
                                                            className={`inline-flex px-3 py-1 rounded text-xs font-medium ${getStatusStyle(doc.status)}`}
                                                        >
                                                            {doc.status}
                                                        </span>
                                                    </td>


                                                    <td className="px-5 py-4 text-center">
                                                        <ActionMenu
                                                            isOpen={openMenu === doc.id}
                                                            onToggle={() =>
                                                                setOpenMenu((prev) => (prev === doc.id ? null : doc.id))
                                                            }
                                                            onClose={() => setOpenMenu(null)}
                                                            editOnly={true}
                                                            onEdit={() => {
                                                                setSelectedDocument(doc);
                                                                setIsEditOpen(true);
                                                                setOpenMenu(null);
                                                            }}
                                                            onDelete={() => {
                                                                setSelectedDocument(doc);
                                                                setShowDelete(true);
                                                                setOpenMenu(null);
                                                            }} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* Pagination */}
                                <Pagination
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    totalPages={totalPages}
                                    totalItems={filteredDocuments.length}
                                    itemsPerPage={itemsPerPage}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 mt-6">
                        <div
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragging(true);
                            }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleDrop}
                            className={`border  rounded-xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 transition ${dragging
                                ? "border-blue-600 bg-blue-100"
                                : "border-blue-300 bg-blue-50"
                                }`}
                        >
                            {/* Left */}
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                                    <i className="bi bi-cloud-arrow-up text-3xl text-blue-600"></i>
                                </div>

                                <div>
                                    <h3 className="text-md font-bold text-gray-800">
                                        Drag & Drop Files Here, or{" "}
                                        <label
                                            htmlFor="documentUpload"
                                            className="text-blue-700 cursor-pointer hover:underline"
                                        >
                                            click to browse
                                        </label>
                                    </h3>

                                    <p className="text-sm pt-2 text-gray-500">
                                        PDF, JPG, PNG, DOC, DOCX (Max 10 MB)
                                    </p>
                                </div>
                            </div>

                            {/* Right */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="file"
                                    id="documentUpload"
                                    className="hidden"
                                    multiple
                                    onChange={(e) => {
                                        const files = [...e.target.files];
                                        handleFileUpload(files);
                                    }}
                                />

                                <label
                                    htmlFor="documentUpload"
                                    className="bg-white border hover:bg-gray-100  px-5 py-2 rounded-lg cursor-pointer"
                                >
                                    Choose Files
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <Edit
                    isOpen={isEditOpen}
                    document={selectedDocument}
                    onClose={() => {
                        setIsEditOpen(false);
                        setSelectedDocument(null);
                    }}
                    onSave={(updatedDocument) => {
                        setDocumentList((prev) =>
                            prev.map((item) =>
                                item.id === updatedDocument.id
                                    ? updatedDocument
                                    : item
                            )
                        );

                        setIsEditOpen(false);
                        setSelectedDocument(null);
                    }}
                />

                <DeleteModal
                    show={showDelete}
                    title="Delete Document"
                    message={`Are you sure you want to delete "${selectedDocument?.documentName}"?`}
                    onClose={() => {
                        setShowDelete(false);
                        setSelectedDocument(null);
                    }}
                    onDelete={() => {
                        setDocumentList((prev) =>
                            prev.filter((item) => item.id !== selectedDocument.id)
                        );
                        setShowDelete(false);
                        setSelectedDocument(null);
                    }}
                />
            </div>



        </div>

    );
};

export default Documents;