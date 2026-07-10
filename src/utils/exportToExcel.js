import * as XLSX from "xlsx";

export const exportToExcel = (data = [], fileName = "data") => {
  if (!Array.isArray(data)) {
    console.error("Export data must be an array");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};