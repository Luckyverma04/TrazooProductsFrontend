import { useEffect } from "react";
import { setMetaTags } from "../utils/seo";

export const useSEO = (pageData) => {
  useEffect(() => {
    setMetaTags(pageData);
    window.scrollTo(0, 0);
  }, [pageData]);
};