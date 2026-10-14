import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis = null;
export function getLenis() {
  return lenis;
}

export function initSmoothScroll() {
  if (prefersReduced()) return () => {};
  lenis = new Lenis({ lerp: 0.12, smoothWheel: true, wheelMultiplier: 1 });
  lenis.on("scroll", ScrollTrigger.update);
  const raf = (t) => lenis.raf(t * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // in-page anchors go through Lenis so they glide instead of jumping
  const onClick = (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    lenis.scrollTo(el, { offset: -20 });
  };
  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    gsap.ticker.remove(raf);
    lenis.destroy();
    lenis = null;
  };
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -20 });
  else el.scrollIntoView();
}

// Section headings and copy rise in once, as each block reaches the reading line.
export function initReveals(root) {
  if (prefersReduced()) return () => {};
  const ctx = gsap.context(() => {
    gsap.utils.toArray("[data-reveal]", root).forEach((el) => {
      gsap.from(el, {
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    ScrollTrigger.batch(".project_card", {
      start: "top 90%",
      once: true,
      onEnter: (els) =>
        gsap.from(els, {
          y: 60,
          opacity: 0,

          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
        }),
    });

    gsap.from(".contact_card", {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: { trigger: ".footer_left", start: "top 85%", once: true },
    });
  }, root);
  return () => ctx.revert();
}

// Cards lean toward the pointer; a light sheen follows it.
export function initTilt(root) {
  if (prefersReduced() || !window.matchMedia("(hover: hover)").matches) return () => {};
  const onMove = (e) => {
    const card = e.target.closest(".project_link");
    if (!card || !root.contains(card)) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, { rotateY: x * 10, rotateX: -y * 10, duration: 0.5, ease: "power3.out", transformPerspective: 900 });
    card.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const onLeave = (e) => {
    const card = e.target.closest?.(".project_link");
    if (card && !card.contains(e.relatedTarget)) {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
    }
  };
  root.addEventListener("pointermove", onMove);
  root.addEventListener("pointerout", onLeave);
  return () => {
    root.removeEventListener("pointermove", onMove);
    root.removeEventListener("pointerout", onLeave);
  };
}

// Buttons drift a few pixels toward the cursor.
export function initMagnetic(root) {
  if (prefersReduced() || !window.matchMedia("(hover: hover)").matches) return () => {};
  const els = root.querySelectorAll("[data-magnetic]");
  const handlers = [];
  els.forEach((el) => {
    const move = (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width / 2)) * 0.25,
        y: (e.clientY - (r.top + r.height / 2)) * 0.35,
        duration: 0.4,
        ease: "power3.out",
      });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    handlers.push([el, move, leave]);
  });
  return () =>
    handlers.forEach(([el, m, l]) => {
      el.removeEventListener("pointermove", m);
      el.removeEventListener("pointerleave", l);
    });
}
