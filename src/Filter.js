import { useEffect } from "react";
import React, { Component }  from 'react';

const Filter = ({setOp,op,setFiltered,candidates})=>{

    useEffect(()=> {
        if(op==0){
            setFiltered(candidates);
            return;
        }
        const filtered = candidates.filter((c) => c.op.includes(op));
        setFiltered(filtered)
    },[op])

    return(
        <div className="filter-container">
            <button onClick={() => {setOp(0)}}>All</button>
            <button onClick={() => {setOp(1)}}>Developement</button>
            <button onClick={() => {setOp(2)}}>Data</button>
            <button onClick={() => {setOp(3)}}>Design</button>
            <button onClick={() => {setOp(4)}}>Système embarqué</button>
            <button onClick={() => {setOp(5)}}>Business</button>
        </div>
    )
}
export default Filter;
