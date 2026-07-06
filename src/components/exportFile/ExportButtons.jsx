import React from "react";
import { exportToCSV, exportToExcel } from "./exportToExcel";


export const ExportButtons = ({
  data,
  fileName = "Report",
  sheetName = "Sheet1",
}) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={() =>
          exportToExcel(data, fileName, sheetName)
        }
        className="px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Export Excel
      </button>

      <button
        onClick={() => exportToCSV(data, fileName)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Export CSV
      </button>
    </div>
  );
};