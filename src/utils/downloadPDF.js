import html2pdf from "html2pdf.js";

export const downloadPDF = (element, fileName = "Payslip.pdf") => {
  if (!element) return;

  const options = {
    margin: [0.25, 0.25, 0.25, 0.25],

    filename: fileName,

    image: {
      type: "jpeg",
      quality: 1,
    },

    html2canvas: {
      scale: 3,
      useCORS: true,
      letterRendering: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
    },

    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },

    pagebreak: {
      mode: ["avoid-all", "css", "legacy"],
    },
  };

  html2pdf().set(options).from(element).save();
};