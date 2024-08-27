import React from 'react';
import './Title.css'
import mainImg from '../../assets/main-image.jpg'
import codingBG from '../../assets/codingBG.jpg'
import spaceBG from '../../assets/moon-bs2.jpg'

const title = () => {
    return (
      <>
        <header className="main-header">
          <h1 className="big-title">Abishek</h1>
          <h1 className="big-title">Naathan</h1>
        </header>
        <div className='homeImg-container'>
          <img src={spaceBG} 
          alt="main page background"
          className='homeImg'
          />
        </div>
        <div className='description'>
          <p style={{fontSize: '2vw', padding: '0', margin: '0'}}>
            Software Engineering Student @ 
          </p>
          <p style={{fontSize: '3vw', padding: '0', margin: '0'}}>
            The University Of McMaster 
          </p>
        </div>
      </>
    );
  };
  
  export default Title;