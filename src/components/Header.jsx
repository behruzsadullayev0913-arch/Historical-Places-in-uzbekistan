import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : isMenuOpen ? "bg-slate-900/60 backdrop-blur-xl py-5" : "bg-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              src="/assets/images/logo-uzbekistan.png"
              alt="Uzbekistan Travel"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              scrolled={scrolled}
              isActive={location.pathname === "/" && location.hash === ""}
              onClick={() => window.scrollTo(0, 0)}
            >
              Bosh sahifa
            </NavLink>
            <a
              href="/#places"
              className={`font-medium transition-colors hover:text-primary-600 ${location.hash === "#places" ? "text-primary-500 font-bold" : scrolled ? "text-slate-600" : "text-slate-200"}`}
            >
              Joylar
            </a>
            <a
              href="#about"
              className={`font-medium transition-colors hover:text-primary-600 ${location.hash === "#about" ? "text-primary-500 font-bold" : scrolled ? "text-slate-600" : "text-slate-200"}`}
            >
              Biz haqimizda
            </a>
            <a
              href="#call"
              className={`font-medium transition-colors hover:text-primary-600 ${location.hash === "#call" ? "text-primary-500 font-bold" : scrolled ? "text-slate-600" : "text-slate-200"}`}
            >
              Aloqa
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
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

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out transform ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"} ${scrolled ? "bg-white shadow-xl" : "bg-slate-900/60 backdrop-blur-xl border-t border-white/10"}`}
      >
        <div className="px-4 py-6 space-y-4 flex flex-col items-center">
          <MobileLink
            to="/"
            isActive={location.pathname === "/" && location.hash === ""}
            scrolled={scrolled}
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            Bosh sahifa
          </MobileLink>
          <a
            href="/#places"
            className={`${location.hash === "#places" ? "text-primary-500 font-bold" : scrolled ? "text-slate-600" : "text-slate-100"} font-medium hover:text-primary-600 text-lg`}
            onClick={() => setIsMenuOpen(false)}
          >
            Joylar
          </a>
          <a
            href="#about"
            className={`${location.hash === "#about" ? "text-primary-500 font-bold" : scrolled ? "text-slate-600" : "text-slate-100"} font-medium hover:text-primary-600 text-lg`}
            onClick={() => setIsMenuOpen(false)}
          >
            Biz haqimizda
          </a>
          <a
            href="#call"
            className={`${location.hash === "#call" ? "text-primary-500 font-bold" : scrolled ? "text-slate-600" : "text-slate-100"} font-medium hover:text-primary-600 text-lg`}
            onClick={() => setIsMenuOpen(false)}
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
