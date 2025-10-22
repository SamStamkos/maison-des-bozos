import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Billetterie from './pages/Billetterie';
import Concerts from './pages/Concerts';
import Musee from './pages/Musee';
import Don from './pages/Don';
import Boutique from './pages/Boutique';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Navigation />
        <Routes>
          {/* French routes (default) */}
          <Route path="/" element={<Home />} />
          <Route path="/billetterie" element={<Billetterie />} />
          <Route path="/concerts" element={<Concerts />} />
          <Route path="/musee" element={<Musee />} />
          <Route path="/don" element={<Don />} />
          <Route path="/boutique" element={<Boutique />} />
          
          {/* English routes */}
          <Route path="/en" element={<Home />} />
          <Route path="/en/billetterie" element={<Billetterie />} />
          <Route path="/en/concerts" element={<Concerts />} />
          <Route path="/en/musee" element={<Musee />} />
          <Route path="/en/don" element={<Don />} />
          <Route path="/en/boutique" element={<Boutique />} />
        </Routes>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
