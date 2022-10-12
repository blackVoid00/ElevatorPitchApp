import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {useSelector} from "react-redux";
// import { withRouter } from "react-router-dom";

// navigate('/',{state: { from: props.location } })

// const auth = localStorage.getItem('userData')


export const Private = ({ Component }) => {
    const auth = useSelector(state => state.authReducer.userData)
    // const authLocal = localStorage.getItem("userData")
    console.log(auth)
    return  auth ? <Component/> : <Navigate to="/login"/>
}


        //props.auth.isAuthenticated


