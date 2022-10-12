import React from "react";
import "../style.css";
import {Link, NavLink} from "react-router-dom"
import Header from "./Header";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getCounter, increment} from "../actions";

const Confirmation = () =>{
    const navigate=useNavigate()
    const dispatch = useDispatch()
    // const {value,setValue}=useContext(UserCardContext)
    const value = useSelector((state)=>state.counterReducer)
    const handleClick=() => {
        dispatch(increment())
        navigate("/elevator_pitch")
    }

    return(
        <div ClassName="container">
            <Header/>
            {/*<div>*/}
            {/*    <img*/}
            {/*        src={require("../assets/odc_logo.png")}*/}
            {/*        alt="Not Found"*/}
            {/*        className="odclogo-1"*/}
            {/*    />*/}
            {/*</div>*/}
            <div className="el-475">
                <p>Thank you , Your choice has been saved</p>
            </div>
            <div>
                <img
                    src={require("../assets/confirmation_logo.png")}
                    alt="Not Found"
                    className="confirmation-1"
                />
            </div>
            <div>
                <p className="txt-097">Move to the next candidate</p>
            </div>

            <button className="group-13" onClick={handleClick}>
                        Next
            </button>
        </div>
    )
}
export default Confirmation
