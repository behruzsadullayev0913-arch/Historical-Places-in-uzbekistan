import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMapMarkerAlt, faClock, faLandmark, faExternalLinkAlt, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import placesData from '../data/places.json';

const PlaceDetail = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const foundPlace = placesData.find(p => p.id == id);
    setPlace(foundPlace);
    window.scrollTo(0, 0);
  }, [id]);

  if (!place) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Ma'lumot topilmadi</h1>
        <Link to="/places" className="text-primary-600 font-medium hover:underline flex items-center gap-2">
            <FontAwesomeIcon icon={faArrowLeft} /> Orqaga qaytish
        </Link>
      </div>
    );
  }

  const cleanKey = place.key ? place.key.replace(/['’‘`ʻ]/g, "") : "";
  const wikiLink = `https://uz.wikipedia.org/wiki/${encodeURIComponent(cleanKey)}`;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Banner Image */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img 
            src={place.main_image} 
            alt={place.name} 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-10 pb-12 z-10 max-w-7xl mx-auto">
            <Link to="/places" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors backdrop-blur-sm bg-black/20 px-4 py-1.5 rounded-full text-sm font-medium border border-white/20">
                <FontAwesomeIcon icon={faArrowLeft} /> Orqaga
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg mb-2">{place.name}</h1>
            <div className="flex items-center gap-2 text-primary-300 font-semibold text-lg">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {place.region}
            </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 animate-fade-in-up">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 font-serif border-b border-slate-100 pb-4">Tarixi va tavsifi</h2>
                    <p className="text-slate-600 leading-loose text-lg whitespace-pre-line text-justify">
                        {place.full_description}
                    </p>
                </div>
                
                {/* Gallery */}
                {place.gallery && place.gallery.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 font-serif">Fotogalereya</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {place.gallery.map((imgUrl, index) => (
                            <div className="relative group overflow-hidden rounded-xl h-48 cursor-pointer" key={index} onClick={() => setSelectedImage(imgUrl)}>
                                <img 
                                    src={imgUrl} 
                                    alt={`Galereya ${index + 1}`} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6 animate-fade-in-up animate-delay-200">
                
                {/* Meta Info Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
                     <h3 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wider text-xs">Ma'lumotlar</h3>
                     <div className="space-y-4">
                        <div className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 shrink-0">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase">Joylashuv</p>
                                <p className="text-slate-800 font-medium">{place.location}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg">
                             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                             <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase">Davr</p>
                                <p className="text-slate-800 font-medium">{place.period}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg">
                             <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                <FontAwesomeIcon icon={faLandmark} />
                            </div>
                             <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase">Tur</p>
                                <p className="text-slate-800 font-medium">{place.category}</p>
                            </div>
                        </div>
                     </div>

                    <div className="mt-6 rounded-xl overflow-hidden shadow-md border border-slate-200">
                         <iframe 
                            width="100%" 
                            height="200" 
                            frameBorder="0" 
                            scrolling="no" 
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(`${place.name}, ${place.location}`)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                            title="Map"
                        >
                        </iframe>
                    </div>

                    {place.key && (
                        <a 
                            href={wikiLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all shadow-md hover:-translate-y-1"
                        >
                            <FontAwesomeIcon icon={faExternalLinkAlt} /> 
                            Wikipedia da o'qish
                        </a>
                    )}
                </div>
            </div>
        </div>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] flex justify-center items-center">
              <button 
                 className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 focus:outline-none transition-colors"
                 onClick={() => setSelectedImage(null)}
              >
                 &times;
              </button>
              <img 
                 src={selectedImage} 
                 alt="Full view" 
                 className="max-h-[85vh] max-w-full rounded-lg shadow-2xl object-contain"
                 onClick={(e) => e.stopPropagation()} 
              />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceDetail;
