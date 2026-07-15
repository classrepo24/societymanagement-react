import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (
  data,
  fileName = "Report",
  sheetName = "Sheet1"
) => {
  if (!data || data.length === 0) return;

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, `${fileName}.xlsx`);
};
export const exportToCSV = (
  data,
  fileName = "Report"
) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);

  const csvRows = [];

  csvRows.push(headers.join(","));

  data.forEach((row) => {
    const values = headers.map((header) => `"${row[header] ?? ""}"`);
    csvRows.push(values.join(","));
  });

  const csvString = csvRows.join("\n");

  const blob = new Blob([csvString], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);

  link.download = `${fileName}.csv`;

  link.click();
};