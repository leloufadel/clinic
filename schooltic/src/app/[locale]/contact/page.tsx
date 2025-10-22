'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ nom: '', email: '', sujet: '', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sujets = [
    t('contactSubject1'),
    t('contactSubject2'),
    t('contactSubject3'),
    t('contactSubject4'),
    t('contactSubject5'),
    t('contactSubject6')
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-institutional-blue via-institutional-blue-light to-institutional-blue-dark text-black py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container-max text-center">
          <div className="px-4 sm:px-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 leading-tight">{t('contactPageTitle')}</h1>
            <p className="text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed opacity-95">
              {t('contactPageDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 px-4 sm:px-0">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-institutional-blue mb-6 sm:mb-8 leading-tight">
                {t('contactCoordinatesTitle')}
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-institutional-blue rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-institutional-blue mb-2">{t('contactAddress')}</h3>
                    <p className="text-dark-gray leading-relaxed" dangerouslySetInnerHTML={{ __html: t('contactAddressValue') }} />
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-institutional-blue rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-institutional-blue mb-2">{t('contactPhone')}</h3>
                    <a href="tel:+22245259999" className="text-dark-gray hover:text-institutional-blue transition-colors duration-200 font-medium">
                      +222 45 25 99 99
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-institutional-blue rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-institutional-blue mb-2">{t('contactEmail')}</h3>
                    <a href="mailto:eticcontactmr@gmail.com" className="text-dark-gray hover:text-institutional-blue transition-colors duration-200 font-medium">
                      eticcontactmr@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-institutional-blue rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-institutional-blue mb-2">{t('contactFax')}</h3>
                    <a href="tel:+22245259009" className="text-dark-gray hover:text-institutional-blue transition-colors duration-200 font-medium">
                      +222 45 25 90 09
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-institutional-blue rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-institutional-blue mb-2">{t('contactWebsite')}</h3>
                    <a href="https://www.etic.mr" target="_blank" rel="noopener noreferrer" className="text-dark-gray hover:text-institutional-blue transition-colors duration-200 font-medium">
                      www.etic.mr
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-institutional-blue rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-institutional-blue mb-2">{t('contactOpeningHours')}</h3>
                    <p className="text-dark-gray leading-relaxed" dangerouslySetInnerHTML={{ __html: t('contactOpeningHoursValue') }} />
                  </div>
                </div>
              </div>

              {/* Google Maps Location */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-institutional-blue mb-4">{t('contactLocationTitle')}</h3>
                
                {/* Location Details Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-light-gray">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-institutional-blue rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-institutional-blue mb-2">{t('contactFullAddress')}</h4>
                      <div className="space-y-1 text-dark-gray">
                        <p className="font-medium">{t('contactFullAddressValue1')}</p>
                        <p>{t('contactFullAddressValue2')}</p>
                        <p>{t('contactFullAddressValue3')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://www.google.com/maps?q=18.057519,-15.985895" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-institutional-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-institutional-blue-dark transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {t('contactOpenGoogleMaps')}
                    </a>
                    <a 
                      href="https://maps.apple.com/?q=18.057519,-15.985895" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                      </svg>
                      {t('contactOpenAppleMaps')}
                    </a>
                  </div>
                </div>

                {/* Interactive Map Preview */}
                <div className="w-full h-80 rounded-2xl shadow-lg overflow-hidden relative group">
                  <a 
                    href="https://www.google.com/maps?q=18.057519,-15.985895" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full h-full block relative"
                  >
                    {/* Map Image */}
                    <Image 
                      src="https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=800&h=400&fit=crop&crop=center" 
                      alt={t('contactMapLocation')}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Google Maps Style Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Location Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-lg font-bold mb-1">{t('contactMapSchoolName')}</h5>
                          <p className="text-sm opacity-90">{t('contactMapLocationText')}</p>
                          <p className="text-xs opacity-80 mt-1">18.057519, -15.985895</p>
                        </div>
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Location Pin */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 bg-red-500 rounded-full border-3 border-white shadow-2xl animate-pulse"></div>
                      <div className="w-3 h-3 bg-red-500 rounded-full border border-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-institutional-blue bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white text-institutional-blue px-6 py-3 rounded-xl font-bold text-lg shadow-2xl">
                          {t('contactMapClickToOpen')}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="mt-12 lg:mt-0">
              <h2 className="text-3xl sm:text-4xl font-bold text-institutional-blue mb-6 sm:mb-8 leading-tight">
                {t('contactSendMessageTitle')}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-semibold text-dark-gray mb-2">
                      {t('contactFullName')}
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border border-medium-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-institutional-blue focus:border-institutional-blue transition-all duration-200 text-base min-h-[48px]"
                      placeholder={t('contactFullNamePlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-dark-gray mb-2">
                      {t('contactEmail')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border border-medium-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-institutional-blue focus:border-institutional-blue transition-all duration-200 text-base min-h-[48px]"
                      placeholder={t('contactEmailPlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="sujet" className="block text-sm font-semibold text-dark-gray mb-2">
                    {t('contactSubject')}
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border border-medium-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-institutional-blue focus:border-institutional-blue transition-all duration-200 text-base min-h-[48px] bg-white"
                  >
                    <option value="">{t('contactSubjectSelect')}</option>
                    {sujets.map((sujet, index) => (
                      <option key={index} value={sujet}>{sujet}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-dark-gray mb-2">
                    {t('contactMessage')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-4 border border-medium-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-institutional-blue focus:border-institutional-blue transition-all duration-200 resize-none text-base"
                    placeholder={t('contactMessagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary transform hover:scale-105 px-6 py-4 text-center min-h-[48px] flex items-center justify-center font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </div>
                  ) : (
                    t('contactSendButton')
                  )}
                </button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-800 font-medium">
                        Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-red-800 font-medium">
                        {errorMessage}
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-light-gray">
        <div className="container-max">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-institutional-blue mb-4 sm:mb-6 leading-tight">
              {t('contactFAQTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-dark-gray max-w-4xl mx-auto leading-relaxed">
              {t('contactFAQDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 px-4 sm:px-0">
            <div className="card p-8">
              <h3 className="text-xl font-bold text-institutional-blue mb-4">
                {t('contactFAQ1Title')}
              </h3>
              <p className="text-dark-gray leading-relaxed">
                {t('contactFAQ1Answer')}
              </p>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-bold text-institutional-blue mb-4">
                {t('contactFAQ2Title')}
              </h3>
              <p className="text-dark-gray leading-relaxed">
                {t('contactFAQ2Answer')}
              </p>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-bold text-institutional-blue mb-4">
                {t('contactFAQ3Title')}
              </h3>
              <p className="text-dark-gray leading-relaxed">
                {t('contactFAQ3Answer')}
              </p>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-bold text-institutional-blue mb-4">
                {t('contactFAQ4Title')}
              </h3>
              <p className="text-dark-gray leading-relaxed">
                {t('contactFAQ4Answer')}
              </p>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-bold text-institutional-blue mb-4">
                {t('contactFAQ5Title')}
              </h3>
              <p className="text-dark-gray leading-relaxed">
                {t('contactFAQ5Answer')}
              </p>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-bold text-institutional-blue mb-4">
                {t('contactFAQ6Title')}
              </h3>
              <p className="text-dark-gray leading-relaxed">
                {t('contactFAQ6Answer')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-institutional-blue-dark text-white">
        <div className="container-max text-center">
          <div className="px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
              {t('contactCTATitle')}
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
              {t('contactCTADescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-md sm:max-w-none mx-auto">
              <button className="btn-primary bg-white text-institutional-blue hover:bg-light-gray transform hover:scale-105 px-6 py-4 text-center min-h-[48px] flex items-center justify-center font-semibold rounded-lg shadow-lg transition-all duration-300">
                {t('contactRequestAppointment')}
              </button>
              <button className="btn-secondary border-white text-white hover:bg-white hover:text-institutional-blue transform hover:scale-105 px-6 py-4 text-center min-h-[48px] flex items-center justify-center font-semibold rounded-lg border-2 transition-all duration-300">
                {t('contactDownloadBrochure')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 