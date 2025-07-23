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
      "Purpose-Driven Planning"
    ],
    description:
      "We begin by understanding your brand’s goals, audience, and purpose. Every digital journey starts with clarity — so we listen, learn, and uncover what success looks like for you.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlgD5_Zgh8ImkFoA47L_A3_o7O4O752D_8LA&s"
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
      "Actionable Strategy"
    ],
    description:
      "Our team transforms insights into ideas — crafting creative and data-backed strategies that align with your brand's voice and market needs.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCd8ZK8zBC9CRlh0NMDTfIBZMeY93VCXGzIA&s"
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
      "Event Campaign Management"
    ],
    description:
      "Just tell us what your event or campaign is about — and we handle it all. From digital branding, website creation, social media management, to printables and complete event execution, we bring your vision to life with zero hassle.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxE3KjvB7GV1wIxM1ZtdOaw8mDY6Rn_8GEIQ&s"
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
      "Digital Presence Scaling"
    ],
    description:
      "We track every touchpoint, evaluate performance, and continuously optimize your digital presence — ensuring results that grow with your brand.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR20dO3Q3v5JZwPo0vTAZMCeLZRLJWV5hFd2A&s"
  }
];


const Card = ({ number, titleStart, titleHighlight, keywords, description, image }) => {
  return (
    <div className="lg:grid lg:grid-cols-10 md:grid md:grid-cols-8 sm:grid sm:grid-cols-6 grid grid-cols-1 min-h-40 p-2 gap-x-9 border-t border-slate-600 mx-auto shadow-md relative">
      
      {/* Number - Left Side for Large Screens */}
      <div className="lg:col-span-1 md:col-span-1 sm:hidden hidden lg:block md:block">
        <span className="font-bold text-[#b4b4b476] text-7xl">{number}</span>
      </div>

      {/* Heading - Large Screens */}
      <div className="lg:col-span-3 md:col-span-3 sm:hidden hidden lg:block md:block mb-5">
        <h3 className="lg:text-4xl text-3xl lg:ms-4 md:ms-4">
          {titleStart} <span className="lg:text-7xl text-5xl font-bold text-[#47216b]">{titleHighlight}</span>
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
        <img src={image} className="w-full h-full object-cover object-center rounded-xl" alt={titleHighlight} />
      </div>

      {/* Tablet Layout */}
      <div className="sm:col-span-4 sm:block lg:hidden md:hidden hidden mb-3">
        <h3 className="text-2xl">
          {titleStart} <span className="text-4xl font-bold text-[#47216b]">{titleHighlight}</span>
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
            {titleStart} <span className="text-3xl font-bold text-[#47216b]">{titleHighlight}</span>
          </h3>
          <span className="font-bold text-[#b4b4b476] text-5xl ml-4">{number}</span>
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
    <div>
      {strategySteps.map((step) => (
        <Card key={step.number} {...step} />
      ))}
    </div>
  )
}

export default DigitalStrategy
