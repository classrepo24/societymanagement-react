import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";


const MaintenanceSettings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(1);

    const tabs = [
        { id: 1, label: "General", icon: "bi bi-gear", path: "/maintenance-settings/general-settings" },
        { id: 2, label: "Components", icon: "bi bi-boxes", path: "/maintenance-settings/components"  },
        { id: 3, label: "Billing & Due Dates", icon: "bi bi-calendar3",  },
        { id: 4, label: "Late Fees & Interest", icon: "bi bi-currency-rupee",path: "/maintenance-settings/raise-maintenance-settings" },
        { id: 5, label: "Flat Categories", icon: "bi bi-buildings" },
        { id: 6, label: "Payment Settings", icon: "bi bi-credit-card" },
        { id: 7, label: "Notifications", icon: "bi bi-bell" },
        { id: 8, label: "Receipt & Tax", icon: "bi bi-receipt" },
        { id: 9, label: "Advanced", icon: "bi bi-sliders" },
    ];

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center m-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Maintenance Settings
                    </h1>
                    <p className="text-gray-500">
                        Configure maintenance charges and billing settings.
                    </p>
                </div>

                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
                    Save Settings
                </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden m-6">
                <div className="flex w-full">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                navigate(tab.path);
                            }}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium border-r last:border-r-0 transition-all duration-200
    ${activeTab === tab.id
                                    ? "text-blue-600 border-b-2 border-b-blue-600 bg-white"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <i className={tab.icon}></i>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default MaintenanceSettings;