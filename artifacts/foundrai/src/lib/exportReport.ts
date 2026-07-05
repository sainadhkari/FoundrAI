import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export async function exportElementToPdf(element: HTMLElement, filename: string) {
  const canvas = await html2canvas(element, {
    backgroundColor: "#050508",
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.92);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
  const imgWidth = canvas.width * ratio;
  const imgHeight = canvas.height * ratio;

  pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
  pdf.save(filename);
}

export async function exportLongElementToPdf(element: HTMLElement, filename: string) {
  const canvas = await html2canvas(element, {
    backgroundColor: "#050508",
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const pageWidthPx = 900;
  const pageHeightPx = (pageWidthPx * canvas.height) / canvas.width;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [pageWidthPx, Math.min(pageHeightPx, 14400)],
    compress: true,
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.9);
  const pageHeight = pdf.internal.pageSize.getHeight();
  const totalPages = Math.ceil(pageHeightPx / pageHeight);

  const scaledCanvasHeightPerPage = (canvas.width * pageHeight) / pageWidthPx;

  for (let page = 0; page < totalPages; page++) {
    const sourceY = page * scaledCanvasHeightPerPage;
    const sliceHeight = Math.min(scaledCanvasHeightPerPage, canvas.height - sourceY);
    if (sliceHeight <= 0) break;

    const sliceCanvas = document.createElement("canvas");
    sliceCanvas.width = canvas.width;
    sliceCanvas.height = sliceHeight;
    const ctx = sliceCanvas.getContext("2d");
    if (!ctx) continue;
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
    ctx.drawImage(canvas, 0, sourceY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

    const sliceImgData = sliceCanvas.toDataURL("image/jpeg", 0.9);
    const sliceImgHeightOnPage = (sliceHeight * pageWidthPx) / canvas.width;

    if (page > 0) pdf.addPage([pageWidthPx, pageHeight]);
    pdf.addImage(sliceImgData, "JPEG", 0, 0, pageWidthPx, sliceImgHeightOnPage);
  }

  pdf.save(filename);
}
