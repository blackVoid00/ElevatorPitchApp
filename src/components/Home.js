import illustration from "../assets/img/illustration.png";
//import odcLogo from "../assets/img/odclogo.png";
//import allcondidates from "../assets/img/all-logo.png";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import {useSelector} from "react-redux";
import React from "react";

const Home = () => {
  console.log(useSelector((state => state)))
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <div className="welcome-container">
          <span className="welcome-txt-2">
            <label className="welcome-txt">Welcome</label> to ODC <br />
            Speed Recruiting Day!{" "}
          </span>
          <img
            src={illustration}
            alt="illustration"
            className="welcome-image"
          />
        </div>
        <div className="btn-container">
          <NavLink to="/list-of-candidates" className="btn-welcome">
            All Condidates
          </NavLink>
          <NavLink to="/elevator_pitch" className="btn-welcome">
            Elevator Pitch
          </NavLink>
        </div>
      </header>
    </div>
  );
};

export default Home;
