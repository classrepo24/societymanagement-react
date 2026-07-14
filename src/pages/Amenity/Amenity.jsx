import React, { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useAmenity } from "../../context/AmenityContext";
import { useComplaint } from "../../context/ComplaintContext";
import StatsCard from "../../components/StatsCard";
import { useSorting } from "../../hooks/useSorting";
import DeletePopup from "../../components/DeletePopup";
import { useNavigate } from "react-router-dom";

export const Amenity = () => {
  const [search, setSearch] = useState(""); // search filter
  const [statusFilter, setStatusFilter] = useState("All"); //status filter
  const { amenities, setAmenities } = useAmenity();

  //images
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImagesModal, setShowImagesModal] = useState(false);

  const navigate = useNavigate();

  // Sorting Hook

  const [categoryFilter, setCategoryFilter] = useState("All");

  // delete popup start
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const handleDelete = () => {
    setAmenities(amenities.filter((item) => item.id !== selectedId));

    setDeleteModal(false);
    setSelectedId(null);
  };
  // delete popup end

  const totalAmenities = amenities.length;

  const activeAmenities = amenities.filter(
    (item) => item.status === "Active",
  ).length;

  const maintenanceAmenities = amenities.filter(
    (item) => item.status === "Maintenance",
  ).length;

  const inactiveAmenities = amenities.filter(
    (item) => item.status === "Inactive",
  ).length;
  const [activeMenu, setActiveMenu] = useState(null); //action buttion

  const [editingStatusId, setEditingStatusId] = useState(null);

  const cards = [
    {
      title: "Total Amenities",
      value: totalAmenities,
      subtitle: "All Amenities",
      icon: "bi bi-buildings",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Amenities",
      value: activeAmenities,
      subtitle: "Currently Active",
      icon: "bi-check-circle",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Under Maintenance ",
      value: maintenanceAmenities,
      subtitle: "Temporarily unavailable",
      icon: "bi bi-pause-circle",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Inactive Amenities",
      value: inactiveAmenities,
      subtitle: "Currently Inactive",
      icon: "bi bi-shop-window",
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
  ];

  let filteredAmenities = [...amenities];

  // Search
  if (search) {
    filteredAmenities = filteredAmenities.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // Status
  if (statusFilter !== "All") {
    filteredAmenities = filteredAmenities.filter(
      (item) => item.status === statusFilter,
    );
  }

  // Category
  if (categoryFilter !== "All") {
    filteredAmenities = filteredAmenities.filter(
      (item) => item.category === categoryFilter,
    );
  }

  const categoryStyles = {
    Recreation: {
      icon: "bi bi-binoculars",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
    },
    Fitness: {
      icon: "bi-activity",
      iconBg: "bg-red-100",
      iconColor: "text-red-700",
    },
    Community: {
      icon: "bi-people",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-700",
    },
    Wellness: {
      icon: "bi-flower1",
      iconBg: "bg-green-100",
      iconColor: "text-green-700",
    },
    Sports: {
      icon: "bi-dribbble",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-700",
    },
  };
  const { sortedData, handleSort, renderSortIcon } =
    useSorting(filteredAmenities);

  return (
    // Main Div parent
    <div className="p-6 bg-[#f5f7fb] min-h-screen">
      {/* Starting Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Amenities", path: "/amenities" },
        ]}
      />

      {/* HEADING */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl md:text-[33px] leading-none font-bold text-[#111827]">
            Amenities
          </h1>

          <p className="text-gray-500 mt-2 text-[15px]">
            Manage and View All Amenity Available in Society .
          </p>
        </div>

        {/* Add buttion  for Amenities */}
        <button
          onClick={() => navigate("/amenities/add")}
          className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-3 rounded-xl text-sm font-medium"
        >
          <i className="bi bi-plus-lg mr-2"></i>
          Add New Amenity
        </button>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {cards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          {/* Left Side Filters */}
          <div className="flex flex-col md:flex-row md:flex-wrap items-stretch md:items-end gap-4 w-full">
            {/* Search */}
            <div className="relative w-full lg:w-[400px]">
              <input
                type="text"
                placeholder="Search category by name or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-xl py-3 px-4 pr-12 outline-none focus:border-blue-500"
              />
              <i className="bi bi-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>

            {/* Status */}
            <div className="flex flex-col w-full md:w-auto">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 px-4 py-3 rounded-xl min-w-[180px]"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Maintenance">Under Maintenance</option>
              </select>
            </div>

            {/* Categories */}
            <div className="flex flex-col w-full md:w-auto">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Categories
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-200 px-4 py-3 rounded-xl min-w-[180px]"
              >
                <option value="All">All Categories</option>
                <option value="Recreation">Recreation</option>
                <option value="Fitness">Fitness</option>
                <option value="Community">Community</option>
                <option value="Wellness">Wellness</option>
              </select>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
              setCategoryFilter("All");
            }}
            className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-white border rounded-xl hover:bg-red-100 transition"
          >
            <i className="bi bi-arrow-clockwise"></i>
            Reset
          </button>
        </div>
        <p>Total: {sortedData.length}</p>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mt-4">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-sm font-semibold text-gray-700">
                <th
                  className="p-4 cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Amenity Name
                    {renderSortIcon("name")}
                  </div>
                </th>

                <th
                  className="p-4 cursor-pointer"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center">
                    Category
                    {renderSortIcon("category")}
                  </div>
                </th>

                <th
                  className="p-4 cursor-pointer"
                  onClick={() => handleSort("location")}
                >
                  <div className="flex items-center">
                    Location
                    {renderSortIcon("location")}
                  </div>
                </th>

                <th
                  className="p-4 cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {renderSortIcon("status")}
                  </div>
                </th>

                <th
                  className="p-4 cursor-pointer"
                  onClick={() => handleSort("availability")}
                >
                  <div className="flex items-center">
                    Availability
                    {renderSortIcon("availability")}
                  </div>
                </th>

                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedData.map((item, index) => (
                 console.log("TABLE ITEM:", item),
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  {/* Amenity Name */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`${item.iconBg} w-10 h-10 rounded-lg flex items-center justify-center`}
                      >
                        <i className={`bi ${item.icon} ${item.iconColor}`}></i>
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          categoryStyles[item.category]?.iconBg || "bg-gray-100"
                        }`}
                      >
                        <i
                          className={`bi ${
                            categoryStyles[item.category]?.icon ||
                            "bi-question-circle"
                          } ${
                            categoryStyles[item.category]?.iconColor ||
                            "text-gray-600"
                          }`}
                        ></i>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          categoryStyles[item.category]?.badgeBg
                        } ${
                          categoryStyles[item.category]?.badgeText ||
                          "text-gray-600"
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>
                  </td>
                  {/* Location */}
                  <td className="p-4">{item.location}</td>
                  {/* Status */}
                  <td className="p-4">
                    {editingStatusId === item.id ? (
                      <select
                        value={item.status}
                        onChange={(e) => {
                          setAmenities(
                            amenities.map((amenity) =>
                              amenity.id === item.id
                                ? { ...amenity, status: e.target.value }
                                : amenity,
                            ),
                          );

                          setEditingStatusId(null);
                        }}
                        className="border rounded-lg px-2 py-1"
                        autoFocus
                      >
                        <option value="Active">Active</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    ) : (
                      item.status
                    )}
                  </td>
                  {/* Availability */}
                  <td className="p-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            item.availability === "Available"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></span>

                        <span>{item.availability}</span>
                      </div>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.timings}
                      </p>
                    </div>
                  </td>
                  {/* Actions */}
                  <td className="p-4 relative">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          setActiveMenu(activeMenu === item.id ? null : item.id)
                        }
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>

                      {activeMenu === item.id && (
                        <div
                          className={`absolute right-4 ${index >= amenities.length - 3 ? "bottom-12" : "top-12"} bg-white border rounded-lg shadow-lg z-50 p-2 w-38`}
                        >
                          <div className="flex flex-col">
                            <button
                              onClick={() => {
                                navigate(`/amenities/edit/${item.id}`);
                                setActiveMenu(null);
                              }}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded"
                            >
                              <i className="bi bi-pencil-square"></i>
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                navigate(`/amenities/view/${item.id}`);
                                setActiveMenu(null);
                              }}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded"
                            >
                              <i className="bi bi-eye"></i>
                              <span>View</span>
                            </button>

                            {item.bookingType === "Bookable" &&
                              item.availability === "Available" &&
                              item.status === "Active" && (
                                <button
                                  onClick={() => {
                                    setActiveMenu(null);

                                    navigate("/amenities/amenitybooking", {
                                      state: {
                                        amenity: item,
                                      },
                                    });
                                  }}
                                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded w-full text-left"
                                >
                                  <i className="bi bi-calendar-check-fill"></i>
                                  <span>Booking</span>
                                </button>
                              )}

                            <button
                              onClick={() => {
                                navigate(`/amenities/timing/${item.id}`);
                                setActiveMenu(null);
                              }}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded"
                            >
                              <i className="bi bi-alarm"></i>
                              <span>Timings</span>
                            </button>

                            <button
                              onClick={() => {
  console.log(item.images);

  setSelectedImages(
    item.images?.map((img) => img.url || img) || []
  );

  setCurrentImageIndex(0);
  setShowImagesModal(true);
  setActiveMenu(null);
}}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded"
                            >
                              <i className="bi bi-image-fill"></i>
                              <span>Images</span>
                            </button>

                            <button
                              onClick={() => {
                                setEditingStatusId(item.id);
                                setActiveMenu(null);
                              }}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded"
                            >
                              <i className="bi bi-arrow-repeat"></i>
                              <span>Status</span>
                            </button>

                            <button
                              onClick={() => {
                                setActiveMenu(null);
                                setSelectedId(item.id);
                                setDeleteModal(true);
                              }}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded text-red-600"
                            >
                              <i className="bi bi-trash"></i>
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeletePopup
        isOpen={deleteModal}
        title="Delete Amenity"
        message="Are you sure you want to delete this amenity?"
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteModal(false);
          setSelectedId(null);
        }}
      />

      {showImagesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowImagesModal(false)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            <div className="flex items-center justify-center gap-6">
              {/* Previous */}
              {selectedImages.length > 1 && (
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      currentImageIndex === 0
                        ? selectedImages.length - 1
                        : currentImageIndex - 1,
                    )
                  }
                  className="text-4xl px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  ❮
                </button>
              )}

              {/* Image */}
              <img
                src={selectedImages[currentImageIndex]}
                alt="Amenity"
                className={`object-cover rounded-xl border ${
                  selectedImages.length === 1
                    ? "w-[800px] h-[500px]" // single image badi
                    : "w-[650px] h-[420px]" // multiple images
                }`}
              />

              {/* Next */}
              {selectedImages.length > 1 && (
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      currentImageIndex === selectedImages.length - 1
                        ? 0
                        : currentImageIndex + 1,
                    )
                  }
                  className="text-4xl px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  ❯
                </button>
              )}
            </div>

            {/* Image Count */}
            {selectedImages.length > 1 && (
              <p className="text-center mt-5 text-gray-600 font-medium">
                {currentImageIndex + 1} of {selectedImages.length}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
