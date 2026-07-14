import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import payslipData from "../../data/payslip.json";
import { downloadPDF } from "../../utils/downloadPDF";
import { ToWords } from "to-words";

const ViewpayslipPdf = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const payslipRef = useRef();

    const [isDownloading, setIsDownloading] = useState(false);
    const [zoom, setZoom] = useState(100);

    const employee = payslipData.find(
        (item) => item.id === Number(id)
    );


    if (!employee) {
        return (
            <h2 className="p-6">
                Employee Not Found
            </h2>
        );
    }



    const handleDownload = async () => {

        setIsDownloading(true);

        await downloadPDF(
            payslipRef.current,
            `Payslip-${employee.employee}.pdf`
        );

        setIsDownloading(false);

    };

    const toWords = new ToWords({
        localeCode: "en-IN",
        converterOptions: {
            currency: false,
            ignoreDecimal: true,
            ignoreZeroCurrency: true,
        },
    });

    return (


        <div className="min-h-screen bg-white">

            {/* Header */}
            <div className="p-6 flex justify-between items-start">

                <div>
                    <p className="text-md text-gray-500">
                        <button onClick={() => navigate("/dashboard")}> Dashboard</button> /
                        <button onClick={() => navigate("/staff/profile/salary-payroll")}>Payroll</button>  /
                        <button
                            onClick={() => navigate(`/staff/profile/salary-payroll/view-payslip/${employee.id}`)}>Payslip </button> /

                        <span className="font-bold text-gray-900 pl-2">Download PDF</span>
                    </p>

                    <h1 className="text-4xl font-bold  mt-2">
                        Download PDF
                    </h1>

                    <p className=" text-md text-gray-500 mt-1">
                        Your payslip is ready to download.
                    </p>
                </div>


                <button
                    onClick={() =>
                        navigate(`/staff/profile/salary-payroll/view-payslip/${id}`)
                    }
                    className="border px-5 py-2 rounded-lg"
                >
                    <i className="bi bi-arrow-left mr-2"></i>
                    Back to Payslip
                </button>

            </div>




            {/* Gray PDF Viewer */}
            <div className="bg-gray-600  min-h-screen rounded-lg mx-6 ">


                {/* Toolbar */}
                <div className="bg-[#2f2f2f] text-white rounded-lg px-5 py-3 mb-1">

                    <div className="flex items-center justify-between">

                        {/* Left */}
                        <div className="flex items-center gap-3 flex-1">
                            <i className="bi bi-list text-white text-xl"></i>

                            <span className="truncate font-medium">
                                Payslip_{employee.payPeriod.replace(/\s+/g, "_")}_{employee.employee.replace(/\s+/g, "_")}.pdf
                            </span>
                        </div>

                        {/* Center */}
                        <div className="flex items-center justify-center gap-3 flex-1">

                            <span className="pr-10">1 / 1</span>

                            <button
                                onClick={() => setZoom((z) => Math.max(50, z - 10))}
                                className="w-8 h-8 hover:bg-[#444] rounded flex items-center justify-center"
                            >
                                <i className="bi bi-dash-lg text-2xl"></i>
                            </button>

                            <button
                                onClick={() => setZoom((z) => Math.min(200, z + 10))}
                                className="w-8 h-8 hover:bg-[#444] rounded flex items-center justify-center"
                            >
                                <i className="bi bi-plus-lg fw-bold "></i>
                            </button>

                            <span className="px-3">
                                {zoom}%
                            </span>



                        </div>

                        {/* Right */}
                        <div className="flex items-center justify-end gap-2 flex-1">

                            <button
                                onClick={handleDownload}
                                className="w-9 h-9 hover:bg-[#444] rounded flex items-center justify-center"
                            >
                                <i className="bi bi-download"></i>
                            </button>

                            <button
                                onClick={() => window.print()}
                                className="w-9 h-9 hover:bg-[#444] rounded flex items-center justify-center"
                            >
                                <i className="bi bi-printer"></i>
                            </button>

                            <button className="w-9 h-9 hover:bg-[#444] rounded flex items-center justify-center">
                                <i className="bi bi-three-dots-vertical"></i>
                            </button>

                        </div>

                    </div>

                </div>

                <div
                    ref={payslipRef}
                    className="bg-white w-[794px] mx-auto p-6"
                    style={{
                        minHeight: "1123px",
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: "top center",
                    }}
                >
                    <div className="flex justify-between items-start border-b pb-5 mb-6">

                        {/* Left */}
                        <div className="flex items-start gap-4">

                            {/* Logo */}
                            <div className="mt-3">
                                <i className="bi bi-buildings-fill text-7xl  text-[#0B1F66]"></i>
                            </div>

                            {/* Society Details */}
                            <div>
                                <h2 className="text-xl font-bold text-[#0B1F66]">
                                    Green View Heights
                                </h2>

                                <p className="text-sm font-semibold">
                                    Co-operative Housing Society Ltd.
                                </p>

                                <p className="text-xs text-gray-600">
                                    Survey No. 21, Baner Road
                                </p>

                                <p className="text-xs text-gray-600">
                                    Pune - 411045, Maharashtra
                                </p>

                                <p className="text-xs text-gray-600">
                                    GSTIN : 27ABCDE1234F1Z5
                                </p>
                            </div>

                        </div>

                        {/* Right */}
                        <div className="pr-10 flex-shrink-0">

                            <h1 className="text-2xl font-bold text-center mb-2 text-[#0B1F66]">
                                PAYSLIP
                            </h1>

                            <div
                                className="bg-blue-600 rounded-lg text-white font-semibold flex items-center justify-center "
                                style={{
                                    height: "40px",
                                    lineHeight: "40px",
                                }}
                            >
                                {employee.payPeriod}
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-gray-500">Pay Period :</span>
                                <span className="text-sm font-semibold">
                                    {employee.payPeriod}
                                </span>
                            </div>
                        </div>

                    </div>
                    {/* Employee Card */}
                    {/* Employee Details */}
                    <div className="border rounded-lg p-3 mb-6 h-full">
                        <div className="grid grid-cols-[1.7fr_1.5fr_1fr] gap-6 items-stretch">
                            {/* Left */}
                            <div className="flex gap-4">

                                <div className="w-20 h-20 rounded-full bg-blue-100 mt-5 flex items-center justify-center text-3xl font-bold text-blue-700">
                                    {employee.employee.charAt(0)}
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold">{employee.employee}</h3>

                                    <p className="text-sm text-gray-600 mt-2">
                                        Employee ID : <span className="font-medium">{employee.empId}</span>
                                    </p>

                                    <p className="text-sm text-gray-600 mt-1">
                                        Designation : <span className="font-medium">{employee.designation}</span>
                                    </p>

                                    <p className="text-sm text-gray-600 mt-1">
                                        Department : <span className="font-medium">{employee.department}</span>
                                    </p>
                                </div>

                            </div>

                            {/* Center */}
                            <div className="border-l pl-6 space-y-2">

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Date of Joining</span>
                                    <span className="font-semibold">{employee.joiningDate}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Pay Date</span>
                                    <span className="font-semibold">31 May 2025</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Pay Mode</span>
                                    <span className="font-semibold">Bank Transfer</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Bank Name</span>
                                    <span className="font-semibold">HDFC Bank</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">A/C No.</span>
                                    <span className="font-semibold">XXXX XXXX 4589</span>
                                </div>

                            </div>

                            {/* Right */}
                            <div className="border-l bg-green-50 pl-6 py-6 flex flex-col justify-center h-full">
                                <p className="text-md font-bold  pl-5 text-gray-900">
                                    NET PAY
                                </p>

                                <h2 className="text-3xl font-bold text-green-700 mt-2">
                                    ₹{employee.netSalary.toLocaleString()}
                                </h2>

                                <p className="text-xs italic mt-1 text-gray-600">
                                    (Ruppes {toWords.convert(employee.netSalary)} Only)
                                </p>

                            </div>

                        </div>

                    </div>





                    {/* Payslip Details */}


                    <div className="bg-white border rounded-xl p-6">


                        <div className="grid grid-cols-3 gap-2">


                            {/* Earnings */}
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                <table className="w-full border-collapse">
                                    <thead className="bg-green-100">
                                        <tr>
                                            <th className="border text-green-700 border-gray-300 px-4 py-3 text-left">
                                                Earnings
                                            </th>
                                            <th className="border text-green-700 border-gray-300 px-4 py-3 text-right">
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td className="border px-4 py-3">Basic Salary</td>
                                            <td className="border px-4 py-3 text-right">₹{employee.basic}</td>
                                        </tr>

                                        <tr>
                                            <td className="border px-4 py-3">House Rent Allowance</td>
                                            <td className="border px-4 py-3 text-right">₹{employee.hra}</td>
                                        </tr>

                                        <tr>
                                            <td className="border px-4 py-3">Conveyance Allowance</td>
                                            <td className="border px-4 py-3 text-right">₹{employee.conveyance}</td>
                                        </tr>

                                        <tr>
                                            <td className="border px-4 py-3">Medical Allowance</td>
                                            <td className="border px-4 py-3 text-right">₹{employee.medical}</td>
                                        </tr>

                                        <tr>
                                            <td className="border px-4 py-3">Special Allowance</td>
                                            <td className="border px-4 py-3 text-right">
                                                ₹{employee.specialAllowance}
                                            </td>
                                        </tr>

                                        <tr className="text-green-700 font-bold">
                                            <td className="border-t px-4 py-3">Total Earnings</td>
                                            <td className="border-t px-4 py-3 text-right text-green-700">
                                                ₹{employee.grossSalary.toLocaleString()}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>



                            {/* Deduction */}

                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                <table className="w-full border-collapse">
                                    <thead className="bg-red-100">
                                        <tr>
                                            <th className="border text-red-700 border-gray-300 px-4 py-3 text-left">
                                                Deductions
                                            </th>
                                            <th className="border text-red-700 border-gray-300 px-4 py-3 text-right">
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td className="border px-4 py-3">Provident Fund</td>
                                            <td className="border px-4 py-3 text-right">₹{employee.pf}</td>
                                        </tr>

                                        <tr>
                                            <td className="border px-4 py-3">Professional Tax</td>
                                            <td className="border px-4 py-3 text-right">
                                                ₹{employee.professionalTax}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border px-4 py-3">Income Tax</td>
                                            <td className="border px-4 py-3 text-right">
                                                ₹{employee.incomeTax}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border px-4 py-3">ESI</td>
                                            <td className="border px-4 py-3 text-right">₹{employee.esi}</td>
                                        </tr>

                                        <tr>
                                            <td className=" px-4 py-3">&nbsp;</td>
                                            <td className=" px-4 py-3">&nbsp;</td>
                                        </tr>


                                        <tr className=" font-bold">
                                            <td className="border-t text-red-700 px-4 py-3">Total Deductions</td>
                                            <td className="border-t px-4 py-3 text-right text-red-700">
                                                ₹{employee.deduction.toLocaleString()}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Summary */}
                            <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
                                <table className="w-full border-collapse">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border border-gray-300 px-4 py-3 text-left">Summary</th>
                                            <th className="border border-gray-300 px-4 py-3 text-right">Amount</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-3">Gross Salary</td>
                                            <td className="border border-gray-300 px-4 py-3 text-right font-semibold text-blue-600">
                                                ₹{employee.grossSalary.toLocaleString()}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border border-gray-300 px-4 py-3">Total Deductions</td>
                                            <td className="border border-gray-300 px-4 py-3 text-right font-semibold text-red-600">
                                                ₹{employee.deduction.toLocaleString()}
                                            </td>
                                        </tr>

                                        <tr >
                                            <td className="border border-gray-300 px-4 py-3 font-bold">Net Pay</td>
                                            <td className="border border-gray-300 px-4 py-3 text-right font-bold text-green-600">
                                                ₹{employee.netSalary.toLocaleString()}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className=" border-gray-300 px-4 py-4 font-semibold" colSpan={2}>
                                                Amount In Words
                                            </td>
                                        </tr>

                                        <tr>
                                            <td
                                                className=" border-gray-300 px-4 py-2 text-sm  text-gray-700"
                                                colSpan={2}
                                            >
                                                Rupees {toWords.convert(employee.netSalary)} Only
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>



                        <div className="mt-8 border-t pt-5 flex justify-between items-end">

                            {/* Left */}
                            <div>
                                <p className="text-sm">
                                    <span className="font-semibold text-gray-700">Generated On:</span>{" "}
                                    <span className="text-[#0B1F66]">
                                        {new Date().toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            hour12: true,
                                        })}
                                    </span>
                                </p>
                            </div>

                            {/* Right */}
                            <div className="text-right">
                                <div className="h-10"></div>
                                <div className="border-t border-gray-400 w-40 ml-auto"></div>
                                <p className="text-sm text-gray-600 mt-2">
                                    Authorized Signature
                                </p>
                            </div>

                        </div>


                    </div>


                </div>


            </div>
        </div>


    )

}


export default ViewpayslipPdf;