import React from "react";

import logo from "../images/dobbie-logo.png";
import gitLogo from "../images/github-logo.png";
import linLogo from "../images/linkedin-logo.png";

import "./Header.css";

function Header() {
  return (
    <div className="header-main-container">
      <div className="git-container">
        <a href="https://github.com/AlannV" target="blank">
          <img src={gitLogo} alt="gitHub logo" />
        </a>
      </div>
      <div className="header-middle">
        <img className="header-logo" src={logo} alt="header logo" />
      </div>
      <div className="in-container">
        <a
          href="https://www.linkedin.com/in/alan-vargas-5b6b814b/"
          target="blank"
        >
          <img src={linLogo} alt="linkedin logo" />
        </a>
      </div>
    </div>
  );
}

export default Header;
