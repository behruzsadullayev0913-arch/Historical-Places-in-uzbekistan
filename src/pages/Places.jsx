import React, { useState, useEffect, useMemo } from "react";
import PlaceCard from "../components/PlaceCard";
import placesData from "../data/places.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import ScrollObserver from "../components/ScrollObserver";

const Places = () => {
  const [places] = useState(placesData);
  const [regionFilter, setRegionFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesRegion =
        regionFilter === "all" || place.region === regionFilter;
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
      <div className="bg-slate-900 py-16 px-4 shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/assets/images/Registon.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            O'zbekistonning{" "}
            <span className="text-primary-400">Tarixiy Joylari</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Mamlakatimizning boy tarixi va madaniy merosi bilan tanishing.
            O'zingizga qiziq bo'lgan hududni tanlang va sayohatni boshlang.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6 border border-slate-100">
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label
              htmlFor="region-filter"
              className="font-semibold text-slate-700 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faFilter} className="text-primary-600" />
              Viloyatni tanlang
            </label>
            <div className="relative">
              <select
                id="region-filter"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none appearance-none transition-shadow text-slate-700 font-medium cursor-pointer"
              >
                <option value="all">Barchasi</option>
                <option value="Samarqand">Samarqand</option>
                <option value="Buxoro">Buxoro</option>
                <option value="Xorazm">Xorazm</option>
                <option value="Surxondaryo">Surxondaryo</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-3/4">
            <label
              htmlFor="search-input"
              className="font-semibold text-slate-700 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faSearch} className="text-primary-600" />
              Qidirish
            </label>
            <div className="relative">
              <input
                type="text"
                id="search-input"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Masalan: Registon, Ichan Qal'a..."
                className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

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
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Hech qanday ma'lumot topilmadi
            </h3>
            <p className="text-slate-500">
              Qidiruv so'zini o'zgartirib ko'ring yoki boshqa viloyatni tanlang.
            </p>
            <button
              onClick={() => {
                setSearchText("");
                setRegionFilter("all");
              }}
              className="mt-6 px-6 py-2 bg-primary-100 text-primary-700 font-semibold rounded-lg hover:bg-primary-200 transition-colors"
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
