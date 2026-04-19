import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const needsPadding = location.pathname !== "/" && location.pathname !== "/places";
  
  return (
    // 'flex-col' va 'min-h-screen' yordamida foter har doim sahifa pastida turishini ta'minlaymiz
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Saytning doimiy tepa qismi */}
      <Header />

      {/* 'flex-grow' - bu qism sahifadagi bo'sh joyni to'ldiradi.
          {children} - bu yerga har bir sahifaning o'ziga tegishli kontenti kelib tushadi.
      */}
      <main className={`flex-grow bg-slate-50 ${needsPadding ? "pt-24" : ""}`}>{children}</main>

      {/* Saytning doimiy pastki qismi */}
      <Footer />
    </div>
  );
};

export default Layout;
