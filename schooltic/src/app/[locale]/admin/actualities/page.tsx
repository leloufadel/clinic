'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface Actuality {
  id: string; // BigInt is serialized as string
  title: string;
  description: string; // matches database schema
  image_url?: string;
  published_at: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export default function ActualitiesPage() {
  const router = useRouter();
  const [actualities, setActualities] = useState<Actuality[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  

  const fmt = (d?: string | Date | null) => {
    if (!d) return '—';
    try {
      const date = new Date(d);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.error('Invalid date value:', d);
        return 'Date invalide';
      }
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error parsing date:', error, 'Value:', d);
      return 'Date invalide';
    }
  };
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: ''
  });

  // File state for image upload
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Load actualities on component mount
  useEffect(() => {
    loadActualities();
  }, []);

  const loadActualities = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/actualities');
      console.log('Admin: Loaded actualities:', response.data);
      // Debug first item dates
      if (response.data.length > 0) {
        const first = response.data[0];
        console.log('Admin: First actuality dates:', {
          published_at: first.published_at,
          created_at: first.created_at,
          updated_at: first.updated_at
        });
      }
      setActualities(response.data);
    } catch (error) {
      console.error('Error loading actualities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        // Update existing actuality with file upload
        const submitFormData = new FormData();
        submitFormData.append('title', formData.title);
        submitFormData.append('description', formData.content);
        
        if (selectedImage) {
          submitFormData.append('image', selectedImage);
        }

        await axios.put(`/api/actualities/${editingId}`, submitFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Actualité mise à jour avec succès!');
      } else {
        // Create new actuality with file upload
        const submitFormData = new FormData();
        submitFormData.append('title', formData.title);
        submitFormData.append('description', formData.content);
        
        if (selectedImage) {
          submitFormData.append('image', selectedImage);
        }

        await axios.post('/api/actualities', submitFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Actualité créée avec succès!');
      }
      
      // Reset form and refresh list
      setFormData({ title: '', content: '', image_url: '' });
      setSelectedImage(null);
      setImagePreview('');
      setShowForm(false);
      setEditingId(null);
      loadActualities();
    } catch (error) {
      console.error('Error saving actuality:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (actuality: Actuality) => {
    setFormData({
      title: actuality.title,
      content: actuality.description,
      image_url: actuality.image_url || ''
    });
    setSelectedImage(null);
    setImagePreview('');
    setEditingId(parseInt(actuality.id));
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) return;
    
    try {
      await axios.delete(`/api/actualities/${id}`);
      alert('Actualité supprimée avec succès!');
      loadActualities();
    } catch (error) {
      console.error('Error deleting actuality:', error);
      alert('Erreur lors de la suppression');
    }
  };



  const resetForm = () => {
    setFormData({ title: '', content: '', image_url: '' });
    setSelectedImage(null);
    setImagePreview('');
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link 
                href="/admin"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Gestion des Actualités</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Nouvelle Actualité</span>
              <span className="sm:hidden">Nouvelle</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Form Section */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? 'Modifier l\'Actualité' : 'Nouvelle Actualité'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Titre de l'actualité"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Contenu *
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Contenu de l'actualité..."
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Image de l'actualité (optionnel)
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Aperçu de l'image :</p>
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Aperçu"
                          className="max-w-xs max-h-48 rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview('');
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Current Image Display (for editing) */}
                  {editingId && formData.image_url && !imagePreview && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Image actuelle :</p>
                      <img
                        src={formData.image_url}
                        alt="Image actuelle"
                        className="max-w-xs max-h-48 rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>
              </div>



              {/* Submit Button */}
              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sauvegarde...
                    </span>
                  ) : (
                    editingId ? 'Mettre à jour' : 'Créer l\'actualité'
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Actualities List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Liste des Actualités</h3>
          </div>

          {loading && !showForm ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-500">Chargement des actualités...</p>
            </div>
          ) : actualities.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune actualité</h3>
              <p className="mt-1 text-sm text-gray-500">Commencez par créer votre première actualité.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nouvelle Actualité
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {actualities.map((actuality) => (
                <div key={actuality.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start space-x-3">

                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-medium text-gray-900 truncate">
                            {actuality.title}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {actuality.description}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center text-xs text-gray-400 space-x-4">
                            <span>Créé le {fmt(actuality.created_at)}</span>
                          
                            <span>Publié le {fmt(actuality.published_at)}</span>
                          
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 sm:flex-shrink-0">

                      
                      <button
                        onClick={() => handleEdit(actuality)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => handleDelete(parseInt(actuality.id))}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
