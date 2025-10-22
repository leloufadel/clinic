
export default function Feature() {
    return (
        <>
          <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-[#E8F5E9] to-white rounded-2xl shadow-md hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00732F] to-[#004D20] rounded-2xl flex items-center justify-center text-4xl">
                🚑
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#00732F] mb-2">طوارئ 24 ساعة</h3>
                <p className="text-gray-600 text-lg">استجابة سريعة ومجهزة بالكامل</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-[#FFF9E6] to-white rounded-2xl shadow-md hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl flex items-center justify-center text-4xl">
                🔬
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#00732F] mb-2">مختبر متكامل</h3>
                <p className="text-gray-600 text-lg">تحاليل سريعة ودقيقة</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-[#E8F5E9] to-white rounded-2xl shadow-md hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00732F] to-[#004D20] rounded-2xl flex items-center justify-center text-4xl">
                ⚕️
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#00732F] mb-2">جراحة وتنظير</h3>
                <p className="text-gray-600 text-lg">فريق جراحي مؤهل</p>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}