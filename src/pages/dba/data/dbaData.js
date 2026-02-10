// Dummy images (replace with actual imports)
export const BrandingSolutionsImg = 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
export const MarketingSolutionsImg = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
export const WebSolutionsImg = 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
export const AppSolutionsImg = 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
export const GraphicSolutionsImg = 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

// Categories data - Systems-focused positioning
export const categories = [
  { 
    slug: 'digital-growth-systems', 
    name: 'Digital Growth Systems', 
    shortDesc: 'End-to-end growth infrastructure connecting strategy, technology, and data.',
    icon: '⚡',
    color: '#47216b'
  },
  { 
    slug: 'ai-automation', 
    name: 'AI & Automation Architecture', 
    shortDesc: 'Intelligent automation that eliminates manual bottlenecks at scale.',
    icon: '🤖',
    color: '#47216b'
  },
  { 
    slug: 'platform-engineering', 
    name: 'Scalable Platform Engineering', 
    shortDesc: 'Web platforms and applications built for 10x growth without 10x complexity.',
    icon: '🏗️',
    color: '#47216b'
  },
  { 
    slug: 'brand-systems', 
    name: 'Brand Systems Integration', 
    shortDesc: 'Unified brand infrastructure across all digital touchpoints.',
    icon: '🎯',
    color: '#47216b'
  },
  { 
    slug: 'ecommerce-infrastructure', 
    name: 'E-Commerce Growth Infrastructure', 
    shortDesc: 'Revenue-focused commerce systems designed to scale profitably.',
    icon: '📈',
    color: '#47216b'
  }
];

// Stats data for each category - Systems focused
export const categoryStats = {
  'digital-growth-systems': [
    { value: '500+', label: 'Systems Deployed' },
    { value: '3.2x', label: 'Avg. Efficiency Gain' },
    { value: '97%', label: 'Client Retention' }
  ],
  'ai-automation': [
    { value: '70%', label: 'Manual Work Reduced' },
    { value: '24/7', label: 'Automated Operations' },
    { value: '5x', label: 'Processing Speed' }
  ],
  'platform-engineering': [
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '10x', label: 'Scale Capacity' },
    { value: '<2s', label: 'Load Time' }
  ],
  'brand-systems': [
    { value: '100%', label: 'Brand Consistency' },
    { value: '40+', label: 'Integration Points' },
    { value: '2x', label: 'Recognition Lift' }
  ],
  'ecommerce-infrastructure': [
    { value: '150%', label: 'Avg. Conversion Lift' },
    { value: '₹100Cr+', label: 'Revenue Processed' },
    { value: '99.99%', label: 'Transaction Security' }
  ]
};

// Service offerings for each category - Systems focused
export const serviceOfferings = {
  'digital-growth-systems': [
    {
      id: 'growth-audit',
      title: 'Growth Systems Audit',
      description: 'Comprehensive analysis of your current digital ecosystem, identifying bottlenecks, integration gaps, and automation opportunities.'
    },
    {
      id: 'system-architecture',
      title: 'System Architecture Design',
      description: 'Blueprint development for unified growth infrastructure connecting marketing, sales, and operations.'
    },
    {
      id: 'performance-dashboards',
      title: 'Performance Dashboard Systems',
      description: 'Custom analytics infrastructure tracking revenue impact, efficiency gains, and predictive growth metrics.'
    }
  ],
  'ai-automation': [
    {
      id: 'workflow-automation',
      title: 'Workflow Automation',
      description: 'End-to-end automation of repetitive processes across marketing, sales, and customer service operations.'
    },
    {
      id: 'ai-integration',
      title: 'AI Integration Architecture',
      description: 'Strategic deployment of AI tools and models integrated into your existing technology stack.'
    },
    {
      id: 'intelligent-routing',
      title: 'Intelligent Lead Routing',
      description: 'Automated lead qualification, scoring, and routing systems that reduce response time to under 5 minutes.'
    }
  ],
  'platform-engineering': [
    {
      id: 'web-platforms',
      title: 'Scalable Web Platforms',
      description: 'Enterprise-grade web applications built for performance, security, and growth without proportional complexity.'
    },
    {
      id: 'api-architecture',
      title: 'API & Integration Architecture',
      description: 'Unified data layer connecting all your platforms, tools, and third-party services.'
    },
    {
      id: 'infrastructure-optimization',
      title: 'Infrastructure Optimization',
      description: 'Performance engineering, security hardening, and cost optimization for existing platforms.'
    }
  ],
  'brand-systems': [
    {
      id: 'brand-infrastructure',
      title: 'Brand Infrastructure',
      description: 'Unified brand system architecture ensuring consistency across all digital and physical touchpoints.'
    },
    {
      id: 'design-systems',
      title: 'Design Systems',
      description: 'Scalable component libraries and design tokens that accelerate development and maintain brand integrity.'
    },
    {
      id: 'content-operations',
      title: 'Content Operations Systems',
      description: 'Automated content workflows, approval systems, and multi-channel distribution infrastructure.'
    }
  ],
  'ecommerce-infrastructure': [
    {
      id: 'commerce-platforms',
      title: 'Commerce Platform Architecture',
      description: 'Scalable e-commerce infrastructure handling high-volume transactions with sub-second response times.'
    },
    {
      id: 'inventory-automation',
      title: 'Inventory & Fulfillment Automation',
      description: 'Integrated inventory management, order routing, and fulfillment systems that scale with demand.'
    },
    {
      id: 'conversion-systems',
      title: 'Conversion Optimization Systems',
      description: 'Data-driven checkout optimization, personalization engines, and revenue recovery automation.'
    }
  ]
};

// Detailed pages content for each system
export const servicePages = {
  'digital-growth-systems': {
    title: "Digital Growth Systems",
    heroImage: BrandingSolutionsImg,
    overview: "End-to-end growth infrastructure that connects your strategy, technology, and data into a unified system built for scale. We don't build campaigns — we build machines.",
    whyChooseUs: [
      "Systems-first approach eliminates siloed operations",
      "Every component designed for 10x scale capacity",
      "Real-time visibility into revenue impact metrics",
      "Continuous optimization built into the architecture"
    ],
    process: [
      {
        title: "Discovery & Audit",
        description: "Map your current ecosystem, identify bottlenecks, and quantify efficiency gaps across operations."
      },
      {
        title: "System Architecture",
        description: "Design unified infrastructure connecting marketing, sales, and operations with clear data flows."
      },
      {
        title: "Implementation",
        description: "Deploy modular components with built-in automation and integration touchpoints."
      },
      {
        title: "Optimization",
        description: "Continuous performance monitoring with AI-driven recommendations for improvement."
      }
    ],
    testimonials: [
      {
        quote: "They replaced 5 disconnected tools with one unified system. Our team efficiency tripled.",
        author: "Rajesh Menon, COO of ScaleUp Technologies"
      },
      {
        quote: "For the first time, we have real-time visibility into how marketing directly drives revenue.",
        author: "Priya Sharma, CEO of GrowthForce"
      }
    ],
    companies: ["Tech Ventures", "ScaleUp", "GrowthForce", "BuildFast", "Velocity"],
    stats: categoryStats['digital-growth-systems']
  },
  'ai-automation': {
    title: "AI & Automation Architecture",
    heroImage: MarketingSolutionsImg,
    overview: "Intelligent automation that eliminates manual bottlenecks and creates 24/7 operational capacity. We deploy AI where it matters — not as a buzzword, but as infrastructure.",
    whyChooseUs: [
      "70%+ reduction in manual operational tasks",
      "AI models integrated into existing workflows",
      "No-code management dashboards for your team",
      "Measurable ROI from every automation deployed"
    ],
    process: [
      {
        title: "Process Mapping",
        description: "Identify high-impact automation opportunities across marketing, sales, and operations."
      },
      {
        title: "AI Strategy",
        description: "Select and configure the right AI models and automation tools for each use case."
      },
      {
        title: "Integration",
        description: "Deploy automation into your existing stack with seamless data connectivity."
      },
      {
        title: "Training & Scale",
        description: "Train your team and continuously expand automation coverage."
      }
    ],
    testimonials: [
      {
        quote: "Lead response time went from 4 hours to under 5 minutes. Conversions doubled.",
        author: "Vikram Patel, Head of Sales at CloudFirst"
      },
      {
        quote: "They automated our entire content workflow. We now publish 10x more with the same team.",
        author: "Ananya Gupta, CMO of ContentScale"
      }
    ],
    companies: ["CloudFirst", "ContentScale", "AutoFlow", "DataSync", "SmartOps"],
    stats: categoryStats['ai-automation']
  },
  'platform-engineering': {
    title: "Scalable Platform Engineering",
    heroImage: WebSolutionsImg,
    overview: "Web platforms and applications built for 10x growth without 10x complexity. Performance, security, and scale are architecture decisions — not afterthoughts.",
    whyChooseUs: [
      "99.9% uptime with enterprise-grade infrastructure",
      "Sub-2-second load times as standard",
      "Modular architecture for rapid iteration",
      "Built-in security and compliance from day one"
    ],
    process: [
      {
        title: "Requirements Architecture",
        description: "Define technical requirements, scale projections, and integration needs."
      },
      {
        title: "System Design",
        description: "Architect modular, API-first platforms with clear scalability paths."
      },
      {
        title: "Development",
        description: "Build with modern frameworks, automated testing, and CI/CD pipelines."
      },
      {
        title: "Deployment & Monitoring",
        description: "Launch with comprehensive monitoring, alerting, and performance optimization."
      }
    ],
    testimonials: [
      {
        quote: "They rebuilt our platform to handle 50x traffic. We haven't had a single outage since.",
        author: "Suresh Kumar, CTO of TechCommerce"
      },
      {
        quote: "Development velocity increased 4x after they implemented their modular architecture.",
        author: "Deepika Rao, VP Engineering at BuildFast"
      }
    ],
    companies: ["TechCommerce", "BuildFast", "ScalePlatform", "CloudArch", "DevFlow"],
    stats: categoryStats['platform-engineering']
  },
  'brand-systems': {
    title: "Brand Systems Integration",
    heroImage: GraphicSolutionsImg,
    overview: "Unified brand infrastructure that ensures consistency across every digital touchpoint. Not just guidelines in a PDF — but systems that enforce brand integrity automatically.",
    whyChooseUs: [
      "Automated brand consistency across all channels",
      "Design systems that accelerate development",
      "Multi-channel content distribution infrastructure",
      "Measurable brand recognition improvements"
    ],
    process: [
      {
        title: "Brand Audit",
        description: "Analyze current brand touchpoints, identify inconsistencies, and map integration opportunities."
      },
      {
        title: "System Architecture",
        description: "Design unified brand infrastructure with automated enforcement mechanisms."
      },
      {
        title: "Component Development",
        description: "Build reusable design systems, templates, and automated workflows."
      },
      {
        title: "Rollout & Training",
        description: "Deploy across all channels and train teams on maintaining brand integrity."
      }
    ],
    testimonials: [
      {
        quote: "Brand consistency went from 60% to 100% across 40 touchpoints. Recognition doubled.",
        author: "Meera Krishnan, Brand Director at UnifyBrand"
      },
      {
        quote: "Their design system cut our development time in half while improving quality.",
        author: "Arjun Singh, Head of Product at DesignOps"
      }
    ],
    companies: ["UnifyBrand", "DesignOps", "ConsistentCo", "BrandScale", "VisualFirst"],
    stats: categoryStats['brand-systems']
  },
  'ecommerce-infrastructure': {
    title: "E-Commerce Growth Infrastructure",
    heroImage: AppSolutionsImg,
    overview: "Revenue-focused commerce systems designed to scale profitably. We build the infrastructure that turns browsers into buyers and buyers into repeat customers.",
    whyChooseUs: [
      "Conversion-optimized checkout and UX",
      "Inventory and fulfillment automation",
      "Personalization engines that increase AOV",
      "Revenue recovery systems for abandoned carts"
    ],
    process: [
      {
        title: "Commerce Audit",
        description: "Analyze current conversion funnel, identify revenue leaks, and map optimization opportunities."
      },
      {
        title: "Architecture Design",
        description: "Design scalable commerce infrastructure with integrated inventory, fulfillment, and CRM."
      },
      {
        title: "Platform Development",
        description: "Build high-performance storefront with conversion optimization built into every component."
      },
      {
        title: "Launch & Optimize",
        description: "Deploy with A/B testing infrastructure and continuous conversion optimization."
      }
    ],
    testimonials: [
      {
        quote: "Conversion rate jumped 150% in the first 90 days. Best investment we've made.",
        author: "Kavita Malhotra, CEO of ShopScale"
      },
      {
        quote: "They recovered ₹2Cr in abandoned cart revenue in the first quarter alone.",
        author: "Rohit Verma, Head of E-commerce at RetailGrowth"
      }
    ],
    companies: ["ShopScale", "RetailGrowth", "CartPro", "CommerceFirst", "SellSmart"],
    stats: categoryStats['ecommerce-infrastructure']
  }
};

// How we work steps - Systems approach
export const howWeWork = [
  {
    step: 1,
    title: "Discovery & Audit",
    description: "We map your entire digital ecosystem, identify bottlenecks, and quantify the efficiency gaps costing you growth."
  },
  {
    step: 2,
    title: "System Blueprinting",
    description: "We architect unified infrastructure connecting all your operations with clear data flows and automation touchpoints."
  },
  {
    step: 3,
    title: "Implementation & Integration",
    description: "We deploy modular components that integrate seamlessly with your existing stack — no rip-and-replace disruption."
  },
  {
    step: 4,
    title: "Measurement & Optimization",
    description: "We track revenue impact, efficiency gains, and continuously optimize with AI-driven recommendations."
  }
];

// Category descriptions for main page - Systems focused
export const getCategoryDescription = (category) => {
  switch(category) {
    case 'digital-growth-systems':
      return "At Godigitify, we don't build campaigns or one-off projects — we architect complete digital growth systems that connect your strategy, technology, and data into a unified machine built for scale. Every component is designed for 10x growth capacity without 10x complexity.";
    case 'ai-automation':
      return "At Godigitify, we deploy AI and automation where it actually matters — not as buzzwords, but as infrastructure that eliminates manual bottlenecks and creates 24/7 operational capacity. The result: your team focuses on strategy while systems handle execution.";
    case 'platform-engineering':
      return "At Godigitify, we build web platforms and applications architected for growth from day one. Performance, security, and scale aren't afterthoughts — they're architecture decisions baked into every component. Build once, scale infinitely.";
    case 'brand-systems':
      return "At Godigitify, we create brand systems that enforce consistency automatically — not guidelines that live in a PDF. Unified infrastructure ensures every touchpoint delivers the same experience, accelerating development while maintaining brand integrity.";
    case 'ecommerce-infrastructure':
      return "At Godigitify, we build commerce infrastructure designed around one metric: profitable growth. From conversion-optimized checkout to inventory automation to revenue recovery systems, every component is engineered to turn browsers into buyers and buyers into repeat customers.";
    default:
      return "";
  }
};