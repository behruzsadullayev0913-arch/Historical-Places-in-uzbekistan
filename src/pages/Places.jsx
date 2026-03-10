import React, { useState, useEffect, useMemo } from "react";
import PlaceCard from "../components/PlaceCard";
import placesData from "../data/places.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import ScrollObserver from "../components/ScrollObserver";

const Places = () => {
  // --- STATE (Holatlar) ---
  const [places] = useState(placesData); // Barcha ma'lumotlar
  const [regionFilter, setRegionFilter] = useState("all"); // Tanlangan viloyat
  const [searchText, setSearchText] = useState(""); // Qidiruv matni

  // Sahifa ochilganda eng tepaga ko'tarilish
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- FILTERLASH MANTIQI (useMemo yordamida optimallashtirilgan) ---
  // Bu kod faqat regionFilter yoki searchText o'zgargandagina qayta hisoblanadi
  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      // 1. Viloyatga mos kelishini tekshirish
      const matchesRegion =
        regionFilter === "all" || place.region === regionFilter;

      // 2. Qidiruv matni nomida yoki qisqa ta'rifida borligini tekshirish
      const matchesSearch =
        place.name.toLowerCase().includes(searchText.toLowerCase()) ||
        place.short_description
          .toLowerCase()
          .includes(searchText.toLowerCase());

      return matchesRegion && matchesSearch;
    });
  }, [places, regionFilter, searchText]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* 1. HEADER - Sarlavha qismi */}
      <div className="bg-slate-900 py-16 px-4 shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/assets/images/Registon.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-primary-400"></span>
          </h1>
        </div>
      </div>

      {/* 2. FILTER & SEARCH - Qidiruv va Saralash paneli */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6 border border-slate-100">
          {/* Viloyatni tanlash select-i */}
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="font-semibold text-slate-700 flex items-center gap-2">
              <FontAwesomeIcon icon={faFilter} className="text-primary-600" />
              Viloyatni tanlang
            </label>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            >
              <option value="all">Barchasi</option>
              <option value="Samarqand">Samarqand</option>
              <option value="Buxoro">Buxoro</option>
              <option value="Xorazm">Xorazm</option>
              <option value="Surxondaryo">Surxondaryo</option>
            </select>
          </div>

          {/* Qidiruv inputi */}
          <div className="flex flex-col gap-2 w-full md:w-3/4">
            <label className="font-semibold text-slate-700 flex items-center gap-2">
              <FontAwesomeIcon icon={faSearch} className="text-primary-600" />
              Qidirish
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Masalan: Registon, Ichan Qal'a..."
                className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. LIST - Joylar ro'yxati */}
      <main className="max-w-7xl mx-auto px-4">
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlaces.map((place, index) => (
              <ScrollObserver key={place.id} delay={index * 50}>
                <PlaceCard place={place} />
              </ScrollObserver>
            ))}
          </div>
        ) : (
          /* Natija topilmaganda ko'rinadigan qism */
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-800">
              Hech qanday ma'lumot topilmadi
            </h3>
            <button
              onClick={() => {
                setSearchText("");
                setRegionFilter("all");
              }}
              className="mt-6 px-6 py-2 bg-primary-100 text-primary-700 font-semibold rounded-lg"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Places;
