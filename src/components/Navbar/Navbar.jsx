// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/portfolio-Logo.png'; 
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className='navbar-logo-container'>
        <img src={logo} alt="Logo" className="navbar-logo"/>
        <div className="dropdown">
          <div className='update-notice'>
            Last Updated: 2024 Aug 17th
          </div>
          <div className='icon-container'>
            <div className='icon-links'>
              <a href="https://www.linkedin.com/in/naathan/" target="_blank" rel="noopener noreferrer" className="icon-link">
                <LinkedInIcon className="icon-link" style={{ fontSize: '4vh' }}/>
              </a>
              <a href="https://github.com/abi2055" target="_blank" rel="noopener noreferrer" className="icon-link">
                <GitHubIcon className="icon-link" style={{ fontSize: '4vh' }}/>
              </a>
              <a href="https://www.instagram.com/_abinate/" target="_blank" rel="noopener noreferrer" className="icon-link">
                <InstagramIcon className="icon-link" style={{ fontSize: '4vh' }} />  
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='text-boxes'>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} end>
              <div className="nav-item">
                Home
                <ArrowOutwardIcon className="nav-arrow" />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} end>
              <div className="nav-item">
                Projects
                <ArrowOutwardIcon className="nav-arrow" />
              </div>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/more" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} end>
              <div className="nav-item">
                More
                <ArrowOutwardIcon className="nav-arrow" />
              </div>
            </NavLink>
          </li> */}
          <li>
            <a href="https://drive.google.com/file/d/1GbB7HGQfigYUZNS66tBRb3EQmYVa3NQE/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="nav-item">
              <div className="nav-item">
              Resume
              <ArrowOutwardIcon className="nav-arrow" />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
