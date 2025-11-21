import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Navigation />
        <Home />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
