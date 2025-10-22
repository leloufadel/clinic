import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  // Enable static rendering
  const {locale} = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-institutional-blue to-institutional-blue-dark text-black py-24">
        <div className="container-max text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">{t('aboutPageTitle')}</h1>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed opacity-95">
            {t('aboutPageDescription')}
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-institutional-blue mb-8 leading-tight">{t('historyTitle')}</h2>
              <div className="space-y-6 text-dark-gray leading-relaxed">
                <p>
                  {t('historyText1')}
                </p>
                <p>
                  {t('historyText2')}
                </p>
                <p>
                  {t('historyText3')}
                </p>
              </div>
            </div>
            <div className="bg-light-gray rounded-2xl p-10 shadow-lg">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-institutional-blue mb-3">2018</div>
                  <div className="text-dark-gray font-semibold">{t('yearCreated')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-institutional-blue mb-3">Décret</div>
                  <div className="text-dark-gray font-semibold">{t('decreeNumber')}</div>
                </div>
                <div className="text-center">
                  <div className="md:text-4xl text-2xl font-bold text-institutional-blue mb-3">Nouakchott</div>
                  <div className="text-dark-gray font-semibold">{t('schoolLocation')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-institutional-blue mb-3">Public</div>
                  <div className="text-dark-gray font-semibold">{t('publicCharacter')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-light-gray">
        <div className="container-max">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-institutional-blue mb-8 leading-tight">{t('missionsTitle')}</h2>
            <p className="text-xl text-dark-gray max-w-4xl mx-auto leading-relaxed">
              {t('missionsDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-institutional-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-institutional-blue mb-4">{t('mission1Title')}</h3>
              <p className="text-dark-gray leading-relaxed">
                {t('mission1Description')}
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-institutional-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-institutional-blue mb-4">{t('mission2Title')}</h3>
              <p className="text-dark-gray leading-relaxed">
                {t('mission2Description')}
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-institutional-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-institutional-blue mb-4">{t('mission3Title')}</h3>
              <p className="text-dark-gray leading-relaxed">
                {t('mission3Description')}
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-institutional-blue mb-6">{t('otherMissionsTitle')}</h3>
              <ul className="space-y-3 text-dark-gray leading-relaxed">
                <li className="flex items-start">
                  <span className="text-institutional-blue mr-3 mt-1 text-lg">•</span>
                  {t('mission4')}
                </li>
                <li className="flex items-start">
                  <span className="text-institutional-blue mr-3 mt-1 text-lg">•</span>
                  {t('mission5')}
                </li>
                <li className="flex items-start">
                  <span className="text-institutional-blue mr-3 mt-1 text-lg">•</span>
                  {t('mission6')}
                </li>
                <li className="flex items-start">
                  <span className="text-institutional-blue mr-3 mt-1 text-lg">•</span>
                  {t('mission7')}
                </li>
                <li className="flex items-start">
                  <span className="text-institutional-blue mr-3 mt-1 text-lg">•</span>
                  {t('mission8')}
                </li>
                <li className="flex items-start">
                  <span className="text-institutional-blue mr-3 mt-1 text-lg">•</span>
                  {t('mission9')}
                </li>
              </ul>
            </div>
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-institutional-blue mb-6">{t('adminOrgansTitle')}</h3>
              <ul className="space-y-3 text-dark-gray leading-relaxed">
                <li className="flex items-start">
                  <span className="text-institutional-blue mr-3 mt-1 text-lg">•</span>
                  {t('adminOrgan1')}
                </li>
                <li className="flex items-start">
                  <span className="text-institutional-blue mr-3 mt-1 text-lg">•</span>
                  {t('adminOrgan2')}
                </li>
                <li className="flex items-start">
                  <span className="text-institutional-blue mr-3 mt-1 text-lg">•</span>
                  {t('adminOrgan3')}
                </li>
                <li className="flex items-start">
                  <span className="text-institutional-blue mr-3 mt-1 text-lg">•</span>
                  {t('adminOrgan4')}
                </li>
                <li className="flex items-start">
                  <span className="text-institutional-blue mr-3 mt-1 text-lg">•</span>
                  {t('adminOrgan5')}
                </li>
                <li className="flex items-start">
                  <span className="text-institutional-blue mr-3 mt-1 text-lg">•</span>
                  {t('adminOrgan6')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-institutional-blue text-white p-10 rounded-2xl shadow-2xl">
              <h2 className="text-4xl font-bold mb-8 leading-tight">{t('visionTitle')}</h2>
              <p className="text-xl mb-6 leading-relaxed opacity-95">
                {t('visionText1')}
              </p>
              <p className="text-xl leading-relaxed opacity-95">
                {t('visionText2')}
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-institutional-blue mb-8 leading-tight">{t('strategicObjectivesTitle')}</h3>
              <ul className="space-y-6 text-dark-gray leading-relaxed">
                <li className="flex items-start">
                  <svg className="w-7 h-7 text-institutional-blue mr-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('objective1')}
                </li>
                <li className="flex items-start">
                  <svg className="w-7 h-7 text-institutional-blue mr-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('objective2')}
                </li>
                <li className="flex items-start">
                  <svg className="w-7 h-7 text-institutional-blue mr-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('objective3')}
                </li>
                <li className="flex items-start">
                  <svg className="w-7 h-7 text-institutional-blue mr-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('objective4')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-light-gray">
        <div className="container-max">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-institutional-blue mb-8 leading-tight">{t('valuesTitle')}</h2>
            <p className="text-xl text-dark-gray max-w-4xl mx-auto leading-relaxed">
              {t('valuesDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-institutional-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-institutional-blue mb-4">{t('value1Title')}</h3>
              <p className="text-dark-gray leading-relaxed">
                {t('value1Description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-institutional-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-institutional-blue mb-4">{t('value2Title')}</h3>
              <p className="text-dark-gray leading-relaxed">
                {t('value2Description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-institutional-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-institutional-blue mb-4">{t('value3Title')}</h3>
              <p className="text-dark-gray leading-relaxed">
                {t('value3Description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-institutional-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-institutional-blue mb-4">{t('value4Title')}</h3>
              <p className="text-dark-gray leading-relaxed">
                {t('value4Description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 