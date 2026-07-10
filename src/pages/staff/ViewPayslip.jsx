import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import payslipData from "../../data/payslip.json"
import { useRef } from "react";
import { downloadPDF } from "../../utils/downloadPDF";

const ViewPayslip = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const payslipRef = useRef(null);

  const employee = payslipData.find(
    (emp) => emp.id === Number(id)
  );

  if (!employee) {
    return <h2 className="p-6">Employee Not Found</h2>;
  }

  const periods = [
    {
      month: "May 2025",
      date: "01 May 2025 - 31 May 2025",
      active: true,
    },
    {
      month: "April 2025",
      date: "01 Apr 2025 - 30 Apr 2025",
    },
    {
      month: "March 2025",
      date: "01 Mar 2025 - 31 Mar 2025",
    },
    {
      month: "February 2025",
      date: "01 Feb 2025 - 28 Feb 2025",
    },
    {
      month: "January 2025",
      date: "01 Jan 2025 - 31 Jan 2025",
    },
    {
      month: "December 2024",
      date: "01 Dec 2024 - 31 Dec 2024",
    },
  ];

  return (
    <div className="p-6 bg-[#F8FAFF] min-h-screen">

      {/* Breadcrumb */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <p className="text-sm text-gray-500">
            Dashboard / Payroll /{" "}
            <span className="text-[#0B1F66] font-semibold">Payslip</span>
          </p>

          <h1 className="text-4xl font-bold text-[#0B1F66] mt-2">
            Payslip
          </h1>

          <p className="text-gray-500 mt-1">
            View and download your payslip details.
          </p>
        </div>

        <button
          onClick={() => navigate("/staff/profile/salary-payroll")}
          className="border px-5 py-2 rounded-lg text-[#0B1F66] font-medium hover:bg-gray-50"
        >
          <i className="bi bi-arrow-left mr-2"></i>
          Back to Payroll
        </button>
      </div>

      {/* Employee Card */}

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">

        <div className="grid grid-cols-5 gap-5 items-center">

          <div className="flex items-center gap-4">

            <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-3xl font-bold border">
              {employee.employee.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0B1F66]">
                {employee.employee}
              </h2>

              <p className="text-gray-500">
                Employee ID : {employee.empId}
              </p>

              <p className="text-gray-500">
                Department : {employee.department}
              </p>
            </div>

          </div>

          <div className="border-l pl-5">
            <p className="text-sm text-gray-500">
              Designation
            </p>

            <h4 className="font-semibold mt-1">
              {employee.designation}
            </h4>
          </div>

          <div className="border-l pl-5">
            <p className="text-sm text-gray-500">
              Date of Joining
            </p>

            <h4 className="font-semibold mt-1">
              {employee.joiningDate}
            </h4>
          </div>

          <div className="border-l pl-5">
            <p className="text-sm text-gray-500">
              Pay Period
            </p>

            <h4 className="font-semibold mt-1">
              {employee.payPeriod}
            </h4>
          </div>

          <div className="border-l pl-5">
            <p className="text-sm text-gray-500">
              Net Pay
            </p>

            <h2 className="text-3xl text-green-600 font-bold mt-1">
              ₹{employee.netSalary.toLocaleString()}
            </h2>
          </div>

        </div>

      </div>

      {/* Main Section */}

      <div className="grid grid-cols-12 gap-6">

        {/* Left */}

        <div className="col-span-4">

          <div className="bg-white border rounded-xl p-5">

            <h2 className="text-2xl font-bold text-[#0B1F66] mb-5">
              Payslip Period
            </h2>

            <div className="space-y-4">

              {periods.map((item, index) => (

                <div
                  key={index}
                  className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition ${item.active
                      ? "bg-indigo-50 border-indigo-200"
                      : "hover:bg-gray-50"
                    }`}
                >

                  <div className="flex gap-4">

                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0B1F66] text-xl shadow">

                      <i className="bi bi-calendar-event"></i>

                    </div>

                    <div>

                      <h4 className="font-semibold text-[#0B1F66]">
                        {item.month}
                      </h4>

                      <p className="text-sm text-gray-500">
                        {item.date}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm">
                      Paid
                    </span>

                    <i className="bi bi-chevron-right text-[#0B1F66]"></i>

                  </div>

                </div>

              ))}

            </div>

            <button className="w-full mt-6 border rounded-lg py-3 font-semibold text-[#0B1F66] hover:bg-gray-50">
              Load More
              <i className="bi bi-chevron-down ml-2"></i>
            </button>

          </div>

        </div>

        {/* Right Side */}

        <div className="col-span-8">

          <div
            ref={payslipRef}
            className="bg-white border rounded-xl p-5">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-[#0B1F66]">
                Payslip Details - {employee.payPeriod}
              </h2>

              <div className="flex gap-3">

                <button className="border border-indigo-500 text-[#0B1F66] px-5 py-2 rounded-lg hover:bg-indigo-50">
                  <i className="bi bi-eye mr-2"></i>
                  View Payslip
                </button>

                <button
                  onClick={() =>
                    downloadPDF(
                      payslipRef.current,
                      `${employee.employee}_Payslip.pdf`
                    )
                  }
                  className="border px-5 py-2 rounded-lg hover:bg-gray-50"
                >
                  <i className="bi bi-download mr-2"></i>
                  Download PDF
                </button>
              </div>

            </div>

            {/* Salary Summary */}

            <div className="grid grid-cols-3 border rounded-xl overflow-hidden mb-8">

              <div className="text-center py-6 border-r">

                <p className="text-gray-500 text-sm">Gross Salary</p>

                <h2 className="text-3xl font-bold text-blue-600 mt-2">
                  ₹{employee.grossSalary.toLocaleString()}
                </h2>

              </div>

              <div className="text-center py-6 border-r">

                <p className="text-gray-500 text-sm">
                  Total Deductions
                </p>

                <h2 className="text-3xl font-bold text-red-500 mt-2">
                  ₹{employee.deduction.toLocaleString()}
                </h2>

              </div>

              <div className="text-center py-6">

                <p className="text-gray-500 text-sm">Net Pay</p>

                <h2 className="text-3xl font-bold text-green-600 mt-2">
                  ₹{employee.netSalary.toLocaleString()}
                </h2>

              </div>

            </div>

            {/* Earnings & Deductions */}

            <div className="grid grid-cols-2 gap-10">

              {/* Earnings */}

              <div>

                <h3 className="text-xl font-bold text-[#0B1F66] mb-5">
                  Earnings
                </h3>

                <div className="space-y-5">

                  <div className="flex justify-between">
                    <span>Basic Salary</span>
                    <span className="font-semibold">₹{employee.basic.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>House Rent Allowance</span>
                    <span className="font-semibold">₹{employee.hra.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Conveyance Allowance</span>
                    <span className="font-semibold">₹{employee.conveyance.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Medical Allowance</span>
                    <span className="font-semibold">₹{employee.medical.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Special Allowance</span>
                    <span className="font-semibold">₹{employee.specialAllowance.toLocaleString()}</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-blue-700 font-bold text-lg">
                    <span>Total Earnings</span>
                    <span>₹{employee.grossSalary.toLocaleString()}</span>
                  </div>

                </div>

              </div>

              {/* Deductions */}

              <div>

                <h3 className="text-xl font-bold text-[#0B1F66] mb-5">
                  Deductions
                </h3>

                <div className="space-y-5">

                  <div className="flex justify-between">
                    <span>Provident Fund</span>
                    <span className="font-semibold">₹{employee.pf.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Professional Tax</span>
                    <span className="font-semibold">₹{employee.professionalTax.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Income Tax</span>
                    <span className="font-semibold">₹{employee.incomeTax.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>ESI</span>
                    <span className="font-semibold">₹{employee.esi.toLocaleString()}</span>
                  </div>

                  <div className="h-12"></div>

                  <hr />

                  <div className="flex justify-between text-red-600 font-bold text-lg">
                    <span>Total Deductions</span>
                    <span>₹{employee.deduction.toLocaleString()}</span>
                  </div>

                </div>

              </div>

            </div>

            {/* Footer Note */}

            <div className="mt-8 bg-indigo-50 rounded-lg px-5 py-4 text-[#0B1F66] flex items-center gap-3">

              <i className="bi bi-info-circle-fill text-xl"></i>

              <span>
                This is a system generated payslip and does not require a signature.
              </span>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default ViewPayslip;