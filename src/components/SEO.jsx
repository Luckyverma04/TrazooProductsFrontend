import { useEffect } from "react";

const SITE_URL = "https://trazooglobal.com";
const DEFAULT_IMAGE = `${SITE_URL}/preview-v2.png`;

const INDEX_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

const FOLLOW_ROBOTS = "index, follow";
const NOINDEX_ROBOTS = "noindex, nofollow";

const normalizePath = (path) =>
  path === "/" ? "/" : path.replace(/\/+$/, "");

const SEO = ({
  title,
  description,
  path = "/",
  noindex = false,
}) => {
  useEffect(() => {
    const normalizedPath = normalizePath(path);

    const url =
      normalizedPath === "/"
        ? SITE_URL
        : `${SITE_URL}${normalizedPath}`;

    document.title = title;

    const setMeta = (selector, attribute, value) => {
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }

      element.setAttribute("content", value);
    };

    setMeta("meta[name=\"description\"]", "name", description);

    setMeta(
      "meta[name=\"robots\"]",
      "name",
      noindex ? NOINDEX_ROBOTS : INDEX_ROBOTS
    );

    setMeta(
      "meta[name=\"googlebot\"]",
      "name",
      noindex ? NOINDEX_ROBOTS : FOLLOW_ROBOTS
    );

    setMeta("meta[property=\"og:title\"]", "property", title);
    setMeta("meta[property=\"og:description\"]", "property", description);
    setMeta("meta[property=\"og:type\"]", "property", "website");
    setMeta("meta[property=\"og:url\"]", "property", url);
    setMeta("meta[property=\"og:image\"]", "property", DEFAULT_IMAGE);

    setMeta("meta[name=\"twitter:card\"]", "name", "summary_large_image");
    setMeta("meta[name=\"twitter:title\"]", "name", title);
    setMeta("meta[name=\"twitter:description\"]", "name", description);
    setMeta("meta[name=\"twitter:image\"]", "name", DEFAULT_IMAGE);

    let canonical = document.head.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", url);
  }, [title, description, path, noindex]);

  return null;
};

export default SEO;