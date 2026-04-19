import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTelegramPlane,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faShieldAlt,
  faGlobeAmericas,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#0a1120] text-slate-300 py-20" id="call">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* Grid orqali 3 ta blokni ekran bo'ylab keng yoyib chiqdik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mb-24 items-start">
          {/* 1. Logotip va Ijtimoiy tarmoqlar */}
          <div className="space-y-8">
            <div className="inline-block cursor-text">
              <h3 className="text-3xl font-bold text-white tracking-tight">
                Historical <span className="text-[#38bdf8]">Places</span>
              </h3>
            </div>
            <p className="text-[16px] leading-relaxed text-slate-400 cursor-text max-w-sm">
              O'zbekistonning durdona obidalarini kashf eting. Biz bilan o'tmish
              nafasini his qiling.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={faFacebookF} />
              <SocialIcon icon={faInstagram} />
              <SocialIcon icon={faTelegramPlane} />
              <SocialIcon icon={faYoutube} />
            </div>
          </div>

          {/* 2. Afzalliklarimiz - Markazga joylash */}
          <div className="cursor-text lg:justify-self-center">
            <h4 className="text-base font-bold text-white mb-10 uppercase tracking-[0.2em]">
              Afzalliklarimiz
            </h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faGlobeAmericas}
                  className="text-[#38bdf8] text-base"
                />
                <span className="text-[16px]">Onlayn Ekskursiyalar</span>
              </li>
              <li className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  className="text-[#38bdf8] text-base"
                />
                <span className="text-[16px]">Xavfsiz Sayohat</span>
              </li>
              <li className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-[#38bdf8] text-base"
                />
                <span className="text-[16px]">24/7 Qo'llab-quvvatlash</span>
              </li>
            </ul>
          </div>

          {/* 3. Aloqa markazi - O'ng tomonga joylash */}
          <div className="space-y-8 cursor-text lg:justify-self-end">
            <h4 className="text-base font-bold text-white mb-10 uppercase tracking-[0.2em]">
              Aloqa markazi
            </h4>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white tracking-wider">
                +998 12 345 67 89
              </p>
            </div>
          </div>
        </div>

        {/* Pastki qism */}
        <div className="border-t border-slate-800/60 pt-8">
          <p className="text-[14px] tracking-[0.15em] text-slate-500 uppercase cursor-text">
            &copy; 2026 Historical Places. barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }) => (
  <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-[#38bdf8] hover:text-white transition-all cursor-pointer">
    <FontAwesomeIcon icon={icon} size="sm" />
  </div>
);

export default Footer;
