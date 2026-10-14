import { useState } from "react";
import "./App.css";
import { contact, phoneScreens, iosProjects, experience, webProjects, skills } from "./data";

function Phone() {
  const [active, setActive] = useState(phoneScreens[0].id);

  return (
    <figure className="device">
      <div className="device-frame">
        <div className="device-island" aria-hidden="true" />
        <div className="device-screen">
          {phoneScreens.map((s) => (
            <img
              key={s.id}
              src={s.src}
              alt={`Ru App Store, ${s.label} tab`}
              className={s.id === active ? "is-active" : ""}
              aria-hidden={s.id !== active}
            />
          ))}
        </div>
      </div>
      <div className="device-tabs" role="tablist" aria-label="Ru App Store screens">
        {phoneScreens.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={s.id === active}
            className={s.id === active ? "is-active" : ""}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <figcaption>Ru App Store, built in SwiftUI. Tap a tab to look around.</figcaption>
    </figure>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <a href="#top" className="wordmark">Rovshan Rzayev</a>
        <nav aria-label="Main">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <a href={contact.cv} className="nav-cv" download>Download CV</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="hero-hello">Rovshan Rzayev, iOS Software Engineer in Baku</p>
          <h1>I build native iOS apps in Swift.</h1>
          <p className="hero-lede">
            SwiftUI and UIKit, modular architecture and code that is easy to test. Most recently at EPAM on the
            MyGov app. Before iOS, three years and 50+ websites as a frontend developer, so I care how every
            screen feels.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={contact.cv} download>Download CV</a>
            <a className="btn" href={contact.github}>GitHub</a>
            <a className="btn" href={`mailto:${contact.email}`}>Email me</a>
          </div>
          <p className="hero-status"><span className="dot" aria-hidden="true" />Open to iOS roles: on-site in Baku, hybrid or remote</p>
        </div>
        <Phone />
      </div>
    </section>
  );
}

function Work() {
  const [lead, ...rest] = iosProjects;
  return (
    <section className="section" id="work">
      <div className="wrap">
        <h2>iOS work</h2>
        <article className="lead-project">
          <img src={lead.image} alt={`${lead.name} screens`} loading="lazy" />
          <div>
            <h3>{lead.name}</h3>
            <p className="project-role">{lead.role}</p>
            <p>{lead.summary}</p>
            <ul className="stack">{lead.stack.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="project-links">{lead.links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}</p>
          </div>
        </article>
        <div className="project-list">
          {rest.map((p) => (
            <article key={p.name} className={`project${p.image ? "" : " project-noimg"}`}>
              {p.image && <img src={p.image} alt={`${p.name} cover`} loading="lazy" />}
              <div>
                <h3>{p.name}</h3>
                <p className="project-role">{p.role}</p>
                <p>{p.summary}</p>
                <ul className="stack">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
                {p.links.length > 0 && (
                  <p className="project-links">{p.links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section section-alt" id="experience">
      <div className="wrap two-col">
        <div>
          <h2>Experience</h2>
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.company}>
                <p className="when">{e.period}</p>
                <h3>{e.title}, {e.company}</h3>
                <p>{e.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2>Skills</h2>
          <dl className="skills">
            {skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
          <h2 className="edu-heading">Education</h2>
          <ul className="edu">
            <li>ABB Tech Academy, iOS Development, 2025–2026</li>
            <li>Azerbaijan Technical University, Computer Modelling, 2025–2027</li>
            <li>Azerbaijan State Oil and Industry University, BSc Information Security, 2021–2025</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function WebWork() {
  return (
    <section className="section" id="web">
      <div className="wrap">
        <h2>Before iOS: the web years</h2>
        <p className="section-intro">
          From 2023 to 2026 I built 50+ websites for companies in Azerbaijan and abroad, from React dashboards to
          CMS sites. A few of them:
        </p>
        <ul className="web-grid">
          {webProjects.map((w) => {
            const body = (
              <>
                <img src={w.image} alt="" loading="lazy" />
                <span className="web-name">{w.name}</span>
                {w.note && <span className="web-note">{w.note}</span>}
              </>
            );
            return <li key={w.name}>{w.href ? <a href={w.href}>{body}</a> : <div>{body}</div>}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="wrap contact-inner">
        <h2>Hiring an iOS engineer?</h2>
        <p>Email is the quickest way to reach me.</p>
        <p className="contact-mail"><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
        <ul className="contact-links">
          <li><a href={contact.linkedin}>LinkedIn</a></li>
          <li><a href={contact.github}>GitHub</a></li>
          <li><a href={contact.whatsapp}>WhatsApp</a></li>
          <li><a href={contact.phoneHref}>{contact.phone}</a></li>
          <li><a href={contact.cv} download>CV (PDF)</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#work">Skip to work</a>
      <Header />
      <main>
        <Hero />
        <Work />
        <Experience />
        <WebWork />
      </main>
      <Contact />
    </>
  );
}
