import React from "react";

const Step3ReviewSummary = ({
  employees,
  selectedEmployees,
  prevStep,
  nextStep,
}) => {

  const selectedData = employees.filter((emp) =>
    selectedEmployees.includes(emp.id)
  );

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-xl border p-6">

        <h2 className="text-2xl font-bold mb-2">
          Review Payroll Summary
        </h2>

        <p className="text-gray-500 mb-6">
          Review the payroll details before final confirmation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          <div className="border rounded-lg p-5">

            <p className="text-sm text-gray-500">
              Employees
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {selectedData.length}
            </h3>

          </div>

          <div className="border rounded-lg p-5">

            <p className="text-sm text-gray-500">
              Gross Pay
            </p>

            <h3 className="text-2xl font-bold text-green-600 mt-2">
              ₹24,58,000
            </h3>

          </div>

          <div className="border rounded-lg p-5">

            <p className="text-sm text-gray-500">
              Total Deduction
            </p>

            <h3 className="text-2xl font-bold text-red-600 mt-2">
              ₹4,76,300
            </h3>

          </div>

          <div className="border rounded-lg p-5">

            <p className="text-sm text-gray-500">
              Net Pay
            </p>

            <h3 className="text-2xl font-bold text-blue-700 mt-2">
              ₹19,81,700
            </h3>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-xl border p-6">

        <h3 className="text-xl font-semibold mb-4">
          Selected Employees
        </h3>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50 border-y">

              <tr>

                <th className="px-4 py-3 text-left">
                  Employee
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
                  className="border-b"
                >
                  <td className="px-4 py-4">
                    <div>
                      <h4 className="font-semibold">
                        {emp.name}
                      </h4>

                      <p className="text-xs text-gray-500">
                        {emp.id}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-right">
                    {emp.gross}
                  </td>

                  <td className="px-4 py-4 text-right text-red-600">
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
            {/* Confirmation Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">

        <div className="flex gap-3">

          <i className="bi bi-exclamation-triangle-fill text-yellow-600 text-xl"></i>

          <div>
            <h4 className="font-semibold">
              Final Review
            </h4>

            <p className="text-sm text-gray-600 mt-1">
              Please review all details carefully before processing the payroll. 
              Once processed, it cannot be modified.Proceed to Review
            </p>
          </div>

        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-between">

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
          Confirm & Process
          <i className="bi bi-arrow-right"></i>
        </button>

      </div>

    </div>
  );
};

export default Step3ReviewSummary;