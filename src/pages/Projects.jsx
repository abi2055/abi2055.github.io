import React from 'react';
import './Projects.css'; // Ensure the CSS file is imported
import { useEffect, useState } from 'react';
import project1 from '../assets/spotify-tracker-image.jpg';
import project2 from '../assets/real-estate.jpg';
import project3 from '../assets/maze-solver-image.jpg'
import project4 from '../assets/code-image.jpg'
import project5 from '../assets/ecommerce.jpg'
import CodeIcon from '@mui/icons-material/Code';
import MovieIcon from '@mui/icons-material/Movie';
import SettingsOverscanRoundedIcon from '@mui/icons-material/SettingsOverscanRounded';

const works = [
  {
    id: 'work1',
    title: "Real Estate Web Application ('Nest')",
    smallDescription: "A Real Estate Web Application made to compete against the likes of Zillow.",
    expandedDescription: "A real estate web app built using React, React Native, Express, Node and Firebase. As a full stack developer I used tools like Redux and ensured the usage of best practices. ",
    imgSrc: project2,
    skills: ["JavaScript", "TypeScript", "Node", "Express", "React/React Native", "Firebase", "REST APIs", "Redux", "HTML + CSS", "Material UI", "Docker", "Kubernetes"]
  },
  {
    id: 'work2',
    title: "Maze Solver",
    smallDescription: "A complete maze solver that uses 3 different kinds of algorithms including BFS and benchmarks them aginst eachother.",
    expandedDescription: "A complete Java maze solver that uses 3 different kinds of algorithms: right-hand, tremeaux and BFS and benchmarks them against each other. Uses all principles from industry software design like SOLID, GRASP and GOF patterns. ",
    imgSrc: project3,
    skills: ["Java", "OOP", "Interfacing", "Patterns", "Apache Maven", "Git + Kanban", "Iterative Development", "Graph Algorithms"]
  },
  {
    id: 'work3',
    title: "Portfolio Website",
    smallDescription: "This website is a project that captures my entire programming journey and allows the internet to connect to me.",
    expandedDescription: "This website is a project that captures my entire programming journey and allows the internet to connect to me. I built it using React and Vite, Node and Express. Right now it has no backend functionality, but this website will forever be a progress piece. ",
    imgSrc: project4,
    skills: ["JavaScript", "Node", "Express", "React", "Material UI", "HTML + CSS"]
  },
  {
    id: 'work4',
    title: "Spotify Mood Tracker",
    smallDescription: "A deeply personal project that embodies my love of music.",
    expandedDescription: "This tracker allows me to monitor how my musical choices reflect my moods over time, using data from Spotify's API to create visualizations that tell a story about my emotional journey through music.",
    imgSrc: project1,
    skills: ["Python", "Flask", "Web API", "File I/O", "MatPlotLib", "Json"]
  },
  {
    id: 'work5',
    title: "Amazon Visual Web Agent",
    smallDescription: "Using generative AI, I can prompt the LLM to run through Amazon and add an Item to my cart all autonomously.",
    expandedDescription: "Using generative AI, I can prompt the LLM to run through Amazon and add an Item to my cart all autonomously. Built using LangChain for custom tools, Llava for image recognition, Yolov8 to create bounding boxes and Pyppeteer for controlling inputs.",
    imgSrc: project5,
    skills: ["Python", "LangChain", "Llava", "Llama Index", "OpenInterpreter", "Yolov8", "Roboflow", "Git", "Pyppeteer"]
  },
];

const Projects = () => {
  const [fadeClass, setFadeClass] = useState('fade-enter');
  const [expandedBoxes, setExpandedBoxes] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setFadeClass('fade-enter-active');
    }, 20); 
  }, []);

  const handleExpandClick = (id) => {
    setExpandedBoxes(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };
  
  return (
    <div className={fadeClass} style={{ overflowY: 'scroll'}}>
      <div className="parent-container">
        <div className="projects-container">
          {works.map((work) => (
          <div 
            key={work.id} 
            className={`project-box ${expandedBoxes[work.id] ? 'expanded' : ''}`} 
            onClick={() => handleExpandClick(work.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className='expand'>
              {expandedBoxes[work.id] ? (
                <p>Shrink</p>
              ) : (
                <p>Expand</p>
              )}
              <SettingsOverscanRoundedIcon />
            </div>
            <img src={work.imgSrc} className='project-box-img'/>
            <div className='content-container'>
              <div className='text-content'>
                <h2>{work.title}</h2>
                {expandedBoxes[work.id] ? (
                  <p style={{ transition: 'transform 1s ease-in-out', fontFamily: 'lemonLight'}}>
                    {work.expandedDescription}
                  </p>
                ) : (
                  <p style={{ transition: 'transform 1s ease-in-out', fontFamily: 'lemonLight'}}>{work.smallDescription}</p>
                )}
              </div>
              <div className='skills'>
                {work.skills.map((skill, index) => (
                  <div key={index} className='skills-box'>
                    <h3>{skill}</h3>
                  </div>
                ))}
              </div>
              <div className='content-buttons'>
                <button className='button-filled'>
                  Code   
                  <CodeIcon className='button-icon'/>
                </button> 
                <button className='button-filled'>
                  Live Demo 
                  <MovieIcon className='button-icon'/>
                </button> 
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
