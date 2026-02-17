import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTelegramPlane,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMapMarkerAlt,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8" id="call">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-xl font-serif text-white mb-6 border-b border-slate-700 pb-2 inline-block">
              Sayyohlar uchun
            </h3>
            <ul className="space-y-3">
              <li>
                <FooterLink href="#">Ko‘p beriladigan savollar</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Ichki turizm</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Ziyorat turizm obyektlari</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Gid-ekskursiya reyestri</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Tadbirlar taqvimi</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif text-white mb-6 border-b border-slate-700 pb-2 inline-block">
              Agentliklarga
            </h3>
            <ul className="space-y-3">
              <li>
                <FooterLink href="#">Xalqaro ko'rgazmalar</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Turlarni targ'ib qilish</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Turizm sohasidagi qonunlar</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Turistik yo'nalishlar</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif text-white mb-6 border-b border-slate-700 pb-2 inline-block">
              Ma'lumotlar
            </h3>
            <ul className="space-y-3">
              <li>
                <FooterLink href="#">Biz haqimizda</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Sayyohlarning kelishi</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Turizm yangiliklari</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Reytinglar va Mukofotlar</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif text-white mb-6 border-b border-slate-700 pb-2 inline-block">
              Aloqa
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-white tracking-wide">
                  +998 12 345 67
                </p>
                <p className="text-sm text-slate-500">
                  Ish vaqti: 9:00 - 18:00, Dush-Jum
                </p>
              </div>

              <div>
                <p className="text-primary-400 font-medium">
                  info@nationalprcentre.com
                </p>
                <p className="text-xs text-slate-500">Har qanday savol uchun</p>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="mt-1 text-slate-500"
                />
                <span>Oybek ko'chasi 18, Toshkent 100015, O'zbekiston</span>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <SocialIcon icon={faFacebookF} />
              <SocialIcon icon={faInstagram} />
              <SocialIcon icon={faTelegramPlane} />
              <SocialIcon icon={faYoutube} />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; 2026 Historical Places. Barcha huquqlar himoyalangan.</p>
          <div className="mt-4 md:mt-0 bg-yellow-500 text-slate-900 w-10 h-10 flex items-center justify-center rounded-full hover:bg-yellow-400 transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="text-slate-400 hover:text-white transition-colors block text-sm"
  >
    {children}
  </a>
);

const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
  >
    <FontAwesomeIcon icon={icon} size="sm" />
  </a>
);

export default Footer;
