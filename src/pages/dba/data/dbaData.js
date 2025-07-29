// Dummy images (replace with actual imports)
export const BrandingSolutionsImg = 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
export const MarketingSolutionsImg = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
export const WebSolutionsImg = 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
export const AppSolutionsImg = 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
export const GraphicSolutionsImg = 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

// Categories data
export const categories = [
  { 
    slug: 'branding-solutions', 
    name: 'Branding Solutions', 
    shortDesc: 'Create compelling brand identities that captivate and convert.',
    icon: 'B',
    color: '#47216b'
  },
  { 
    slug: 'marketing', 
    name: 'Marketing Solutions', 
    shortDesc: 'Data-driven marketing strategies that deliver results.',
    icon: 'M',
    color: '#47216b'
  },
  { 
    slug: 'web', 
    name: 'Web Solutions', 
    shortDesc: 'High-performance websites that drive conversions.',
    icon: 'W',
    color: '#47216b'
  },
  { 
    slug: 'app-development', 
    name: 'App Solutions', 
    shortDesc: 'Mobile experiences that engage and retain users.',
    icon: 'A',
    color: '#47216b'
  },
  { 
    slug: 'graphic', 
    name: 'Graphic Solutions', 
    shortDesc: 'Visual designs that communicate your brand story.',
    icon: 'G',
    color: '#47216b'
  }
];

// Dummy stats data for each category
export const categoryStats = {
  branding: [
    { value: '250+', label: 'Brands Transformed' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '4.9/5', label: 'Average Rating' }
  ],
  marketing: [
    { value: '500+', label: 'Campaigns Managed' },
    { value: '5-10x', label: 'Average ROI' },
    { value: '₹50Cr+', label: 'Media Budget Managed' }
  ],
  web: [
    { value: '300+', label: 'Websites Built' },
    { value: '3x', label: 'Avg Performance Boost' },
    { value: '99.9%', label: 'Uptime Guarantee' }
  ],
  app: [
    { value: '150+', label: 'Apps Developed' },
    { value: '4.8/5', label: 'Avg App Store Rating' },
    { value: '2M+', label: 'Total Downloads' }
  ],
  graphic: [
    { value: '1000+', label: 'Designs Created' },
    { value: '24h', label: 'Avg Turnaround Time' },
    { value: '100%', label: 'Client Approval Rate' }
  ]
};

// Service offerings for each category (first 3 services only for main page)
export const serviceOfferings = {
  branding: [
    {
      id: 'identity',
      title: 'Brand Identity',
      description: 'Comprehensive brand identity systems including logos, color palettes, typography, and visual language.'
    },
    {
      id: 'strategy',
      title: 'Brand Strategy',
      description: 'Develop positioning, messaging, and brand architecture to differentiate in competitive markets.'
    },
    {
      id: 'guidelines',
      title: 'Brand Guidelines',
      description: 'Create detailed brand books that ensure consistent application across all touchpoints.'
    }
  ],
  marketing: [
    {
      id: 'digital',
      title: 'Digital Marketing',
      description: 'End-to-end digital marketing strategies including SEO, PPC, social media, and content marketing.'
    },
    {
      id: 'content',
      title: 'Content Marketing',
      description: 'Strategic content creation and distribution to attract, engage, and retain your target audience.'
    },
    {
      id: 'growth',
      title: 'Growth Marketing',
      description: 'Data-driven approaches to accelerate customer acquisition and revenue growth.'
    }
  ],
  web: [
    {
      id: 'development',
      title: 'Web Development',
      description: 'Custom website development with modern frameworks for optimal performance and scalability.'
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce',
      description: 'Feature-rich online stores with seamless checkout experiences and conversion optimization.'
    },
    {
      id: 'webapp',
      title: 'Web Applications',
      description: 'Complex web applications with intuitive interfaces and robust backend systems.'
    }
  ],
  app: [
    {
      id: 'ios',
      title: 'iOS Apps',
      description: 'Native iOS applications built with Swift for premium performance and user experience.'
    },
    {
      id: 'android',
      title: 'Android Apps',
      description: 'Native Android applications following Material Design guidelines for consistency.'
    },
    {
      id: 'cross',
      title: 'Cross-Platform',
      description: 'Single codebase apps using React Native or Flutter for cost-effective development.'
    }
  ],
  graphic: [
    {
      id: 'print',
      title: 'Print Design',
      description: 'Business cards, brochures, banners, and other print collateral with premium finishes.'
    },
    {
      id: 'digital',
      title: 'Digital Graphics',
      description: 'Social media graphics, display ads, infographics, and other digital assets.'
    },
    {
      id: 'packaging',
      title: 'Packaging Design',
      description: 'Eye-catching packaging that stands out on shelves and communicates brand values.'
    }
  ]
};

// Detailed pages content for each service
export const servicePages = {
  branding: {
    title: "Branding Solutions",
    heroImage: BrandingSolutionsImg,
    overview: "Our comprehensive branding solutions help businesses establish a strong, memorable identity that resonates with their target audience.",
    whyChooseUs: [
      "15+ years of branding expertise across industries",
      "Proprietary brand discovery process",
      "Award-winning creative team",
      "End-to-end brand development"
    ],
    process: [
      {
        title: "Discovery",
        description: "Deep dive into your business, market, and audience through workshops and research."
      },
      {
        title: "Strategy",
        description: "Develop brand positioning, architecture, and messaging framework."
      },
      {
        title: "Design",
        description: "Create visual identity system with multiple design directions."
      },
      {
        title: "Implementation",
        description: "Roll out brand across all touchpoints with detailed guidelines."
      }
    ],
    testimonials: [
      {
        quote: "They transformed our brand identity and helped us stand out in a crowded market.",
        author: "Sarah Johnson, CEO of TechStart"
      },
      {
        quote: "The brand strategy they developed became our north star for all marketing decisions.",
        author: "Michael Chen, CMO of UrbanEats"
      }
    ],
    companies: ["Amazon", "Microsoft", "Nike", "Coca-Cola", "Tesla"],
    stats: categoryStats.branding
  },
  marketing: {
    title: "Marketing Solutions",
    heroImage: MarketingSolutionsImg,
    overview: "Data-driven marketing strategies that deliver measurable results and maximize ROI.",
    whyChooseUs: [
      "Performance-based approach",
      "Full-funnel marketing expertise",
      "Advanced analytics and attribution",
      "Agile campaign management"
    ],
    process: [
      {
        title: "Research",
        description: "Analyze market trends, competitor strategies, and audience behavior."
      },
      {
        title: "Strategy",
        description: "Develop comprehensive marketing plans aligned with business objectives."
      },
      {
        title: "Execution",
        description: "Implement campaigns across multiple channels with real-time optimization."
      },
      {
        title: "Optimization",
        description: "Continuously monitor performance and refine strategies for better results."
      }
    ],
    testimonials: [
      {
        quote: "Our ROI increased by 300% within the first quarter of working with them.",
        author: "Lisa Rodriguez, Marketing Director at GrowthCo"
      },
      {
        quote: "They helped us scale our marketing efforts while maintaining quality and efficiency.",
        author: "David Kim, Founder of StartupXYZ"
      }
    ],
    companies: ["Google", "Facebook", "LinkedIn", "Twitter", "TikTok"],
    stats: categoryStats.marketing
  },
  web: {
    title: "Web Solutions",
    heroImage: WebSolutionsImg,
    overview: "High-performance websites and web applications that drive engagement and conversions.",
    whyChooseUs: [
      "Mobile-first responsive design",
      "Blazing fast performance",
      "SEO-optimized architecture",
      "Secure and scalable infrastructure"
    ],
    process: [
      {
        title: "Planning",
        description: "Define requirements, user stories, and technical architecture."
      },
      {
        title: "Design",
        description: "Create wireframes, mockups, and interactive prototypes."
      },
      {
        title: "Development",
        description: "Build with modern frameworks and best practices."
      },
      {
        title: "Launch",
        description: "Deploy with comprehensive testing and optimization."
      }
    ],
    testimonials: [
      {
        quote: "Our website load time improved from 8 seconds to under 2 seconds.",
        author: "Alex Thompson, CTO of E-commercePro"
      },
      {
        quote: "The new website increased our conversion rate by 150%.",
        author: "Maria Garcia, CEO of RetailPlus"
      }
    ],
    companies: ["Shopify", "WordPress", "Wix", "Squarespace", "Webflow"],
    stats: categoryStats.web
  },
  app: {
    title: "App Solutions",
    heroImage: AppSolutionsImg,
    overview: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
    whyChooseUs: [
      "Native performance optimization",
      "Cross-platform development expertise",
      "App store optimization",
      "Continuous maintenance and updates"
    ],
    process: [
      {
        title: "Concept",
        description: "Define app features, user flows, and technical requirements."
      },
      {
        title: "Design",
        description: "Create intuitive UI/UX designs for mobile interfaces."
      },
      {
        title: "Development",
        description: "Build with native or cross-platform technologies."
      },
      {
        title: "Launch",
        description: "Deploy to app stores with comprehensive testing."
      }
    ],
    testimonials: [
      {
        quote: "Our app reached 1M downloads within 6 months of launch.",
        author: "James Wilson, Product Manager at MobileFirst"
      },
      {
        quote: "The app improved our customer engagement by 200%.",
        author: "Emma Davis, CEO of ServiceApp"
      }
    ],
    companies: ["Apple", "Google", "Samsung", "Huawei", "Xiaomi"],
    stats: categoryStats.app
  },
  graphic: {
    title: "Graphic Solutions",
    heroImage: GraphicSolutionsImg,
    overview: "Creative visual designs that communicate your brand story and engage your audience.",
    whyChooseUs: [
      "Award-winning design team",
      "Fast turnaround times",
      "Multiple design options",
      "Print and digital expertise"
    ],
    process: [
      {
        title: "Brief",
        description: "Understand project requirements, target audience, and brand guidelines."
      },
      {
        title: "Concept",
        description: "Develop creative concepts and design directions."
      },
      {
        title: "Design",
        description: "Create final designs with attention to detail."
      },
      {
        title: "Delivery",
        description: "Provide all necessary files and formats for implementation."
      }
    ],
    testimonials: [
      {
        quote: "The designs exceeded our expectations and perfectly captured our brand essence.",
        author: "Rachel Green, Creative Director at DesignStudio"
      },
      {
        quote: "Fast, professional, and creative - exactly what we needed.",
        author: "Tom Brown, Marketing Manager at BrandCo"
      }
    ],
    companies: ["Adobe", "Canva", "Figma", "Sketch", "InVision"],
    stats: categoryStats.graphic
  }
};

// How we work steps
export const howWeWork = [
  {
    step: 1,
    title: "Discovery & Strategy",
    description: "We dive deep into your business goals, target audience, and market positioning to develop a customized digital strategy."
  },
  {
    step: 2,
    title: "Design & Development",
    description: "Our creative and technical teams collaborate to bring your digital presence to life through stunning design."
  },
  {
    step: 3,
    title: "Launch & Optimize",
    description: "We execute a strategic launch and continuously monitor performance, making data-driven optimizations."
  },
  {
    step: 4,
    title: "Scale & Evolve",
    description: "As your business grows, we scale your digital presence, continuously evolving your strategy."
  }
];

// Category descriptions for main page
export const getCategoryDescription = (category) => {
  switch(category) {
    case 'branding':
      return "At GoDigitfy, we don't just build brands — we create complete digital identities that connect with audiences, drive engagement, and inspire action. Whether you're launching a new venture or reimagining an existing one, we offer end-to-end branding solutions that combine creativity, strategy, and flawless execution.";
    case 'marketing':
      return "At GoDigitfy, our Marketing Solutions division is designed to fuel your brand's growth through high-performance marketing strategies. From precision-driven campaigns to full-funnel performance marketing, we help brands cut through the digital noise and connect with the right audience at the right time — ensuring measurable outcomes and maximum ROI.";
    case 'web':
      return "At GoDigitfy, we go beyond code. We architect intelligent, integrated web solutions that empower businesses, elevate customer experiences, and accelerate digital growth. Whether you're a startup or an enterprise, our strategic approach to web development ensures your digital presence is scalable, secure, and tailored to your goals.";
    case 'app':
      return "At GoDigitfy, we don't just build apps — we craft purpose-driven mobile experiences that are uniquely aligned with your business goals. Whether you're launching a disruptive new idea or streamlining internal operations, we design and develop applications from the ground up — flexible, scalable, and future-ready.";
    case 'graphic':
      return "At GoDigitfy, we create visual designs that don't just look good — they communicate your brand story and drive results. Our graphic design team combines creativity with strategic thinking to deliver designs that engage, inspire, and convert your audience.";
    default:
      return "";
  }
};