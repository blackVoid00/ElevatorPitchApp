import React, { useState,useRef, useEffect } from 'react'
import '../assets/styles/UserCard.css'
import logoOdc from '../assets/img/logooddc.png'
import user1 from '../assets/img/user.png'
import icon from '../assets/img/elevatopitch.png'
import axios from 'axios'
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import { getUserData } from "../actions";
import DataUserCard from "../DataUserCard";
import {useNavigate} from "react-router-dom";
const UserCard = () => {
    const dispatch = useDispatch()
    console.log(useSelector((state)=>state))
    const loadD = ()=>{
        dispatch(getUserData())
    }
    // useEffect({
    //     loadD
    // },[])
    // console.log(useSelector((state)=>state))
    const getUser =  useSelector((state)=>state.authReducer.userData)
    console.log(getUser.userData.identifier)
    const userId = getUser.userData.identifier
    const ref=useRef(null)
    // const Userdata = useSelector((state)=>state.candidatesReducer)
    // console.log(useSelector((state)=>state.candidatesReducer))
    const value = useSelector((state)=>state.counterReducer)
    console.log(value)
    const [myCheckbox,setCheckbox]=useState(false)
    const [user,setUser]=useState(!!userId? userId : '')
    const [Userdata,setData]=useState(DataUserCard)
    const [userName,setUserName]=useState("")
    const [candidate,setCandidate]=useState("Mamoun")
    const [interest , setInterest] = useState("")
    const [comment,setComment] = useState("")
    const CheckOnlyOneValue= (el)=>{
        var Checkbox =document.getElementsByName('checkbox')
        Array.prototype.forEach.call(Checkbox,function(e){
            e.checked =false;
        });
        el.target.checked = true;
        setInterest(el.target.value)
    }
    // useEffect(()=>{
    //     const userName= ref.current.className;
    //     setUser(userName);
    // },[])
    useEffect(()=>{
        const userName=ref.current.id;
        setUserName(userName);
    },[])
    const navigate=useNavigate()

    const submitHandler=(e)=>{
        e.preventDefault();
        try{
            axios.post(
            // 'https://sheet.best/api/sheets/5ea89fe2-b9ea-4328-88db-01d1b934f3d9',

                // {recruteur:user, candidate: "", interest:interest, comment:comment})
            'https://sheet.best/api/sheets/9542312c-dd54-4a6f-a726-b5a2f402ec52',{id:userId,name:userName,checkbox:interest,comment:comment})
                .then((response=>{
                    console.log(response.data)
                    navigate("/confirmation")
                }))

        }catch (e) {
            console.log(e.data)
        }

    }

    return (
        <>
            <div className="main-div">
                <Header />
                <div className="logo">
                    {/*<img  src={logoOdc}></img>*/}
                    <h1 className="h1">Bienvenue au Pitch elevator</h1>
                    <img className="icon" src={icon}></img>
                </div>

                {Userdata[value].map(item =>(
                    <div className="card-div" key={item.id}>
                        <img className="user-img" src={item.image}></img>

                        <h1 ref={ref} className={"user"+item.id} id={item.lname + " " + item.fname}>{item.fname}</h1>
                        <h2>{item.lname}</h2>
                        <p>{item.option}</p>
                    </div>
                ))}


                <div className="checkbox-div">
                    <p className="checkboxp" >Veuillez cocher la case correspondante  <span className="star"> *</span> :</p>
                    <div className="checkbox-container">

                        <label className="container">Interessé(e) par ce profil
                            <input type="checkbox" name="checkbox" value="interested"  onChange={(e) => setCheckbox(e.target.checked)} onClick={CheckOnlyOneValue}/>
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Non interessé(e) par ce profil
                            <input type="checkbox" name="checkbox" value="not interested" onChange={(e) => setCheckbox(e.target.checked)} onClick={CheckOnlyOneValue}/>
                            <span className="checkmark"></span>
                        </label>

                    </div>
                    <p className="comment">Veuillez introduire une remarque <span className="star">(optionnel)</span> :</p>
                    <input type="text" onChange={(e) => setComment(e.target.value)} placeholder='tapez votre commentaire'></input>
                    <button className="button" type="submit" onClick={submitHandler}>Confirmer</button>
                </div>
            </div>
        </>
    )

}

export default UserCard
