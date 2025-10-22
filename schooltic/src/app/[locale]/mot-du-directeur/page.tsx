import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

export default async function DirectorWordsPage({params}: {params: Promise<{locale: string}>}) {
  // Enable static rendering
  const {locale} = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-institutional-blue to-institutional-blue-dark text-black py-24">
        <div className="container-max text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">{t('directorWordsTitle')}</h1>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed opacity-95">
            {t('directorWordsSubtitle')}
          </p>
        </div>
      </section>

      {/* Director's Message Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Director's Photo and Info */}
            <div className="text-center lg:text-left">
              <div className="bg-light-gray rounded-2xl p-8 shadow-lg">
                <div className="w-48 h-48 mx-auto lg:mx-0 mb-6 bg-institutional-blue rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-institutional-blue mb-2">{t('directorName')}</h3>
                <p className="text-lg text-dark-gray font-semibold mb-4">{t('directorTitle')}</p>
                <div className="text-sm text-medium-gray space-y-2">
                  <p>{t('directorEducation')}</p>
                  <p>{t('directorExperience')}</p>
                </div>
              </div>
            </div>

            {/* Director's Message */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-institutional-blue mb-6">{t('welcomeMessage')}</h2>
                
                <div className="space-y-4 text-dark-gray leading-relaxed">
                  <p className="text-lg">
                    {t('directorMessage1')}
                  </p>
                  
                  <p>
                    {t('directorMessage2')}
                  </p>
                  
                  <p>
                    {t('directorMessage3')}
                  </p>
                  
                  <p>
                    {t('directorMessage4')}
                  </p>
                  
                  <p className="text-lg font-semibold text-institutional-blue">
                    {t('directorMessage5')}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-light-gray">
                  <p className="text-right italic text-medium-gray">
                    {t('directorSignature')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Goals Section */}
      <section className="section-padding bg-light-gray">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-institutional-blue mb-8">{t('directorVisionTitle')}</h2>
            <p className="text-xl text-dark-gray max-w-4xl mx-auto leading-relaxed">
              {t('directorVisionDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-institutional-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-institutional-blue mb-4">{t('directorGoal1Title')}</h3>
              <p className="text-dark-gray leading-relaxed">{t('directorGoal1Description')}</p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-institutional-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-institutional-blue mb-4">{t('directorGoal2Title')}</h3>
              <p className="text-dark-gray leading-relaxed">{t('directorGoal2Description')}</p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-institutional-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-institutional-blue mb-4">{t('directorGoal3Title')}</h3>
              <p className="text-dark-gray leading-relaxed">{t('directorGoal3Description')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
