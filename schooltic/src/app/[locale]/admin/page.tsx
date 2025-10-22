'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLogin from '@/components/AdminLogin';
import axios from 'axios';

interface Formation {
  id: number;
  code: string;
  name: string;
  created_at: string;
  schedules: Array<{
    id: number;
    file_url: string;
    effective_date: string;
    uploaded_at: string;
  }>;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = checking, false = not auth, true = auth
  const [currentAdmin, setCurrentAdmin] = useState<{id: number, username: string} | null>(null);
  const [activeTab, setActiveTab] = useState<'formations' | 'schedules' | 'actualities'>('formations');
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Formation form state
  const [formationData, setFormationData] = useState({
    code: '',
    name: ''
  });

  // Schedule upload state
  const [scheduleData, setScheduleData] = useState({
    formation_id: '',
    effective_date: '',
    file: null as File | null
  });

  const handleFormationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('/api/formations', formationData);

      if (response.status === 200) {
        const newFormation = response.data;
        setFormations([...formations, newFormation]);
        setFormationData({ code: '', name: '' });
        alert('Formation créée avec succès!');
      } else {
        alert('Erreur lors de la création de la formation');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de la création de la formation');
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleData.file) {
      alert('Veuillez sélectionner un fichier PDF');
      return;
    }

    console.log('📤 Starting schedule upload...', {
      formation_id: scheduleData.formation_id,
      effective_date: scheduleData.effective_date,
      file_name: scheduleData.file.name,
      file_size: scheduleData.file.size
    });

    setLoading(true);
    const formData = new FormData();
    formData.append('formation_id', scheduleData.formation_id);
    formData.append('effective_date', scheduleData.effective_date);
    formData.append('file', scheduleData.file);

    try {
      const response = await axios.post('/api/schedules', formData);

      const responseData = response.data;
      console.log('📥 Schedule upload response:', responseData);

      if (response.status === 200) {
        console.log('✅ Schedule uploaded successfully!');
        
        // Find the formation name for better feedback
        const formation = formations.find(f => f.id.toString() === scheduleData.formation_id);
        const formationName = formation ? formation.name : 'Formation';
        
        alert(`✅ Planning téléchargé avec succès pour "${formationName}"!\n\nFichier: ${scheduleData.file.name}\nDate effective: ${new Date(scheduleData.effective_date).toLocaleDateString('fr-FR')}`);
        
        // Clear the form
        setScheduleData({ formation_id: '', effective_date: '', file: null });
        
        // Clear file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => (input as HTMLInputElement).value = '');
        
        // Refresh formations list to show new schedule
        loadFormations();
      } else {
        console.error('❌ Schedule upload failed:', responseData);
        alert(`❌ Erreur lors du téléchargement:\n${responseData.error || 'Erreur inconnue'}`);
      }
    } catch (error) {
      console.error('🚨 Schedule upload error:', error);
      alert('🚨 Erreur de connexion lors du téléchargement du planning');
    } finally {
      setLoading(false);
    }
  };

  const loadFormations = async () => {
    try {
      console.log('🔄 Loading formations for admin...');
      const response = await axios.get('/api/formations');
      if (response.status === 200) {
        const data = response.data;
        console.log('✅ Formations loaded successfully:', {
          count: data.length,
          formations: data.map((f: Formation) => ({
            id: f.id,
            name: f.name,
            code: f.code,
            schedules_count: f.schedules?.length || 0
          }))
        });
        setFormations(data);
      } else {
        console.error('❌ Failed to load formations:', response.status);
      }
    } catch (error) {
      console.error('🚨 Error loading formations:', error);
    }
  };

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Load formations when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadFormations();
    }
  }, [isAuthenticated]);

  const checkAuthStatus = async () => {
    try {
      console.log('🔍 Checking admin authentication status...');
      const response = await axios.get('/api/auth/verify');
      const data = response.data;

      if (response.status === 200 && data.authenticated) {
        console.log('✅ Admin is authenticated:', data.admin);
        setIsAuthenticated(true);
        setCurrentAdmin(data.admin);
      } else {
        console.log('❌ Admin not authenticated');
        setIsAuthenticated(false);
        setCurrentAdmin(null);
      }
    } catch (error) {
      console.error('🚨 Auth check error:', error);
      setIsAuthenticated(false);
      setCurrentAdmin(null);
    }
  };

  const handleLoginSuccess = () => {
    console.log('🎉 Login successful, refreshing auth status...');
    checkAuthStatus();
  };

  const handleLogout = async () => {
    try {
      console.log('👋 Logging out admin...');
      await axios.post('/api/auth/logout');
      setIsAuthenticated(false);
      setCurrentAdmin(null);
      setFormations([]);
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('🚨 Logout error:', error);
    }
  };

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-institutional-blue mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // Show admin dashboard if authenticated
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-max py-4 px-2 sm:px-4 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-institutional-blue truncate">
                <span className="sm:hidden">Admin</span>
                <span className="hidden sm:inline">Tableau de Bord Admin</span>
              </h1>
              <p className="text-gray-600 mt-1 text-xs sm:text-sm truncate">
                <span className="font-semibold text-institutional-blue">{currentAdmin?.username}</span>
                <span className="hidden sm:inline text-gray-500"> | Formations & plannings</span>
              </p>
            </div>
            <div className="flex flex-row items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <Link 
                href="/formations"
                className="bg-institutional-blue text-white px-2 py-2 sm:px-4 sm:py-2 rounded-md sm:rounded-lg hover:bg-institutional-blue-dark transition-colors text-center text-xs sm:text-sm font-medium min-h-[40px] sm:min-h-[44px] flex items-center justify-center whitespace-nowrap"
              >
                <span className="sm:hidden">Site</span>
                <span className="hidden sm:inline">Voir le site public</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-2 py-2 sm:px-4 sm:py-2 rounded-md sm:rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center text-xs sm:text-sm font-medium min-h-[40px] sm:min-h-[44px] whitespace-nowrap"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="sm:hidden">Exit</span>
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container-max py-4 sm:py-6 px-2 sm:px-4 md:px-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex px-2 sm:px-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('formations')}
                className={`flex-shrink-0 py-3 sm:py-4 px-1 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap mr-2 sm:mr-8 min-h-[40px] sm:min-h-[44px] flex items-center justify-center ${
                  activeTab === 'formations'
                    ? 'border-institutional-blue text-institutional-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="sm:hidden">Formation</span>
                <span className="hidden sm:inline">Créer Formation</span>
              </button>
              <button
                onClick={() => setActiveTab('schedules')}
                className={`flex-shrink-0 py-3 sm:py-4 px-1 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap mr-2 sm:mr-8 min-h-[40px] sm:min-h-[44px] flex items-center justify-center ${
                  activeTab === 'schedules'
                    ? 'border-institutional-blue text-institutional-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="sm:hidden">Planning</span>
                <span className="hidden sm:inline">Télécharger Planning</span>
              </button>
              <button
                onClick={() => setActiveTab('actualities')}
                className={`flex-shrink-0 py-3 sm:py-4 px-1 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap mr-2 sm:mr-8 min-h-[40px] sm:min-h-[44px] flex items-center justify-center ${
                  activeTab === 'actualities'
                    ? 'border-institutional-blue text-institutional-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span className="sm:hidden">Actualités</span>
                <span className="hidden sm:inline">Gérer Actualités</span>
              </button>
            </nav>
          </div>

          <div className="p-3 sm:p-4 md:p-6">
            {activeTab === 'formations' && (
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                  <span className="sm:hidden">Nouvelle Formation</span>
                  <span className="hidden sm:inline">Créer une nouvelle formation</span>
                </h2>
                
                <form onSubmit={handleFormationSubmit} className="max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    <div>
                      <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2">
                        Code de la formation *
                      </label>
                      <input
                        type="text"
                        id="code"
                        value={formationData.code}
                        onChange={(e) => setFormationData({...formationData, code: e.target.value})}
                        required
                        placeholder="Ex: BTS_INFO_2024"
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-institutional-blue focus:border-transparent text-sm sm:text-base min-h-[40px] sm:min-h-[48px]"
                      />
                    </div>
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom de la formation *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formationData.name}
                        onChange={(e) => setFormationData({...formationData, name: e.target.value})}
                        required
                        placeholder="Ex: BTS Technique Informatique"
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-institutional-blue focus:border-transparent text-sm sm:text-base min-h-[40px] sm:min-h-[48px]"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-institutional-blue text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md sm:rounded-lg font-semibold hover:bg-institutional-blue-dark transition-all duration-200 disabled:opacity-50 min-h-[40px] sm:min-h-[48px] flex items-center justify-center text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="sm:hidden">Création...</span>
                        <span className="hidden sm:inline">Création...</span>
                      </>
                    ) : (
                      <>
                        <span className="sm:hidden">Créer</span>
                        <span className="hidden sm:inline">Créer la Formation</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Formations List */}
                <div className="mt-8 sm:mt-12">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                    Formations existantes ({formations.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {formations.map((formation) => (
                      <div key={formation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-semibold text-institutional-blue text-sm sm:text-base leading-tight mb-2">{formation.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">Code: {formation.code}</p>
                        <p className="text-xs text-gray-500">
                          Plannings: {formation.schedules?.length || 0}
                        </p>
                      </div>
                    ))}
                  </div>
                  {formations.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <p className="text-sm">Aucune formation créée pour le moment</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'schedules' && (
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                  <span className="sm:hidden">Plannings</span>
                  <span className="hidden sm:inline">Gestion des Plannings de Formation</span>
                </h2>
                
                {/* Formations Grid with Upload Forms */}
                <div className="space-y-4 sm:space-y-6">
                  {formations.length === 0 ? (
                    <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
                      <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-3.039 0-5.812-1.24-7.834-3.257M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-500 text-sm sm:text-base px-4">
                        Aucune formation disponible. 
                        <button 
                          onClick={() => setActiveTab('formations')}
                          className="text-institutional-blue hover:underline ml-1 min-h-[44px] py-2"
                        >
                          Créez d'abord une formation
                        </button>
                      </p>
                    </div>
                  ) : (
                    formations.map((formation) => (
                      <div key={formation.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        {/* Formation Header */}
                        <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200 rounded-t-lg">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <div className="min-w-0 flex-1">
                              <h3 className="text-base sm:text-lg font-semibold text-institutional-blue truncate">
                                {formation.name}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600">Code: {formation.code}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                              <div className="text-xs sm:text-sm">
                                <span className="text-gray-500">Plannings:</span>
                                <span className="font-semibold text-institutional-blue ml-1">
                                  {formation.schedules?.length || 0}
                                </span>
                              </div>
                              {formation.schedules && formation.schedules.length > 0 && (
                                <div className="text-xs sm:text-sm text-gray-500">
                                  Dernier: {new Date(formation.schedules[0].uploaded_at).toLocaleDateString('fr-FR')}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Upload Form */}
                        <div className="p-3 sm:p-4 md:p-6">
                          <form 
                            onSubmit={(e) => {
                              e.preventDefault();
                              setScheduleData({...scheduleData, formation_id: formation.id.toString()});
                              handleScheduleSubmit(e);
                            }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:items-end"
                          >
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Date d'entrée en vigueur *
                              </label>
                              <input
                                type="datetime-local"
                                value={scheduleData.formation_id === formation.id.toString() ? scheduleData.effective_date : ''}
                                onChange={(e) => setScheduleData({
                                  ...scheduleData, 
                                  formation_id: formation.id.toString(),
                                  effective_date: e.target.value
                                })}
                                required
                                className="w-full px-2 py-2 sm:px-3 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-institutional-blue focus:border-transparent text-sm sm:text-base min-h-[40px] sm:min-h-[48px]"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Fichier PDF *
                              </label>
                              <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setScheduleData({
                                  ...scheduleData, 
                                  formation_id: formation.id.toString(),
                                  file: e.target.files?.[0] || null
                                })}
                                required
                                className="w-full px-2 py-2 sm:px-3 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-institutional-blue focus:border-transparent text-sm sm:text-base min-h-[40px] sm:min-h-[48px] file:mr-2 sm:file:mr-3 file:py-1 file:px-2 sm:file:px-3 file:rounded-sm sm:file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-institutional-blue file:text-white hover:file:bg-institutional-blue-dark"
                              />
                            </div>

                            <div>
                              <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-institutional-blue text-white px-3 py-2 sm:px-4 sm:py-3 rounded-md sm:rounded-lg font-semibold hover:bg-institutional-blue-dark transition-all duration-200 disabled:opacity-50 flex items-center justify-center min-h-[40px] sm:min-h-[48px] text-xs sm:text-sm"
                              >
                                {loading && scheduleData.formation_id === formation.id.toString() ? (
                                  <>
                                    <svg className="animate-spin -ml-1 mr-1 h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span className="sm:hidden">Upload...</span>
                                    <span className="hidden sm:inline">Upload...</span>
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span className="sm:hidden">Upload</span>
                                    <span className="hidden sm:inline">Télécharger</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </form>

                          {/* Existing Schedules List */}
                          {formation.schedules && formation.schedules.length > 0 && (
                            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                              <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">
                                Plannings existants ({formation.schedules.length})
                              </h4>
                              <div className="space-y-2 sm:space-y-3">
                                {formation.schedules.slice(0, 3).map((schedule) => (
                                  <div key={schedule.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 rounded-lg p-3 sm:px-4 sm:py-2 space-y-2 sm:space-y-0">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                                        <span className="text-xs sm:text-sm text-gray-600 font-medium">
                                          Effectif: {new Date(schedule.effective_date).toLocaleDateString('fr-FR')}
                                        </span>
                                        <span className="text-xs sm:text-sm text-gray-500">
                                          Uploadé: {new Date(schedule.uploaded_at).toLocaleDateString('fr-FR')}
                                        </span>
                                      </div>
                                    </div>
                                    <a
                                      href={schedule.file_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-institutional-blue hover:text-institutional-blue-dark text-xs sm:text-sm font-medium flex items-center justify-center sm:justify-start bg-white sm:bg-transparent px-3 py-2 sm:px-0 sm:py-0 rounded sm:rounded-none border sm:border-0 min-h-[40px] sm:min-h-0"
                                    >
                                      <svg className="w-4 h-4 mr-2 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                      Voir PDF
                                    </a>
                                  </div>
                                ))}
                                {formation.schedules.length > 3 && (
                                  <p className="text-xs text-gray-500 text-center pt-2">
                                    +{formation.schedules.length - 3} autres plannings...
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Upload Instructions */}
                <div className="mt-6 sm:mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                  <h4 className="font-semibold text-institutional-blue mb-3 sm:mb-2 text-sm sm:text-base">📋 Instructions</h4>
                  <ul className="text-xs sm:text-sm text-blue-800 space-y-2 sm:space-y-1">
                    <li>• Sélectionnez une date d'entrée en vigueur pour le planning</li>
                    <li>• Seuls les fichiers PDF sont acceptés</li>
                    <li>• Le planning sera automatiquement associé à la formation</li>
                    <li>• Les plannings plus récents remplacent automatiquement les anciens</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'actualities' && (
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                  <span className="sm:hidden">Actualités</span>
                  <span className="hidden sm:inline">Gestion des Actualités</span>
                </h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6">
                  <h4 className="font-semibold text-institutional-blue mb-3 sm:mb-2 text-sm sm:text-base">📰 Gestion des Actualités</h4>
                  <p className="text-xs sm:text-sm text-blue-800 mb-4">
                    Gérez les actualités et informations importantes de votre établissement. 
                    Créez, modifiez et publiez des articles pour tenir vos étudiants et visiteurs informés.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link 
                      href="/admin/actualities"
                      className="bg-institutional-blue text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-institutional-blue-dark transition-colors font-medium text-center text-sm sm:text-base flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      Gérer les Actualités
                    </Link>
                    <Link 
                      href="/actualites"
                      className="bg-white text-institutional-blue border border-institutional-blue px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center text-sm sm:text-base flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Voir le Site Public
                    </Link>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Fonctionnalités Disponibles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Créer</h4>
                      <p className="text-xs text-gray-600">Ajoutez de nouvelles actualités avec titre, contenu et images</p>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Modifier</h4>
                      <p className="text-xs text-gray-600">Mettez à jour le contenu et les paramètres des actualités</p>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Publier</h4>
                      <p className="text-xs text-gray-600">Contrôlez la visibilité et la publication des actualités</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
