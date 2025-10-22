'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface FileRecord {
  id: string;
  type: 'schedule' | 'actuality';
  name: string;
  currentUrl: string;
  isLocal: boolean;
  suggestedDriveUrl: string;
}

export default function DriveSyncPage() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setLoading(true);
    try {
      // This would need a new API endpoint to list files
      // For now, we'll show the concept
      console.log('Loading files for Drive sync...');
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFileUrl = async (fileId: string, type: string, newUrl: string) => {
    try {
      // Extract Google Drive file ID from URL
      const driveFileId = extractDriveFileId(newUrl);
      if (!driveFileId) {
        alert('Invalid Google Drive URL. Please use a proper Google Drive file URL.');
        return;
      }

      // Update the database with the new Google Drive URL
      const response = await axios.patch('/api/admin/update-file-url', {
        fileId,
        type,
        driveFileId,
        newUrl: `https://drive.google.com/uc?id=${driveFileId}&export=download`
      });

      if (response.status === 200) {
        alert('File URL updated successfully!');
        loadFiles(); // Reload the list
      }
    } catch (error) {
      console.error('Error updating file URL:', error);
      alert('Failed to update file URL');
    }
  };

  const extractDriveFileId = (url: string): string | null => {
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
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Google Drive Sync Manager
          </h1>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="font-semibold text-blue-900 mb-2">Instructions:</h2>
            <ol className="list-decimal list-inside text-blue-800 space-y-1">
              <li>Files are automatically saved to <code className="bg-blue-100 px-1 rounded">public/uploads/</code></li>
              <li>Upload them to your Google Drive folder: 
                <a 
                  href="https://drive.google.com/drive/folders/1e39HXTcb_UHiTrloQQtupHWTbvKXeN2T" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  TicSchool Folder
                </a>
              </li>
              <li>Get the file URL from Google Drive (right-click → Get link)</li>
              <li>Update the URLs below to point to Google Drive</li>
            </ol>
          </div>

          {/* Quick Upload Section */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Quick Actions:</h3>
            <div className="space-y-2 text-green-800">
              <p>• Local files are in: <code className="bg-green-100 px-1 rounded">public/uploads/schedules/</code> and <code className="bg-green-100 px-1 rounded">public/uploads/actualities/</code></p>
              <p>• After uploading to Google Drive, the URLs will be: <code className="bg-green-100 px-1 rounded">https://drive.google.com/uc?id=FILE_ID&export=download</code></p>
            </div>
          </div>

          {/* URL Update Form */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Update File URL</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Database record ID"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select type</option>
                <option value="schedule">Schedule (PDF)</option>
                <option value="actuality">Actuality (Image)</option>
              </select>
              <input
                type="text"
                placeholder="Google Drive file URL"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Update URL
            </button>
          </div>

          {/* File List */}
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Current Files</h3>
            <div className="text-gray-600">
              This section will show all uploaded files and their current URLs.
              You can implement the API endpoint to list files from the database.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
