import React from "react";

function Header() {
  return (
    <header>
        <div className="container">
      <div className="mail_part">
        <div className="mail_icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <div className="mail">
            <a href="mailto:rovshan@div.edu.az">rovshan@div.edu.az</a>
        </div>
      </div>
      <div className="social_part">
        <ul>
            <li><a href="https://www.linkedin.com/in/r%C3%B6v%C5%9F%C9%99n-rzayev-978875236/">Linkedin</a></li>
            <li>/</li>
            <li><a href="https://www.facebook.com/profile.php?id=100091345232600">Facebook</a></li>
            <li>/</li>
            <li><a href="https://www.instagram.com/rzayevv.o52/">Instagram</a></li>
        </ul>
      </div>
      </div>
    </header>
  );
}

export default Header;
