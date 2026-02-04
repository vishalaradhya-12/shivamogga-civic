import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Partners from './pages/Partners';
import DataReview from './pages/DataReview';
import Feedback from './pages/Feedback';
import About from './pages/About';
import Team from './pages/Team';
import Collaborate from './pages/Collaborate';
import WardDetails from './pages/WardDetails';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');

    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark');
    }

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            language={language}
            changeLanguage={changeLanguage}
          />
          <main>
            <Routes>
              <Route path="/" element={<Home language={language} />} />
              <Route path="/partners" element={<Partners language={language} />} />
              <Route path="/data-review" element={<DataReview language={language} />} />
              <Route path="/feedback" element={<Feedback language={language} />} />
              <Route path="/about" element={<About language={language} />} />
              <Route path="/team" element={<Team language={language} />} />
              <Route path="/collaborate" element={<Collaborate language={language} />} />
              <Route path="/ward/:wardNumber" element={<WardDetails language={language} />} />
            </Routes>
          </main>
          <Footer language={language} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
