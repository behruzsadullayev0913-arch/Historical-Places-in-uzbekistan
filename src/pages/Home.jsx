import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlaceCard from "../components/PlaceCard";
import placesData from "../data/places.json";
import ScrollObserver from "../components/ScrollObserver";
import { useLanguage } from "../contexts/LanguageContext";

// Home komponenti - Saytning eng birinchi ochiladigan Asosiy sahifasi
const Home = () => {
  // Sahifaning skroli joyiga qaytganini bilish uchun state
  const [isRestored, setIsRestored] = useState(false);
  // Tarjima funksiyasi (t) ni chaqirib olamiz
  const { t } = useLanguage();

  useEffect(() => {
    // 1. Brauzerning avtomatik skrolini o'chiramiz
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2. Saqlangan skrolni tiklash
    const savedPos = sessionStorage.getItem("home_scroll_pos");
    if (savedPos) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: parseInt(savedPos),
          behavior: "instant",
        });
        setIsRestored(true);
      });
    } else {
      setIsRestored(true);
    }

    // 3. Har bir skrolni va refreshdan oldingi holatni saqlash
    const handleSaveScroll = () => {
      sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
    };

    window.addEventListener("scroll", handleSaveScroll);
    window.addEventListener("beforeunload", handleSaveScroll);

    return () => {
      window.removeEventListener("scroll", handleSaveScroll);
      window.removeEventListener("beforeunload", handleSaveScroll);
    };
  }, []);

  // 'Joylar' tugmasi bosilganda o'sha qismga silliq tushish uchun funksiya
  const scrollToPlaces = () => {
    const placesSection = document.getElementById("places");
    if (placesSection) {
      placesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ opacity: isRestored ? 1 : 0, transition: "opacity 0.3s" }}>
      {/* 1. HERO SECTION */}
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/Registon.jpg"
            alt="Historical Uzbekistan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <ScrollObserver>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-2xl">
              {t("hero_title")} <span className="text-primary-400">{t("hero_title_span")}</span>
            </h1>
          </ScrollObserver>

          <ScrollObserver delay={100}>
            <p className="text-lg md:text-2xl text-slate-200 mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              {t("hero_subtitle")}
            </p>
          </ScrollObserver>

          <ScrollObserver delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToPlaces}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_8px_30px_rgb(72,158,162,0.4)]"
              >
                {t("see_places")}
              </button>
              <Link
                to="/places"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-lg font-bold rounded-full border border-white/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(255,255,255,0.1)]"
              >
                {t("all_places")}
              </Link>
            </div>
          </ScrollObserver>
        </div>
      </section>

      {/* 2. PLACES SECTION */}
      <section className="py-6 md:py-8 bg-slate-50 scroll-mt-24" id="places">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <ScrollObserver>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">
                {t("popular_places")}
              </h2>
              <div className="w-12 h-1 bg-primary-500 mx-auto rounded-full mb-3"></div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-light">
                {t("popular_desc")}
              </p>
            </ScrollObserver>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {placesData.slice(0, 2).map((place, index) => (
              <ScrollObserver key={place.id} delay={index * 100} className="h-full">
                <PlaceCard place={place} />
              </ScrollObserver>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              to="/places"
              className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-all group text-lg"
            >
              {t("more_places")}
              <span className="group-hover:translate-x-1 transition-transform text-xl">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION (Biz haqimizda) */}
      <section
        className="py-10 md:py-16 bg-white overflow-hidden scroll-mt-24 min-h-[85vh] flex items-center"
        id="about"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 relative w-full">
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary-100 rounded-full filter blur-3xl opacity-40"></div>
              <img
                src="/assets/images/Ichan qala.jpg"
                alt="Biz haqimizda"
                className="relative rounded-[2.5rem] shadow-2xl w-full object-cover aspect-video lg:aspect-[4/3] max-h-[500px]"
              />
            </div>

            <div className="lg:w-1/2 cursor-text">
              <ScrollObserver>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">
                  {t("about_us")}
                </h2>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light">
                  {t("about_desc")}
                </p>

                <div className="grid grid-cols-2 gap-10">
                  <div className="border-l-4 border-yellow-500 pl-6 py-2">
                    <span className="block text-4xl font-black text-slate-900">
                      10+
                    </span>
                    <span className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-2 block">
                      {t("stats_places")}
                    </span>
                  </div>
                </div>
              </ScrollObserver>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        html {
          scroll-behavior: auto !important;
        }
      `}</style>
    </div>
  );
};

export default Home;
