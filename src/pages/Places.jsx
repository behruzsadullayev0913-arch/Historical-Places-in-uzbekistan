import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PlaceCard from "../components/PlaceCard";
import placesData from "../data/places.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from "../contexts/LanguageContext";
import {
  faSearch,
  faMapMarkerAlt,
  faChevronDown,
  faArrowUp,
  faArrowDown,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const Places = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [places] = useState(placesData || []);

  const [regionFilter, setRegionFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(true);

  const dropdownRef = useRef(null);

  // 1. Tashqariga bosilganda dropdownni yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // SCROLL RESTORATION: Refresh yoki qaytganda sahifa joyidan siljimasligi uchun
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("placesScrollPosition");
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }, 150); // ScrollToTop.jsx ishlab bo'lgandan keyin qaytarish
    }

    const handleScrollSave = () => {
      sessionStorage.setItem("placesScrollPosition", window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScrollSave, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSave);
  }, []);

  // 2. Skroll mantiqi (Tepaga va Pastga strelkalar uchun)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Tepaga strelka: 300px dan keyin chiqadi
      setShowScrollTop(scrollY > 300);

      // Pastga strelka: Sahifa oxiriga 150px qolganda yo'qoladi
      if (scrollY + windowHeight >= fullHeight - 150) {
        setShowScrollBottom(false);
      } else {
        setShowScrollBottom(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [regionFilter, categoryFilter, searchText]);



  const regions = [
    { value: "all", label: t("all_regions") },
    { value: "Toshkent", label: "Toshkent" },
    { value: "Samarqand", label: "Samarqand" },
    { value: "Buxoro", label: "Buxoro" },
    { value: "Xorazm", label: "Xorazm" },
    { value: "Farg'ona", label: "Farg'ona" },
    { value: "Andijon", label: "Andijon" },
    { value: "Namangan", label: "Namangan" },
    { value: "Navoiy", label: "Navoiy" },
    { value: "Qashqadaryo", label: "Qashqadaryo" },
    { value: "Surxondaryo", label: "Surxondaryo" },
    { value: "Jizzax", label: "Jizzax" },
    { value: "Sirdaryo", label: "Sirdaryo" },
    { value: "Qoraqalpog'iston", label: "Qoraqalpog'iston" },
  ];

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesRegion =
        regionFilter === "all" || place.region === regionFilter;
      const matchesCategory =
        categoryFilter === "all" ||
        categoryFilter === "Barchasi" ||
        place.category === categoryFilter;
      const matchesSearch = place.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchesRegion && matchesCategory && matchesSearch;
    });
  }, [places, regionFilter, categoryFilter, searchText]);

  const categoryStats = useMemo(() => {
    const filtered = places.filter((p) => {
      const matchesRegion = regionFilter === "all" || p.region === regionFilter;
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchesRegion && matchesSearch;
    });
    const stats = { Barchasi: filtered.length };
    filtered.forEach((p) => {
      if (p.category) stats[p.category] = (stats[p.category] || 0) + 1;
    });
    return stats;
  }, [places, regionFilter, searchText]);

  return (
    <div className="min-h-screen pb-20 pt-4 font-sans relative bg-slate-50">
      {/* Yuqori Navigatsiya */}
      <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-600 hover:text-primary-600 font-bold bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 transition-all active:scale-95 text-sm"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> {t("back")}
        </button>
        <div className="text-right">
          <span className="text-xl font-black text-slate-800">
            {filteredPlaces.length}{" "}
            <span className="text-primary-600">{t("places")}</span>
          </span>
        </div>
      </div>

      {/* Filterlar */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-md border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative" ref={dropdownRef}>
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 block">
                {t("region")}
              </label>
              <button
                type="button"
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center font-bold text-slate-700 hover:bg-slate-100 transition-all text-sm"
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-primary-500"
                  />
                  {regions.find((r) => r.value === regionFilter)?.label}
                </div>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform duration-300 ${isSelectOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isSelectOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-2xl shadow-2xl z-[150] mt-2 max-h-64 overflow-y-auto p-2">
                  {regions.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => {
                        setRegionFilter(r.value);
                        setCategoryFilter("all");
                        setIsSelectOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg mb-1 transition-all text-sm ${regionFilter === r.value ? "bg-primary-600 text-white font-bold" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 block">
                Qidiruv
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onFocus={() => setIsSelectOpen(false)}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setCategoryFilter("all");
                  }}
                  placeholder="Izlash..."
                  className="w-full p-3 pl-10 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-slate-700 text-sm focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
            {Object.entries(categoryStats).map(([name, count]) => (
              <button
                key={name}
                onClick={() => {
                  setCategoryFilter(name);
                  setIsSelectOpen(false);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all active:scale-95 ${categoryFilter === name ? "bg-primary-600 border-primary-600 text-white shadow-md" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                <span className="text-xs font-bold">{name}</span>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${categoryFilter === name ? "bg-primary-700 text-white" : "bg-slate-100 text-primary-600"}`}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 min-h-[400px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredPlaces.map((place) => (
            <div
              key={`${place.id}-${regionFilter}-${categoryFilter}-${searchText}`}
              className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
            >
              <PlaceCard place={place} />
            </div>
          ))}
        </div>
        {filteredPlaces.length === 0 && (
          <div className="text-center py-24 text-slate-400 font-bold italic text-xl">
            Natija topilmadi...
          </div>
        )}
      </div>

      {/* --- STRELKALAR --- */}

      {/* 1. Pastga strelka (O'rtada, statik, eng pastda yo'qoladi) */}
      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${showScrollBottom ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      >
        <button
          onClick={() =>
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            })
          }
          className="w-12 h-12 bg-white text-primary-600 rounded-full shadow-2xl flex items-center justify-center border border-slate-100 hover:bg-primary-50 transition-all active:scale-90"
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>

      {/* 2. Tepaga strelka (O'ngda, faqat pastda turganda chiqadi) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-primary-600 text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 z-[100] active:scale-90 ${
          showScrollTop
            ? "opacity-100 scale-100"
            : "opacity-0 scale-50 pointer-events-none"
        }`}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default Places;
