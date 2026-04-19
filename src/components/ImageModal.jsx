import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ImageModal = ({ image, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    // Ekranni skrol qilishni to'xtatish
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Esc tugmasi orqali yopish
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Ctrl + Wheel orqali Zoom qilish
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault(); // Brauzerni butunlay zoom qilib yubormaslik uchun
        const zoomSensitivity = 0.15;
        const delta = e.deltaY > 0 ? -zoomSensitivity : zoomSensitivity;
        setScale((prev) => Math.min(Math.max(0.5, prev + delta), 5));
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [onClose]);

  // Sichqonchani chap tugmasi orqali qimirlatish (Pan)
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Faqat chap tugma
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center backdrop-blur-sm"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Yopish tugmasi */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/25 text-white rounded-full flex items-center justify-center transition-all z-50 backdrop-blur-md"
      >
        <FontAwesomeIcon icon={faTimes} className="text-xl" />
      </button>

      {/* Yo'riqnoma */}
      <div className="absolute bottom-6 text-white/70 text-sm flex gap-6 bg-black/50 px-6 py-3 rounded-full z-50 backdrop-blur-md">
        <span>🖱️ Ctrl + Wheel: Katta / Kichik</span>
        <span>🖐️ Chap tugmani bosib surish: Qimirlatish</span>
      </div>

      {/* Rasm */}
      <div
        className="w-full h-full flex items-center justify-center cursor-move"
        onMouseDown={handleMouseDown}
      >
        <img
          src={image}
          alt="Expanded"
          className="max-w-[90vw] max-h-[90vh] object-contain transition-transform duration-75 pointer-events-none shadow-2xl"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
          draggable="false"
        />
      </div>
    </div>
  );
};

export default ImageModal;
