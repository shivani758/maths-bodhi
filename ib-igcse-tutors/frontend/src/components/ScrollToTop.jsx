import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function ScrollToTop() {
  const { pathname, search } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP" || typeof window === "undefined") {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [navigationType, pathname, search]);

  return null;
}

export default ScrollToTop;
