/**
 * Utility to export tabular data to RFC-4180 compliant CSV files.
 * Includes UTF-8 BOM so Microsoft Excel, LibreOffice, and Google Sheets
 * render characters, currencies, and timestamps cleanly.
 */

export function exportToCsv(
  baseFilename: string,
  headers: string[],
  rows: (string | number | boolean | null | undefined)[][]
) {
  const escapeCell = (val: string | number | boolean | null | undefined): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val);
    if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return `"${str}"`;
  };

  const headerLine = headers.map(escapeCell).join(",");
  const rowLines = rows.map((row) => row.map(escapeCell).join(","));
  const csvContent = "\uFEFF" + [headerLine, ...rowLines].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const dateSuffix = new Date().toISOString().split("T")[0];
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.setAttribute("download", `${baseFilename}_${dateSuffix}.csv`);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}
