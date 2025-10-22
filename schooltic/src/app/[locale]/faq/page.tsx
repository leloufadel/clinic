'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const t = useTranslations();

  const faqData: FAQItem[] = [
    // Admissions et Inscriptions
    {
      category: t('faqCategoryAdmissions'),
      question: t('faqQuestion1'),
      answer: t('faqAnswer1')
    },
    {
      category: t('faqCategoryAdmissions'),
      question: t('faqQuestion2'),
      answer: t('faqAnswer2')
    },
    {
      category: t('faqCategoryAdmissions'),
      question: t('faqQuestion3'),
      answer: t('faqAnswer3')
    },
    {
      category: t('faqCategoryAdmissions'),
      question: t('faqQuestion4'),
      answer: t('faqAnswer4')
    },

    // Formations et Programmes
    {
      category: t('faqCategoryFormations'),
      question: t('faqQuestion5'),
      answer: t('faqAnswer5')
    },
    {
      category: t('faqCategoryFormations'),
      question: t('faqQuestion6'),
      answer: t('faqAnswer6')
    },
    {
      category: t('faqCategoryFormations'),
      question: t('faqQuestion7'),
      answer: t('faqAnswer7')
    },
    {
      category: t('faqCategoryFormations'),
      question: t('faqQuestion8'),
      answer: t('faqAnswer8')
    },

    // Coûts et Financement
    {
      category: t('faqCategoryCosts'),
      question: t('faqQuestion9'),
      answer: t('faqAnswer9')
    },
    {
      category: t('faqCategoryCosts'),
      question: t('faqQuestion10'),
      answer: t('faqAnswer10')
    },
    {
      category: t('faqCategoryCosts'),
      question: t('faqQuestion11'),
      answer: t('faqAnswer11')
    },

    // Débouchés et Carrière
    {
      category: t('faqCategoryCareer'),
      question: t('faqQuestion12'),
      answer: t('faqAnswer12')
    },
    {
      category: t('faqCategoryCareer'),
      question: t('faqQuestion13'),
      answer: t('faqAnswer13')
    },
    {
      category: t('faqCategoryCareer'),
      question: t('faqQuestion14'),
      answer: t('faqAnswer14')
    },

    // Vie Étudiante
    {
      category: t('faqCategoryStudentLife'),
      question: t('faqQuestion15'),
      answer: t('faqAnswer15')
    },
    {
      category: t('faqCategoryStudentLife'),
      question: t('faqQuestion16'),
      answer: t('faqAnswer16')
    },
    {
      category: t('faqCategoryStudentLife'),
      question: t('faqQuestion17'),
      answer: t('faqAnswer17')
    },

    // Informations Pratiques
    {
      category: t('faqCategoryPractical'),
      question: t('faqQuestion18'),
      answer: t('faqAnswer18')
    },
    {
      category: t('faqCategoryPractical'),
      question: t('faqQuestion19'),
      answer: t('faqAnswer19')
    },
    {
      category: t('faqCategoryPractical'),
      question: t('faqQuestion20'),
      answer: t('faqAnswer20')
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const categories = [...new Set(faqData.map(item => item.category))];

  // Filter FAQ items based on search query
  const filteredFAQData = faqData.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get unique categories from filtered data
  const filteredCategories = [...new Set(filteredFAQData.map(item => item.category))];

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <section className="bg-gradient-to-br from-institutional-blue via-institutional-blue-light to-institutional-blue-dark text-black py-20">
        <div className="container-max text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('faqPageTitle')}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-95">
            {t('faqPageDescription')}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="container-max">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                placeholder={t('faqSearchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-medium-gray rounded-2xl focus:border-institutional-blue focus:outline-none transition-all duration-300 shadow-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-dark-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            {searchQuery && (
              <div className="text-center mt-4">
                <p className="text-dark-gray">
                  {filteredFAQData.length} {filteredFAQData.length === 1 ? t('faqResultsFound') : t('faqResultsFoundPlural')}
                </p>
              </div>
            )}
          </div>

          {/* FAQ Categories */}
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category} className="mb-12">
                <h2 className="text-3xl font-bold text-institutional-blue mb-8 text-center">
                  {category}
                </h2>
                <div className="max-w-4xl mx-auto space-y-4">
                  {filteredFAQData
                    .filter(item => item.category === category)
                    .map((item, index) => {
                      const globalIndex = faqData.findIndex(faq => faq === item);
                      const isOpen = openItems.includes(globalIndex);
                      
                      return (
                        <div key={globalIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-light-gray transition-all duration-300"
                          >
                            <h3 className="text-lg font-semibold text-dark-gray pr-4">
                              {item.question}
                            </h3>
                            <div className="flex-shrink-0">
                              <svg
                                className={`w-6 h-6 text-institutional-blue transform transition-transform duration-300 ${
                                  isOpen ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </button>
                          
                          {isOpen && (
                            <div className="px-6 pb-5 border-t border-light-gray">
                              <p className="text-dark-gray leading-relaxed pt-4">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))
          ) : searchQuery ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                <svg className="w-16 h-16 text-dark-gray mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-3.039 0-5.812-1.24-7.834-3.257M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-dark-gray mb-2">{t('faqNoResultsTitle')}</h3>
                <p className="text-dark-gray mb-4">
                  {t('faqNoResultsDescription')} "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 bg-institutional-blue text-white font-semibold rounded-lg hover:bg-institutional-blue-dark transition-all duration-300"
                >
                  {t('faqClearSearch')}
                </button>
              </div>
            </div>
          ) : null}

          {/* Contact Section */}
          <div className="text-center mt-20">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-institutional-blue mb-4">
                {t('faqContactTitle')}
              </h3>
              <p className="text-dark-gray mb-6">
                {t('faqContactDescription')}
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-institutional-blue text-white font-semibold rounded-lg hover:bg-institutional-blue-dark transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {t('faqContactButton')}
              </a>
            </div>
          </div>
        </div>
      </section>
   
    </div>
  );
} 