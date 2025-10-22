import { FaFacebook } from "react-icons/fa";

export default function Footer() {
    return (
        <>
           <footer className="bg-gradient-to-br from-[#00732F] to-[#004D20] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl">
                  ⚕️
                </div>
                <div>
                  <h3 className="text-2xl font-bold">مصحة الحكمة</h3>
                  <p className="text-base text-white/80">رعاية طبية متميزة</p>
                </div>
              </div>
              <p className="text-white/80 text-lg mb-4">
                منشأة طبية حديثة تقدم خدمات صحية شاملة على مدار الساعة لسكان ولاية لعصابة والمناطق المحيطة.
              </p>
              <div className="flex gap-4 mt-4">
                <a 
                  href="https://web.facebook.com/cliniqueelhikmakiffa" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-2xl transition-all transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebook className="text-3xl text-blue-500" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-2xl font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-3">
                <li><a href="#home" className="text-white/80 hover:text-[#FFD700] transition-colors text-lg">الرئيسية</a></li>
                <li><a href="#services" className="text-white/80 hover:text-[#FFD700] transition-colors text-lg">الخدمات</a></li>
                <li><a href="#about" className="text-white/80 hover:text-[#FFD700] transition-colors text-lg">عن المصحة</a></li>
                <li><a href="#team" className="text-white/80 hover:text-[#FFD700] transition-colors text-lg">الفريق الطبي</a></li>
                <li><a href="#contact" className="text-white/80 hover:text-[#FFD700] transition-colors text-lg">اتصل بنا</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-4">تواصل معنا</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-3xl">📍</span>
                  <span className="text-white/80 text-lg">ولاية لعصابة، موريتانيا</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-3xl">📞 </span>
                  <span className="text-white/80 text-lg">22 94 92 91</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-3xl">⏰</span>
                  <span className="text-white/80 text-lg">خدمة 24/7</span>
                </li>
                <li className="flex items-center gap-3">
                <FaFacebook className="text-3xl text-blue-500" />
                <a 
                    href="https://web.facebook.com/cliniqueelhikmakiffa" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-[#FFD700] transition-colors text-lg"
                  >
                    تابعنا على فيسبوك
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/80 text-lg">
              © 2025 مصحة الحكمة. جميع الحقوق محفوظة.
            </p>
           
          </div>
        </div>
      </footer>
        </>
    )
}