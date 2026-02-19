import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const savedHash = localStorage.getItem("activeSection");
    const targetId = hash || savedHash;

    if (targetId) {
      const element = document.getElementById(targetId.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
