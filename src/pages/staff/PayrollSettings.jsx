import React, { useState, useEffect } from "react";
import StatsCards from "../../component/StatsCards";
import Breadcrumb from "../../component/Breadcrumb";
const PayrollSettings = () => {
    const [frequency, setFrequency] = useState("Monthly");
    const [payDay, setPayDay] = useState("31");
    const [financialYear, setFinancialYear] = useState("April - March (Default)");
    const [showModal, setShowModal] = useState(false);
    const [companyLogo, setCompanyLogo] = useState(null);
    const [modalType, setModalType] = useState("Earning");

    const [newComponent, setNewComponent] = useState({
        name: "",
        type: "Earning",
    });
    const [allowOvertime, setAllowOvertime] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem("payrollSettings");

        if (saved) {
            const data = JSON.parse(saved);

            setFrequency(data.frequency);
            setPayDay(data.payDay);
            setFinancialYear(data.financialYear);
            setAllowOvertime(data.allowOvertime);
            setSalaryComponents(data.salaryComponents);
            setDeductionComponents(data.deductionComponents);
            setCompanyLogo(data.companyLogo);
        }
    }, []);

    const [deductionComponents, setDeductionComponents] = useState([
        {
            id: 1,
            name: "Provident Fund (PF)",
            type: "Deduction",
            active: true,
        },
        {
            id: 2,
            name: "Professional Tax",
            type: "Deduction",
            active: true,
        },
        {
            id: 3,
            name: "Income Tax (TDS)",
            type: "Deduction",
            active: true,
        },
        {
            id: 4,
            name: "ESI",
            type: "Deduction",
            active: true,
        },
        {
            id: 5,
            name: "Loan / Advance",
            type: "Deduction",
            active: true,
        },
    ]);
    const [salaryComponents, setSalaryComponents] = useState([
        {
            id: 1,
            name: "Basic Salary",
            type: "Earning",
            active: true,
        },
        {
            id: 2,
            name: "House Rent Allowance (HRA)",
            type: "Earning",
            active: true,
        },
        {
            id: 3,
            name: "Conveyance Allowance",
            type: "Earning",
            active: true,
        },
        {
            id: 4,
            name: "Medical Allowance",
            type: "Earning",
            active: true,
        },
        {
            id: 5,
            name: "Special Allowance",
            type: "Earning",
            active: true,
        },
    ]);

    const cards = [
        {
            icon: "bi bi-calendar2-week",
            title: "Pay Period",
            value: "Monthly",
            subtitle: "Payment Frequency",
            color: "bg-violet-100 text-violet-600",
        },
        {
            icon: "bi bi-calendar-check",
            title: "Next Payroll Date",
            value: "31 May 2025",
            subtitle: "10 days remaining",
            color: "bg-green-100 text-green-600",
        },
        {
            icon: "bi bi-people",
            title: "Total Employees",
            value: "48",
            subtitle: "Active Employees",
            color: "bg-orange-100 text-orange-600",
        },
        {
            icon: "bi bi-cash",
            title: "Default Currency",
            value: "INR (₹)",
            subtitle: "Indian Rupee",
            color: "bg-blue-100 text-blue-600",
        },
    ];

    //toggle
    const toggleComponent = (id, type) => {
        if (type === "Earning") {
            setSalaryComponents((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, active: !item.active } : item
                )
            );
        } else {
            setDeductionComponents((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, active: !item.active } : item
                )
            );
        }
    };

    //add component
    const handleSaveComponent = () => {
        if (!newComponent.name.trim()) return;

        const item = {
            id: Date.now(),
            name: newComponent.name,
            type: modalType,
            active: true,
        };

        if (modalType === "Earning") {
            setSalaryComponents((prev) => [...prev, item]);
        } else {
            setDeductionComponents((prev) => [...prev, item]);
        }

        setNewComponent({
            name: "",
            type: "Earning",
        });

        setShowModal(false);
    };
    //upload logo
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setCompanyLogo(imageUrl);
    };
    //save settings
    const handleSaveSettings = () => {
        const payrollSettings = {
            frequency,
            payDay,
            financialYear,
            allowOvertime,
            salaryComponents,
            deductionComponents,
            companyLogo,
        };

        localStorage.setItem(
            "payrollSettings",
            JSON.stringify(payrollSettings)
        );

    };
    return (
        <div className="bg-[#F8FAFC] min-h-screen p-6">

            {/* Breadcrumb */}

            <Breadcrumb
                items={[
                    { label: "Dashboard", path: "/dashboard" },
                    { label: "Payroll", path: "/staff/profile/salary-payroll" },
                    { label: "Payroll Settings" },
                ]}
            />

            {/* Header */}

            <div className="flex justify-between items-start mb-6">

                <div>

                    <h1 className="text-4xl font-bold text-[#0B1F66]">
                        Payroll Settings
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Configure and manage payroll preferences and rules.
                    </p>

                </div>

                <button
                    onClick={handleSaveSettings}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 flex items-center gap-2"
                >
                    <i className="bi bi-floppy"></i>
                    Save Settings
                </button>

            </div>

            {/* Summary Cards */}

            <StatsCards cards={cards} />

            {/* Row */}

            <div className="grid grid-cols-3 gap-6">

                {/* General Settings */}

                <div className="bg-white rounded-xl border shadow-sm p-6">

                    <div className="flex gap-3 items-center mb-6">

                        <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">

                            <i className="bi bi-gear text-2xl"></i>

                        </div>

                        <div>

                            <h2 className="font-bold text-xl text-[#0B1F66]">
                                General Settings
                            </h2>

                        </div>

                    </div>

                    {/* Payroll Frequency */}

                    <label className="block text-sm font-semibold mb-2">
                        Payroll Frequency
                    </label>

                    <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="border rounded-lg h-11 px-4 w-full mb-5"
                    >

                        <option>Monthly</option>
                        <option>Weekly</option>
                        <option>Bi Weekly</option>

                    </select>

                    {/* Pay Day */}

                    <label className="block text-sm font-semibold mb-2">
                        Pay Day
                    </label>

                    <select
                        value={payDay}
                        onChange={(e) => setPayDay(e.target.value)}
                        className="border rounded-lg h-11 px-4 w-full mb-5"
                    >

                        {[...Array(31)].map((_, i) => (
                            <option key={i + 1}>{i + 1}</option>
                        ))}

                    </select>

                    {/* Financial Year */}

                    <label className="block text-sm font-semibold mb-2">
                        Financial Year
                    </label>

                    <select
                        value={financialYear}
                        onChange={(e) => setFinancialYear(e.target.value)}
                        className="border rounded-lg h-11 px-4 w-full"
                    >

                        <option>
                            April - March (Default)
                        </option>

                        <option>
                            January - December
                        </option>

                    </select>

                    {/* Toggle */}

                    <div className="flex justify-between items-center mt-8">

                        <div>

                            <p className="font-semibold">
                                Allow Overtime
                            </p>

                            <p className="text-sm text-gray-500">
                                Enable overtime calculation in payroll
                            </p>

                        </div>

                        <button
                            onClick={() => setAllowOvertime(!allowOvertime)}
                            className={`w-12 h-6 rounded-full relative transition ${allowOvertime
                                ? "bg-blue-600"
                                : "bg-gray-300"
                                }`}
                        >

                            <span
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${allowOvertime
                                    ? "right-1"
                                    : "left-1"
                                    }`}
                            ></span>

                        </button>

                    </div>

                </div>

                {/* Blank */}

                <div className="bg-white rounded-xl border shadow-sm p-6">

                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                            <i className="bi bi-wallet2 text-2xl"></i>
                        </div>

                        <div>
                            <h2 className="font-bold text-xl text-[#0B1F66]">
                                Salary Components
                            </h2>

                            <p className="text-sm text-gray-500">
                                Manage salary components included in payroll.
                            </p>
                        </div>
                    </div>

                    {salaryComponents.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center py-3 border-b last:border-0"
                        >
                            <span>{item.name}</span>

                            <div className="flex items-center gap-4">

                                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                                    {item.type}
                                </span>

                                <button
                                    onClick={() => toggleComponent(item.id, "Earning")}
                                    className={`w-10 h-5 rounded-full relative transition ${item.active ? "bg-blue-600" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition ${item.active ? "right-0.5" : "left-0.5"
                                            }`}
                                    ></span>
                                </button>

                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => {
                            setModalType("Earning");
                            setShowModal(true);
                        }}
                        className="mt-6 border border-blue-500 text-blue-600 rounded-lg w-full py-3 font-semibold hover:bg-blue-50"
                    >
                        <i className="bi bi-plus-lg me-2"></i>
                        Add Component
                    </button>

                </div>

                <div className="bg-white rounded-xl border shadow-sm p-6">

                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                            <i className="bi bi-arrow-down-circle text-2xl"></i>
                        </div>

                        <div>
                            <h2 className="font-bold text-xl text-[#0B1F66]">
                                Deduction Components
                            </h2>

                            <p className="text-sm text-gray-500">
                                Manage deduction components in payroll.
                            </p>
                        </div>
                    </div>
                    {deductionComponents.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center py-3 border-b last:border-0"
                        >
                            <span>{item.name}</span>

                            <div className="flex items-center gap-4">

                                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                                    {item.type}
                                </span>

                                <button
                                    onClick={() => toggleComponent(item.id, "Deduction")}
                                    className={`w-10 h-5 rounded-full relative transition ${item.active ? "bg-blue-600" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition ${item.active ? "right-0.5" : "left-0.5"
                                            }`}
                                    ></span>
                                </button>

                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => { setModalType("Deduction"); setShowModal(true); }}
                        className="mt-6 border border-red-400 text-red-500 rounded-lg w-full py-3 font-semibold hover:bg-red-50">
                        <i className="bi bi-plus-lg me-2"></i>
                        Add Deduction
                    </button>

                </div>
            </div>

            {/* Bottom Section */}

            <div className="grid grid-cols-3 gap-6 mt-6">



                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">

                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <i className="bi bi-receipt-cutoff text-green-600 text-2xl"></i>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-[#0B1F66]">
                                Tax Settings
                            </h2>
                            <p className="text-sm text-gray-500">
                                Configure tax and statutory deductions
                            </p>
                        </div>

                    </div>

                    {/* Tax Regime */}

                    <label className="block text-sm font-medium mb-2">
                        Default Tax Regime
                    </label>

                    <select className="w-full h-11 border rounded-lg px-3 mb-4">
                        <option>Old Regime</option>
                        <option>New Regime</option>
                    </select>

                    {/* TDS */}

                    <label className="block text-sm font-medium mb-2">
                        TDS Calculation Method
                    </label>

                    <select className="w-full h-11 border rounded-lg px-3">
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Yearly</option>
                    </select>

                    {/* PF */}

                    <div className="flex justify-between items-center border rounded-lg p-4 mt-4">

                        <div>
                            <h4 className="font-medium text-gray-800">
                                Consider Investments for Tax Calculation
                            </h4>
                            <p className="text-sm text-gray-500">
                                Include employee investments in tax calculation
                            </p>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600
      after:content-[''] after:absolute after:top-0.5 after:left-[2px]
      after:bg-white after:h-5 after:w-5 after:rounded-full
      after:transition-all peer-checked:after:translate-x-5"></div>
                        </label>

                    </div>


                </div>
                <div className="bg-white rounded-xl border shadow-sm p-6">

                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                            <i className="bi bi-gear text-orange-500 text-2xl"></i>

                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-[#0B1F66]">
                                Other Settings
                            </h2>
                            <p className="text-sm text-gray-500">
                                Configure additional payroll options
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">

                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                defaultChecked
                                className="mt-1 h-4 w-4 accent-blue-600"
                            />
                            <div>
                                <p className="font-medium text-gray-800">
                                    Auto calculate payroll
                                </p>
                                <p className="text-sm text-gray-500">
                                    Automatically calculate payroll on processing
                                </p>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                defaultChecked
                                className="mt-1 h-4 w-4 accent-blue-600"
                            />
                            <div>
                                <p className="font-medium text-gray-800">
                                    Email payslip to employees
                                </p>
                                <p className="text-sm text-gray-500">
                                    Send payslip via email after processing
                                </p>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                defaultChecked
                                className="mt-1 h-4 w-4 accent-blue-600"
                            />
                            <div>
                                <p className="font-medium text-gray-800">
                                    Require approval before payroll processing
                                </p>
                                <p className="text-sm text-gray-500">
                                    Get approval before final payroll processing
                                </p>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="mt-1 h-4 w-4 accent-blue-600"
                            />
                            <div>
                                <p className="font-medium text-gray-800">
                                    Lock processed payroll
                                </p>
                                <p className="text-sm text-gray-500">
                                    Prevent changes after payroll is processed
                                </p>
                            </div>
                        </label>

                    </div>

                </div>


                {/* Payslip */}

                {/* Payslip Settings */}

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

                    {/* Header */}

                    <div className="flex items-center gap-3 mb-6">

                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                            <i className="bi bi-file-earmark-text text-purple-600 text-xl"></i>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-[#0B1F66]">
                                Payslip Settings
                            </h2>

                            <p className="text-sm text-gray-500">
                                Customize payslip preferences.
                            </p>
                        </div>

                    </div>

                    {/* Payslip Template */}

                    <div className="mb-5">

                        <label className="block text-sm font-medium mb-2">
                            Payslip Template
                        </label>

                        <select className="w-full h-11 border rounded-lg px-4 text-sm">
                            <option>Modern Template</option>
                            <option>Classic Template</option>
                        </select>

                    </div>

                    {/* Show Component */}

                    <div className="mb-6">

                        <label className="block text-sm font-medium mb-2">
                            Show Component Details
                        </label>

                        <select className="w-full h-11 border rounded-lg px-4 text-sm">
                            <option>Show All</option>
                            <option>Hide Earnings</option>
                            <option>Hide Deductions</option>
                        </select>

                    </div>

                    {/* Upload */}

                    <div className="flex justify-between items-start">

                        <div>

                            <label className="block text-sm font-medium">
                                Company Logo on Payslip
                            </label>

                            <p className="text-sm text-gray-500 mt-1">
                                Upload logo to display on payslip
                            </p>

                            <p className="text-xs text-gray-400 mt-3">
                                Recommended size: 200x60px (PNG, JPG)
                            </p>

                        </div>

                        <label className="border border-blue-500 text-blue-600 rounded-lg px-5 py-2 flex items-center gap-2 hover:bg-blue-50 cursor-pointer">

                            <i className="bi bi-upload"></i>

                            Upload Logo

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleLogoUpload}
                            />

                        </label>

                    </div>
                    {companyLogo && (
                        <div className="mt-4 flex items-center justify-between border rounded-lg p-2">

                            <img
                                src={companyLogo}
                                alt="Company Logo"
                                className="h-16 w-auto border object-contain"
                            />

                            <button
                                onClick={() => setCompanyLogo(null)}
                                className="text-red-600 hover:text-red-700 text-xl"
                                title="Remove Logo"
                            >
                                <i className="bi bi-trash"></i>
                            </button>

                        </div>
                    )}
                </div>
                {showModal && (
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

                        <div className="bg-white rounded-xl w-[420px] p-6">

                            <h2 className="text-xl font-semibold mb-5">
                                Add {modalType} Component
                            </h2>

                            <label className="block mb-2 text-sm font-medium">
                                Component Name
                            </label>

                            <input
                                type="text"
                                value={newComponent.name}
                                onChange={(e) =>
                                    setNewComponent({
                                        name: e.target.value,
                                    })
                                }
                                className="border rounded-lg w-full h-11 px-4 mb-6"
                            />

                            <div className="flex justify-end gap-3">

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="border rounded-lg px-5 py-2"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSaveComponent}
                                    className="bg-blue-600 text-white rounded-lg px-5 py-2"
                                >
                                    Save
                                </button>

                            </div>

                        </div>

                    </div>
                )}
            </div>
        </div>

    );
};

export default PayrollSettings;