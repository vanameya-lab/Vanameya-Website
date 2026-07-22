/**
 * Utility to export data to CSV
 * @param {Array} data - Array of objects
 * @param {string} filename - Downloaded file name
 */
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || !data.length) {
    alert('No data to export');
    return;
  }

  // Get headers
  const headers = Object.keys(data[0]);

  // Convert objects to CSV string
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.map(header => `"${header}"`).join(','));

  // Add rows
  for (const row of data) {
    const values = headers.map(header => {
      let val = row[header];
      if (val === null || val === undefined) {
        val = '';
      } else if (typeof val === 'object') {
        // Simple stringification for nested objects
        val = JSON.stringify(val);
      }
      // Escape quotes
      val = String(val).replace(/"/g, '""');
      return `"${val}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
  // Create download link
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
