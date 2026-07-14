import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { exportToExcel } from "../../../utils/exportToExcel";

const Step4ConfirmProcess = ({
    employees,
    selectedEmployees,
    prevStep,
}) => {

    const navigate = useNavigate();

    const [processing, setProcessing] = useState(false);
    const [completed, setCompleted] = useState(false);

    const selectedData = employees.filter((emp) =>
        selectedEmployees.includes(emp.id)
    );

    const reportData = selectedData.map((emp) => ({
        "Employee ID": emp.id,
        "Employee Name": emp.name,
        Role: emp.role,
        Department: emp.department,
        "Basic Salary": emp.basic,
        "Gross Salary": emp.gross,
        Deductions: emp.deduction,
        "Net Salary": emp.net,
    }));

    const handleProcessPayroll = () => {
        setProcessing(true);

        setTimeout(() => {
            setProcessing(false);
            setCompleted(true);
        }, 3000);
    };

    return (
        <div className="space-y-6">

            <div className="bg-white rounded-xl border p-8 text-center">

                {!completed ? (
                    <>
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-5">
                            <i className="bi bi-wallet2 text-4xl text-blue-700"></i>
                        </div>

                        <h2 className="text-3xl font-bold">
                            Confirm Payroll Processing
                        </h2>

                        <p className="text-gray-500 mt-3">
                            You are about to process payroll for
                            <span className="font-semibold">
                                {" "} {selectedData.length} Employees
                            </span>.
                        </p>

                        <div className="max-w-md mx-auto mt-8 border rounded-xl">

                            <div className="flex justify-between p-4 border-b">
                                <span>Total Employees</span>
                                <b>{selectedData.length}</b>
                            </div>

                            <div className="flex justify-between p-4 border-b">
                                <span>Gross Salary</span>
                                <b>₹24,58,000</b>
                            </div>

                            <div className="flex justify-between p-4 border-b">
                                <span>Total Deduction</span>
                                <b className="text-red-600">
                                    ₹4,76,300
                                </b>
                            </div>

                            <div className="flex justify-between p-4">
                                <span>Net Payable</span>
                                <b className="text-green-600">
                                    ₹19,81,700
                                </b>
                            </div>

                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8 flex gap-3 text-left">

                            <i className="bi bi-exclamation-triangle-fill text-yellow-600"></i>

                            <p className="text-sm">
                                Payroll processing cannot be undone after confirmation.
                                Please verify all details before continuing.
                            </p>

                        </div>

                        <div className="flex justify-between mt-8">

                            <button
                                onClick={prevStep}
                                disabled={processing}
                                className="px-6 py-3 border rounded-lg"
                            >
                                <i className="bi bi-arrow-left me-2"></i>
                                Previous
                            </button>

                            <button
                                onClick={handleProcessPayroll}
                                disabled={processing}
                                className="px-6 py-3 bg-blue-700 text-white rounded-lg"
                            >
                                {processing ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-circle me-2"></i>
                                        Process Payroll
                                    </>
                                )}
                            </button>

                        </div>

                    </>
                ) : (
                    <>

                        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                            <i className="bi bi-check-circle-fill text-5xl text-green-600"></i>
                        </div>

                        <h2 className="text-3xl font-bold text-green-700">
                            Payroll Processed Successfully
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Payroll has been generated successfully for all selected employees.
                        </p>

                        <div className="flex justify-center gap-4 mt-8">

                            <button
                                onClick={() => exportToExcel(reportData, "Payroll_Report")}
                                className="border px-5 py-3 rounded-lg hover:bg-gray-100"
                            >
                                <i className="bi bi-download me-2"></i>
                                Download Report
                            </button>

                            <button
                                onClick={() => navigate("/staff/profile/salary-payroll")}
                                className="bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-800"
                            >
                                <i className="bi bi-house-door me-2"></i>
                                Back to Payroll
                            </button>

                        </div>

                    </>
                )}

            </div>

        </div>
    );
};

export default Step4ConfirmProcess;