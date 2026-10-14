import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import CodeToPixels from "./CodeToPixels";
import { initReveals, initTilt, initMagnetic, prefersReduced } from "./fx/motion";
import { contact, skills, projects } from "./data";

const base = import.meta.env.BASE_URL;

const filters = [
  { id: "all", label: "All" },
  { id: "ios", label: "iOS" },
  { id: "web", label: "Web" },
];

function ProjectCard({ project }) {
  const { name, type, note, image, href, center, contain } = project;
  const Tag = href ? "a" : "div";

  return (
    <li className="project_card">
      <Tag className="project_link" {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}>
        <div className={`project_img${image ? "" : " project_img--text"}${center ? " project_img--center" : ""}${contain ? " project_img--contain" : ""}`}>
          {image ? (
            <img src={image} alt={`${name} screens`} loading="lazy" />
          ) : (
            <p>{note}</p>
          )}
        </div>
        <span className={`project_type project_type--${type}`}>{type === "ios" ? "iOS" : "Web"}</span>
        <h4>{name}</h4>
      </Tag>
      {note && image && <p className="project_note">{note}</p>}
    </li>
  );
}

const heroCode = 'const rovshan = new Developer({ ios: "Swift", web: "React" });';

function HeroCode() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (prefersReduced()) {
      el.textContent = heroCode;
      return;
    }
    const state = { n: 0 };
    const tween = gsap.to(state, {
      n: heroCode.length,
      duration: 2.2,
      delay: 0.5,
      ease: "none",
      onUpdate: () => { el.textContent = heroCode.slice(0, Math.round(state.n)); },
    });
    return () => tween.kill();
  }, []);
  return (
    <p className="hero_code" aria-label={heroCode}>
      <span ref={ref} aria-hidden="true" />
      <span className="caret" aria-hidden="true" />
    </p>
  );
}

function Home() {
  const [filter, setFilter] = useState("all");
  const mainRef = useRef(null);

  useEffect(() => {
    const root = mainRef.current;
    const cleanups = [initReveals(root), initTilt(root), initMagnetic(root)];
    if (!prefersReduced()) {
      gsap.from(".banner_inner h1 .w", { yPercent: 110, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.06, delay: 0.2 });
      gsap.from(".banner_img, .banner_inner > .all_banner > p:not(.hero_code), .banner_actions, .scroll_hint", { opacity: 0, y: 20, duration: 1, ease: "expo.out", stagger: 0.1, delay: 0.1 });
    }
    return () => cleanups.forEach((c) => c());
  }, []);
  const shown = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <main ref={mainRef}>
      <div className="banner">
        <div className="container">
          <div className="banner_inner">
            <div className="all_banner">
              <div className="banner_img">
                <img src={`${base}img/rovshan_logo.webp`} alt="Rovshan Rzayev memoji" />
              </div>
              <p>
                Hi, I’m Rovshan Rzayev
                <img src={`${base}img/handshake.png`} width="20" height="20" alt="" />
              </p>
              <HeroCode />
              <h1 aria-label="Crafting seamless iOS & web experiences with code.">
                {["Crafting", "seamless"].map((w) => <span className="w_wrap" key={w} aria-hidden="true"><span className="w">{w}</span></span>)}
                <br />
                {["iOS", "&", "web", "experiences", "with", "code."].map((w) => <span className="w_wrap" key={w} aria-hidden="true"><span className="w">{w}</span></span>)}
              </h1>
              <div className="banner_actions">
                <a href={`mailto:${contact.email}`} data-magnetic>Contact me</a>
                <a href="#projects" className="ghost" data-magnetic>See my work</a>
              </div>
              <p className="scroll_hint" aria-hidden="true"><span />Scroll to warp</p>
            </div>
          </div>
        </div>
      </div>

      <section className="about" id="about">
        <div className="container">
          <div className="about_inner">
            <div className="about_content">
              <h3 data-reveal>About me</h3>
              <p data-reveal>
                I’m Rovshan Rzayev, an iOS Software Engineer and frontend developer from Baku. I build native iOS
                apps in Swift with SwiftUI and UIKit, and I spent three years before that building 50+ websites in
                React and JavaScript.
              </p>
              <p data-reveal>
                Most recently I worked at EPAM Systems on the MyGov app, helping move it to a modular architecture
                and a shared Design System. On my own I built Ru App Store, a live iOS storefront with its own
                backend. Web work taught me to sweat every pixel; iOS taught me to keep code clean and tested.
              </p>
              <div className="skills" data-reveal>
                <div>
                  <h5>iOS</h5>
                  <ul>{skills.ios.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
                <div>
                  <h5>Web</h5>
                  <ul>{skills.web.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              </div>
              <p className="resume">
                Resume: <a href={contact.cv} download>download the CV (PDF)</a>
              </p>
            </div>
            <div className="about_img">
              <img src={`${base}img/Black Simple Personal Logo.png`} alt="" />
            </div>
          </div>
        </div>
      </section>

      <CodeToPixels />

      <section className="projects" id="projects">
        <div className="container">
          <div className="projects_head">
            <h3 data-reveal>Projects</h3>
            <div className="filter" role="group" aria-label="Filter projects">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <ul className="project_inner">
            {shown.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Home;
