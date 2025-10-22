export default function Hero() {
    return (
        <>
          <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-[#E8F5E9] via-white to-[#FFF9E6]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-right">
              <div className="inline-block mb-4 px-6 py-3 bg-[#FFD700]/20 border border-[#FFD700] rounded-full">
                <span className="text-xl text-[#00732F] font-semibold">⏰ خدمة 24 ساعة</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#00732F] mb-6 leading-tight">
                مصحة الحكمة
          </h1>
              <p className="text-2xl md:text-3xl text-gray-700 mb-8 leading-relaxed">
                نقدم رعاية طبية متميزة على مدار الساعة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <a href="#contact" className="bg-gradient-to-r from-[#00732F] to-[#004D20] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105">
                  احجز موعدك الآن
                </a>
                <a href="#services" className="border-2 border-[#00732F] text-[#00732F] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#00732F] hover:text-white transition-all">
                  استكشف خدماتنا
                </a>
              </div>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto lg:mx-0">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#00732F] mb-2">24/7</div>
                  <div className="text-lg text-gray-600">طوارئ</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#00732F] mb-2">متكامل</div>
                  <div className="text-lg text-gray-600">مختبر</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#00732F] mb-2">مؤهل</div>
                  <div className="text-lg text-gray-600">فريق طبي</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-[#00732F] to-[#004D20] rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="text-8xl mb-4">🏥</div>
                    <h3 className="text-3xl font-bold mb-6">رعاية شاملة</h3>
                    <div className="grid grid-cols-2 gap-4 text-lg">
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-3xl mb-2">🚑</div>
                        <div>طوارئ 24 ساعة</div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-3xl mb-2">🔬</div>
                        <div>مختبر متكامل</div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-3xl mb-2">⚕️</div>
                        <div>جراحة وتنظير</div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-3xl mb-2">👶</div>
                        <div>عناية خدج</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FFD700] rounded-full opacity-50 blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#00732F] rounded-full opacity-30 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}