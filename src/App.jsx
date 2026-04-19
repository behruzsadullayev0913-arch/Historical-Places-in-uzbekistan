import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Places from "./pages/Places";
import PlaceDetail from "./pages/PlaceDetail";
import { UserProvider } from "./contexts/UserContext";
import { LikesCommentsProvider } from "./contexts/LikesCommentsContext";
import { LanguageProvider } from "./contexts/LanguageContext";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <LikesCommentsProvider>
          <Router>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/places" element={<Places />} />
                <Route path="/place/:id" element={<PlaceDetail />} />
              </Routes>
            </Layout>
          </Router>
        </LikesCommentsProvider>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
