// Utility functions for Google Drive integration

/**
 * Check if a URL is a Google Drive URL
 */
export function isGoogleDriveUrl(url: string): boolean {
  return url.includes('drive.google.com') || url.includes('googleapis.com');
}

/**
 * Check if a URL is a local file URL
 */
export function isLocalFileUrl(url: string): boolean {
  return url.startsWith('/uploads/');
}

/**
 * Extract file ID from Google Drive URL
 */
export function extractGoogleDriveFileId(url: string): string | null {
  // Handle different Google Drive URL formats
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9-_]+)/,
    /id=([a-zA-Z0-9-_]+)/,
    /\/d\/([a-zA-Z0-9-_]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Generate different Google Drive URL formats
 */
export function generateGoogleDriveUrls(fileId: string) {
  return {
    download: `https://drive.google.com/uc?id=${fileId}&export=download`,
    view: `https://drive.google.com/file/d/${fileId}/view`,
    preview: `https://drive.google.com/file/d/${fileId}/preview`,
    embed: `https://drive.google.com/file/d/${fileId}/preview`
  };
}

/**
 * Get the appropriate URL for file type
 */
export function getOptimalDriveUrl(fileId: string, fileType: 'pdf' | 'image' | 'other' = 'other'): string {
  const urls = generateGoogleDriveUrls(fileId);
  
  switch (fileType) {
    case 'pdf':
      // For PDFs, use download URL for direct download
      return urls.download;
    case 'image':
      // For images, use download URL for direct display
      return urls.download;
    default:
      return urls.download;
  }
}

/**
 * Check if file URL is accessible
 */
export async function isFileAccessible(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error checking file accessibility:', error);
    return false;
  }
}

/**
 * Generate a fallback URL if the primary URL fails
 */
export function getFallbackUrl(url: string): string {
  if (isGoogleDriveUrl(url)) {
    const fileId = extractGoogleDriveFileId(url);
    if (fileId) {
      // Try the view URL as fallback
      return generateGoogleDriveUrls(fileId).view;
    }
  }
  return url;
}
