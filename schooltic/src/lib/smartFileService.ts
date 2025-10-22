// Smart File Service: S3 storage with direct URL access
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

interface UploadResult {
  success: boolean;
  fileUrl: string;
  fileName: string;
  localPath: string;
  message: string;
}

export class SmartFileService {
  private s3Client: S3Client;
  private bucket: string;
  private s3Endpoint: string;

  constructor() {
    // Validate required environment variables
    const endpoint = process.env.S3_ENDPOINT;
    const region = process.env.S3_REGION;
    const accessKey = process.env.S3_ACCESS_KEY;
    const secretKey = process.env.S3_SECRET_KEY;
    const bucket = process.env.S3_BUCKET;

    if (!endpoint || !region || !accessKey || !secretKey || !bucket) {
      throw new Error('Missing required S3 environment variables. Please check S3_ENDPOINT, S3_REGION, S3_ACCESS_KEY, S3_SECRET_KEY, and S3_BUCKET.');
    }

    this.bucket = bucket;
    this.s3Endpoint = endpoint;

    // Initialize S3 client with custom endpoint
    this.s3Client = new S3Client({
      region: region,
      endpoint: endpoint,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
      forcePathStyle: true, // Required for custom S3-compatible endpoints
    });
  }

  /**
   * Upload file to S3 bucket and return public URL
   */
  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
    folderName?: string
  ): Promise<UploadResult> {
    
    try {
      // Create S3 key (path) for the file
      const s3Key = folderName ? `${folderName}/${fileName}` : fileName;

      // Upload file to S3
      const putCommand = new PutObjectCommand({
        Bucket: this.bucket,
        Key: s3Key,
        Body: fileBuffer,
        ContentType: mimeType,
        // Make the object publicly readable
        ACL: 'public-read',
      });

      await this.s3Client.send(putCommand);

      // Generate public URL for the uploaded file
      const publicUrl = `${this.s3Endpoint}/${this.bucket}/${s3Key}`;

      console.log(`✅ File uploaded successfully to S3!`);
      console.log(`📍 S3 Key: ${s3Key}`);
      console.log(`🌐 Public URL: ${publicUrl}`);
      console.log(`📝 File details: ${fileName} (${fileBuffer.length} bytes, ${mimeType})`);

      return {
        success: true,
        fileUrl: publicUrl,        // Store full S3 URL in database
        fileName: fileName,
        localPath: publicUrl,      // For compatibility with existing code
        message: `✅ File saved successfully to S3: ${s3Key}`
      };

    } catch (error) {
      console.error('S3 file upload failed:', error);
      throw new Error(`Failed to upload file to S3: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the appropriate URL for file access
   */
  getFileUrl(storedUrl: string): string {
    // If it's already a full URL (S3, Google Drive, or absolute), return as-is
    if (storedUrl.startsWith('http')) {
      return storedUrl;
    }
    
    // If it's a relative path (legacy from local storage), construct S3 URL
    // This handles migration from local storage
    const cleanPath = storedUrl.startsWith('/uploads/') ? storedUrl.replace('/uploads/', '') : storedUrl;
    return `${this.s3Endpoint}/${this.bucket}/${cleanPath}`;
  }

  /**
   * Delete file from S3 bucket
   */
  async deleteFile(fileUrl: string): Promise<boolean> {
    try {
      // Extract S3 key from URL
      const s3Key = this.extractS3KeyFromUrl(fileUrl);
      if (!s3Key) {
        console.error('Invalid S3 URL format:', fileUrl);
        return false;
      }

      const deleteCommand = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: s3Key,
      });

      await this.s3Client.send(deleteCommand);
      console.log(`✅ File deleted successfully from S3: ${s3Key}`);
      return true;

    } catch (error) {
      console.error('S3 file deletion failed:', error);
      return false;
    }
  }

  /**
   * Extract S3 key from full S3 URL
   */
  private extractS3KeyFromUrl(url: string): string | null {
    try {
      // Expected format: http://endpoint/bucket/key
      const urlPattern = new RegExp(`^${this.s3Endpoint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/${this.bucket}/(.+)$`);
      const match = url.match(urlPattern);
      return match ? match[1] : null;
    } catch (error) {
      console.error('Error extracting S3 key from URL:', error);
      return null;
    }
  }

  /**
   * Check if S3 service is properly configured
   */
  async testConnection(): Promise<boolean> {
    try {
      // Try to list objects in the bucket (limit to 1 to test connectivity)
      const { ListObjectsV2Command } = await import('@aws-sdk/client-s3');
      const command = new ListObjectsV2Command({
        Bucket: this.bucket,
        MaxKeys: 1,
      });

      await this.s3Client.send(command);
      console.log('✅ S3 connection test successful');
      return true;
    } catch (error) {
      console.error('❌ S3 connection test failed:', error);
      return false;
    }
  }

  /**
   * Check if a URL is a Google Drive URL (for legacy support)
   */
  isGoogleDriveUrl(url: string): boolean {
    return url.includes('drive.google.com');
  }
}

// Export singleton instance
export const smartFileService = new SmartFileService();
export default smartFileService;
