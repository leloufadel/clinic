# 🚀 Google Drive Integration for TIC School

This document provides a complete overview of the Google Drive integration implemented for your TIC School project. The integration replaces local file storage with Google Drive for better file management, especially for large PDFs and images.

## 📋 What's Been Implemented

### ✅ Completed Features

1. **Google Drive Service** (`src/lib/googleDrive.ts`)
   - File upload to Google Drive with automatic folder organization
   - Public URL generation for file access
   - File deletion functionality
   - Automatic folder creation (schedules, actualities)

2. **Updated APIs**
   - **Schedules API** (`src/app/api/schedules/route.ts`) - PDF uploads now go to Google Drive
   - **Actualities API** (`src/app/api/actualities/route.ts`) - Image uploads now go to Google Drive
   - **Actualities Update API** (`src/app/api/actualities/[id]/route.ts`) - Image updates use Google Drive

3. **Utility Functions** (`src/lib/googleDriveUtils.ts`)
   - URL validation and conversion
   - File accessibility checking
   - Fallback URL generation

4. **Documentation**
   - Setup guide (`GOOGLE_DRIVE_SETUP.md`)
   - Installation troubleshooting (`scripts/install-googleapis.md`)

## 🛠 Setup Instructions

### 1. Install Dependencies

First, install the required Google APIs library:

```bash
yarn add googleapis
```

**Note**: If you encounter permission errors, see `scripts/install-googleapis.md` for troubleshooting.

### 2. Google Cloud Setup

Follow the detailed instructions in `GOOGLE_DRIVE_SETUP.md` to:
- Create a Google Cloud Project
- Enable Google Drive API
- Create a Service Account
- Generate service account credentials
- Share your Google Drive folder with the service account

### 3. Environment Configuration

Create a `.env.local` file with the following variables:

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

## 📁 File Organization

Files are automatically organized in your Google Drive folder:

```
TIC School Drive Folder (1e39HXTcb_UHiTrloQQtupHWTbvKXeN2T)/
├── schedules/                    # PDF schedules for formations
│   ├── schedule_1_1640000000000.pdf
│   ├── schedule_2_1640000001000.pdf
│   └── ...
└── actualities/                  # Images for news/actualities
    ├── actuality_1640000000000.jpg
    ├── actuality_1640000001000.png
    └── ...
```

## 🔧 How It Works

### File Upload Process

1. **User uploads a file** through the admin interface
2. **File is processed** and sent to the appropriate API endpoint
3. **Google Drive service** uploads the file to the correct folder
4. **Public permissions** are automatically set on the file
5. **Public URL** is generated and stored in the database
6. **File is accessible** to users via direct download links

### File Access

- **PDFs**: Direct download links for schedules
- **Images**: Direct display in the web interface
- **All files**: Publicly accessible without authentication

### Backward Compatibility

The system is designed to work with both:
- **New files**: Uploaded to Google Drive (full URLs)
- **Existing files**: Local files (relative paths) - still work as before

## 🔍 Testing the Integration

After setup, test these scenarios:

1. **Upload a PDF schedule**:
   - Go to Admin → Formations
   - Upload a PDF for any formation
   - Verify it appears in Google Drive
   - Test download from the formations page

2. **Upload an image for actualities**:
   - Go to Admin → Actualities  
   - Create/edit an actuality with an image
   - Verify it appears in Google Drive
   - Check image display on the actualities page

3. **Verify file access**:
   - Ensure files are publicly accessible
   - Test direct URLs work in incognito mode

## 📊 Benefits

### Before (Local Storage)
❌ Files stored locally in `public/uploads/`  
❌ Limited by server storage space  
❌ Files not accessible if server is down  
❌ No easy way to manage large files  
❌ Manual backup required  

### After (Google Drive)
✅ Files stored in Google Drive cloud storage  
✅ Virtually unlimited storage space  
✅ Files accessible even if main server has issues  
✅ Google Drive interface for file management  
✅ Automatic backup and versioning  
✅ Better performance for large files  

## 🐛 Troubleshooting

### Common Issues

1. **"Permission denied" error**
   - Ensure service account has Editor access to the Drive folder
   - Check that the folder ID is correct

2. **"Authentication failed" error**
   - Verify the private key format in environment variables
   - Ensure no extra spaces or newlines in credentials

3. **"API not enabled" error**
   - Enable Google Drive API in Google Cloud Console
   - Wait a few minutes for activation

4. **Files not uploading**
   - Check server logs for detailed error messages
   - Verify all environment variables are set correctly

### Debug Logs

The application logs detailed information during file operations:
- `📤 Uploading to Google Drive...` - Upload started
- `✅ File uploaded to Google Drive:` - Upload successful
- Error messages for troubleshooting

## 🔒 Security Notes

- Service account credentials should be kept secure
- The Google Drive folder is shared publicly for read access
- Files are automatically made publicly readable
- Environment variables contain sensitive information - never commit them

## 🚀 Deployment

When deploying to production:

1. Set all environment variables in your hosting platform
2. Ensure the service account has proper permissions
3. Test file upload functionality in production
4. Monitor logs for any issues

## 📞 Support

If you encounter issues:

1. Check the detailed logs in the browser console and server logs
2. Verify your Google Cloud setup following `GOOGLE_DRIVE_SETUP.md`
3. Test the service account credentials manually
4. Ensure all environment variables are correctly set

---

🎉 **Your TIC School project now has professional-grade file storage with Google Drive!**
