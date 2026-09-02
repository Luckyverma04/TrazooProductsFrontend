export const navLinks = [
  {
    name: "Why Us",
    path: "/#why",
    ready: true,
  },
  {
    name: "About Us",
    path: "/#about",
    ready: true,
  },
  {
    name: "How We Work",
    path: "/#process",
    ready: true,
  },
  {
    name: "Product",
    path: "/products",
    ready: true,
  },

  {
    name: "Dashboard",
    path: "/admin/dashboard",
    ready: true,
    requiresAuth: true,
    adminOnly: true,
  },
];

export const footerColumns = [
  {
    title: "Company",
    links: [
      {
        name: "Home",
        path: "/",
        ready: true,
      },
      {
        name: "Why Us",
        path: "/#why",
        ready: true,
      },
      {
        name: "About Us",
        path: "/#about",
        ready: true,
      },
      {
        name: "How We Work",
        path: "/#process",
        ready: true,
      },
      {
        name: "Product",
        path: "/products",
        ready: true,
      },
      {
        name: "FAQ",
        path: "/faq",
        ready: true,
      },
    ],
  },

  {
    title: "Legal",
    links: [
      {
        name: "Terms of Service",
        path: "/terms",
        ready: true,
      },
      {
        name: "Privacy Policy",
        path: "/privacy",
        ready: true,
      },
    ],
  },

  {
    title: "Support",
    links: [
      {
        name: "Contact Us",
        hash: "#footer",
        ready: true,
      },
      {
        name: "Help & Support",
        path: "/faq",
        ready: true,
      },
    ],
  },
];

export const mobileNavLinks = [
  {
    label: "Why Us",
    href: "/#why",
  },
  {
    label: "About Us",
    href: "/#about",
  },
  {
    label: "How We Work",
    href: "/#process",
  },
  {
    label: "Product",
    href: "/products",
  },
];

export const scrollAnchors = [
  {
    label: "Why Us",
    id: "why",
  },
  {
    label: "About Us",
    id: "about",
  },
  {
    label: "How We Work",
    id: "process",
  },
];