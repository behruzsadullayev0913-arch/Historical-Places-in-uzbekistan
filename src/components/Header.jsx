import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname === "/") {
        const sections = ["hero", "places", "about", "call"];
        let currentSection = "";

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Check if the section is mostly in view (roughly middle of viewport)
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
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const isCurrentActive = (hash) => {
    if (location.pathname !== "/") return false;
    return activeSection === hash;
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : isMenuOpen ? "bg-slate-900/60 backdrop-blur-xl py-5" : "bg-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => {
              localStorage.removeItem("activeSection");
              window.scrollTo(0, 0);
            }}
          >
            <img
              src="/assets/images/logo-sximo_1.png"
              alt="Uzbekistan Travel"
              className="h-auto md:h-12 w-100 object-container transition-transform duration-300 transform group-hover:scale-105"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              scrolled={scrolled}
              isActive={isCurrentActive("")}
              onClick={() => {
                localStorage.removeItem("activeSection");
                window.scrollTo(0, 0);
              }}
            >
              Bosh sahifa
            </NavLink>
            <a
              href="/#places"
              onClick={() => localStorage.setItem("activeSection", "#places")}
              className={`font-medium transition-colors hover:text-primary-600 ${isCurrentActive("#places") ? "text-primary-500 font-bold" : scrolled ? "text-slate-600" : "text-slate-200"}`}
            >
              Joylar
            </a>
            <a
              href="#about"
              onClick={() => localStorage.setItem("activeSection", "#about")}
              className={`font-medium transition-colors hover:text-primary-600 ${isCurrentActive("#about") ? "text-primary-500 font-bold" : scrolled ? "text-slate-600" : "text-slate-200"}`}
            >
              Biz haqimizda
            </a>
            <a
              href="#call"
              onClick={() => localStorage.setItem("activeSection", "#call")}
              className={`font-medium transition-colors hover:text-primary-600 ${isCurrentActive("#call") ? "text-primary-500 font-bold" : scrolled ? "text-slate-600" : "text-slate-200"}`}
            >
              Aloqa
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4 ">
            <select
              className={`bg-transparent border ${scrolled ? "border-slate-300 text-slate-700" : "border-white/30 text-white"} rounded-md px-2 py-1 text-sm focus:outline-none focus:border-primary-500`}
            >
              <option value="UZ" className="text-slate-800">
                UZ
              </option>
              <option value="ENG" className="text-slate-800">
                ENG
              </option>
              <option value="RUS" className="text-slate-800">
                RUS
              </option>
            </select>
          </div>

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

      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out transform ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"} ${scrolled ? "bg-white shadow-xl" : "bg-slate-900/60 backdrop-blur-xl border-t border-white/10"}`}
      >
        <div className="px-4 py-6 space-y-4 flex flex-col items-center">
          <MobileLink
            to="/"
            isActive={isCurrentActive("")}
            scrolled={scrolled}
            onClick={() => {
              setIsMenuOpen(false);
              localStorage.removeItem("activeSection");
              window.scrollTo(0, 0);
            }}
          >
            Bosh sahifa
          </MobileLink>
          <a
            href="/#places"
            className={`${isCurrentActive("#places") ? "text-primary-500 font-bold" : scrolled ? "text-slate-600" : "text-slate-100"} font-medium hover:text-primary-600 text-lg`}
            onClick={() => {
              setIsMenuOpen(false);
              localStorage.setItem("activeSection", "#places");
            }}
          >
            Joylar
          </a>
          <a
            href="#about"
            className={`${isCurrentActive("#about") ? "text-primary-500 font-bold" : scrolled ? "text-slate-600" : "text-slate-100"} font-medium hover:text-primary-600 text-lg`}
            onClick={() => {
              setIsMenuOpen(false);
              localStorage.setItem("activeSection", "#about");
            }}
          >
            Biz haqimizda
          </a>
          <a
            href="#call"
            className={`${isCurrentActive("#call") ? "text-primary-500 font-bold" : scrolled ? "text-slate-600" : "text-slate-100"} font-medium hover:text-primary-600 text-lg`}
            onClick={() => {
              setIsMenuOpen(false);
              localStorage.setItem("activeSection", "#call");
            }}
          >
            Aloqa
          </a>

          <div className="pt-4 border-t w-full flex justify-center border-slate-200/20">
            <select
              className={`border rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary-500 ${scrolled ? "bg-slate-50 border-slate-200 text-slate-700" : "bg-black/20 border-white/20 text-white"}`}
            >
              <option value="UZ" className="text-slate-800">
                UZ
              </option>
              <option value="ENG" className="text-slate-800">
                ENG
              </option>
              <option value="RUS" className="text-slate-800">
                RUS
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, children, scrolled, onClick, isActive }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`font-medium transition-colors hover:text-primary-600 ${
      isActive
        ? "text-primary-500 font-bold"
        : scrolled
          ? "text-slate-600"
          : "text-slate-200"
    }`}
  >
    {children}
  </Link>
);

const MobileLink = ({ to, children, onClick, isActive, scrolled }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`${isActive ? "text-primary-500 font-bold" : scrolled ? "text-slate-600" : "text-slate-100"} font-medium hover:text-primary-600 text-lg`}
  >
    {children}
  </Link>
);

export default Header;
