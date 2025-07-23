import React from "react";
import { Link } from "react-router";
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "../../utils/Navbar";
import Blog from "./components/Blog";

const index = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Blog />
    </div>
  );
};

export default index;
