import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faChevronDown,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../contexts/UserContext";
import { useLikesComments } from "../contexts/LikesCommentsContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const isScrollingManual = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  const langRef = useRef(null);
  const { language, changeLanguage, t } = useLanguage();

  const languages = [
    { code: "UZ", label: "O'zbekcha" },
    { code: "ENG", label: "English" },
    { code: "RUS", label: "Русский" },
  ];

  // SILLIQ SKROL VA DARHOL RANGNI O'ZGARTIRISH
  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Agar boshqa sahifada bo'lsak, avval bosh sahifaga o'tamiz
    if (location.pathname !== "/") {
      navigate(id === "" ? "/" : `/${id}`);
      return;
    }

    isScrollingManual.current = true;
    setActiveSection(id);

    const sectionId = id.replace("#", "");
    const element = sectionId === "" ? null : document.getElementById(sectionId);

    window.scrollTo({
      top: element ? element.offsetTop - 80 : 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrollingManual.current = false;
    }, 800);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Agar biz o'zimiz linkni bosgan bo'lsak, pastdagi mantiq ishlamaydi
      if (isScrollingManual.current) return;

      if (location.pathname === "/") {
        const isBottom =
          window.innerHeight + scrollY >=
          document.documentElement.scrollHeight - 70;
        if (isBottom) {
          setActiveSection("#call");
          return;
        }

        const sections = ["places", "about", "call"];
        let current = "";
        let maxVisibleHeight = 0;

        sections.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            const visibleHeight =
              Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
            if (visibleHeight > maxVisibleHeight && visibleHeight > 100) {
              maxVisibleHeight = visibleHeight;
              current = `#${id}`;
            }
          }
        });

        if (current) setActiveSection(current);
        else if (scrollY < 400) setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target))
        setIsLangOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-3 border-b border-white/20"
          : "bg-gradient-to-b from-black/60 to-transparent py-6"
      } ${location.pathname === "/places" ? "hidden" : "block"}`}
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between gap-6">
          {/* LOGO */}
          <div className="flex items-center select-none flex-none">
            <img
              src="/assets/images/13579938461643414727-removebg-preview.png"
              alt="Logo"
              className="h-11 md:h-15 lg:h-16 w-auto object-contain"
            />
          </div>

          {/* NAV NAVIGATSIYA */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-12">
            {[
              { id: "", label: t("home") },
              { id: "#places", label: t("places") },
              { id: "#about", label: t("about") },
              { id: "#call", label: t("contact") },
            ].map((item) => (
                <a
                key={item.id}
                href={item.id === "" ? "/" : `/${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative py-1 text-[16px] font-bold tracking-tight transition-all duration-300 group ${
                  activeSection === item.id
                    ? "text-[#387780]"
                    : scrolled
                      ? "text-slate-800"
                      : "text-white drop-shadow-sm"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[3px] bg-[#387780] transition-all duration-300 ${
                    activeSection === item.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {/* LANGUAGE SELECTOR */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border-[1.5px] transition-all ${
                  scrolled
                    ? "border-slate-300 text-slate-700 hover:border-[#387780]"
                    : "border-white/40 text-white hover:bg-white/10"
                }`}
              >
                <span className="text-[13.5px] font-bold uppercase tracking-widest">
                  {language}
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-[10px] opacity-80 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`absolute top-[130%] right-0 min-w-[150px] bg-white rounded-xl shadow-2xl py-2 border border-slate-100 transition-all duration-300 origin-top-right ${
                  isLangOpen
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible"
                }`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className="w-full text-left px-5 py-2.5 text-[14px] font-bold text-slate-600 hover:bg-slate-50 hover:text-[#387780] transition-colors"
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              className={scrolled ? "text-slate-800" : "text-white"}
            />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-3 rounded-3xl border border-slate-200 bg-white/95 shadow-xl p-4 mx-4">
            <div className="flex flex-col gap-4">
              {[
                { id: "", label: t("home") },
                { id: "#places", label: t("places") },
                { id: "#about", label: t("about") },
                { id: "#call", label: t("contact") },
              ].map((item) => (
                <a
                  key={item.id}
                  href={item.id === "" ? "/" : `/${item.id}`}
                  onClick={(e) => {
                    handleNavClick(e, item.id);
                    setIsMenuOpen(false);
                  }}
                  className="text-slate-700 font-bold text-lg"
                >
                  {item.label}
                </a>
              ))}

              <div className="border-t border-slate-200 pt-4 flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className="flex-1 min-w-[95px] rounded-2xl border border-slate-300 px-3 py-2 text-slate-700 text-sm font-bold"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </header>
  );
};

export default Header;
