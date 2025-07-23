import React from "react";
import { Link } from "react-router";
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "../../utils/Navbar";
import Service from "./components/Service";
import CompanyLogos from "./components/CompanyLogos";

const index = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Service />
      <CompanyLogos/>
    </div>
  );
};

export default index;
