import React from "react";
import { Link } from "react-router-dom";
import PlaceCard from "../components/PlaceCard";
import placesData from "../data/places.json";
import ScrollObserver from "../components/ScrollObserver";

const Home = () => {
  const scrollToPlaces = () => {
    const placesSection = document.getElementById("places");
    if (placesSection) {
      placesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section id="hero" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/Registon.jpg"
            alt="Historical Uzbekistan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <ScrollObserver>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-2xl">
              Sayohatga <span className="text-primary-400">chiqamiz!</span>
            </h1>
          </ScrollObserver>
          <ScrollObserver delay={100}>
            <p className="text-lg md:text-2xl text-slate-200 mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              Dunyo bo'ylab eng yaxshi joylarni kashf eting va unutilmas
              sarguzashtlarga sho'ng'ing.
            </p>
          </ScrollObserver>
          <ScrollObserver delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToPlaces}
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-lg font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-primary-900/50"
              >
                Joylarni ko'rish
              </button>
              <Link
                to="/places"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg font-bold rounded-full border border-white/30 transition-all"
              >
                Barchasini ko'rish
              </Link>
            </div>
          </ScrollObserver>
        </div>
      </section>

      <section className="py-32 bg-slate-50" id="places">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <ScrollObserver>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Eng mashhur joylar
              </h2>
              <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                O'zbekistonning eng ko'p tashrif buyuriladigan va tarixiy
                ahamiyatga ega maskanlari bilan tanishing.
              </p>
            </ScrollObserver>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {placesData.slice(0, 2).map((place, index) => (
              <ScrollObserver key={place.id} delay={index * 100}>
                <PlaceCard place={place} />
              </ScrollObserver>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/places"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-800 transition-colors text-lg group"
            >
              Barcha joylarni ko'rish
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <img
                src="/assets/images/Registon.jpg"
                alt="About Us"
                className="relative rounded-2xl shadow-2xl transition-transform duration-500 w-full object-cover h-[500px]"
              />
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Biz haqimizda
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                "Historical Places" — bu insoniyat sivilizatsiyasi yaratgan eng
                buyuk meroslarni raqamlashtirish va keng ommaga yetkazishga
                bag'ishlangan platforma. Bizning maqsadimiz o'tmish va kelajak
                o'rtasida raqamli ko'prik qurishdir.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Biz taqdim etayotgan har bir fakt akademik manbalarga asoslangan
                bo'lib, sizga dunyoning eng sirli go'shalariga virtual sayohat
                qilish imkonini beradi.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-4 border-yellow-500 pl-4">
                  <span className="block text-3xl font-bold text-slate-900">
                    50k+
                  </span>
                  <span className="text-slate-500">Foydalanuvchilar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
