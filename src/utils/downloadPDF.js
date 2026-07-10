import html2pdf from "html2pdf.js";

export const downloadPDF = (element, fileName = "Payslip.pdf") => {
  if (!element) return;

  const options = {
    margin: 0.5,
    filename: fileName,
    image: {
      type: "jpeg",
      quality: 1,
    },
    html2canvas: {
      scale: 2,
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
  };

  html2pdf().set(options).from(element).save();
};