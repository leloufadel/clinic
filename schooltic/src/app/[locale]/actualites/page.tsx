"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import axios from "axios";

interface DatabaseActuality {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  published_at: string;
  category: string;
  created_at: string;
  updated_at: string;
}

interface StaticActuality {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export default function ActualitesPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageAlt, setSelectedImageAlt] = useState<string>('');
  const [dynamicActualities, setDynamicActualities] = useState<DatabaseActuality[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations();
  const handleImageClick = (src: string, alt: string) => {
    setSelectedImage(src);
    setSelectedImageAlt(alt);
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    setSelectedImageAlt('');
  };

  // Fetch dynamic actualities from API
  useEffect(() => {
    const fetchActualities = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/actualities');
        console.log('Fetched actualities:', response.data);
        // Log first item to debug date format
        if (response.data.length > 0) {
          console.log('First actuality published_at:', response.data[0].published_at, 'Type:', typeof response.data[0].published_at);
        }
        setDynamicActualities(response.data);
      } catch (error) {
        console.error('Error fetching actualities:', error);
        setDynamicActualities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActualities();
  }, []);
  
  // Static hardcoded actualites
  const staticActualites: StaticActuality[] = [
    {
      id: 1,
      title: t('news1Title'),
      excerpt: t('news1Excerpt'),
      date: t('news1Date'),
      category: t('categoryInscription'),
      image: "/gallery/a11.jpeg"
    },
    {
      id: 2,
      title: t('news2Title'),
      excerpt: t('news2Excerpt'),
      date: t('news2Date'),
      category: t('categoryPartnership'),
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      title: t('news3Title'),
      excerpt: t('news3Excerpt'),
      date: t('news3Date'),
      category: t('categorySuccess'),
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 4,
      title: t('news4Title'),
      excerpt: t('news4Excerpt'),
      date: t('news4Date'),
      category: t('categoryInfrastructure'),
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 5,
      title: t('news5Title'),
      excerpt: t('news5Excerpt'),
      date: t('news5Date'),
      category: t('categoryFormation'),
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 6,
      title: t('news6Title'),
      excerpt: t('news6Excerpt'),
      date: t('news6Date'),
      category: t('categoryVisit'),
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&crop=center"
    }
  ];

  // Transform dynamic actualities to match static structure
  const transformedDynamicActualities: StaticActuality[] = dynamicActualities.map((actuality, index) => ({
    id: parseInt(actuality.id) + 1000, // Add offset to avoid ID conflicts with static data
    title: actuality.title,
    excerpt: actuality.description || '', // Use description as excerpt
    date: (() => {
      try {
        const dateValue = actuality.published_at;
        if (!dateValue) return 'Date non disponible';
        
        const date = new Date(dateValue);
        
        // Check if the date is valid
        if (isNaN(date.getTime())) {
          console.error('Invalid date value:', dateValue);
          return 'Date invalide';
        }
        
        return date.toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (error) {
        console.error('Error parsing date:', error, 'Value:', actuality.published_at);
        return 'Date invalide';
      }
    })(),
    category: actuality.category || 'Actualité',
    image: actuality.image_url || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=center" // Default fallback image
  }));

  // Combine static and dynamic actualities (dynamic first to show latest news first)
  const actualites = [...transformedDynamicActualities, ...staticActualites];

  const evenements = [
    {
      id: 1,
      title: t('event1Title'),
      date: t('event1Date'),
      time: t('event1Time'),
      location: t('event1Location'),
      description: t('event1Description'),
      type: t('eventTypeEvent')
    },
    {
      id: 2,
      title: t('event2Title'),
      date: t('event2Date'),
      time: t('event2Time'),
      location: t('event2Location'),
      description: t('event2Description'),
      type: t('eventTypeSalon')
    },
    {
      id: 3,
      title: t('event3Title'),
      date: t('event3Date'),
      time: t('event3Time'),
      location: t('event3Location'),
      description: t('event3Description'),
      type: t('eventTypeConference')
    },
    {
      id: 4,
      title: t('event4Title'),
      date: t('event4Date'),
      time: t('event4Time'),
      location: t('event4Location'),
      description: t('event4Description'),
      type: t('eventTypeWorkshop')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-institutional-blue via-institutional-blue-light to-institutional-blue-dark text-black py-24">
        <div className="container-max text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">{t('actualitesPageTitle')}</h1>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed opacity-95">
            {t('actualitesPageDescription')}
          </p>
        </div>
      </section>

      {/* News Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-institutional-blue mb-6 leading-tight">
                {t('actualitesTitle')}
            </h2>
            <p className="text-xl text-dark-gray max-w-4xl mx-auto leading-relaxed">
              {t('actualitesDescription')}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-institutional-blue mx-auto"></div>
              <p className="mt-4 text-dark-gray">Chargement des actualités...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {actualites.map((actualite) => (
              <article key={actualite.id} className="card group hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <Image 
                    src={actualite.image} 
                    alt={actualite.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-institutional-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {actualite.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-sm text-dark-gray mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {actualite.date}
                  </div>

                  <h3 className="text-xl font-bold text-institutional-blue mb-4 leading-tight group-hover:text-institutional-blue-dark transition-colors duration-200">
                    {actualite.title}
                  </h3>

                  <p className="text-dark-gray mb-6 leading-relaxed">
                    {actualite.excerpt}
                  </p>

                  <button className="text-institutional-blue hover:text-institutional-blue-dark font-semibold transition-colors duration-200 flex items-center group">
                    {t('readMore')}
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <button className="btn-primary transform hover:scale-105">
            {t('actualitesButton')}
            </button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section-padding bg-light-gray">
        <div className="container-max">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-institutional-blue mb-6 leading-tight">
             {t('actualitesEventsTitle')}
            </h2>
            <p className="text-xl text-dark-gray max-w-4xl mx-auto leading-relaxed">
            {t('actualitesEventsDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {evenements.map((evenement) => (
              <div key={evenement.id} className="card p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                                              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          evenement.type === t('eventTypeEvent') ? 'bg-institutional-blue text-white' :
                          evenement.type === t('eventTypeSalon') ? 'bg-green-600 text-white' :
                          evenement.type === t('eventTypeConference') ? 'bg-purple-600 text-white' :
                          'bg-institutional-blue-light text-white'
                        }`}>
                        {evenement.type}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-institutional-blue mb-4 leading-tight">
                      {evenement.title}
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-dark-gray">
                        <svg className="w-5 h-5 mr-3 text-institutional-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">{evenement.date}</span>
                        <span className="mx-2">•</span>
                        <span>{evenement.time}</span>
                      </div>
                      
                      <div className="flex items-center text-dark-gray">
                        <svg className="w-5 h-5 mr-3 text-institutional-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-medium">{evenement.location}</span>
                      </div>
                    </div>

                    <p className="text-dark-gray leading-relaxed mb-6">
                      {evenement.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="btn-primary flex-1 transform hover:scale-105">
                  {t('actualitesEventsButton')}
                  </button>
                  <button className="btn-secondary flex-1 transform hover:scale-105">
                    {t('actualitesEventsInfosButton')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-institutional-blue mb-6 leading-tight">
              {t('photoGalleryTitle')}
            </h2>
            <p className="text-xl text-dark-gray max-w-4xl mx-auto leading-relaxed">
              {t('photoGalleryDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/a11.jpeg', 'Campus EETFP-TIC - Vue générale')}>
              <Image
                src="/gallery/a11.jpeg" 
                alt="Campus EETFP-TIC - Vue générale"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/imagea10.jpeg', 'Installations modernes')}>
              <Image 
                src="/gallery/imagea10.jpeg" 
                alt="Installations modernes"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
         </div>
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/image3.jpeg', 'Laboratoire informatique')}>
              <Image 
                src="/gallery/image3.jpeg" 
                alt="Laboratoire informatique"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/image4.jpeg', 'Salle de formation')}>
              <Image 
                src="/gallery/image4.jpeg" 
                alt="Salle de formation"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/imagea5.jpeg', 'Équipements techniques')}>
              <Image 
                src="/gallery/imagea5.jpeg" 
                alt="Équipements techniques"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/imagea6.jpeg', 'Infrastructure moderne')}>
              <Image 
                src="/gallery/imagea6.jpeg" 
                alt="Infrastructure moderne"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/image a7.jpeg', 'Environnement d\'apprentissage')}>
              <Image 
                src="/gallery/image a7.jpeg" 
                alt="Environnement d'apprentissage"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/image8.jpeg', 'Campus et installations')}>
              <Image 
                src="/gallery/image8.jpeg" 
                alt="Campus et installations"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/8bbe708d-ce97-4c32-9cf8-3ce03eb8f581.jpeg', 'Vue aérienne du campus')}>
              <Image 
                src="/gallery/8bbe708d-ce97-4c32-9cf8-3ce03eb8f581.jpeg" 
                alt="Vue aérienne du campus"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/imagea8.jpeg', 'Infrastructure technique')}>
              <Image 
                src="/gallery/imagea8.jpeg" 
                alt="Infrastructure technique"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/imagea9.jpeg', 'Équipements de pointe')}>
              <Image 
                src="/gallery/image1.jpeg" 
                alt="Équipements de pointe"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              /> 
            </div>
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/imagea10.jpeg', 'Laboratoires spécialisés')}>
              <Image 
                src="/gallery/imagea10.jpeg" 
                alt="Laboratoires spécialisés"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/a11.jpeg', 'Formation pratique')}>
              <Image 
                src="/gallery/a11.jpeg" 
                alt="Formation pratique"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/image a11.jpeg', 'Équipements modernes')}>
              <Image 
                src="/gallery/image a11.jpeg" 
                alt="Équipements modernes"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
            <div className="group cursor-pointer" onClick={() => handleImageClick('/gallery/a20.jpeg', 'Campus EETFP-TIC')}>
              <Image 
                src="/gallery/a20.jpeg" 
                alt="Campus EETFP-TIC"
                width={300}
                height={200}
                className="aspect-square object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
          </div>

          <div className="text-center mt-16">
            <button className="btn-secondary transform hover:scale-105">
              {t('viewAllGallery')}
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-institutional-blue-dark text-white">
        <div className="container-max text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            {t('newsletterTitle')}
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t('newsletterDescription')}
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder={t('newsletterPlaceholder')}
                className="flex-1 px-6 py-4 rounded-xl text-dark-gray font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-institutional-blue-dark"
              />
              <button className="btn-primary bg-white text-institutional-blue hover:bg-light-gray transform hover:scale-105 whitespace-nowrap">
                {t('newsletterSubscribe')}
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-4">
              {t('newsletterPrivacy')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 transition-colors duration-200 z-10"
            >
              ×
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt={selectedImageAlt}
                fill
                className="object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
            <p className="text-white text-center mt-4 text-lg font-medium">
              {selectedImageAlt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 