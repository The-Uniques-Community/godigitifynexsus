
import Hero from "./components/Hero";
import About from "./components/About";
import Blog from "./components/Blog";
import Service from "./components/Service";
import CompanyLogos from "./components/CompanyLogos";
import DigitalStrategy from "./components/DigitalStrategy";
import React from 'react'
import { Link } from 'react-router'
import Hero from './components/Hero'
import About from './components/About'
import Project from './Project'

const index = () => {
  return (
    <div>
        <Hero />
        <About />
        <Project />
      <Hero />
      <About />
      <DigitalStrategy/>
      <Blog />
      <Service />
      <CompanyLogos/>
    </div>
  );
};

export default index;
