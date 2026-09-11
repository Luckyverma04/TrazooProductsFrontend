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
    h1: "We run the gifting. You take the credit.",
  },

  "/products": {
    title: "Corporate Gifting Products & Custom Merchandise | Trazoo",
    description:
      "Explore Trazoo's corporate gifting products including branded apparel, drinkware, bags, stationery, tech accessories, hampers and custom kits across India.",
    h1: "Corporate Gifting Products & Custom Merchandise",
  },

  "/faq": {
    title: "Corporate Gifting FAQs | Trazoo Global",
    description:
      "Find answers to common questions about Trazoo Global's corporate gifting, custom merchandise, branding, packaging and fulfilment services.",
    h1: "Corporate gifting, answered.",
  },

  "/privacy": {
    title: "Privacy Policy | Trazoo Global",
    description:
      "Read Trazoo Global's privacy policy to understand how we collect, use and protect information when you use our website and services.",
    h1: "Privacy Policy",
  },

  "/terms": {
    title: "Terms & Conditions | Trazoo Global",
    description:
      "Read the terms and conditions governing the use of the Trazoo Global website and its corporate gifting and merchandise services.",
    h1: "Terms & Conditions",
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
        const url =
          route === "/" ? SITE_URL : `${SITE_URL}${route}`;

        let html = sourceHtml;

        // =========================
        // PAGE TITLE
        // =========================
        html = html.replace(
          /<title>[\s\S]*?<\/title>/i,
          `<title>${seo.title}</title>`
        );

        // =========================
        // META DESCRIPTION
        // =========================
        html = html.replace(
          /<meta\s+name=["']description["'][\s\S]*?>/i,
          `<meta name="description" content="${seo.description}" />`
        );

        // =========================
        // CANONICAL
        // =========================
        html = html.replace(
          /<link\s+rel=["']canonical["'][\s\S]*?>/i,
          `<link rel="canonical" href="${url}" />`
        );

        // =========================
        // OPEN GRAPH
        // =========================
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

        // =========================
        // TWITTER
        // =========================
        html = html.replace(
          /<meta\s+name=["']twitter:title["'][\s\S]*?>/i,
          `<meta name="twitter:title" content="${seo.title}" />`
        );

        html = html.replace(
          /<meta\s+name=["']twitter:description["'][\s\S]*?>/i,
          `<meta name="twitter:description" content="${seo.description}" />`
        );

        // =========================
        // STATIC H1
        // =========================
        html = html.replace(
          /<div id=["']root["']><\/div>/i,
          `<div id="root"><h1>${seo.h1}</h1></div>`
        );

        // =========================
        // HOME PAGE
        // =========================
        if (route === "/") {
          fs.writeFileSync(
            path.join(distPath, "index.html"),
            html,
            "utf-8"
          );

          continue;
        }

        // =========================
        // ROUTE-SPECIFIC HTML FILE
        //
        // /products  -> products.html
        // /faq       -> faq.html
        // /privacy   -> privacy.html
        // /terms     -> terms.html
        // =========================
        const routeFile = path.join(
          distPath,
          `${route.replace("/", "")}.html`
        );

        fs.writeFileSync(
          routeFile,
          html,
          "utf-8"
        );
      }

      console.log("✅ SEO HTML pages generated:");
      console.log("   /");
      console.log("   /products → products.html");
      console.log("   /faq → faq.html");
      console.log("   /privacy → privacy.html");
      console.log("   /terms → terms.html");
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    generateSeoPages(),
  ],
});