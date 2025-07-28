import axios from 'axios';

// Base API URL - replace with environment variable in production
const API_BASE_URL = 'http://localhost:5000/api/services';

// Fetch all categories
export const fetchAllCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Fetch single category by slug
export const fetchCategoryBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    return null;
  }
};

// Legacy data for fallback and compatibility
export const categoryStats = {
  branding: [
    { value: '250+', label: 'Brands Transformed' },
    { value: '85%', label: 'Increase in Recognition' },
    { value: '67%', label: 'Faster Conversions' },
    { value: '145+', label: 'Industries Served' }
  ],
  marketing: [
    { value: '320+', label: 'Campaigns Managed' },
    { value: '150%', label: 'Average ROI' },
    { value: '65+', label: 'Million Impressions' },
    { value: '42%', label: 'Conversion Increase' }
  ],
  web: [
    { value: '500+', label: 'Websites Built' },
    { value: '40%', label: 'Faster Load Times' },
    { value: '80%', label: 'Mobile Optimization' },
    { value: '25%', label: 'Bounce Rate Reduction' }
  ],
  app: [
    { value: '120+', label: 'Apps Developed' },
    { value: '4.8', label: 'Average App Rating' },
    { value: '95%', label: 'User Satisfaction' },
    { value: '60%', label: 'Faster Development' }
  ],
  graphic: [
    { value: '1500+', label: 'Designs Created' },
    { value: '35', label: 'Design Awards' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Global Brands' }
  ]
};

// Fallback service offerings if not provided by API
export const serviceOfferings = {
  branding: [
    { id: 'brand-strategy', title: 'Brand Strategy', description: 'Discover your brand\'s unique voice, values, and position in the market.' },
    { id: 'brand-identity', title: 'Brand Identity', description: 'Create a comprehensive visual system that resonates with your target audience.' },
    { id: 'brand-guidelines', title: 'Brand Guidelines', description: 'Document your brand standards to ensure consistency across all touchpoints.' },
    { id: 'brand-messaging', title: 'Brand Messaging', description: 'Craft compelling narratives that communicate your brand\'s value proposition.' }
  ],
  marketing: [
    { id: 'digital-marketing', title: 'Digital Marketing', description: 'Comprehensive online marketing strategies to reach your audience where they are.' },
    { id: 'content-marketing', title: 'Content Marketing', description: 'Create valuable content that attracts, engages, and converts your target audience.' },
    { id: 'social-media', title: 'Social Media Marketing', description: 'Build brand awareness and engagement through strategic social media presence.' },
    { id: 'email-marketing', title: 'Email Marketing', description: 'Nurture leads and customers with personalized email communication.' }
  ],
  web: [
    { id: 'web-design', title: 'Website Design', description: 'Create beautiful, functional websites that provide exceptional user experiences.' },
    { id: 'ecommerce', title: 'E-commerce Solutions', description: 'Build online stores that drive sales and streamline operations.' },
    { id: 'web-optimization', title: 'Website Optimization', description: 'Improve performance, SEO, and conversion rates of existing websites.' },
    { id: 'cms-development', title: 'CMS Development', description: 'Custom content management systems that make website updates easy.' }
  ],
  app: [
    { id: 'ios-development', title: 'iOS App Development', description: 'Native iOS applications built for performance and user experience.' },
    { id: 'android-development', title: 'Android App Development', description: 'Custom Android apps designed to reach the widest mobile audience.' },
    { id: 'cross-platform', title: 'Cross-Platform Apps', description: 'Efficient development for both iOS and Android from a single codebase.' },
    { id: 'app-maintenance', title: 'App Maintenance', description: 'Ongoing support, updates, and optimization for existing mobile applications.' }
  ],
  graphic: [
    { id: 'ui-design', title: 'UI/UX Design', description: 'User-centered design that creates intuitive, enjoyable digital experiences.' },
    { id: 'print-design', title: 'Print Design', description: 'Impactful physical marketing materials from business cards to billboards.' },
    { id: 'packaging', title: 'Packaging Design', description: 'Product packaging that stands out on shelves and reinforces brand identity.' },
    { id: 'illustration', title: 'Illustration', description: 'Custom artwork that brings your brand\'s concepts and stories to life.' }
  ]
};

// Fallback descriptions if not provided by API
export const getCategoryDescription = (categorySlug) => {
  const descriptions = {
    branding: "Your brand is more than just a logo—it's the emotional connection you build with your audience. Our branding solutions create cohesive, memorable brand identities that resonate with your target market and drive business growth.",
    marketing: "In today's digital world, effective marketing requires a strategic approach across multiple channels. Our data-driven marketing solutions help you reach your audience with the right message at the right time, maximizing your ROI.",
    web: "Your website is often the first impression potential customers have of your business. Our web solutions combine stunning design with technical excellence to create high-performance websites that convert visitors into customers.",
    app: "Mobile experiences are essential for businesses looking to engage users on the go. Our app solutions deliver intuitive, feature-rich applications that provide value to users while achieving your business objectives.",
    graphic: "Visual communication is a powerful tool for conveying your brand's message. Our graphic solutions translate your brand's personality into compelling visual assets that capture attention and communicate effectively."
  };
  
  return descriptions[categorySlug] || "";
};

// Helper function to map API data to the format expected by the UI
export const mapApiToUiFormat = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];
  
  return apiData.map(category => ({
    slug: category.slug,
    name: category.name,
    shortDesc: category.shortDesc,
    icon: category.icon || category.slug.charAt(0).toUpperCase(),
    color: category.color || '#47216b',
    heroImage: category.heroImage
  }));
};
