import { Suspense, lazy, useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import Terminal from "./Terminal";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSmoothScroll } from "./fx/motion";

const Starfield = lazy(() => import("./fx/Starfield"));

const logo = `${import.meta.env.BASE_URL}img/Black Simple Personal Logo.png`;

function Layout() {
  useEffect(() => initSmoothScroll(), []);

  // lazy images and content-visibility change the page height after load;
  // re-measure scroll triggers so the scroll scenes line up on every screen size
  useEffect(() => {
    let t = 0;
    let lastH = document.body.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastH) < 40) return;
      lastH = h;
      clearTimeout(t);
      t = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    ro.observe(document.body);
    return () => { ro.disconnect(); clearTimeout(t); };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <Starfield logoSrc={logo} />
      </Suspense>
      <Header />
      <Home />
      <Footer />
      <Terminal />
    </>
  );
}

export default Layout;
