export function includesQuery(values, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return values.some((value) => String(value).toLowerCase().includes(normalizedQuery));
}

export function parseCompactCount(value) {
  if (!value) return 0;
  if (String(value).endsWith('k')) return Math.round(parseFloat(value) * 1000);
  return parseInt(value, 10) || 0;
}

export async function downloadBrowserFile(url, filename) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Download failed');

  const archive = await response.blob();
  const downloadUrl = URL.createObjectURL(archive);
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(downloadUrl);
}
