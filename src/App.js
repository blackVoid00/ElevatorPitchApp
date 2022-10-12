import './App.css';
import React from "react";
import { Routes, Route} from "react-router-dom";
import Confirmation from "./components/Confirmation";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import CandidatesList from "./components/CandidatesList";
import UserCard from "./components/UserCard";
import {Provider} from "react-redux";
import {Private} from "./components/Private";

function App() {
  return (
    <div className="Elevator_pitch">
        <Routes>
            
            {/*<Route path="/home" element={<Home />}/>*/}
            <Route path="/"
                   element={<Private Component={Home}/>}
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/list-of-candidates"
                   element={<Private Component={CandidatesList}/>}
            />
            <Route path="/elevator_pitch"
                   element={<Private Component={UserCard}/>}
            />
            <Route path="/confirmation"
                   element={<Private Component={Confirmation}/>}
            />
            {/*<Route path="/list-of-candidates" element={<CandidatesList/>}/>*/}
            {/*<Route path="/elevator_pitch" element={<UserCard/>} />*/}
            {/*<Route path="confirmation" element={<Confirmation/>} />*/}
        </Routes>
    </div>
  );
}

export default App;
