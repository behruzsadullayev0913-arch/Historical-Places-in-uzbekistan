import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStar,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../contexts/LanguageContext";

const PlaceCard = ({ place }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 flex flex-col h-full"
      style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
    >
      {/* Rasm qismi */}
      <div className="relative h-40 w-full overflow-hidden shrink-0">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm flex items-center gap-1.5">
          <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-sm" />
          <span className="text-xs font-black text-slate-800">
            {place.rating || "4.8"}
          </span>
        </div>

      </div>

      {/* Ma'lumotlar qismi */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-black text-slate-800 mb-1 line-clamp-1">
          {place.name}
        </h3>
        <div className="flex items-center gap-1.5 text-slate-400 mb-2">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-primary-500 text-xs"
          />
          <span className="text-xs font-bold">{place.region}</span>
        </div>
        <p className="text-slate-500 text-sm line-clamp-2 mb-3 font-medium leading-tight">
          {place.description}
        </p>

        <button
          onClick={() => navigate(`/place/${place.id}`)}
          className="mt-auto w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-primary-600 transition-colors active:scale-95 shadow-sm"
        >
          {t("details")}
        </button>
      </div>
    </div>
  );
};

export default PlaceCard;
