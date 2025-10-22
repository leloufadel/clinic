'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const languages = [
  {
    code: 'fr',
    name: 'Français',
    shortName: 'FR'
  },
  {
    code: 'ar', 
    name: 'العربية',
    shortName: 'AR'
  },
  {
    code: 'en',
    name: 'English', 
    shortName: 'EN'
  }
];

// Globe Icon Component
const GlobeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    />
  </svg>
);

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile';
  onLanguageChange?: () => void;
}

export default function LanguageSwitcher({ variant = 'desktop', onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations();
  
  // Get current locale from params
  const currentLocale = params.locale as string || 'fr';
  
  // Get current language based on locale
  const currentLanguage = languages.find(l => l.code === currentLocale) || languages[0];

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (variant === 'desktop' && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen && variant === 'desktop') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, variant]);

  // Prevent body scroll when mobile modal is open
  useEffect(() => {
    if (variant === 'mobile' && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, variant]);

  const handleLanguageChange = (languageCode: string) => {
    setIsOpen(false);
    router.push(pathname, { locale: languageCode });
    onLanguageChange?.();
  };

  if (variant === 'mobile') {
    return (
      <div className="w-full">
        {/* Language Selector Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 mx-4 bg-white border border-light-gray rounded-xl shadow-sm hover:shadow-md transition-all duration-200 mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-institutional-blue/10 rounded-lg">
                <GlobeIcon className="w-5 h-5 text-institutional-blue" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-dark-gray">
                  {currentLanguage.name}
                </div>
                <div className="text-xs text-medium-gray">
                  Langue / Language / لغة
                </div>
              </div>
            </div>
            <svg 
              className={`w-5 h-5 text-medium-gray transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Mobile Language Modal/Bottom Sheet */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Bottom Sheet */}
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 transform transition-transform duration-300 ease-out">
              <div className="p-6">
                {/* Handle */}
                <div className="w-12 h-1.5 bg-light-gray rounded-full mx-auto mb-6"></div>
                
                {/* Title */}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-dark-gray">
                    {t('selectLanguage')}
                  </h3>
                  <p className="text-sm text-medium-gray mt-1">
                    Select Language / اختر اللغة
                  </p>
                </div>
                
                {/* Language Options */}
                <div className="space-y-3">
                  {languages.map((language, index) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-200 ${
                        currentLanguage.code === language.code
                          ? 'bg-institutional-blue text-white shadow-lg transform scale-[1.02]'
                          : 'bg-light-gray hover:bg-medium-gray text-dark-gray'
                      }`}
                      style={{ 
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className={`p-3 rounded-xl ${
                        currentLanguage.code === language.code 
                          ? 'bg-white/20' 
                          : 'bg-institutional-blue/10'
                      }`}>
                        <GlobeIcon className={`w-6 h-6 ${
                          currentLanguage.code === language.code 
                            ? 'text-white' 
                            : 'text-institutional-blue'
                        }`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className={`font-semibold ${
                          currentLanguage.code === language.code ? 'text-white' : 'text-dark-gray'
                        }`}>
                          {language.name}
                        </div>
                        <div className={`text-sm ${
                          currentLanguage.code === language.code ? 'text-blue-100' : 'text-medium-gray'
                        }`}>
                          {language.shortName}
                        </div>
                      </div>
                      {currentLanguage.code === language.code && (
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-institutional-blue" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full mt-6 py-3 text-medium-gray font-medium rounded-xl hover:bg-light-gray transition-colors duration-200"
                >
                  {t('close')}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-light-gray border border-transparent hover:border-medium-gray min-h-[44px]"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <GlobeIcon className="w-5 h-5 text-institutional-blue" />
        <span className="hidden xl:block text-dark-gray">{currentLanguage.shortName}</span>
        <svg 
          className={`w-4 h-4 text-dark-gray transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-light-gray z-50 overflow-hidden">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-medium text-medium-gray border-b border-light-gray">
              {t('selectLanguage')}
            </div>
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 hover:bg-light-gray min-h-[48px] ${
                  currentLanguage.code === language.code
                    ? 'bg-institutional-blue/5 text-institutional-blue border-r-2 border-institutional-blue'
                    : 'text-dark-gray'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  currentLanguage.code === language.code 
                    ? 'bg-institutional-blue/10' 
                    : 'bg-light-gray'
                }`}>
                  <GlobeIcon className="w-4 h-4 text-institutional-blue" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{language.name}</div>
                  <div className="text-xs text-medium-gray">{language.shortName}</div>
                </div>
                {currentLanguage.code === language.code && (
                  <svg className="w-4 h-4 text-institutional-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
