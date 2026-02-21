import React, { useEffect, useRef, useState } from "react";

/**
 * ScrollObserver - element ekranga chiqanda animatsiyani ishga tushiruvchi komponent.
 * @param children - ichidagi kontent
 * @param animation - paydo bo'lish animatsiyasi klassi (masalan: 'animate-fadeIn')
 * @param threshold - elementning qancha qismi (%) ko'ringanda animatsiya boshlansin (0.1 = 10%)
 * @param delay - animatsiya boshlanishidan oldingi kutish vaqti (millisekundda)
 */
const ScrollObserver = ({
  children,
  animation = "",
  className = "",
  threshold = 0.1,
  delay = 0,
}) => {
  // Element ekranda ko'rindimi yoki yo'qligini saqlash uchun 'state'
  const [isVisible, setIsVisible] = useState(false);

  // Haqiqiy HTML elementini (div) ushlab turish uchun 'ref'
  const domRef = useRef();

  useEffect(() => {
    // Kuzatuvchi (Observer) yaratish
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Agar element ekran chegarasiga kirsa (ko'rinsinsa)
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Bir marta ko'ringandan keyin kuzatishni to'xtatish (animatsiya takrorlanmasligi uchun)
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    ); // Chegara sozlamasi

    // Kuzatishni boshlash
    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Komponent o'chirilganda kuzatishni ham to'xtatish (xotirani tozalash)
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={domRef} // DOM elementiga bog'lash
      // Agar ko'rinayotgan bo'lsa animatsiya klassini qo'shish, bo'lmasa ko'rinmas qilish
      className={`${className} ${isVisible ? animation : "invisible"}`}
      // Animatsiya kechikishini (delay) uslub (style) orqali berish
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollObserver;
