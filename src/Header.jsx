import { contact } from "./data";

function Header() {
  return (
    <header>
      <div className="container">
        <div className="mail_part">
          <div className="mail_icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <div className="mail">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
        <nav className="social_part" aria-label="Profiles">
          <ul>
            <li><a href={contact.linkedin}>LinkedIn</a></li>
            <li aria-hidden="true">/</li>
            <li><a href={contact.github}>GitHub</a></li>
            <li aria-hidden="true">/</li>
            <li><a href={contact.instagram}>Instagram</a></li>
            <li>
              <button type="button" className="term_btn" onClick={() => window.dispatchEvent(new Event("open-terminal"))}>
                <span aria-hidden="true">&gt;_</span> Terminal <kbd>`</kbd>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
