import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [loadingComplete, setLoadingComplete] = useState(() => {
    // Check if user has already seen the loading screen this session
    return sessionStorage.getItem('hasSeenLoading') === 'true';
  });

  const handleLoadingComplete = () => {
    // Mark that user has seen the loading screen
    sessionStorage.setItem('hasSeenLoading', 'true');
    setLoadingComplete(true);
  };

  return (
    <LanguageProvider>
      {!loadingComplete ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <div className="App bg-secondary">
          <Navigation />
          <Home />
          <Footer />
        </div>
      )}
    </LanguageProvider>
  );
}

export default App;
