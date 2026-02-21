import React from "react";
import Header from "./Header"; // Yuqori qism (menyu)
import Footer from "./Footer"; // Pastki qism (aloqa ma'lumotlari)

const Layout = ({ children }) => {
  return (
    // 'flex-col' va 'min-h-screen' yordamida foter har doim sahifa pastida turishini ta'minlaymiz
    <div className="flex flex-col min-h-screen">
      {/* Saytning doimiy tepa qismi */}
      <Header />

      {/* 'flex-grow' - bu qism sahifadagi bo'sh joyni to'ldiradi.
          {children} - bu yerga har bir sahifaning o'ziga tegishli kontenti kelib tushadi.
      */}
      <main className="flex-grow ">{children}</main>

      {/* Saytning doimiy pastki qismi */}
      <Footer />
    </div>
  );
};

export default Layout;
