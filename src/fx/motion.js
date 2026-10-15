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

// Section headings, project cards and contact cards rise in once, as each reaches the viewport.
// IntersectionObserver instead of ScrollTrigger: page height keeps changing (lazy images,
// content-visibility), and stale trigger positions near the bottom could never be reached.
export function initReveals(root) {
  if (prefersReduced()) return () => {};
  const groups = [
    { els: gsap.utils.toArray("[data-reveal]", root), from: { y: 36, duration: 0.9 } },
    { els: gsap.utils.toArray(".project_card", root), from: { y: 60, duration: 1 } },
    // the footer sits outside <main>, so target it by element rather than scoped selector
    { els: gsap.utils.toArray(".contact_card"), from: { y: 40, duration: 0.9 } },
  ];
  const settings = new Map();
  groups.forEach((g) => g.els.forEach((el) => { settings.set(el, g.from); gsap.set(el, { opacity: 0, y: g.from.y }); }));

  let queue = [];
  let scheduled = false;
  const flush = () => {
    scheduled = false;
    queue.forEach((el, i) => {
      gsap.to(el, { opacity: 1, y: 0, duration: settings.get(el).duration, ease: "expo.out", delay: i * 0.08, clearProps: "transform,opacity" });
    });
    queue = [];
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        queue.push(e.target);
      });
      if (queue.length && !scheduled) { scheduled = true; requestAnimationFrame(flush); }
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  settings.forEach((_, el) => io.observe(el));
  return () => {
    io.disconnect();
    settings.forEach((_, el) => gsap.set(el, { clearProps: "transform,opacity" }));
  };
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
