// Hybrid Drive Service: Local storage + Google Drive URLs
// This approach saves files locally and provides Google Drive URLs when you upload them manually

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export class HybridDriveService {
  private folderId: string;
  private uploadDir: string;

  constructor() {
    this.folderId = '1e39HXTcb_UHiTrloQQtupHWTbvKXeN2T';
    this.uploadDir = join(process.cwd(), 'public', 'uploads');
  }

  /**
   * Save file locally and provide instructions for Google Drive upload
   */
  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
    folderName?: string
  ): Promise<{ id: string; name: string; localPath: string; driveUrl: string; instructions: string }> {
    
    try {
      // Create directory structure
      const subDir = folderName ? join(this.uploadDir, folderName) : this.uploadDir;
      await mkdir(subDir, { recursive: true });

      // Save file locally
      const filePath = join(subDir, fileName);
      await writeFile(filePath, fileBuffer);

      // Generate placeholder Google Drive file ID (you'll replace this with real ID)
      const timestamp = Date.now();
      const placeholderFileId = `REPLACE_${timestamp}`;

      // Instructions for manual upload
      const instructions = `
🔄 UPLOAD TO GOOGLE DRIVE:
1. File saved locally: ${filePath}
2. Go to: https://drive.google.com/drive/folders/${this.folderId}
3. Upload the file: ${fileName}
4. After upload, right-click file → Get link
5. Extract file ID from URL (between /d/ and /view)
6. Replace ${placeholderFileId} in database with real file ID

Example: If URL is https://drive.google.com/file/d/ABC123XYZ/view
Then file ID is: ABC123XYZ
      `;

      console.log(instructions);

      const localUrl = folderName ? `/uploads/${folderName}/${fileName}` : `/uploads/${fileName}`;
      const driveUrl = `https://drive.google.com/uc?id=${placeholderFileId}&export=download`;

      return {
        id: placeholderFileId,
        name: fileName,
        localPath: localUrl,
        driveUrl: driveUrl,
        instructions: instructions
      };

    } catch (error) {
      console.error('Error in hybrid upload:', error);
      throw new Error('Failed to save file');
    }
  }

  /**
   * Get public download URL for a Google Drive file
   */
  getPublicUrl(fileId: string): string {
    if (fileId.startsWith('REPLACE_') || fileId.startsWith('file_')) {
      console.warn(`⚠️  File ID ${fileId} is a placeholder. Upload to Google Drive and update the database.`);
    }
    return `https://drive.google.com/uc?id=${fileId}&export=download`;
  }

  /**
   * Get view URL for a Google Drive file
   */
  getViewUrl(fileId: string): string {
    return `https://drive.google.com/file/d/${fileId}/view`;
  }

  /**
   * Check if file ID is a placeholder
   */
  isPlaceholder(fileId: string): boolean {
    return fileId.startsWith('REPLACE_') || fileId.startsWith('file_');
  }

  /**
   * Generate folder URL for your Google Drive
   */
  getFolderUrl(): string {
    return `https://drive.google.com/drive/folders/${this.folderId}`;
  }

  /**
   * Helper to extract file ID from Google Drive URL
   */
  extractFileIdFromUrl(url: string): string | null {
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
}

// Export singleton instance
export const hybridDriveService = new HybridDriveService();
export default hybridDriveService;
