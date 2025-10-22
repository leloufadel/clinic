import { google } from 'googleapis';

// Google Drive Service
class GoogleDriveService {
  private drive: any;
  private folderId: string;

  constructor() {
    // Initialize Google Drive API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        project_id: process.env.GOOGLE_DRIVE_PROJECT_ID,
      },
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    this.drive = google.drive({ version: 'v3', auth });
    this.folderId = process.env.GOOGLE_DRIVE_FOLDER_ID || '';
  }

  /**
   * Upload a file to Google Drive
   * @param file - File buffer or stream
   * @param fileName - Name of the file
   * @param mimeType - MIME type of the file
   * @param folderName - Optional subfolder name
   * @returns Promise with file details including public URL
   */
  async uploadFile(
    file: Buffer,
    fileName: string,
    mimeType: string,
    folderName?: string
  ): Promise<{ id: string; name: string; webViewLink: string; webContentLink: string }> {
    try {
      let parentFolderId = this.folderId;

      // Create subfolder if specified
      if (folderName) {
        parentFolderId = await this.createOrGetFolder(folderName, this.folderId);
      }

      // Upload file
      const fileMetadata = {
        name: fileName,
        parents: [parentFolderId],
      };

      const media = {
        mimeType: mimeType,
        body: Buffer.from(file),
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id,name,webViewLink,webContentLink',
      });

      // Make file publicly accessible
      await this.drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      return {
        id: response.data.id,
        name: response.data.name,
        webViewLink: response.data.webViewLink,
        webContentLink: response.data.webContentLink,
      };
    } catch (error) {
      console.error('Error uploading file to Google Drive:', error);
      throw new Error('Failed to upload file to Google Drive');
    }
  }

  /**
   * Delete a file from Google Drive
   * @param fileId - Google Drive file ID
   */
  async deleteFile(fileId: string): Promise<void> {
    try {
      await this.drive.files.delete({
        fileId: fileId,
      });
    } catch (error) {
      console.error('Error deleting file from Google Drive:', error);
      throw new Error('Failed to delete file from Google Drive');
    }
  }

  /**
   * Create or get existing folder
   * @param folderName - Name of the folder
   * @param parentFolderId - Parent folder ID
   * @returns Folder ID
   */
  private async createOrGetFolder(folderName: string, parentFolderId: string): Promise<string> {
    try {
      // Check if folder already exists
      const existingFolders = await this.drive.files.list({
        q: `name='${folderName}' and '${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder'`,
        fields: 'files(id, name)',
      });

      if (existingFolders.data.files && existingFolders.data.files.length > 0) {
        return existingFolders.data.files[0].id;
      }

      // Create new folder
      const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentFolderId],
      };

      const folder = await this.drive.files.create({
        requestBody: folderMetadata,
        fields: 'id',
      });

      return folder.data.id;
    } catch (error) {
      console.error('Error creating/getting folder:', error);
      throw new Error('Failed to create or get folder');
    }
  }

  /**
   * Get public URL for a file
   * @param fileId - Google Drive file ID
   * @returns Public URL
   */
  getPublicUrl(fileId: string): string {
    return `https://drive.google.com/uc?id=${fileId}&export=download`;
  }

  /**
   * Get file info
   * @param fileId - Google Drive file ID
   * @returns File information
   */
  async getFileInfo(fileId: string): Promise<any> {
    try {
      const response = await this.drive.files.get({
        fileId: fileId,
        fields: 'id,name,mimeType,size,webViewLink,webContentLink',
      });
      return response.data;
    } catch (error) {
      console.error('Error getting file info:', error);
      throw new Error('Failed to get file info');
    }
  }
}

// Export singleton instance
export const googleDriveService = new GoogleDriveService();
export default googleDriveService;
