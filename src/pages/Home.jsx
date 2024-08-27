import React from 'react';
import TitleText from '../components/MainTitle/title.jsx';
import './Home.css'
import { useEffect, useState } from 'react';

const Home = () => {
  const [fadeClass, setFadeClass] = useState('fade-enter');

  useEffect(() => {
    setTimeout(() => {
      setFadeClass('fade-enter-active');
    }, 20); 
  }, []);

  return (
    <div className='home-container'>
      <div className={fadeClass}>
        <TitleText />
      </div>
    </div>
  );
};

export default Home;
