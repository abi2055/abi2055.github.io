// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import More from './pages/More.jsx';
import FallingShapes from './components/FallingShapes/AvalancheAnimation.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import "./App.css"
import { useState, useEffect } from 'react';

const App = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); 
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div>
      {isSmallScreen ? (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', // Make sure it takes the full height of the viewport
          padding: '20px', 
          color: '#333000' 
        }}>
          <strong>Webpage not optimized for small resolutions</strong>
        </div>
      ) : (
        <Router>
          <ScrollToTop />
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home key="home" />} />
              <Route path="/projects" element={<Projects key="projects" />} />
              <Route path="/more" element={<More key="more" />} />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
};

export default App;