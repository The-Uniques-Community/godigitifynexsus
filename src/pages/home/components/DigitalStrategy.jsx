import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import vision from '../../../assets/images/vision.png'
import impact from '../../../assets/images/impact.png'
import seamless from '../../../assets/images/seamless.png'
import growth from '../../../assets/last.png'
gsap.registerPlugin(ScrollTrigger);

const strategySteps = [
  {
    number: "01",
    titleStart: "Discovery &",
    titleHighlight: "Audit",
    keywords: [
      "Systems Analysis",
      "Growth Bottleneck Mapping",
      "Technology Stack Review",
      "Data Flow Assessment",
      "Integration Gaps",
      "Performance Baseline",
    ],
    description:
      "We begin with a comprehensive audit of your current digital ecosystem. We identify disconnected systems, manual bottlenecks, and opportunities for automation — giving you a clear picture of what's working and what's holding you back.",
    image: vision

  },
  {
    number: "02",
    titleStart: "System",
    titleHighlight: "Blueprinting",
    keywords: [
      "Architecture Design",
      "Integration Planning",
      "Automation Workflows",
      "Data Layer Mapping",
      "Scalability Framework",
      "Security Protocols",
    ],
    description:
      "We design a unified system architecture that connects your brand, technology, and data. Every component is planned for integration, automation, and measurable outcomes — no isolated solutions.",
    image: impact
  },
  {
    number: "03",
    titleStart: "Implementation &",
    titleHighlight: "Integration",
    keywords: [
      "Platform Deployment",
      "API Integration",
      "Automation Setup",
      "Data Pipeline Build",
      "Security Hardening",
      "Performance Optimization",
    ],
    description:
      "We build and deploy your growth infrastructure — connecting platforms, automating workflows, and integrating data sources. Every system is stress-tested for security, speed, and scale before launch.",
    image: seamless
  },
  {
    number: "04",
    titleStart: "Measurement &",
    titleHighlight: "Optimization",
    keywords: [
      "Performance Dashboards",
      "KPI Tracking",
      "A/B System Testing",
      "Continuous Improvement",
      "ROI Reporting",
      "Predictive Scaling",
    ],
    description:
      "We measure what matters. Custom dashboards track system performance, revenue impact, and efficiency gains. We continuously optimize based on real data — ensuring your infrastructure evolves with your growth.",
    image: growth,
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

    // Set initial state - cards start invisible
    gsap.set(card, {
      opacity: 0,
    });

    // Create smooth scroll trigger animation with fade in/out effect
    ScrollTrigger.create({
      trigger: card,
      start: "top 70%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          duration: 1.5,
          ease: "power3.out"
        });
      },
      onLeave: () => {
        gsap.to(card, {
          opacity: 0.2,
          duration: 1.2,
          ease: "power3.inOut"
        });
      },
      onEnterBack: () => {
        gsap.to(card, {
          opacity: 1,
          duration: 1.5,
          ease: "power3.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(card, {
          opacity: 0,
          duration: 1.2,
          ease: "power3.inOut"
        });
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
    <div className="overflow-hidden container mx-auto px-4 md:px-6 lg:px-8">
      {/* <h3 className="text-sm font-semibold uppercase tracking-wider text-[#47216b] mb-2">
        OUR BLOG
      </h3> */}
      <h2 className="text-3xl md:text-7xl pb-5 w-max font-bold leading-tight  lg:mb-32 md:mb-16 mb-4 text-[#47216b]">
        How We Work at <br className="lg:hidden md:hidden" />Godigitify
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
