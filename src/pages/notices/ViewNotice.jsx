import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../component/Breadcrumb";
import { useApp } from "../../context/AppContext";

const ViewNotice = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { notices, getStatusStyle } = useApp();

    const notice = notices.find((n) => n.id === Number(id));

    if (!notice) {
        return (
            <div className="p-6">
                <h3>Notice not found.</h3>
            </div>
        );
    }


    console.log(notice);

    const handleDownload = () => {
        if (!notice.attachment) return;

        const link = document.createElement("a");
        link.href = notice.attachment.data; // Base64 data
        link.download = notice.attachment.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            <Breadcrumb
                items={[
                    { label: "Dashboard", path: "/dashboard" },
                    { label: "Notices", path: "/notices" },
                    { label: "Notice Details" },
                ]}
            />

            {/* Header */}

            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mt-5 mb-6">

                <h1 className="text-4xl font-bold text-[#16215B]">
                    Notice Details
                </h1>

                <button
                    onClick={() => navigate(-1)}
                    className="border rounded-xl px-5 py-3 bg-white hover:bg-gray-100 transition"
                >
                    <i className="bi bi-arrow-left me-2"></i>

                    Back to Notices
                </button>

            </div>

            {/* Main Grid */}

            <div className="grid lg:grid-cols-3 gap-6">

                {/* LEFT */}

                <div className="lg:col-span-2">

                    <div className="bg-white rounded-2xl border shadow-sm p-8">

                        {/* Top */}

                        <div className="flex gap-5">
                            <div
                                className="w-[90px] h-[90px] rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-4xl"
                            >
                                {notice.title?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">

                                <span
                                    className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-md ${getStatusStyle(
                                        notice.category
                                    )}`}
                                >
                                    {notice.category}
                                </span>
                                <h2 className="text-4xl font-bold mt-3">

                                    {notice.title}

                                </h2>

                                <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-600">

                                    <div className="flex items-center gap-2">

                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                                            {(notice.author?.name || notice.author || "")
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <span>
                                            Published by{" "}
                                            <strong>
                                                {notice.author?.name || notice.author} (
                                                {notice.author?.role || notice.role})
                                            </strong>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <i className="bi bi-calendar3"></i>

                                        <span>
                                            {notice.createdAt
                                                ? new Date(notice.createdAt).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })
                                                : notice.publishDate}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <i className="bi bi-clock"></i>

                                        <span>
                                            {notice.createdAt
                                                ? new Date(notice.createdAt).toLocaleTimeString("en-IN", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })
                                                : notice.publishTime}
                                        </span>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <hr className="my-8" />

                        {/* Description */}

                        <div
                            className="text-[17px] leading-8 text-gray-700"
                            dangerouslySetInnerHTML={{
                                __html: notice.description || "",
                            }}
                        />

                        {/* Attachments */}

                        {notice.attachment && (
                            <div className="mt-10">
                                <h5 className="font-semibold text-lg mb-4">
                                    Attachment
                                </h5>

                                <div className="border rounded-xl p-4 flex items-center gap-3">
                                    <i className="bi bi-file-earmark-text text-2xl text-blue-600"></i>

                                    <div>
                                        <p className="font-medium">
                                            {notice.attachment?.name || notice.attachment}
                                        </p>

                                        {notice.attachment?.size && (
                                            <p className="text-sm text-gray-500">
                                                {(notice.attachment.size / 1024).toFixed(1)} KB
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Information */}

                        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-3">

                            <i
                                className="bi bi-exclamation-circle text-blue-700"
                                style={{ fontSize: 24 }}
                            ></i>

                            <div>

                                <h6 className="font-semibold">
                                    This is an official communication from the management.
                                </h6>

                                <p className="text-gray-600">
                                    Please contact the management office if you have any
                                    questions regarding this notice.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="space-y-5">

                    {/* Notice Information */}

                    <div className="bg-white rounded-2xl border shadow-sm p-6">

                        <div className="flex items-center gap-3 mb-5">

                            <div className="bg-blue-100 rounded-lg p-2">

<i className="bi bi-exclamation-circle text-blue-700"></i>
                            </div>

                            <h4 className="font-bold text-xl">
                                Notice Information
                            </h4>

                        </div>

                        <div className="space-y-4">

                            <div className="flex justify-between">
                                <span className="text-gray-500">Notice ID</span>
                                <span className="font-semibold">{notice.id}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Category</span>

                                <span
                                    className={`px-3 py-1 rounded-md text-sm ${getStatusStyle(
                                        notice.category
                                    )}`}
                                >
                                    {notice.category}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Status</span>

                                <span
                                    className={`px-3 py-1 rounded-md text-sm ${getStatusStyle(
                                        notice.status
                                    )}`}
                                >
                                    {notice.status}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Priority</span>

                                <span
                                    className={`px-3 py-1 rounded-md text-sm ${getStatusStyle(
                                        notice.priority
                                    )}`}
                                >
                                    {notice.priority || "Normal"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Published On</span>

                                <span className="font-medium">
                                    {notice.createdAt
                                        ? new Date(notice.createdAt).toLocaleDateString()
                                        : notice.publishDate || "-"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Expires On</span>

                                <span>{notice.expiresOn || "-"}</span>
                            </div>

                        </div>

                    </div>

                    {/* Audience */}

                    <div className="bg-white rounded-2xl border shadow-sm p-6">

                        <div className="flex items-center gap-3 mb-5">

                            <div className="bg-blue-100 rounded-lg p-2">

                                <i className="bi bi-people text-blue-700"></i>

                            </div>

                            <h4 className="font-bold text-xl">
                                Notice Audience
                            </h4>

                        </div>

                        <p className="text-gray-500 mb-2">
                            This notice is visible to
                        </p>

                        <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm">
                            {notice.audience === "all"
                                ? "All Residents"
                                : notice.audience === "tower"
                                    ? "Specific Towers"
                                    : "Specific Flats"}
                        </span>

                        <div className="mt-5 space-y-3">
                            {/* Selected Towers */}

                            {notice.audience === "tower" &&
                                notice.selectedTowers?.length > 0 && (
                                    <div className="mt-4">

                                        <p className="text-gray-500 mb-2">
                                            Selected Towers
                                        </p>

                                        <div className="flex flex-wrap gap-2">

                                            {notice.selectedTowers.map((tower, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                                >
                                                    {tower}
                                                </span>
                                            ))}

                                        </div>

                                    </div>
                                )}


                            {/* Selected Flats */}

                            {notice.audience === "flat" &&
                                notice.selectedFlats?.length > 0 && (
                                    <div className="mt-4">

                                        <p className="text-gray-500 mb-2">
                                            Selected Flats
                                        </p>

                                        <div className="flex flex-wrap gap-2">

                                            {notice.selectedFlats.map((flat, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                                                >
                                                    {flat}
                                                </span>
                                            ))}

                                        </div>

                                    </div>
                                )}

                            <div className="flex justify-between">

                                <span>Total Recipients</span>

                                <strong>{notice.recipients || 0}</strong>
                            </div>

                            <div className="flex justify-between">

                                <span>Read By</span>

                                <strong>
                                    {notice.readBy || 0} (
                                    {notice.recipients
                                        ? Math.round((notice.readBy / notice.recipients) * 100)
                                        : 0}
                                    %)
                                </strong>

                            </div>

                        </div>

                    </div>

                    {/* Actions */}

                    <div className="bg-white rounded-2xl border shadow-sm p-6">

                        <div className="flex items-center gap-3 mb-5">

                            <div className="bg-blue-100 rounded-lg p-2">

                                <i className="bi bi-lightning-charge text-blue-700"></i>

                            </div>

                            <h4 className="font-bold text-xl">
                                Actions
                            </h4>

                        </div>

                        <button
                            onClick={handleDownload}
                            disabled={!notice.attachment}
                            className={`w-full border rounded-xl p-3 flex justify-between items-center
    ${notice.attachment
                                    ? "hover:bg-gray-50 cursor-pointer"
                                    : "opacity-50 cursor-not-allowed"
                                }`}
                        >
                            Download Attachment
                            <i className="bi bi-download"></i>
                        </button>


                    </div>

                </div>

            </div>

        </div>
    );
};

export default ViewNotice;