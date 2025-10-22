export default function About() {
    return (
        <>
           <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-[#00732F] mb-6">عن المصحة</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00732F] to-[#FFD700] mx-auto mb-8"></div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <div className="text-6xl mb-6 text-center">🏥</div>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
                  <span className="font-bold text-[#00732F]">مصحة الحكمة</span> هي منشأة طبية حديثة تهدف إلى توفير رعاية كاملة لسكان ولاية لعصابة والمناطق المحيطة. نضم طاقماً من الأطباء والممرضين المتخصصين، ونوفر تجهيزات طبية حديثة لتأمين تشخيص وعلاج فعال.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-[#E8F5E9] rounded-xl">
                    <div className="text-3xl mb-2">👨‍⚕️</div>
                    <div className="font-semibold text-[#00732F] text-lg">أطباء متخصصون</div>
                  </div>
                  <div className="text-center p-4 bg-[#FFF9E6] rounded-xl">
                    <div className="text-3xl mb-2">🏗️</div>
                    <div className="font-semibold text-[#00732F] text-lg">تجهيزات حديثة</div>
                  </div>
                  <div className="text-center p-4 bg-[#FFF9E6] rounded-xl">
                    <div className="text-3xl mb-2">💊</div>
                    <div className="font-semibold text-[#00732F] text-lg">علاج فعال</div>
                  </div>
                  <div className="text-center p-4 bg-[#E8F5E9] rounded-xl">
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="font-semibold text-[#00732F] text-lg">تشخيص دقيق</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#00732F] to-[#004D20] p-6 rounded-2xl text-white text-center">
                  <div className="text-5xl font-bold mb-2">100%</div>
                  <div className="text-lg">تفاني في الخدمة</div>
                </div>
                <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] p-6 rounded-2xl text-white text-center">
                  <div className="text-5xl font-bold mb-2">24/7</div>
                  <div className="text-lg">خدمة مستمرة</div>
                </div>
                <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] p-6 rounded-2xl text-white text-center">
                  <div className="text-5xl font-bold mb-2">حديث</div>
                  <div className="text-lg">معدات طبية</div>
                </div>
                <div className="bg-gradient-to-br from-[#00732F] to-[#004D20] p-6 rounded-2xl text-white text-center">
                  <div className="text-5xl font-bold mb-2">شامل</div>
                  <div className="text-lg">رعاية متكاملة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}