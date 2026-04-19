import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // pathname - joriy sahifa manzili, hash - manzildagi # belgisi bilan keladigan qism (masalan: #about)
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Brauzer xotirasidan saqlangan bo'limni olamiz
    const savedHash = localStorage.getItem("activeSection");

    // Agar manzil satrida hash bo'lsa uni ishlatamiz, bo'lmasa xotiradagisini
    const targetId = hash || savedHash;

    if (targetId) {
      // '#' belgisini olib tashlab, elementning ID sini topamiz
      const element = document.getElementById(targetId.replace("#", ""));

      if (element) {
        // Sahifa to'liq yuklanib olishi uchun biroz (100ms) kutib, keyin o'sha bo'limga aylantiramiz
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return; // Maqsadli bo'lim topilsa, funksiya shu yerda to'xtaydi
      }
    }

    // Agar hech qanday hash bo'lmasa, sahifani eng yuqorisiga (0, 0 nuqtaga) qaytaramiz
    window.scrollTo(0, 0);
  }, [pathname, hash]); // Har safar sahifa manzili yoki hash o'zgarganda ushbu kod ishga tushadi

  // Bu komponent ekranda hech narsa ko'rsatmaydi (faqat funksional vazifa bajaradi)
  return null;
}
