# Google Drive Integration Setup Guide

This project has been configured to use Google Drive for file storage instead of local storage. Follow these steps to set up the integration:

## 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"

## 2. Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `ticschool-drive-service`
   - Description: `Service account for TIC School file uploads`
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

## 3. Generate Service Account Key

1. In the Credentials page, click on your service account
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON" format
5. Download the JSON file (keep it secure!)

## 4. Share Google Drive Folder

1. Go to your Google Drive folder: https://drive.google.com/drive/folders/1e39HXTcb_UHiTrloQQtupHWTbvKXeN2T
2. Right-click and select "Share"
3. Add the service account email (from the JSON file) as an Editor
4. The email will look like: `ticschool-drive-service@your-project-id.iam.gserviceaccount.com`

## 5. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Database
DATABASE_URL="your-database-connection-string"

# Google Drive Configuration
GOOGLE_DRIVE_FOLDER_ID="1e39HXTcb_UHiTrloQQtupHWTbvKXeN2T"
GOOGLE_DRIVE_CLIENT_EMAIL="your-service-account@your-project.iam.gserviceaccount.com"
GOOGLE_DRIVE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
GOOGLE_DRIVE_PROJECT_ID="your-google-cloud-project-id"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://www.etic.mr"

# JWT Secret for admin authentication
JWT_SECRET="your-jwt-secret-key-here"
```

**Important Notes:**
- Copy the `client_email`, `private_key`, and `project_id` from your downloaded JSON file
- The `private_key` should include the full key with `\n` characters preserved
- Make sure `.env.local` is in your `.gitignore` file

## 6. Install Dependencies

Make sure to install the Google APIs library:

```bash
yarn add googleapis
```

## 7. Folder Structure

The application will automatically create the following folder structure in your Google Drive:

```
TIC School Drive Folder/
├── schedules/          # PDF schedules for formations
└── actualities/        # Images for news/actualities
```

## 8. File Access

Files uploaded to Google Drive will be:
- Automatically made publicly readable
- Accessible via direct download URLs
- Organized in appropriate subfolders
- Named with timestamps for uniqueness

## 9. Testing

After setup, test the file upload functionality:
1. Login to admin panel
2. Try uploading a PDF schedule
3. Try uploading an image for actualities
4. Verify files appear in your Google Drive folder
5. Verify files are accessible from the public website

## Troubleshooting

### Common Issues:

1. **Permission denied**: Make sure the service account has Editor access to the Drive folder
2. **Authentication failed**: Verify the private key format in environment variables
3. **API not enabled**: Ensure Google Drive API is enabled in Google Cloud Console
4. **Quota exceeded**: Check your Google Drive API quotas in Google Cloud Console

### Debugging:

Check the server logs for detailed error messages when uploading files. The application logs upload progress and any errors that occur.
