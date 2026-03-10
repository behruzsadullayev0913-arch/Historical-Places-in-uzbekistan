import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  // --- STATE-LAR (Holat boshqaruvi) ---
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobil menyu ochiq/yopiqligi
  const [scrolled, setScrolled] = useState(false); // Sahifa skroll qilingani (tepadan tushgani)
  const [activeSection, setActiveSection] = useState(""); // Hozirgi ko'rinib turgan bo'lim ID-si
  const location = useLocation();

  // --- SCROLL VA ACTIVE SECTION LOGIKASI ---
  useEffect(() => {
    const handleScroll = () => {
      // Sahifa 20px dan ko'proq skroll bo'lsa, 'scrolled' holatini rostlash
      setScrolled(window.scrollY > 20);

      // Agar biz bosh sahifada bo'lsak, qaysi bo'limda turganimizni aniqlash
      if (location.pathname === "/") {
        const sections = ["hero", "places", "about", "call"];
        let currentSection = "";

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Agar bo'lim ekranning yuqori qismiga yaqin bo'lsa (200px masofada)
            if (rect.top <= 200 && rect.bottom >= 200) {
              currentSection = sectionId === "hero" ? "" : `#${sectionId}`;
              break;
            }
          }
        }
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Dastlabki yuklanganda ham tekshirib olish
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Link faol (active) yoki yo'qligini tekshirish funksiyasi
  const isCurrentActive = (hash) => {
    if (location.pathname !== "/") return false;
    return activeSection === hash;
  };

  return (
    <header
      // Dinamik klasslar: skrollga qarab header rangi va balandligi o'zgaradi
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3" // Skroll bo'lganda: oqish va shaffof
          : isMenuOpen
            ? "bg-slate-900/60 backdrop-blur-xl py-5" // Menyu ochiqligida: to'qroq
            : "bg-gradient-to-b from-black/50 via-black/20 to-transparent py-5" // Oddiy holatda: gradyent
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* LOGO QISMI */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => {
              localStorage.removeItem("activeSection");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src="/assets/images/13579938461643414727-removebg-preview.png"
              alt="Uzbekistan Travel"
              className="h-auto md:h-12 w-200 object-container transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* DESKTOP NAVIGATSIYA (Katta ekranlar uchun) */}
          <nav className="hidden md:flex items-center gap-8 ">
            <NavLink
              to="/"
              scrolled={scrolled}
              isActive={isCurrentActive("")}
              onClick={() => {
                localStorage.removeItem("activeSection");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Bosh sahifa
            </NavLink>

            {/* Anchor (anchor) linklar - sahifa ichidagi bo'limlarga o'tish */}
            <a
              href="/#places"
              onClick={() => localStorage.setItem("activeSection", "#places")}
              className={`font-medium transition-colors hover:text-primary-600 ${
                isCurrentActive("#places")
                  ? "text-primary-500 font-bold"
                  : scrolled
                    ? "text-slate-600"
                    : "text-white"
              }`}
            >
              Joylar
            </a>

            <a
              href="#about"
              className={`font-medium transition-colors hover:text-primary-600 ${
                isCurrentActive("#about")
                  ? "text-primary-500 font-bold"
                  : scrolled
                    ? "text-slate-600"
                    : "text-white"
              }`}
            >
              Biz haqimizda
            </a>

            <a
              href="#call"
              className={`font-medium transition-colors hover:text-primary-600 ${
                isCurrentActive("#call")
                  ? "text-primary-500 font-bold"
                  : scrolled
                    ? "text-slate-600"
                    : "text-white"
              }`}
            >
              Aloqa
            </a>
          </nav>

          {/* TILNI TANLASH SELECTI */}
          <div className="hidden md:flex items-center gap-4 ">
            <select
              className={`bg-transparent border ${scrolled ? "border-slate-300 text-slate-700" : "border-white/30 text-white"} rounded-md px-2 py-1 text-sm focus:outline-none`}
            >
              <option value="UZ">UZ</option>
              <option value="ENG">ENG</option>
              <option value="RUS">RUS</option>
            </select>
          </div>

          {/* MOBIL MENYU TUGMASI (Burger icon) */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              className={scrolled ? "text-slate-800" : "text-white"}
            />
          </button>
        </div>
      </div>

      {/* MOBIL DROPDOWN MENYU (Mobil telefonlar uchun) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out transform ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        } ${scrolled ? "bg-white shadow-xl" : "bg-slate-900/60 backdrop-blur-xl border-t border-white/10"}`}
      >
        <div className="px-4 py-6 space-y-4 flex flex-col items-center">
          {/* Mobil linklar */}
          <MobileLink
            to="/"
            isActive={isCurrentActive("")}
            scrolled={scrolled}
            onClick={() => setIsMenuOpen(false)}
          >
            Bosh sahifa
          </MobileLink>
          <a
            href="/#places"
            className="font-medium text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Joylar
          </a>
          <a
            href="#about"
            className="font-medium text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Biz haqimizda
          </a>
          <a
            href="#call"
            className="font-medium text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Aloqa
          </a>

          {/* Mobil til tanlash */}
          <div className="pt-4 border-t w-full flex justify-center border-slate-200/20">
            <select className="border rounded-md px-4 py-2 text-sm bg-black/20 text-white">
              <option value="UZ">UZ</option>
              <option value="ENG">ENG</option>
              <option value="RUS">RUS</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

// --- YORDAMCHI KOMPONENTLAR ---

// Desktop uchun NavLink komponenti
const NavLink = ({ to, children, scrolled, onClick, isActive }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`font-medium transition-colors hover:text-primary-600 ${
      isActive
        ? "text-primary-500 font-bold"
        : scrolled
          ? "text-slate-600"
          : "text-white drop-shadow-md"
    }`}
  >
    {children}
  </Link>
);

// Mobil uchun MobileLink komponenti
const MobileLink = ({ to, children, onClick, isActive, scrolled }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`${isActive ? "text-primary-500 font-bold" : scrolled ? "text-slate-600" : "text-slate-100"} font-medium text-lg`}
  >
    {children}
  </Link>
);

export default Header;
