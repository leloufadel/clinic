'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface NewsItem {
  id: number;
  key: string;
  type: 'announcement' | 'deadline' | 'event' | 'general';
  urgent?: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    key: 'news1',
    type: 'deadline',
    urgent: true
  },
  {
    id: 2,
    key: 'news2', 
    type: 'event'
  },
  {
    id: 3,
    key: 'news3',
    type: 'announcement'
  },
  {
    id: 4,
    key: 'news4',
    type: 'general'
  },
  {
    id: 5,
    key: 'news5',
    type: 'deadline'
  }
];

interface NewsTickerProps {
  variant?: 'banner' | 'section';
  className?: string;
}

export default function NewsTicker({ variant = 'banner', className = '' }: NewsTickerProps) {
  const [isPaused, setIsPaused] = useState(false);
  const t = useTranslations();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'event':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'announcement':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getTypeColor = (type: string, urgent?: boolean) => {
    if (urgent) return 'text-red-600 bg-red-50';
    
    switch (type) {
      case 'deadline':
        return 'text-orange-600 bg-orange-50';
      case 'event':
        return 'text-green-600 bg-green-50';
      case 'announcement':
        return 'text-institutional-blue bg-blue-50';
      default:
        return 'text-dark-gray bg-light-gray';
    }
  };

  if (variant === 'banner') {
    return (
      <div className={`bg-institutional-blue text-white py-2 shadow-sm border-b border-institutional-blue-dark ${className}`}>
        <div className="container-max">
          <div className="flex items-center">
            {/* News Label */}
            <div className="flex items-center space-x-2 mr-4 flex-shrink-0">
              <div className="bg-white/20 rounded-lg p-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <span className="font-semibold text-sm whitespace-nowrap">
                {t('newsUpdates')}
              </span>
            </div>

            {/* Scrolling News Container */}
            <div className="flex-1 overflow-hidden">
              <div 
                className={`flex space-x-8 ${isPaused ? '' : 'animate-scroll'}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {[...newsItems, ...newsItems].map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex items-center space-x-2 whitespace-nowrap flex-shrink-0"
                  >
                    <div className={`p-1 rounded ${getTypeColor(item.type, item.urgent)}`}>
                      {getTypeIcon(item.type)}
                    </div>
                    <span className="text-sm font-medium">
                      {t(item.key)}
                    </span>
                    {item.urgent && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        {t('urgent')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
              {/* <button
                onClick={() => setIsPaused(!isPaused)}
                className="bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-colors duration-200"
                aria-label={isPaused ? t('playNews') : t('pauseNews')}
              >
                {isPaused ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                )}
              </button> */}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          
          .animate-scroll {
            animation: scroll 60s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  // Section variant for homepage
  return (
    <section className={`py-8 bg-gradient-to-r from-institutional-blue/5 to-institutional-blue-light/5 ${className}`}>
      <div className="container-max">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-institutional-blue mb-4">
            {t('latestNews')}
          </h2>
          <p className="text-dark-gray max-w-2xl mx-auto">
            {t('stayUpdated')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-light-gray">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-4 border border-light-gray rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(item.type, item.urgent)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-semibold text-medium-gray uppercase tracking-wide">
                        {t(item.type)}
                      </span>
                      {item.urgent && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                          {t('urgent')}
                        </span>
                      )}
                    </div>
                    <p className="text-dark-gray font-medium leading-relaxed">
                      {t(item.key)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button className="btn-primary">
              {t('viewAllNews')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
