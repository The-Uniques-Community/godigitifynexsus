
import Hero from "./components/Hero";
import About from "./components/About";
import Blog from "./components/Blog";
import Service from "./components/Service";
import CompanyLogos from "./components/CompanyLogos";
import DigitalStrategy from "./components/DigitalStrategy";

const index = () => {
  return (
    <div>
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
