import odcLogo from "../assets/img/odclogo.png";
import "../App.css";
import React from "react";

const Header = () => {
  return (
    <a href="/">
      <img src={odcLogo} className="odc-logo" alt="odc logo" />
    </a>
  );
};

export default Header;
