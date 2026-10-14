import { Suspense, lazy, useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import Terminal from "./Terminal";
import { initSmoothScroll } from "./fx/motion";

const Starfield = lazy(() => import("./fx/Starfield"));

const logo = `${import.meta.env.BASE_URL}img/Black Simple Personal Logo.png`;

function Layout() {
  useEffect(() => initSmoothScroll(), []);

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
