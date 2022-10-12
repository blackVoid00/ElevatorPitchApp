import odcLogo from "../assets/img/odclogo.png";
import "../App.css";
import "../assets/styles/listcandidates.css";
import photodeprofil from "../assets/img/photo-de-profil.jpg";
import downloadbtn from "../assets/img/btn-download.png";
import { FaDownload } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { IconContext } from "react-icons";

import { useState } from "react";
import Header from "./Header";



import Data from '../Data';
import Filter from '../Filter';
import React, { Component }  from 'react';
import Fade from 'react-reveal/Fade';




const CandidatesList = ({setItem ,opList}) => {

  const [candidates,setCandidates] = useState(Data);
  const [filtered,setFiltered] = useState(Data);
  const [op,setOp] = useState(0);
  return (

      <div className='list-container'>
        <h1>Candidates lists</h1>
        <Fade left>
          <Filter candidates={candidates} setFiltered={setFiltered} op={op} setOp={setOp} />
          {filtered.map((c) => (
              <><div className='user-card' key={c.id}>

                <div className='user-card-left'>
                  <img className='img-photo-de-profil' src={c.image} alt='photo de profil' />
                  <h1>{c.name}</h1>

                  <p> <FaGraduationCap /> {c.option}</p>
                </div>
                <div className='user-card-right'>
                  <IconContext.Provider
                      value={{ color: '#FF6600' }}
                  >
                    <a className='btn-d' href={c.cv} target="_blank" type="application/pdf" download> <FaDownload className='icon-download'/> Download CV</a>
                  </IconContext.Provider>
                </div>

              </div></>

          ))}
        </Fade>
      </div>
  );
}

export default CandidatesList ;
