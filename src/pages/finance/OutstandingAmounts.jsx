import React, { useEffect, useState } from "react";
import { Breadcrumb } from "../../components/Breadcrumb";
import { Pagination } from "../../components/Pagination";
import { OutstandingCards } from "./financeComponents/outstandingAmounts/OutstandingCards";
import { OutstandingFilter } from "./financeComponents/outstandingAmounts/OutstandingFilter";
import { OutstandingTable } from "./financeComponents/outstandingAmounts/OutstandingTable";
import { outstandingData } from "./financeComponents/outstandingAmounts/outstandingData";

export const OutstandingAmount = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    // Filter
    const filteredData = outstandingData.filter((item) => {
        const matchesTab =
            activeTab === "All" || item.status === activeTab;

        const keyword = search.toLowerCase();

        const matchesSearch =
            item.name.toLowerCase().includes(keyword) ||
            item.invoice.toLowerCase().includes(keyword) ||
            item.category.toLowerCase().includes(keyword);

        return matchesTab && matchesSearch;
    });

    // Search ya Tab change hone par page 1 pe aao
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, search]);

    // Pagination
    const totalItems = filteredData.length;
    const totalPages = Math.max(
        1,
        Math.ceil(totalItems / itemsPerPage)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentData = filteredData.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6">
            <div className="flex justify-between items-center">
                <Breadcrumb
                items={[
                    { label: "Dashboard",
                        path: "/dashboard",
                     },
                    { label: "Finance",
                        path: "finance"
                     },
                    { label: "Outstanding Amount" },
                ]}
                title="Outstanding Amount"
                subtitle="View all outstanding dues from residents, suppliers and others."
            />

                <div className="flex gap-3 mt-10">
                    <button 
                    onClick={() => alert(`${window.screen.width} x ${window.screen.height}`)} className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
                    <i className="bi bi-download"></i>
                    Export
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
                    <i className="bi bi-funnel"></i>
                    Filters
                </button>

                </div>
            </div>

            {/* Cards */}

            <OutstandingCards data={outstandingData} />

            {/* Tabs + Search */}

            <OutstandingFilter
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                search={search}
                setSearch={setSearch}
                data={outstandingData}
            />

            {/* Table */}

            <OutstandingTable data={currentData} />

            {/* Pagination */}

            {totalItems > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            )}

        </div>
    );
};