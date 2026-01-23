import React from 'react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-slate-100 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={place.main_image} 
          alt={place.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="hidden absolute inset-0 items-center justify-center bg-gray-100 text-gray-400 text-sm">
          Rasm yuklanmadi
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Tag */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
          {place.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
             <span className="text-primary-600 text-sm font-semibold tracking-wider uppercase">{place.region}</span>
            <h3 className="text-2xl font-bold text-slate-800 mt-2 mb-3 group-hover:text-primary-700 transition-colors line-clamp-1">
            {place.name}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
            {place.short_description}
            </p>
        </div>
        
        <Link 
          to={`/place/${place.id}`}
          className="mt-auto w-full py-3 bg-slate-50 hover:bg-primary-600 text-slate-700 hover:text-white font-semibold rounded-xl transition-all duration-300 text-center border border-slate-200 hover:border-transparent"
        >
          Batafsil ma'lumot
        </Link>
      </div>
    </div>
  );
};

export default PlaceCard;
