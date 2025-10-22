export default function Services() {
    return (
        <>
           <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-[#00732F] mb-6">خدماتنا الطبية</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00732F] to-[#FFD700] mx-auto mb-6"></div>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
              نقدم مجموعة شاملة من الخدمات الطبية المتخصصة بأحدث التقنيات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-gradient-to-br from-white to-[#E8F5E9] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-[#00732F]">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00732F] to-[#004D20] rounded-2xl flex items-center justify-center text-4xl mb-6">
                🚑
              </div>
              <h3 className="text-3xl font-bold text-[#00732F] mb-4">الطوارئ والحالات المستعجلة</h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                استقبال على مدار 24 ساعة، غرفة إسعاف مجهزة بالكامل لاستقبال جميع الحالات الطارئة والمستعجلة.
              </p>
              <div className="flex items-center text-[#00732F] font-semibold text-lg">
                <span>متاح دائماً</span>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="bg-gradient-to-br from-white to-[#FFF9E6] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-[#FFD700]">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl flex items-center justify-center text-4xl mb-6">
                ⚕️
              </div>
              <h3 className="text-3xl font-bold text-[#00732F] mb-4">جراحة عامة وجراحة مناظير</h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                عمليات كبرى وصغرى، جراحة المناظير للنساء مع فريق جراحي متخصص وذو خبرة عالية.
              </p>
              <div className="flex items-center text-[#00732F] font-semibold text-lg">
                <span>فريق متخصص</span>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="bg-gradient-to-br from-white to-[#E8F5E9] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-[#00732F]">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00732F] to-[#004D20] rounded-2xl flex items-center justify-center text-4xl mb-6">
                🔬
              </div>
              <h3 className="text-3xl font-bold text-[#00732F] mb-4">مختبر وتحليل</h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                تحاليل سريعة ودقيقة مع توجيه استشاري، باستخدام أحدث الأجهزة والتقنيات المخبرية.
              </p>
              <div className="flex items-center text-[#00732F] font-semibold text-lg">
                <span>نتائج دقيقة</span>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="bg-gradient-to-br from-white to-[#FFF9E6] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-[#FFD700]">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl flex items-center justify-center text-4xl mb-6">
                🏥
              </div>
              <h3 className="text-3xl font-bold text-[#00732F] mb-4">عيادات تخصصية</h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                أمراض القلب، السكر، الأعصاب، الأطفال والخدج - عيادات متخصصة بإشراف أطباء استشاريين.
              </p>
              <div className="flex items-center text-[#00732F] font-semibold text-lg">
                <span>تخصصات متعددة</span>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>

            {/* Service Card 5 */}
            <div className="bg-gradient-to-br from-white to-[#E8F5E9] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-[#00732F]">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00732F] to-[#004D20] rounded-2xl flex items-center justify-center text-4xl mb-6">
                🛏️
              </div>
              <h3 className="text-3xl font-bold text-[#00732F] mb-4">عناية مركزة</h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                وحدة عناية مركزة لحديثي الولادة والمرضى الحرجين، مجهزة بأحدث أجهزة المراقبة والتنفس.
              </p>
              <div className="flex items-center text-[#00732F] font-semibold text-lg">
                <span>رعاية فائقة</span>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>

            {/* Service Card 6 */}
            <div className="bg-gradient-to-br from-white to-[#FFF9E6] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-[#FFD700]">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl flex items-center justify-center text-4xl mb-6">
                💊
              </div>
              <h3 className="text-3xl font-bold text-[#00732F] mb-4">خدمات صحية داعمة</h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                تخطيط قلب، تصوير طبي، صيدلية داخلية، وخدمات صحية أخرى لدعم التشخيص والعلاج.
              </p>
              <div className="flex items-center text-[#00732F] font-semibold text-lg">
                <span>خدمات متكاملة</span>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}