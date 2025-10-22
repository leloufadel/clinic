export default function Contact() {
    return (
        <>
           <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold text-[#00732F] mb-6">احجز موعدك الآن</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#00732F] to-[#FFD700] mx-auto mb-6"></div>
              <p className="text-2xl text-gray-600">
                تواصل معنا اليوم للحصول على موعد أو لأي استفسارات
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#E8F5E9] to-white p-8 md:p-12 rounded-3xl shadow-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#00732F] font-semibold mb-2 text-xl">الاسم الكامل</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#00732F] focus:outline-none transition-colors text-lg"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-[#00732F] font-semibold mb-2 text-xl">رقم الهاتف</label>
                    <input 
                      type="tel" 
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#00732F] focus:outline-none transition-colors text-lg"
                      placeholder="أدخل رقم هاتفك"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[#00732F] font-semibold mb-2 text-xl">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#00732F] focus:outline-none transition-colors text-lg"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>

                <div>
                  <label className="block text-[#00732F] font-semibold mb-2 text-xl">نوع الخدمة</label>
                  <select className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#00732F] focus:outline-none transition-colors text-lg">
                    <option>اختر نوع الخدمة</option>
                    <option>طوارئ</option>
                    <option>جراحة عامة</option>
                    <option>مختبر وتحليل</option>
                    <option>عيادة تخصصية</option>
                    <option>عناية مركزة</option>
                    <option>أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#00732F] font-semibold mb-2 text-xl">رسالتك</label>
                  <textarea 
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#00732F] focus:outline-none transition-colors text-lg"
                    placeholder="اكتب رسالتك أو استفسارك هنا..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00732F] to-[#004D20] text-white px-8 py-5 rounded-xl text-xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
                >
                  إرسال الطلب
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-br from-[#00732F] to-[#004D20] rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                      📞
                    </div>
                    <h4 className="font-bold text-[#00732F] mb-1 text-xl">اتصل بنا</h4>
                    <p className="text-gray-600 text-lg">متاح 24/7</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                      📍
                    </div>
                    <h4 className="font-bold text-[#00732F] mb-1 text-xl">موقعنا</h4>
                    <p className="text-gray-600 text-lg">ولاية لعصابة، موريتانيا</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-br from-[#00732F] to-[#004D20] rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                      ⏰
                    </div>
                    <h4 className="font-bold text-[#00732F] mb-1 text-xl">ساعات العمل</h4>
                    <p className="text-gray-600 text-lg">مفتوح 24 ساعة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}