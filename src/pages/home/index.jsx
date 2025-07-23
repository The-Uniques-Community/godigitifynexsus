import React from "react";
import { Link } from "react-router";
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "../../utils/Navbar";
import Blog from "./components/Blog";
import Service from "./components/Service";
import CompanyLogos from "./components/CompanyLogos";
import DigitalStrategy from "./components/DigitalStrategy";

const index = () => {
  return (
    <div>
      <Navbar />
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
