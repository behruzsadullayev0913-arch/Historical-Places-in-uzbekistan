import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// Ikonkalar (orqaga qaytish, lokatsiya, soat va h.k.)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMapMarkerAlt,
  faClock,
  faLandmark,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import placesData from "../data/places.json";

const PlaceDetail = () => {
  // URL-dagi 'id' ni ushlab olamiz (masalan: /place/1)
  const { id } = useParams();
  // Galereyada rasm bosilganda uni kattalashtirib ko'rsatish uchun state
  const [selectedImage, setSelectedImage] = useState(null);

  // JSON ma'lumotlari ichidan aynan shu ID-ga mos keladigan joyni topamiz
  const place = placesData.find((p) => p.id == id);

  // Sahifa ochilganda uni eng tepasiga aylantirib qo'yamiz
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Agar bunday ID-li joy topilmasa, xatolik sahifasini ko'rsatamiz
  if (!place) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Ma'lumot topilmadi
        </h1>
        <Link
          to="/places"
          className="text-primary-600 font-medium hover:underline flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Orqaga qaytish
        </Link>
      </div>
    );
  }

  // Wikipedia havolasini tayyorlash (maxsus belgilarni tozalab olamiz)
  const cleanKey = place.key ? place.key.replace(/['’‘`ʻ]/g, "") : "";
  const wikiLink = `https://uz.wikipedia.org/wiki/${encodeURIComponent(cleanKey)}`;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* 1. HEADER (Rasm va Sarlavha) */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img
          src={place.main_image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        {/* Rasm ustidagi qorong'u qatlam matn yaxshi o'qilishi uchun */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>

        <div className="absolute bottom-0 left-0 w-full p-4 md:p-10 pb-12 z-10 max-w-7xl mx-auto">
          <Link
            to="/places"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors backdrop-blur-sm bg-black/20 px-4 py-1.5 rounded-full text-sm font-medium border border-white/20"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Orqaga
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-2">
            {place.name}
          </h1>
          <div className="flex items-center gap-2 text-primary-300 font-semibold text-lg">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {place.region}
          </div>
        </div>
      </div>

      {/* 2. ASOSIY KONTENT */}
      <main className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chap qism: Tarix va Galereya */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 font-serif border-b border-slate-100 pb-4">
                Tarixi va tavsifi
              </h2>
              <p className="text-slate-600 leading-loose text-lg whitespace-pre-line text-justify">
                {place.full_description}
              </p>
            </div>

            {/* Galereya mavjud bo'lsa uni chiqaramiz */}
            {place.gallery && place.gallery.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 font-serif">
                  Fotogalereya
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {place.gallery.map((imgUrl, index) => (
                    <div
                      className="relative group overflow-hidden rounded-xl h-48 cursor-pointer"
                      key={index}
                      onClick={() => setSelectedImage(imgUrl)}
                    >
                      <img
                        src={imgUrl}
                        alt={`Galereya ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* O'ng qism: Qo'shimcha ma'lumotlar va Xarita */}
          <div className="lg:col-span-1 space-y-6 animate-fade-in-up animate-delay-200">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wider text-xs">
                Ma'lumotlar
              </h3>

              <div className="space-y-4">
                {/* Lokatsiya, Davr va Tur ma'lumotlari uchun bloklar */}
                <InfoBlock
                  icon={faMapMarkerAlt}
                  color="primary"
                  label="Joylashuv"
                  value={place.location}
                />
                <InfoBlock
                  icon={faClock}
                  color="blue"
                  label="Davr"
                  value={place.period}
                />
                <InfoBlock
                  icon={faLandmark}
                  color="orange"
                  label="Tur"
                  value={place.category}
                />
              </div>

              {/* Google Xarita (Iframe orqali) */}
              <div className="mt-6 rounded-xl overflow-hidden shadow-md border border-slate-200">
                <iframe
                  width="100%"
                  height="200"
                  frameBorder="0"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(`${place.name}, ${place.location}`)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  title="Map"
                ></iframe>
              </div>

              {/* Wikipedia tugmasi */}
              {place.key && (
                <a
                  href={wikiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all shadow-md"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} /> Wikipedia da
                  o'qish
                </a>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 3. LIGHTBOX (Rasmni kattalashtirib ko'rish oynasi) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute -top-12 right-0 text-white text-3xl">
            ×
          </button>
          <img
            src={selectedImage}
            alt="Full view"
            className="max-h-[85vh] max-w-full rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

// Takrorlanuvchi ma'lumot bloklari uchun yordamchi komponent
const InfoBlock = ({ icon, color, label, value }) => (
  <div className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg">
    <div
      className={`w-10 h-10 rounded-full bg-${color}-100 flex items-center justify-center text-${color}-600 shrink-0`}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
    <div>
      <p className="text-xs text-slate-500 font-semibold uppercase">{label}</p>
      <p className="text-slate-800 font-medium">{value}</p>
    </div>
  </div>
);

export default PlaceDetail;
