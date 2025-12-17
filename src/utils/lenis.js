import Lenis from "@studio-freight/lenis";

let lenis;

export const initLenis = () => {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.2,
    smooth: true,
    smoothTouch: false,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // expose globally (so Hero, Navbar can use it)
  window.lenis = lenis;

  return lenis;
};

export const scrollTo = (target, options = {}) => {
  if (!lenis) return;
  lenis.scrollTo(target, {
    offset: -80,
    duration: 1.5,
    ...options,
  });
};
