// SEO metadata for all public pages
export const seoMetadata = {
  home: {
    title: "Trazoo Global | Corporate Gifting, Custom Merchandise & Pan-India Fulfilment",
    description: "End-to-end corporate gifting, custom merchandise, event and festive gifting for enterprises and institutions. Trazoo handles sourcing, branding, packaging, Pan-India fulfilment and shipment visibility through one team.",
    canonical: "https://trazooglobal.com/",
    ogImage: "https://trazooglobal.com/preview-v2.png",
  },

  products: {
    title: "Products | Trazoo Global | Corporate Gifting & Merchandise",
    description: "Browse our range of customizable corporate gifts, merchandise, and branded products for employee gifting, client appreciation, and events.",
    canonical: "https://trazooglobal.com/products",
    ogImage: "https://trazooglobal.com/preview-v2.png",
  },

  solutions: {
    title: "Solutions | Trazoo Global | Corporate Gifting for Every Occasion",
    description: "Explore our corporate gifting solutions for employee joining, festivals, corporate events, client gifting, recognition programs, and institutional gifting.",
    canonical: "https://trazooglobal.com/solutions",
    ogImage: "https://trazooglobal.com/preview-v2.png",
  },

  customisation: {
    title: "Customisation | Trazoo Global | Brand Your Gifts",
    description: "Customize your corporate gifts with logo printing, embroidery, engraving, and personalized packaging. Quality-checked branding for your brand.",
    canonical: "https://trazooglobal.com/customisation",
    ogImage: "https://trazooglobal.com/preview-v2.png",
  },

  fulfilment: {
    title: "Fulfilment & Logistics | Trazoo Global | Pan-India Delivery",
    description: "Pan-India fulfilment, packaging, and shipment logistics. Real-time tracking, quality checks, and reliable delivery for corporate gifting orders.",
    canonical: "https://trazooglobal.com/fulfilment",
    ogImage: "https://trazooglobal.com/preview-v2.png",
  },

  ourWork: {
    title: "Our Work | Trazoo Global | Case Studies & Success Stories",
    description: "See how Trazoo Global has delivered corporate gifting solutions for leading enterprises, institutions, and brands across India.",
    canonical: "https://trazooglobal.com/our-work",
    ogImage: "https://trazooglobal.com/preview-v2.png",
  },

  requirements: {
    title: "Share Your Requirement | Trazoo Global",
    description: "Tell us your corporate gifting needs. Get personalized solutions, quotes, and recommendations from our gifting experts.",
    canonical: "https://trazooglobal.com/requirements",
    ogImage: "https://trazooglobal.com/preview-v2.png",
  },
};

// Function to set dynamic meta tags
export const setMetaTags = (pageData) => {
  // Title
  document.title = pageData.title;

  // Meta Description
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement("meta");
    descTag.setAttribute("name", "description");
    document.head.appendChild(descTag);
  }
  descTag.setAttribute("content", pageData.description);

  // Canonical URL
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement("link");
    canonicalTag.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute("href", pageData.canonical);

  // Open Graph Title
  let ogTitleTag = document.querySelector('meta[property="og:title"]');
  if (!ogTitleTag) {
    ogTitleTag = document.createElement("meta");
    ogTitleTag.setAttribute("property", "og:title");
    document.head.appendChild(ogTitleTag);
  }
  ogTitleTag.setAttribute("content", pageData.title);

  // Open Graph Description
  let ogDescTag = document.querySelector('meta[property="og:description"]');
  if (!ogDescTag) {
    ogDescTag = document.createElement("meta");
    ogDescTag.setAttribute("property", "og:description");
    document.head.appendChild(ogDescTag);
  }
  ogDescTag.setAttribute("content", pageData.description);

  // Open Graph URL
  let ogUrlTag = document.querySelector('meta[property="og:url"]');
  if (!ogUrlTag) {
    ogUrlTag = document.createElement("meta");
    ogUrlTag.setAttribute("property", "og:url");
    document.head.appendChild(ogUrlTag);
  }
  ogUrlTag.setAttribute("content", pageData.canonical);

  // Open Graph Image
  let ogImageTag = document.querySelector('meta[property="og:image"]');
  if (!ogImageTag) {
    ogImageTag = document.createElement("meta");
    ogImageTag.setAttribute("property", "og:image");
    document.head.appendChild(ogImageTag);
  }
  ogImageTag.setAttribute("content", pageData.ogImage);

  // Twitter Title
  let twitterTitleTag = document.querySelector('meta[name="twitter:title"]');
  if (!twitterTitleTag) {
    twitterTitleTag = document.createElement("meta");
    twitterTitleTag.setAttribute("name", "twitter:title");
    document.head.appendChild(twitterTitleTag);
  }
  twitterTitleTag.setAttribute("content", pageData.title);

  // Twitter Description
  let twitterDescTag = document.querySelector('meta[name="twitter:description"]');
  if (!twitterDescTag) {
    twitterDescTag = document.createElement("meta");
    twitterDescTag.setAttribute("name", "twitter:description");
    document.head.appendChild(twitterDescTag);
  }
  twitterDescTag.setAttribute("content", pageData.description);

  // Twitter Image
  let twitterImageTag = document.querySelector('meta[name="twitter:image"]');
  if (!twitterImageTag) {
    twitterImageTag = document.createElement("meta");
    twitterImageTag.setAttribute("name", "twitter:image");
    document.head.appendChild(twitterImageTag);
  }
  twitterImageTag.setAttribute("content", pageData.ogImage);
};