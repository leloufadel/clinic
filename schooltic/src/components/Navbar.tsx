'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import ClientOnly from './ClientOnly';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const t = useTranslations();

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Set initial scroll state
    setIsScrolled(window.scrollY > 10);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { nameKey: 'navHome', href: '/' },
    { nameKey: 'navAbout', href: '/a-propos' },
    { nameKey: 'navDirectorWords', href: '/mot-du-directeur' },
    { nameKey: 'navFormations', href: '/formations' },
    { nameKey: 'navActualites', href: '/actualites' },
    { nameKey: 'navFaq', href: '/faq' },
    { nameKey: 'navContact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className={`bg-white shadow-lg sticky top-0 z-50 border-b border-light-gray transition-all duration-300 ${
        isScrolled ? 'shadow-xl' : ''
      }`}>
        <div className="container-max">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo - Optimized for space */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 overflow-hidden">
                  <Image 
                    src="/logo.jpg" 
                    alt="EETFP-TIC Logo" 
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg lg:text-xl font-bold text-institutional-blue leading-tight">
                    EETFP-TIC
                  </span>
                  <span className="text-xs text-dark-gray font-medium hidden lg:block leading-none">
                    {t('location')}
                  </span>
                </div>
              </Link>
            </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-6 flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.nameKey}
                  href={item.href}
                  className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 min-h-[44px] flex items-center whitespace-nowrap ${
                    isActive(item.href)
                      ? 'text-institutional-blue bg-light-gray border border-medium-gray'
                      : 'text-dark-gray hover:text-institutional-blue hover:bg-light-gray'
                  }`}
                >
                  {t(item.nameKey)}
                </Link>
              ))}
              
              {/* Inscription Button */}
              <Link
                href="https://tekwine.mr/login"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 px-4 py-2.5 bg-institutional-blue text-white font-semibold rounded-lg shadow-lg hover:bg-institutional-blue-dark hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-institutional-blue hover:border-institutional-blue-dark min-h-[44px] flex items-center whitespace-nowrap text-sm"
              >
                {t('inscription')}
              </Link>

              {/* Language Switcher */}
              <div className="ml-3">
                <ClientOnly>
                  <LanguageSwitcher variant="desktop" />
                </ClientOnly>
              </div>

              {/* Admin Link */}
              <Link
                href="/admin"
                className={`ml-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 min-h-[44px] flex items-center whitespace-nowrap ${
                  isActive('/admin')
                    ? 'text-white bg-institutional-blue-dark border border-institutional-blue-dark'
                    : 'text-institutional-blue bg-light-gray hover:bg-institutional-blue hover:text-white border border-institutional-blue'
                }`}
              >
                {t('navAdmin')}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-lg text-dark-gray hover:text-institutional-blue hover:bg-light-gray focus:outline-none focus:ring-2 focus:ring-institutional-blue focus:ring-offset-2 transition-all duration-200 min-h-[44px] min-w-[44px]"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu principal'}</span>
              <div className="relative w-6 h-6">
                {/* Hamburger icon with animation */}
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                }`} />
                <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                }`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Navigation Menu */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-light-gray">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <Image 
                  src="/logo.jpg" 
                  alt="EETFP-TIC Logo" 
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-bold text-institutional-blue">EETFP-TIC</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-dark-gray hover:text-institutional-blue hover:bg-light-gray transition-all duration-200 min-h-[44px] min-w-[44px]"
              aria-label="Fermer le menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.nameKey}
                  href={item.href}
                  className={`px-4 py-4 rounded-xl text-base font-semibold transition-all duration-200 min-h-[48px] flex items-center ${
                    isActive(item.href)
                      ? 'text-institutional-blue bg-light-gray border border-medium-gray'
                      : 'text-dark-gray hover:text-institutional-blue hover:bg-light-gray'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {t(item.nameKey)}
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="mt-6 mb-6 border-t border-light-gray pt-6">
                <ClientOnly>
                  <LanguageSwitcher 
                    variant="mobile" 
                    onLanguageChange={() => setIsMenuOpen(false)}
                  />
                </ClientOnly>
              </div>

              {/* Mobile Admin Link */}
              <Link
                href="/admin"
                className={`px-4 py-4 rounded-xl text-base font-semibold transition-all duration-200 min-h-[48px] flex items-center ${
                  isActive('/admin')
                    ? 'text-white bg-institutional-blue border border-institutional-blue'
                    : 'text-institutional-blue bg-light-gray hover:bg-institutional-blue hover:text-white border border-institutional-blue'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navAdmin')}
              </Link>
            </div>
          </div>

          {/* Mobile Bottom Actions */}
          <div className="p-4 border-t border-light-gray bg-light-gray">
            <a
              href="https://tekwine.mr/login"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center px-6 py-4 bg-institutional-blue text-white font-semibold rounded-xl shadow-lg hover:bg-institutional-blue-dark transition-all duration-300 border-2 border-institutional-blue hover:border-institutional-blue-dark min-h-[48px] flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('inscription')}
            </a>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
} 