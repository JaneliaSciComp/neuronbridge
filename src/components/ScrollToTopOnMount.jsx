import { useEffect } from "react";

function ScrollToTopOnMount() {
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default ScrollToTopOnMount;
