import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import placesData from "../data/places.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMapMarkerAlt,
  faChevronLeft,
  faChevronRight,
  faBookOpen,
  faHistory,
  faHeart,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import { useLanguage } from "../contexts/LanguageContext";
import ImageModal from "../components/ImageModal";

const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const foundPlace = placesData.find((p) => String(p.id) === String(id));
    setPlace(foundPlace);
    window.scrollTo(0, 0);
  }, [id]);

  if (!place) return null;

  const allImages =
    place.gallery && place.gallery.length > 0
      ? [place.image, ...place.gallery].slice(0, 4)
      : [place.image, place.image, place.image, place.image];

  return (
    <div className="bg-slate-50 min-h-screen p-6 md:p-10 font-sans">
      {/* 1. TEPADA: NAVIGATSIYA */}
      <div className="max-w-7xl mx-auto w-full mb-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-slate-900 flex items-center gap-4 font-black text-2xl uppercase"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> {t("back")}
        </button>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase mb-4">
          {place.name}
        </h1>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="flex items-center gap-3 text-slate-700 font-bold">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>{t("location")}:</span>
            <span className="text-slate-900">{place.location}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 font-bold">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>{t("region")}:</span>
            <span className="text-slate-900">{place.region}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 font-bold">
            <FontAwesomeIcon icon={faHistory} />
            <span>{t("period")}:</span>
            <span className="text-slate-900">{place.period}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 font-bold">
            <FontAwesomeIcon icon={faBookOpen} />
            <span>{t("category")}:</span>
            <span className="text-slate-900">
              {place.category || place.century}
            </span>
          </div>
        </div>
      </div>

      {/* 2. MARKAZ: ASOSIY MA'LUMOT VA KARTA */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
        <div className="lg:col-span-5 h-[400px] rounded-3xl overflow-hidden shadow-lg">
          <img
            src={place.image}
            className="w-full h-full object-cover"
            alt={place.name}
          />
        </div>

        <div className="lg:col-span-4 text-slate-700 text-lg leading-relaxed space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6">
            <h2 className="text-2xl font-black text-slate-800 mb-4 leading-tight">
              {place.short_description}
            </h2>
            <p className="text-slate-600 font-medium leading-relaxed text-lg">
              {place.description}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {t("information")}
            </h2>
            <ul className="space-y-3 text-slate-700 list-disc list-inside">
              {place.info?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="h-64 rounded-2xl overflow-hidden shadow-md border border-slate-100">
            <iframe
              title="Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={`https://www.google.com/maps?q=${encodeURIComponent(place.name)}&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
          <a
            href={`https://uz.wikipedia.org/wiki/${encodeURIComponent(place.name)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-slate-100 p-4 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all"
          >
            <FontAwesomeIcon icon={faBookOpen} /> Wikipedia
          </a>
        </div>
      </div>

      {/* 3. PASTDA: GALEREYA (EKRANNING KO'RINARLI JOYIDA) */}
      <div className="max-w-7xl mx-auto w-full border-t pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allImages.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              className="h-48 rounded-3xl overflow-hidden shadow-md cursor-pointer hover:opacity-90 hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <img
                src={img}
                className="w-full h-full object-cover"
                alt="gallery"
              />
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default PlaceDetail;
