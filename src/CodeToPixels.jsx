import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReduced } from "./fx/motion";

gsap.registerPlugin(ScrollTrigger);

const base = import.meta.env.BASE_URL;

// Each line may name the preview step it produces.
const swift = [
  ["struct ProfileView: View {"],
  ["    var body: some View {"],
  ["        VStack(spacing: 16) {"],
  ['            Image("memoji").clipShape(Circle())', 1],
  ['            Text("Rovshan Rzayev").font(.title2.bold())', 2],
  ['            Text("iOS Software Engineer")', 3],
  ["                .foregroundStyle(.secondary)", 3],
  ['            HStack { Tag("SwiftUI"); Tag("UIKit"); Tag("Combine") }', 4],
  ['            Button("Hire me") { open(.mail) }', 5],
  ["                .buttonStyle(.borderedProminent)", 5],
  ["        }"],
  ["    }"],
  ["}"],
];

const jsx = [
  ["export function ProjectCard({ project }) {"],
  ["  return ("],
  ['    <article className="card">'],
  ['      <img src={project.cover} alt="" />', 1],
  ["      <h3>{project.name}</h3>", 2],
  ['      <p>{project.stack.join(" · ")}</p>', 3],
  ["      <a href={project.url}>Open live site</a>", 4],
  ["    </article>"],
  ["  );"],
  ["}"],
];

function highlight(line) {
  // order matters: strings first so keywords inside them stay plain
  const parts = [];
  const re = /("[^"]*")|(\.[a-zA-Z]+)|(\b[A-Z][A-Za-z]+\b)|(<\/?[a-z0-9]+)|(\b(?:struct|var|some|func|let|export|function|return|const)\b)/g;
  let last = 0;
  let m;
  while ((m = re.exec(line))) {
    if (m.index > last) parts.push([null, line.slice(last, m.index)]);
    const cls = m[1] ? "s" : m[2] ? "m" : m[3] ? "t" : m[4] ? "tag" : "k";
    parts.push([cls, m[0]]);
    last = m.index + m[0].length;
  }
  if (last < line.length) parts.push([null, line.slice(last)]);
  return parts.map(([cls, text], i) => (cls ? <span key={i} className={`tk-${cls}`}>{text}</span> : text));
}

function Code({ lines, id }) {
  return (
    <pre className="code" aria-label={`${id} source`}>
      <code>
        {lines.map(([text, step], i) => (
          <span className="code_line" data-step={step || 0} key={i}>
            <span className="code_no" aria-hidden="true">{i + 1}</span>
            <span className="code_text">{highlight(text)}</span>
          </span>
        ))}
      </code>
    </pre>
  );
}

export default function CodeToPixels() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 992px) and (prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el.querySelector(".build_stage"),
          start: "top 12%",
          end: "+=2600",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const web = self.progress > 0.52;
            el.querySelector(".build_tab--ios").classList.toggle("is-active", !web);
            el.querySelector(".build_tab--web").classList.toggle("is-active", web);
          },
        },
      });

      const play = (scope) => {
        const lines = el.querySelectorAll(`[data-scope="${scope}"] .code_line`);
        lines.forEach((line) => {
          tl.fromTo(line, { clipPath: "inset(0 100% 0 0)", opacity: 0.2 }, { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1 });
          const step = Number(line.dataset.step);
          if (step) {
            const target = el.querySelector(`[data-preview="${scope}"] [data-build="${step}"]`);
            if (target && !target.dataset.played) {
              target.dataset.played = "1";
              tl.fromTo(target, { opacity: 0, y: 18, scale: 0.92, filter: "blur(4px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "back.out(2)" }, "<0.2");
            }
          }
        });
      };

      tl.set(el.querySelector('[data-scope="web"]'), { autoAlpha: 0 });
      tl.set(el.querySelector('[data-preview="web"]'), { autoAlpha: 0 });
      play("ios");
      tl.to({}, { duration: 2 });
      tl.to(el.querySelectorAll('[data-scope="ios"], [data-preview="ios"]'), { autoAlpha: 0, y: -30, duration: 1.5 });
      tl.fromTo(el.querySelectorAll('[data-scope="web"], [data-preview="web"]'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.5 });
      play("web");
      tl.to({}, { duration: 2 });

      return () => el.querySelectorAll("[data-played]").forEach((n) => delete n.dataset.played);
    });

    if (prefersReduced()) el.classList.add("is-static");
    return () => mm.revert();
  }, []);

  return (
    <section className="build" id="build" ref={root}>
      <div className="container">
        <h3 data-reveal>From code to pixels</h3>
        <p className="build_intro" data-reveal>
          Same idea, two platforms. Scroll to watch a SwiftUI view and a React component render as they’re written.
        </p>
        <div className="build_stage">
          <div className="editor">
            <div className="editor_bar">
              <span className="dots" aria-hidden="true"><i /><i /><i /></span>
              <span className="build_tab build_tab--ios is-active">ProfileView.swift</span>
              <span className="build_tab build_tab--web">ProjectCard.jsx</span>
            </div>
            <div className="editor_body">
              <div className="code_scope" data-scope="ios"><Code lines={swift} id="SwiftUI" /></div>
              <div className="code_scope" data-scope="web"><Code lines={jsx} id="React" /></div>
            </div>
          </div>

          <div className="preview">
            <div className="phone" data-preview="ios" aria-label="SwiftUI preview">
              <div className="phone_island" aria-hidden="true" />
              <div className="phone_screen">
                <img data-build="1" className="pv_avatar" src={`${base}img/rovshan_logo.webp`} alt="" />
                <p data-build="2" className="pv_name">Rovshan Rzayev</p>
                <p data-build="3" className="pv_role">iOS Software Engineer</p>
                <ul data-build="4" className="pv_tags"><li>SwiftUI</li><li>UIKit</li><li>Combine</li></ul>
                <span data-build="5" className="pv_button">Hire me</span>
              </div>
            </div>

            <div className="browser" data-preview="web" aria-label="React preview">
              <div className="browser_bar">
                <span className="dots" aria-hidden="true"><i /><i /><i /></span>
                <span className="browser_url">rvd-dashboard.vercel.app</span>
              </div>
              <div className="browser_page">
                <article className="pv_card">
                  <img data-build="1" src={`${base}img/work/rvd.webp`} alt="" />
                  <h4 data-build="2">RVD Cabinet</h4>
                  <p data-build="3">React · TypeScript · Tailwind</p>
                  <a data-build="4" href="https://rvd-dashboard.vercel.app" tabIndex={-1}>Open live site</a>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
