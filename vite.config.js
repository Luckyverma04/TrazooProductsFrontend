import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://trazooglobal.com";

const SEO_PAGES = {
  "/": {
    title: "Corporate Gifting & Custom Gifts in India | Trazoo Global",
    description:
      "Trazoo Global provides corporate gifting, custom merchandise, employee gifts, client gifts and branded gift kits across India.",
  },

  "/products": {
    title: "Corporate Gifting Products & Custom Merchandise | Trazoo",
    description:
      "Explore Trazoo's corporate gifting products including branded apparel, drinkware, bags, stationery, tech accessories, hampers and custom kits across India.",
  },

  "/faq": {
    title: "Corporate Gifting FAQs | Trazoo Global",
    description:
      "Find answers to common questions about Trazoo Global's corporate gifting, custom merchandise, branding, packaging and fulfilment services.",
  },

  "/privacy": {
    title: "Privacy Policy | Trazoo Global",
    description:
      "Read Trazoo Global's privacy policy to understand how we collect, use and protect information when you use our website and services.",
  },

  "/terms": {
    title: "Terms & Conditions | Trazoo Global",
    description:
      "Read the terms and conditions governing the use of the Trazoo Global website and its corporate gifting and merchandise services.",
  },
};

function generateSeoPages() {
  return {
    name: "generate-seo-pages",

    apply: "build",

    closeBundle() {
      const distPath = path.resolve("dist");
      const sourceHtml = fs.readFileSync(
        path.join(distPath, "index.html"),
        "utf-8"
      );

      for (const [route, seo] of Object.entries(SEO_PAGES)) {
        if (route === "/") continue;

        const url = `${SITE_URL}${route}`;

        let html = sourceHtml;

        // Title
        html = html.replace(
          /<title>[\s\S]*?<\/title>/i,
          `<title>${seo.title}</title>`
        );

        // Meta description
        html = html.replace(
          /<meta\s+name=["']description["'][\s\S]*?>/i,
          `<meta name="description" content="${seo.description}" />`
        );

        // Canonical
        html = html.replace(
          /<link\s+rel=["']canonical["'][\s\S]*?>/i,
          `<link rel="canonical" href="${url}" />`
        );

        // Open Graph
        html = html.replace(
          /<meta\s+property=["']og:title["'][\s\S]*?>/i,
          `<meta property="og:title" content="${seo.title}" />`
        );

        html = html.replace(
          /<meta\s+property=["']og:description["'][\s\S]*?>/i,
          `<meta property="og:description" content="${seo.description}" />`
        );

        html = html.replace(
          /<meta\s+property=["']og:url["'][\s\S]*?>/i,
          `<meta property="og:url" content="${url}" />`
        );

        // Twitter
        html = html.replace(
          /<meta\s+name=["']twitter:title["'][\s\S]*?>/i,
          `<meta name="twitter:title" content="${seo.title}" />`
        );

        html = html.replace(
          /<meta\s+name=["']twitter:description["'][\s\S]*?>/i,
          `<meta name="twitter:description" content="${seo.description}" />`
        );

        // Create /products/index.html etc.
        const routePath = path.join(distPath, route);

        fs.mkdirSync(routePath, { recursive: true });

        fs.writeFileSync(
          path.join(routePath, "index.html"),
          html,
          "utf-8"
        );
      }

      console.log("✅ SEO HTML pages generated:");
      console.log("   /products");
      console.log("   /faq");
      console.log("   /privacy");
      console.log("   /terms");
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    generateSeoPages(),
  ],
});