import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import NewsTicker from '@/components/NewsTicker';

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  // Enable static rendering
  const {locale} = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-institutional-blue via-institutional-blue-light to-institutional-blue-dark text-black py-12 sm:py-16 md:py-20">
        <div className="container-max py-16 sm:py-24 md:py-32">
          <div className="text-center px-4 sm:px-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              {t('homeTitle')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed opacity-95 px-4 sm:px-0">
              {t('homeDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-md sm:max-w-none mx-auto">
              <Link
                href="/formations"
                className="btn-primary bg-white text-institutional-blue hover:bg-light-gray transform hover:scale-105 px-6 py-4 text-center min-h-[48px] flex items-center justify-center font-semibold rounded-lg shadow-lg transition-all duration-300"
              >
                {t('homeFormationsButton')}
              </Link>
              <Link
                href="/contact"
                className="btn-secondary border-white text-white hover:bg-white hover:text-institutional-blue transform hover:scale-105 px-6 py-4 text-center min-h-[48px] flex items-center justify-center font-semibold rounded-lg border-2 transition-all duration-300"
              >
                {t('homeContactButton')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Video */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container-max">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-0">
            <div className="relative w-full aspect-video rounded-lg sm:rounded-2xl shadow-2xl overflow-hidden bg-black">
              <iframe
                src="https://drive.google.com/file/d/1EaC5cNRg1iKpi4P7l2MRGwiZtkh__00O/preview"
                className="w-full h-full border-0"
                allow="autoplay"
                title={t('videoTitle')}
                loading="lazy"
              ></iframe>

              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 sm:p-4">
                <div className="text-white">
                  <h4 className="text-base sm:text-lg font-semibold mb-1">{t('videoTitle')}</h4>
                  <p className="text-sm opacity-90">{t('videoDescription')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-light-gray">
        <div className="container-max">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-institutional-blue mb-4 sm:mb-6">
              {t('homeTitle2')}
            </h2>
            <p className="text-lg sm:text-xl text-dark-gray max-w-3xl mx-auto leading-relaxed">
            {t('homeDescription2')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-0">
            <div className="text-center p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-institutional-blue rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-institutional-blue mb-3 sm:mb-4">{t('feature1Title')}</h3>
              <p className="text-dark-gray leading-relaxed text-sm sm:text-base">
                {t('feature1Description')}
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-institutional-blue rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-institutional-blue mb-3 sm:mb-4">{t('feature2Title')}</h3>
              <p className="text-dark-gray leading-relaxed text-sm sm:text-base">
                {t('feature2Description')}
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-institutional-blue rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h4z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-institutional-blue mb-3 sm:mb-4">{t('feature3Title')}</h3>
              <p className="text-dark-gray leading-relaxed text-sm sm:text-base">
                {t('feature3Description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container-max">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-institutional-blue mb-4 sm:mb-6">
              {t('programsTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-dark-gray max-w-3xl mx-auto leading-relaxed">
              {t('programsDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            <div className="card p-6 sm:p-8 hover:shadow-2xl">
              <div className="bg-institutional-blue p-4 sm:p-6 text-white rounded-xl mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold">{t('program1Title')}</h3>
                <p className="text-blue-100 font-medium text-sm sm:text-base">{t('program1Duration')}</p>
              </div>
              <div>
                <p className="text-dark-gray mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {t('program1Description')}
                </p>
                <Link 
                  href="/formations" 
                  className="text-institutional-blue hover:text-institutional-blue-dark font-semibold transition-colors duration-200 inline-flex items-center text-sm sm:text-base min-h-[44px] py-2"
                >
                  {t('learnMore')}
                </Link>
              </div>
            </div>

            <div className="card p-6 sm:p-8 hover:shadow-2xl">
              <div className="bg-institutional-blue p-4 sm:p-6 text-white rounded-xl mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold">{t('program2Title')}</h3>
                <p className="text-blue-100 font-medium text-sm sm:text-base">{t('program2Duration')}</p>
              </div>
              <div>
                <p className="text-dark-gray mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {t('program2Description')}
                </p>
                <Link 
                  href="/formations" 
                  className="text-institutional-blue hover:text-institutional-blue-dark font-semibold transition-colors duration-200 inline-flex items-center text-sm sm:text-base min-h-[44px] py-2"
                >
                  {t('learnMore')}
                </Link>
              </div>
            </div>

            <div className="card p-6 sm:p-8 hover:shadow-2xl">
              <div className="bg-institutional-blue p-4 sm:p-6 text-white rounded-xl mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold">{t('program3Title')}</h3>
                <p className="text-blue-100 font-medium text-sm sm:text-base">{t('program3Duration')}</p>
              </div>
              <div>
                <p className="text-dark-gray mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {t('program3Description')}
                </p>
                <Link 
                  href="/formations" 
                  className="text-institutional-blue hover:text-institutional-blue-dark font-semibold transition-colors duration-200 inline-flex items-center text-sm sm:text-base min-h-[44px] py-2"
                >
                  {t('learnMore')}
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 sm:mt-16 px-4 sm:px-0">
            <Link
              href="/formations"
              className="btn-primary transform hover:scale-105 px-6 py-4 text-center min-h-[48px] flex items-center justify-center font-semibold rounded-lg shadow-lg transition-all duration-300 inline-flex"
            >
              {t('viewAllPrograms')}
            </Link>
          </div>
        </div>
      </section>

      {/* News Ticker Section */}
      <NewsTicker variant="section" />

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-institutional-blue-dark text-white">
        <div className="container-max text-center">
          <div className="px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
              {t('ctaTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-md sm:max-w-none mx-auto">
              <Link
                href="/contact"
                className="btn-primary bg-white text-institutional-blue hover:bg-light-gray transform hover:scale-105 px-6 py-4 text-center min-h-[48px] flex items-center justify-center font-semibold rounded-lg shadow-lg transition-all duration-300"
              >
                {t('requestInfo')}
              </Link>
              <Link
                href="/a-propos"
                className="btn-secondary border-white text-white hover:bg-white hover:text-institutional-blue transform hover:scale-105 px-6 py-4 text-center min-h-[48px] flex items-center justify-center font-semibold rounded-lg border-2 transition-all duration-300"
              >
                {t('discoverSchool')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
