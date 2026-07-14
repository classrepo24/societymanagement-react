import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Step1SelectPayPeriod from "./Step1SelectPayPeriod";
import Step2ReviewEmployees from "./Step2ReviewEmployees";
import Step3ReviewSummary from "./Step3ReviewSummary";
import Step4ConfirmProcess from "./Step4ConfirmProcess";
import Breadcrumb from "../../../component/Breadcrumb";

const RunPayroll = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [employees] = useState([
    {
      id: "EMP001",
      name: "Rahul Mehta",
      role: "Manager",
      department: "Administration",
      basic: "₹ 60,000.00",
      gross: "₹ 75,000.00",
      deduction: "₹ 12,500.00",
      net: "₹ 62,500.00",
    },
    {
      id: "EMP002",
      name: "Neha Sharma",
      role: "Accountant",
      department: "Finance",
      basic: "₹ 45,000.00",
      gross: "₹ 56,000.00",
      deduction: "₹ 8,350.00",
      net: "₹ 47,650.00",
    },
    {
      id: "EMP003",
      name: "Vikram Singh",
      role: "Supervisor",
      department: "Maintenance",
      basic: "₹ 38,000.00",
      gross: "₹ 48,000.00",
      deduction: "₹ 6,200.00",
      net: "₹ 41,800.00",
    },
    {
      id: "EMP004",
      name: "Pooja Verma",
      role: "Receptionist",
      department: "Administration",
      basic: "₹ 28,000.00",
      gross: "₹ 34,500.00",
      deduction: "₹ 4,700.00",
      net: "₹ 29,800.00",
    },
    {
      id: "EMP005",
      name: "Arun Kumar",
      role: "Technician",
      department: "Maintenance",
      basic: "₹ 30,000.00",
      gross: "₹ 37,000.00",
      deduction: "₹ 5,600.00",
      net: "₹ 31,400.00",
    },
  ]);

  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <Breadcrumb
            items={[
              { label: "Dashboard", path: "/dashboard" },
              { label: "Payroll", path: "/staff/profile/salary-payroll" },
              { label: "Run Payroll" },
            ]}
          />

          <h1 className="text-4xl font-bold mt-2">
            Run Payroll
          </h1>

          <p className="text-gray-500 mt-1">
            Process and generate payroll for selected pay period.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/staff/profile/salary-payroll")
          }
          className="border rounded-lg px-5 py-2 flex items-center gap-2"
        >
          <i className="bi bi-arrow-left"></i>
          Back to Payroll
        </button>
      </div>

      {/* Stepper */}

      <div className="bg-white rounded-xl border p-6 flex justify-between mb-6">

        {[
          "Select Pay Period",
          "Review Employees",
          "Review Summary",
          "Confirm & Process",
        ].map((step, i) => (
          <div key={i} className="flex items-center flex-1">

            <div
              onClick={() => goToStep(i + 1)}
              className={`w-12 h-12 rounded-full cursor-pointer flex items-center justify-center text-white font-bold
              ${currentStep > i + 1
                  ? "bg-blue-600"
                  : currentStep === i + 1
                    ? "bg-blue-700"
                    : "bg-gray-300"
                }`}
            >
              {currentStep > i + 1 ? (
                <i className="bi bi-check-lg"></i>
              ) : (
                i + 1
              )}
            </div>

            <div className="ml-3">
              <h4 className="font-semibold">{step}</h4>

              <p className="text-xs text-gray-500">
                {i === 0 && "Choose payroll period"}
                {i === 1 && "Verify employee data"}
                {i === 2 && "Check payroll summary"}
                {i === 3 && "Generate payroll"}
              </p>
            </div>

            {i !== 3 && (
              <div className="flex-1 border-t border-dashed mx-6"></div>
            )}
          </div>
        ))}
      </div>

      {/* Steps */}

      {currentStep === 1 && (
        <Step1SelectPayPeriod
          employees={employees}
          selectedEmployees={selectedEmployees}
          setSelectedEmployees={setSelectedEmployees}
          nextStep={nextStep}
        />
      )}

      {currentStep === 2 && (
        <Step2ReviewEmployees

          employees={employees}
          selectedEmployees={selectedEmployees}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 3 && (
        <Step3ReviewSummary
          employees={employees}
          selectedEmployees={selectedEmployees}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 4 && (
        <Step4ConfirmProcess
          employees={employees}
          selectedEmployees={selectedEmployees}
          prevStep={prevStep}
        />
      )}
    </div>
  );
};

export default RunPayroll;