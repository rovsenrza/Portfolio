import { useState } from "react";
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

function Home() {
  const [filter, setFilter] = useState("all");
  const shown = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <main>
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
              <h1>
                Crafting seamless <br /> iOS & web experiences with code.
              </h1>
              <div className="banner_actions">
                <a href={`mailto:${contact.email}`}>Contact me</a>
                <a href="#projects" className="ghost">See my work</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="about" id="about">
        <div className="container">
          <div className="about_inner">
            <div className="about_content">
              <h3>About me</h3>
              <p>
                I’m Rovshan Rzayev, an iOS Software Engineer and frontend developer from Baku. I build native iOS
                apps in Swift with SwiftUI and UIKit, and I spent three years before that building 50+ websites in
                React and JavaScript.
              </p>
              <p>
                Most recently I worked at EPAM Systems on the MyGov app, helping move it to a modular architecture
                and a shared Design System. On my own I built Ru App Store, a live iOS storefront with its own
                backend. Web work taught me to sweat every pixel; iOS taught me to keep code clean and tested.
              </p>
              <div className="skills">
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

      <section className="projects" id="projects">
        <div className="container">
          <div className="projects_head">
            <h3>Projects</h3>
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
