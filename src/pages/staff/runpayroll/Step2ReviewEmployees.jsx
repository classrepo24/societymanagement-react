import React from "react";

const Step2ReviewEmployees = ({
  employees,
  selectedEmployees,
  prevStep,
  nextStep,
}) => {

  const selectedData = employees.filter((emp) =>
    selectedEmployees.includes(emp.id)
  );

  return (
    <div className="grid grid-cols-1 gap-6">

      <div className="bg-white rounded-xl border p-6">

        <div className="flex justify-between items-center mb-5">

          <div>
            <h2 className="text-2xl font-bold">
              Review Employees
            </h2>

            <p className="text-gray-500 text-sm">
              Verify payroll details before processing.
            </p>
          </div>

          <div className="text-sm font-medium">
            Selected Employees :
            <span className="text-blue-700 ml-2">
              {selectedData.length}
            </span>
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50 border-y">

              <tr>

                <th className="px-4 py-3 text-left">
                  Employee
                </th>

                <th className="px-4 py-3 text-right">
                  Basic
                </th>

                <th className="px-4 py-3 text-right">
                  Gross
                </th>

                <th className="px-4 py-3 text-right">
                  Deduction
                </th>

                <th className="px-4 py-3 text-right">
                  Net
                </th>

              </tr>

            </thead>

            <tbody>

              {selectedData.map((emp) => (

                <tr
                  key={emp.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-4 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700">
                        {emp.name.charAt(0)}
                      </div>

                      <div>

                        <h4 className="font-semibold">
                          {emp.name}
                        </h4>

                        <p className="text-xs text-gray-500">
                          {emp.id} • {emp.role}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-4 py-4 text-right">
                    {emp.basic}
                  </td>

                  <td className="px-4 py-4 text-right">
                    {emp.gross}
                  </td>

                  <td className="px-4 py-4 text-right text-red-600 font-medium">
                    {emp.deduction}
                  </td>

                  <td className="px-4 py-4 text-right text-green-600 font-semibold">
                    {emp.net}
                  </td>

                </tr>

              ))}
                          </tbody>
          </table>
        </div>
      </div>

      {/* Payroll Summary */}

      <div className="bg-white rounded-xl border p-6">

        <h3 className="text-xl font-bold mb-5">
          Payroll Summary
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">
              Employees
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {selectedData.length}
            </h3>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">
              Gross Pay
            </p>

            <h3 className="text-xl font-bold text-green-700 mt-2">
              ₹24,58,000
            </h3>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">
              Deductions
            </p>

            <h3 className="text-xl font-bold text-red-600 mt-2">
              ₹4,76,300
            </h3>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">
              Net Pay
            </p>

            <h3 className="text-xl font-bold text-purple-700 mt-2">
              ₹19,81,700
            </h3>
          </div>

        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">

          <i className="bi bi-exclamation-triangle-fill text-yellow-600"></i>

          <p className="text-sm text-gray-700">
            Verify employee salaries carefully before proceeding to the final review.
          </p>

        </div>
                {/* Action Buttons */}
        <div className="flex justify-between mt-8">

          <button
            onClick={prevStep}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center gap-2"
          >
            <i className="bi bi-arrow-left"></i>
            Previous
          </button>

          <button
            onClick={nextStep}
            className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg flex items-center gap-2"
          >
            Review Summary
            <i className="bi bi-arrow-right"></i>
          </button>

        </div>

      </div>

    </div>
  );
};

export default Step2ReviewEmployees;