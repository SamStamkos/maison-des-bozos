import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NewsletterConfirmation from "./pages/NewsletterConfirmation";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import SEO from "./components/SEO";
import StructuredData from "./components/StructuredData";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  const [loadingComplete, setLoadingComplete] = useState(() => {
    // Check if user has already seen the loading screen this session
    return sessionStorage.getItem("hasSeenLoading") === "true";
  });

  // Load manifest.json asynchronously after page load for better performance
  useEffect(() => {
    const manifestLink = document.createElement("link");
    manifestLink.rel = "manifest";
    manifestLink.href = "/manifest.json";
    document.head.appendChild(manifestLink);
  }, []);

  const handleLoadingComplete = () => {
    // Mark that user has seen the loading screen
    sessionStorage.setItem("hasSeenLoading", "true");
    setLoadingComplete(true);
  };

  // Only show loading screen on home page
  const showLoading = isHomePage && !loadingComplete;

  return (
    <LanguageProvider>
      <SEO />
      <StructuredData />
      {showLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <div className="App bg-secondary">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route
              path="/inscription-confirmee"
              element={<NewsletterConfirmation />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      )}
    </LanguageProvider>
  );
}

export default App;
