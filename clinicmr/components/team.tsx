export default function Team() {
    return (
        <>
          <section id="team" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-[#00732F] mb-6">الفريق الطبي</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00732F] to-[#FFD700] mx-auto mb-6"></div>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
              نخبة من الأطباء المتخصصين ذوي الخبرة والكفاءة العالية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Doctor 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-32 h-32 bg-gradient-to-br from-[#00732F] to-[#004D20] rounded-full flex items-center justify-center text-6xl mx-auto mb-6">
                👨‍⚕️
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-[#00732F] mb-2">د. ولدي ولد أعلاله</h3>
                <div className="inline-block px-5 py-2 bg-[#FFD700]/20 rounded-full mb-4">
                  <p className="text-[#00732F] font-semibold text-xl">جراحة نساء وتوليد</p>
                </div>
                <p className="text-gray-600 mt-4 text-lg">
                  استشاري متخصص في جراحة النساء والتوليد مع خبرة واسعة في العمليات الجراحية المعقدة
                </p>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-32 h-32 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center text-6xl mx-auto mb-6">
                👨‍⚕️
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-[#00732F] mb-2">د. زكريا ولد شيبته</h3>
                <div className="inline-block px-5 py-2 bg-[#E8F5E9] rounded-full mb-4">
                  <p className="text-[#00732F] font-semibold text-xl">أمراض السكر والغدد</p>
                </div>
                <p className="text-gray-600 mt-4 text-lg">
                  متخصص في علاج أمراض الغدد الصماء والسكري، مع اهتمام خاص بالرعاية الشاملة للمرضى
                </p>
              </div>
            </div>

            {/* Doctor 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-32 h-32 bg-gradient-to-br from-[#00732F] to-[#004D20] rounded-full flex items-center justify-center text-6xl mx-auto mb-6">
                👨‍⚕️
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-[#00732F] mb-2">د. أسم لاله</h3>
                <div className="inline-block px-5 py-2 bg-[#FFD700]/20 rounded-full mb-4">
                  <p className="text-[#00732F] font-semibold text-xl">أخصائي أعصاب</p>
                </div>
                <p className="text-gray-600 mt-4 text-lg">
                  أخصائي في طب الأعصاب، يقدم تشخيص وعلاج متقدم لمختلف الأمراض العصبية
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}