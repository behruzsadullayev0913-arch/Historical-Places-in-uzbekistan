
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL or in localStorage
    const savedHash = localStorage.getItem("activeSection");
    const targetId = hash || savedHash;

    if (targetId) {
      const element = document.getElementById(targetId.replace("#", ""));
      if (element) {
        // Use a small timeout to ensure the element is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return;
      }
    }

    // Default behavior if no hash/saved section
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
