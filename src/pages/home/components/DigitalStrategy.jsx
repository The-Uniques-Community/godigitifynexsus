import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const strategySteps = [
  {
    number: "01",
    titleStart: "Understand the",
    titleHighlight: "Vision",
    keywords: [
      "Brand Discovery",
      "Goal-Oriented Strategy",
      "Audience Analysis",
      "Digital Brand Clarity",
      "Vision Alignment",
      "Purpose-Driven Planning",
    ],
    description:
      "We begin by understanding your brand’s goals, audience, and purpose. Every digital journey starts with clarity — so we listen, learn, and uncover what success looks like for you.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlgD5_Zgh8ImkFoA47L_A3_o7O4O752D_8LA&s",
  },
  {
    number: "02",
    titleStart: "Strategize with",
    titleHighlight: "Impact",
    keywords: [
      "Insight-Driven Planning",
      "Data-Backed Strategies",
      "Brand Voice Alignment",
      "Market Needs Mapping",
      "Creative Ideation",
      "Actionable Strategy",
    ],
    description:
      "Our team transforms insights into ideas — crafting creative and data-backed strategies that align with your brand's voice and market needs.",
    image:
      "https://clictadigital.com/wp-content/uploads/2020/05/digital-marketing-strategy-FI.png",
  },
  {
    number: "03",
    titleStart: "Execute Everything",
    titleHighlight: "Seamlessly",
    keywords: [
      "End-to-End Execution",
      "Digital Branding",
      "Website Creation",
      "Social Media Management",
      "Printables Design",
      "Event Campaign Management",
    ],
    description:
      "Just tell us what your event or campaign is about — and we handle it all. From digital branding, website creation, social media management, to printables and complete event execution, we bring your vision to life with zero hassle.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcQYwPNGc0PgYM2dbx9W5RPRD4R1OxeA83iQ&s",
  },
  {
    number: "04",
    titleStart: "Analyze, Refine,",
    titleHighlight: "Growth",
    keywords: [
      "Performance Tracking",
      "Optimization Strategy",
      "Touchpoint Analysis",
      "Growth Monitoring",
      "ROI Evaluation",
      "Digital Presence Scaling",
    ],
    description:
      "We track every touchpoint, evaluate performance, and continuously optimize your digital presence — ensuring results that grow with your brand.",
    image: "https://s44783.pcdn.co/wp-content/uploads/2023/05/a3-4.png",
  },
];

const Card = ({
  number,
  titleStart,
  titleHighlight,
  keywords,
  description,
  image,
  index,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Set initial state - cards start from left side, rotated and invisible
    gsap.set(card, {
      x: -300,
      y: -100,
      rotation: -15,
      opacity: 0,
      scale: 0.8,
    });

    // Create scroll trigger animation
    gsap.to(card, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 20%",
        scrub: 1.5,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="lg:grid lg:grid-cols-10 md:grid md:grid-cols-8 sm:grid border-slate-300 sm:grid-cols-6 grid grid-cols-1 min-h-52 p-2 gap-x-9 border-t mx-auto relative py-8 "
    >
      {/* Number - Left Side for Large Screens */}
      <div className="lg:col-span-1 md:col-span-1 sm:hidden hidden lg:block md:block">
        <span className="font-bold text-[#b4b4b476] text-7xl">{number}</span>
      </div>

      {/* Heading - Large Screens */}
      <div className="lg:col-span-3 md:col-span-3 sm:hidden hidden lg:block md:block mb-5">
        <h3 className="lg:text-4xl text-3xl lg:ms-4 md:ms-4">
          {titleStart}{" "}
          <span className="lg:text-7xl text-5xl font-bold text-[#47216b]">
            {titleHighlight}
          </span>
        </h3>
      </div>

      {/* Keywords - Large Screens */}
      <div className="lg:col-span-2 md:col-span-2 sm:hidden hidden lg:block md:block">
        <p className="text-xs text-light text-[#676767]">
          <ul className="flex-col space-y-1.5 list-disc list-inside">
            {keywords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </p>
      </div>

      {/* Description - Large Screens */}
      <div className="lg:col-span-2 md:col-span-2 sm:hidden hidden lg:block md:block text-sm">
        <p>{description}</p>
      </div>

      {/* Image - Large Screens */}
      <div className="lg:col-span-2 md:hidden sm:hidden hidden lg:block">
        <img
          src={image}
          className="w-full h-full object-cover object-center rounded-xl"
          alt={titleHighlight}
        />
      </div>

      {/* Tablet Layout */}
      <div className="sm:col-span-4 sm:block lg:hidden md:hidden hidden mb-3">
        <h3 className="text-2xl">
          {titleStart}{" "}
          <span className="text-4xl font-bold text-[#47216b]">
            {titleHighlight}
          </span>
        </h3>
      </div>
      <div className="sm:col-span-2 sm:block lg:hidden md:hidden hidden mb-3">
        <span className="font-bold text-[#b4b4b476] text-6xl">{number}</span>
      </div>
      <div className="sm:col-span-6 sm:block lg:hidden md:hidden hidden mb-3">
        <p className="text-sm">{description}</p>
      </div>
      <div className="sm:col-span-6 sm:block lg:hidden md:hidden hidden">
        <p className="text-xs text-light text-[#676767]">
          <span className="inline-flex flex-wrap gap-2">
            {keywords.map((word, index) => (
              <span key={index}>• {word}</span>
            ))}
          </span>
        </p>
      </div>

      {/* Mobile Layout */}
      <div className="block sm:hidden lg:hidden md:hidden mb-3">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl flex-1">
            {titleStart}{" "}
            <span className="text-3xl font-bold text-[#47216b]">
              {titleHighlight}
            </span>
          </h3>
          <span className="font-bold text-[#b4b4b476] text-5xl ml-4">
            {number}
          </span>
        </div>
        <p className="text-sm mb-3">{description}</p>
        <p className="text-xs text-light text-[#676767]">
          <span className="inline-flex flex-wrap gap-2">
            {keywords.map((word, index) => (
              <span key={index}>• {word}</span>
            ))}
          </span>
        </p>
      </div>
    </div>
  );
};

const DigitalStrategy = () => {
  return (
    <div className="overflow-hidden py-12 px-4">
      {/* <h3 className="text-sm font-semibold uppercase tracking-wider text-[#47216b] mb-2">
        OUR BLOG
      </h3> */}
      <h2 className="text-4xl md:text-7xl pb-5 w-max  font-bold leading-tight sm:text-5xl xl:text-6xl/none mb-5 text-[#47216b]">
         How We Work at GoDigitfy
      </h2>
      {/* <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
        Stay updated with our latest articles, industry trends, and expert
        opinions. We share our knowledge to help you succeed and navigate the
        evolving landscape of technology and business.
      </p> */}
      {strategySteps.map((step, index) => (
        <Card key={step.number} {...step} index={index} />
      ))}
    </div>
  );
};

export default DigitalStrategy;
