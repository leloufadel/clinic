'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import axios from 'axios';

export default function FormationsPage() {
  const t = useTranslations();
  const [downloadingSchedule, setDownloadingSchedule] = useState<number | null>(null);
  const [apiFormations, setApiFormations] = useState([]);

  // Test API connection and log formations data
  useEffect(() => {
    const fetchFormations = async () => {
      try {
        console.log('🔄 Fetching formations from API...');
        const response = await axios.get('/api/formations');
        
        if (response.status === 200) {
          const data = response.data;
          console.log('✅ API Response Success!');
          console.log('📊 Number of formations from database:', data.length);
          console.log('🎯 Formations data (matières):', data);
          setApiFormations(data);
          
          // Log each formation details
          data.forEach((formation: any, index: number) => {
            console.log(`📚 Formation ${index + 1}:`, {
              id: formation.id,
              code: formation.code,
              name: formation.name,
              created_at: formation.created_at,
              schedules_count: formation.schedules?.length || 0
            });
          });
        } else {
          console.error('❌ API Response Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('🚨 API Connection Error:', error);
      }
    };

    fetchFormations();
  }, []);

  const downloadSchedule = async (formationId: number, formationName: string) => {
    setDownloadingSchedule(formationId);
    
    try {
      const response = await axios.get(`/api/formations/${formationId}/latest-schedule`);
      
      if (response.status === 200) {
        const schedule = response.data;
        
        // Create a link to download the PDF
        const link = document.createElement('a');
        link.href = schedule.file_url;
        console.log("schedule", schedule);
        console.log("schedule.file_url", schedule.file_url);
        link.download = `Planning_${formationName.replace(/\s+/g, '_')}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (response.status === 404) {
        alert(t('noScheduleAvailable'));
      } else {
        alert(t('downloadError'));
      }
    } catch (error) {
      console.error('Error downloading schedule:', error);
      alert(t('downloadError'));
    } finally {
      setDownloadingSchedule(null);
    }
  };

  // Helper function to get formation data
  const getFormationData = (formationId: number) => {
    const formations = [
      {
        id: 1,
        titleKey: 'formation1Title',
        categoryKey: 'categoryInformatique', 
        durationKey: 'duration2Years',
        levelKey: 'levelBacPlus2',
        diplomaKey: 'diplomaBTS',
        effectif: '25 ' + t('students'),
        descriptionKey: 'formation1Description',
        technologies: ['formation1Tech1', 'formation1Tech2', 'formation1Tech3', 'formation1Tech4', 'formation1Tech5', 'formation1Tech6'],
        modules: ['formation1Module1', 'formation1Module2', 'formation1Module3', 'formation1Module4', 'formation1Module5', 'formation1Module6'],
        careerKey: 'formation1Career',
        color: 'blue'
      },
      {
        id: 2,
        titleKey: 'formation2Title',
        categoryKey: 'categoryLogistique',
        durationKey: 'duration2Years',
        levelKey: 'levelBacPlus2',
        diplomaKey: 'diplomaBTS',
        effectif: '19 ' + t('students'),
        descriptionKey: 'formation2Description',
        technologies: ['formation2Tech1', 'formation2Tech2', 'formation2Tech3', 'formation2Tech4', 'formation2Tech5', 'formation2Tech6'],
        modules: ['formation2Module1', 'formation2Module2', 'formation2Module3', 'formation2Module4', 'formation2Module5', 'formation2Module6'],
        careerKey: 'formation2Career',
        color: 'green'
      },
      {
        id: 3,
        titleKey: 'formation3Title',
        categoryKey: 'categoryCommerce',
        durationKey: 'duration2Years',
        levelKey: 'levelBacPlus2',
        diplomaKey: 'diplomaBTS',
        effectif: '11 ' + t('students'),
        descriptionKey: 'formation3Description',
        technologies: ['formation3Tech1', 'formation3Tech2', 'formation3Tech3', 'formation3Tech4', 'formation3Tech5', 'formation3Tech6'],
        modules: ['formation3Module1', 'formation3Module2', 'formation3Module3', 'formation3Module4', 'formation3Module5', 'formation3Module6'],
        careerKey: 'formation3Career',
        color: 'purple'
      },
      {
        id: 4,
        titleKey: 'formation4Title',
        categoryKey: 'categoryInformatique',
        durationKey: 'duration2Years',
        levelKey: 'levelBacPlus2',
        diplomaKey: 'diplomaBTS',
        effectif: '19 ' + t('students'),
        descriptionKey: 'formation4Description',
        technologies: ['formation4Tech1', 'formation4Tech2', 'formation4Tech3', 'formation4Tech4', 'formation4Tech5', 'formation4Tech6'],
        modules: ['formation4Module1', 'formation4Module2', 'formation4Module3', 'formation4Module4', 'formation4Module5', 'formation4Module6'],
        careerKey: 'formation4Career',
        color: 'blue'
      },
      {
        id: 5,
        titleKey: 'formation5Title',
        categoryKey: 'categoryEnergie',
        durationKey: 'duration2Years',
        levelKey: 'levelBacPlus2',
        diplomaKey: 'diplomaBTS',
        effectif: '18 ' + t('students'),
        descriptionKey: 'formation5Description',
        technologies: ['formation5Tech1', 'formation5Tech2', 'formation5Tech3', 'formation5Tech4', 'formation5Tech5', 'formation5Tech6'],
        modules: ['formation5Module1', 'formation5Module2', 'formation5Module3', 'formation5Module4', 'formation5Module5', 'formation5Module6'],
        careerKey: 'formation5Career',
        color: 'green'
      },
      {
        id: 6,
        titleKey: 'formation6Title',
        categoryKey: 'categoryTelecom',
        durationKey: 'duration2Years',
        levelKey: 'levelBacPlus2',
        diplomaKey: 'diplomaBTS',
        effectif: '15 ' + t('students'),
        descriptionKey: 'formation6Description',
        technologies: ['formation6Tech1', 'formation6Tech2', 'formation6Tech3', 'formation6Tech4', 'formation6Tech5', 'formation6Tech6'],
        modules: ['formation6Module1', 'formation6Module2', 'formation6Module3', 'formation6Module4', 'formation6Module5', 'formation6Module6'],
        careerKey: 'formation6Career',
        color: 'blue'
      },
      {
        id: 7,
        titleKey: 'formation2Title', // Same as BTS LGTR
        categoryKey: 'categoryLogistique',
        durationKey: 'duration2Years',
        levelKey: 'levelBacPlus2',
        diplomaKey: 'diplomaBTS',
        effectif: '18 ' + t('students'),
        descriptionKey: 'formation2Description',
        technologies: ['formation2Tech1', 'formation2Tech2', 'formation2Tech3', 'formation2Tech4', 'formation2Tech5', 'formation2Tech6'],
        modules: ['formation2Module1', 'formation2Module2', 'formation2Module3', 'formation2Module4', 'formation2Module5', 'formation2Module6'],
        careerKey: 'formation2Career',
        color: 'green'
      },
      {
        id: 8,
        titleKey: 'formation2Title', // BTS LGTR 1 year
        categoryKey: 'categoryLogistique',
        durationKey: 'duration1Year',
        levelKey: 'levelBacPlus1',
        diplomaKey: 'diplomaBTS',
        effectif: '25 ' + t('students'),
        descriptionKey: 'formation2Description',
        technologies: ['formation2Tech1', 'formation2Tech2', 'formation2Tech3', 'formation2Tech4', 'formation2Tech5', 'formation2Tech6'],
        modules: ['formation2Module1', 'formation2Module2', 'formation2Module3', 'formation2Module4', 'formation2Module5', 'formation2Module6'],
        careerKey: 'formation2Career',
        color: 'green'
      },
      {
        id: 9,
        titleKey: 'formation1Title', // BTS Sécurité Réseau 1 year
        categoryKey: 'categoryInformatique',
        durationKey: 'duration1Year',
        levelKey: 'levelBacPlus1',
        diplomaKey: 'diplomaBTS',
        effectif: '25 ' + t('students'),
        descriptionKey: 'formation1Description',
        technologies: ['formation1Tech1', 'formation1Tech2', 'formation1Tech3', 'formation1Tech4', 'formation1Tech5', 'formation1Tech6'],
        modules: ['formation1Module1', 'formation1Module2', 'formation1Module3', 'formation1Module4', 'formation1Module5', 'formation1Module6'],
        careerKey: 'formation1Career',
        color: 'blue'
      },
      {
        id: 10,
        titleKey: 'formation4Title', // BTS Technique Informatique 1 year
        categoryKey: 'categoryInformatique',
        durationKey: 'duration1Year',
        levelKey: 'levelBacPlus1',
        diplomaKey: 'diplomaBTS',
        effectif: '25 ' + t('students'),
        descriptionKey: 'formation4Description',
        technologies: ['formation4Tech1', 'formation4Tech2', 'formation4Tech3', 'formation4Tech4', 'formation4Tech5', 'formation4Tech6'],
        modules: ['formation4Module1', 'formation4Module2', 'formation4Module3', 'formation4Module4', 'formation4Module5', 'formation4Module6'],
        careerKey: 'formation4Career',
        color: 'blue'
      },
      {
        id: 11,
        titleKey: 'formation5Title', // BTS Technique Energie 1 year
        categoryKey: 'categoryEnergie',
        durationKey: 'duration1Year',
        levelKey: 'levelBacPlus1',
        diplomaKey: 'diplomaBTS',
        effectif: '25 ' + t('students'),
        descriptionKey: 'formation5Description',
        technologies: ['formation5Tech1', 'formation5Tech2', 'formation5Tech3', 'formation5Tech4', 'formation5Tech5', 'formation5Tech6'],
        modules: ['formation5Module1', 'formation5Module2', 'formation5Module3', 'formation5Module4', 'formation5Module5', 'formation5Module6'],
        careerKey: 'formation5Career',
        color: 'green'
      },
      {
        id: 12,
        titleKey: 'formation6Title', // BTS Technique Telecom 1 year
        categoryKey: 'categoryTelecom',
        durationKey: 'duration1Year',
        levelKey: 'levelBacPlus1',
        diplomaKey: 'diplomaBTS',
        effectif: '25 ' + t('students'),
        descriptionKey: 'formation6Description',
        technologies: ['formation6Tech1', 'formation6Tech2', 'formation6Tech3', 'formation6Tech4', 'formation6Tech5', 'formation6Tech6'],
        modules: ['formation6Module1', 'formation6Module2', 'formation6Module3', 'formation6Module4', 'formation6Module5', 'formation6Module6'],
        careerKey: 'formation6Career',
        color: 'blue'
      },
      {
        id: 13,
        titleKey: 'formation13Title',
        categoryKey: 'categoryMultimedia',
        durationKey: 'duration1Year',
        levelKey: 'levelBacPlus1',
        diplomaKey: 'diplomaBTS',
        effectif: '25 ' + t('students'),
        descriptionKey: 'formation13Description',
        technologies: ['formation13Tech1', 'formation13Tech2', 'formation13Tech3', 'formation13Tech4', 'formation13Tech5', 'formation13Tech6'],
        modules: ['formation13Module1', 'formation13Module2', 'formation13Module3', 'formation13Module4', 'formation13Module5', 'formation13Module6'],
        careerKey: 'formation13Career',
        color: 'purple'
      },
      {
        id: 14,
        titleKey: 'formation3Title', // BTS Technique Commerciale 1 year
        categoryKey: 'categoryCommerce',
        durationKey: 'duration1Year',
        levelKey: 'levelBacPlus1',
        diplomaKey: 'diplomaBTS',
        effectif: '25 ' + t('students'),
        descriptionKey: 'formation3Description',
        technologies: ['formation3Tech1', 'formation3Tech2', 'formation3Tech3', 'formation3Tech4', 'formation3Tech5', 'formation3Tech6'],
        modules: ['formation3Module1', 'formation3Module2', 'formation3Module3', 'formation3Module4', 'formation3Module5', 'formation3Module6'],
        careerKey: 'formation3Career',
        color: 'purple'
      }
    ];

    return formations.find(f => f.id === formationId);
  };

  // Get formation continuing education data
  const getFormationContinueData = () => {
    return [
      {
        titleKey: 'continuingEd1Title',
        durationKey: 'duration6Months',
        descriptionKey: 'continuingEd1Description',
        domaines: ['continuingEd1Domain1', 'continuingEd1Domain2', 'continuingEd1Domain3', 'continuingEd1Domain4']
      },
      {
        titleKey: 'continuingEd2Title',
        durationKey: 'duration6Months',
        descriptionKey: 'continuingEd2Description',
        domaines: ['continuingEd2Domain1', 'continuingEd2Domain2', 'continuingEd2Domain3', 'continuingEd2Domain4']
      },
      {
        titleKey: 'continuingEd3Title',
        durationKey: 'duration6Months',
        descriptionKey: 'continuingEd3Description',
        domaines: ['continuingEd3Domain1', 'continuingEd3Domain2', 'continuingEd3Domain3', 'continuingEd3Domain4']
      }
    ];
  };

  const getCategoryColor = (categoryKey: string) => {
    switch (categoryKey) {
      case 'categoryInformatique':
        return 'bg-institutional-blue';
      case 'categoryTelecom':
        return 'bg-institutional-blue-light';
      case 'categoryLogistique':
        return 'bg-green-600';
      case 'categoryCommerce':
        return 'bg-purple-600';
      case 'categoryEnergie':
        return 'bg-green-600';
      case 'categoryMultimedia':
        return 'bg-purple-600';
      default:
        return 'bg-institutional-blue';
    }
  };

  // Get all formations data
  const formations = Array.from({ length: 14 }, (_, i) => getFormationData(i + 1)).filter((f): f is NonNullable<typeof f> => f !== undefined);
  const formationContinue = getFormationContinueData();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-institutional-blue via-institutional-blue-light to-institutional-blue-dark text-black py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container-max text-center">
          <div className="px-4 sm:px-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 leading-tight">{t('formationsPageTitle')}</h1>
            <p className="text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed opacity-95">
            {t('formationsPageDescription')}
          </p>
            <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
              <div className="bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 text-institutional-blue font-semibold shadow-lg text-sm sm:text-base">
              {t('totalStudents')}
            </div>
              <div className="bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 text-institutional-blue font-semibold shadow-lg text-sm sm:text-base">
              {t('btsFormationsCount')}
            </div>
              <div className="bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 text-institutional-blue font-semibold shadow-lg text-sm sm:text-base">
              {t('continuingEducationCount')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BTS Formations Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container-max">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-institutional-blue mb-4 sm:mb-6 leading-tight">
              {t('btsFormationsTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-dark-gray max-w-4xl mx-auto leading-relaxed">
              {t('btsFormationsDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            {formations.map((formation) => (
              <div key={formation.id} className="card group hover:shadow-2xl transition-all duration-300">
                <div className={`${getCategoryColor(formation.categoryKey)} p-6 text-white rounded-t-2xl`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold leading-tight">{t(formation.titleKey)}</h3>
                    <span className="bg-white rounded-full px-3 py-1 text-sm font-semibold text-institutional-blue shadow-sm">
                      {t(formation.diplomaKey)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-white bg-opacity-90 rounded-full px-3 py-1 text-institutional-blue font-medium">
                      {t(formation.durationKey)}
                    </span>
                    <span className="bg-white bg-opacity-90 rounded-full px-3 py-1 text-institutional-blue font-medium">
                      {t(formation.levelKey)}
                    </span>
                    <span className="bg-white rounded-full px-3 py-1 text-institutional-blue font-medium shadow-sm">
                      {formation.effectif}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-dark-gray mb-6 leading-relaxed">
                    {t(formation.descriptionKey)}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-institutional-blue mb-3">{t('technologies')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {formation.technologies.map((techKey, index) => (
                        <span key={index} className="bg-institutional-blue text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                          {t(techKey)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-institutional-blue mb-3">{t('mainModules')}</h4>
                    <ul className="space-y-2 text-sm text-dark-gray">
                      {formation.modules.slice(0, 3).map((moduleKey, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-institutional-blue mr-2 mt-1 text-xs">•</span>
                          {t(moduleKey)}
                        </li>
                      ))}
                      {formation.modules.length > 3 && (
                        <li className="text-institutional-blue text-sm font-medium">
                          +{formation.modules.length - 3} {t('otherModules')}
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-institutional-blue mb-3">{t('careerOpportunities')}</h4>
                    <p className="text-dark-gray text-sm leading-relaxed">
                      {t(formation.careerKey)}
                    </p>
                  </div>

                  <button 
                    onClick={() => downloadSchedule(formation.id, t(formation.titleKey))}
                    disabled={downloadingSchedule === formation.id}
                    className="w-full bg-institutional-blue text-white py-4 px-6 rounded-xl font-semibold hover:bg-institutional-blue-dark transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[48px] text-sm sm:text-base"
                  >
                    {downloadingSchedule === formation.id ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('downloading')}
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {t('downloadSchedule')}
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formation Continue Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-light-gray">
        <div className="container-max">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-institutional-blue mb-4 sm:mb-6 leading-tight">
              {t('continuingEducationTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-dark-gray max-w-4xl mx-auto leading-relaxed">
              {t('continuingEducationDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            {formationContinue.map((formation, index) => (
              <div key={index} className="card text-center p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-24 h-24 bg-institutional-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-institutional-blue mb-4">{t(formation.titleKey)}</h3>
                <div className="bg-white text-institutional-blue rounded-full px-6 py-2 text-sm font-semibold inline-block mb-4 border-2 border-institutional-blue shadow-sm">
                  {t(formation.durationKey)}
                </div>
                <p className="text-dark-gray mb-6 leading-relaxed">
                  {t(formation.descriptionKey)}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-institutional-blue mb-3">{t('coveredDomains')}</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {formation.domaines.map((domaineKey, idx) => (
                      <span key={idx} className="bg-institutional-blue text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        {t(domaineKey)}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="btn-primary w-full transform hover:scale-105 px-6 py-4 text-center min-h-[48px] flex items-center justify-center font-semibold rounded-lg shadow-lg transition-all duration-300 text-sm sm:text-base">
                  {t('requestQuote')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-institutional-blue-dark text-white">
        <div className="container-max text-center">
          <div className="px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
            {t('formationsCTATitle')}
          </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            {t('formationsCTADescription')}
          </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-md sm:max-w-none mx-auto">
              <button className="btn-primary bg-white text-institutional-blue hover:bg-light-gray transform hover:scale-105 px-6 py-4 text-center min-h-[48px] flex items-center justify-center font-semibold rounded-lg shadow-lg transition-all duration-300">
              {t('requestInfo')}
            </button>
              <button className="btn-secondary border-white text-white hover:bg-white hover:text-institutional-blue transform hover:scale-105 px-6 py-4 text-center min-h-[48px] flex items-center justify-center font-semibold rounded-lg border-2 transition-all duration-300">
              {t('downloadCatalog')}
            </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 