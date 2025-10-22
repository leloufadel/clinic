import Image from "next/image";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
          {/* Header */}
    
      <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#00732F] to-[#004D20] rounded-full flex items-center justify-center">
            <span className="text-2xl text-white">⚕️</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#00732F]">مصحة الحكمة</h1>
            <p className="text-sm text-gray-600">رعاية طبية متميزة</p>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#home" className="text-lg text-gray-700 hover:text-[#00732F] transition-colors font-medium">الرئيسية</a>
          <a href="#services" className="text-lg text-gray-700 hover:text-[#00732F] transition-colors font-medium">الخدمات</a>
          <a href="#about" className="text-lg text-gray-700 hover:text-[#00732F] transition-colors font-medium">عن المصحة</a>
          <a href="#team" className="text-lg text-gray-700 hover:text-[#00732F] transition-colors font-medium">الفريق الطبي</a>
          <a href="#contact" className="bg-gradient-to-r from-[#00732F] to-[#004D20] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all font-medium text-lg">
            حجز موعد
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#00732F]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a href="#home" className="text-lg text-gray-700 hover:text-[#00732F] transition-colors font-medium">الرئيسية</a>
            <a href="#services" className="text-lg text-gray-700 hover:text-[#00732F] transition-colors font-medium">الخدمات</a>
            <a href="#about" className="text-lg text-gray-700 hover:text-[#00732F] transition-colors font-medium">عن المصحة</a>
            <a href="#team" className="text-lg text-gray-700 hover:text-[#00732F] transition-colors font-medium">الفريق الطبي</a>
            <a href="#contact" className="bg-gradient-to-r from-[#00732F] to-[#004D20] text-white px-6 py-3 rounded-full text-center hover:shadow-lg transition-all font-medium text-lg">
              حجز موعد
            </a>
          </div>
        </div>
      )}
    </header>
    </>
    );
}