import React from "react";

import logo from "../images/dobbie-logo.png";

import "./Header.css";

function Header() {
  return (
    <div className="header-main-container">
      <div className="header-middle">
        <img className="header-logo" src={logo} alt="header logo" />
      </div>
    </div>
  );
}

export default Header;
