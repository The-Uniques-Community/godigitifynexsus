import React from "react";
import { Link } from "react-router";
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "../../utils/Navbar";

const index = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
    </div>
  );
};

export default index;
