import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="bg-institutional-blue-dark text-white md:py-8 py-16">
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <Image 
                  src="/logo.jpeg" 
                  alt="EETFP-TIC Logo" 
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">
                  EETFP-TIC
                </span>
                <span className="text-sm text-blue-100 font-medium">
                  {t('location')}
                </span>
              </div>
            </div>
            <p className="text-blue-100 mb-6 max-w-md leading-relaxed">
              {t('homeDescription')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-institutional-blue rounded-lg flex items-center justify-center text-white hover:bg-institutional-blue-light transition-all duration-200 hover:scale-110">
                <span className="sr-only">{t('socialFacebook')}</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-institutional-blue rounded-lg flex items-center justify-center text-white hover:bg-institutional-blue-light transition-all duration-200 hover:scale-110">
                <span className="sr-only">{t('socialLinkedIn')}</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-institutional-blue rounded-lg flex items-center justify-center text-white hover:bg-institutional-blue-light transition-all duration-200 hover:scale-110">
                <span className="sr-only">{t('socialYouTube')}</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">{t('footerQuickLinks')}</h3>
            <ul className="space-y-3">
              <li><Link href="/a-propos" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">{t('navAbout')}</Link></li>
              <li><Link href="/formations" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">{t('navFormations')}</Link></li>
              <li><Link href="/actualites" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">{t('navActualites')}</Link></li>
              <li><Link href="/contact" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">{t('navContact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">{t('footerContact')}</h3>
            <div className="space-y-3 text-blue-100">
              <p className="font-medium">CK OUEST N°0501 ZONE EL MINA</p>
                              <p className="font-medium">Marbat 6ème, Carrefour Château d'eau</p>
              <p className="font-medium">BP: 3944</p>
              <p className="font-medium">
                <a href="tel:+22245259999" className="hover:text-white transition-colors duration-200">
                  Tél: +222 45 25 99 99
                </a>
              </p>
              <p className="font-medium">
                <a href="tel:+22245259009" className="hover:text-white transition-colors duration-200">
                  Fax: +222 45 25 90 09
                </a>
              </p>
              <p className="font-medium">
                <a href="mailto:contact@etic.mr" className="hover:text-white transition-colors duration-200">
                  Email: contact@etic.mr
                </a>
              </p>
              <p className="font-medium">
                <a href="https://www.etic.mr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                  Site: www.etic.mr
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-institutional-blue mt-12 pt-8 text-center">
          <p className="text-blue-200 font-medium">&copy; 2024 EETFP-TIC {t('location')}. {t('footerCopyright')}</p>
          <p className="text-sm text-blue-300 mt-2 font-medium">{t('footerLegal')}</p>
        </div>
      </div>
    </footer>
  );
} 