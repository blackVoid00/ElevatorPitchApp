import React, {useEffect, useReducer, useState} from "react";
import "../assets/styles/login.css";
import Header from "./Header";
import {NavLink, useNavigate} from "react-router-dom";
import {reset, saveUserInfo} from "../actions";
import {useDispatch, useSelector} from "react-redux";

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const UPDATE_FORM = "UPDATE_FORM"

const formsReducer = (state, action) => {
    // console.log(state)
    switch (action.type) {
        case UPDATE_FORM:
            const { name, value, hasError, error, touched, isFormValid } = action.data
            return {
                ...state,
                // update the state of the particular field,
                // by retaining the state of other fields
                [name]: { ...state[name], value, hasError, error, touched },
                isFormValid,
            }
        default:
            return state
    }
}

const validateInput = (name, value) => {
    let hasError = false,
        error = ""
    switch (name) {
        case "identifier":
            if (value.trim() === "") {
                hasError = true
                error = "veuillez renseigner votre identifiant"}
           else {
                hasError = false
                error = ""
            }
            break
        case "password":
            if (value.trim() === "") {
                hasError = true
                error = "Veuillez renseigner votre mot de passe"
            } else if (value.trim().length < 5) {
                hasError = true
                error = "Le mot de passe doit contenir au moins 5 caractères"
            } else {
                hasError = false
                error = ""
            }
            break
        default:
            break
    }
    return { hasError, error }
}

const onFocusOut = (name, value, dispatch, formState) => {
    const { hasError, error } = validateInput(name, value)
    console.log(name+" "+hasError+" "+error)
    let isFormValid = true
    for (const key in formState) {
        const item = formState[key]
        if (key === name && hasError) {
            isFormValid = false
            break
        } else if (key !== name && item.hasError) {
            isFormValid = false
            break
        }
    }

    dispatch({
        type: UPDATE_FORM,
        data: { name, value, hasError, error, touched: true, isFormValid },
    })
}

const onInputChange = (name, value, dispatch, formState) => {
    console.log(value+" "+name)
    const { hasError, error } = validateInput(name, value)
    console.log(hasError+" "+error)
    let isFormValid = true

    for (const key in formState) {
        const item = formState[key]
        // Check if the current field has error
        if (key === name && hasError) {
            isFormValid = false
            break
        } else if (key !== name && item.hasError) {
            // Check if any other field has error
            isFormValid = false
            break
        }
    }
    dispatch({
        type: UPDATE_FORM,
        data: { name, value, hasError, error, touched: false, isFormValid },
    })
}


const initialState = {
    identifier: { value: "", touched: false, hasError: true, error: "" },
    password: { value: "", touched: false, hasError: true, error: "" },
    isFormValid: false,
}

const LoginForm = props => {
    console.log(useSelector((state)=>state.authReducer))

    const [formState, dispatchState] = useReducer(formsReducer,initialState)
    const dispatch = useDispatch()
    const [recrutor, setRecrutor] = useState("")
    const [error, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const navigate =  useNavigate()

    const validate = (text) => {
        console.log(text)
        let error = ""
        if (text.trim().length === 0) {
            error = "veuillez renseigner votre nom"
        }
        if (text.length > 50 ) {
            error = "nom trop long"
        }
        if (text.length < 5 && text.trim().length !== 0) {
            // console.log("yesss")
            error = "nom trop court"
        }
        return error
        // dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    }

    const handleChange = (event) => {
        event.persist();
        setRecrutor(event.target.value);
        console.log(recrutor)
    }

    const handleClick = (e)=>{
      if (e) e.preventDefault()
        setError(validate(recrutor))
        if(validate(recrutor)===""){
            dispatch(saveUserInfo({userData: recrutor}))
            navigate("/home")
        }
       }

    const formSubmitHandler = e => {
        e.preventDefault() //prevents the form from submitting
        dispatch(reset())
        let isFormValid = true

        for (const name in formState) {
            const item = formState[name]
            const { value } = item
            const { hasError, error } = validateInput(name, value)
            if (hasError) {
                isFormValid = false
            }
            if (name) {
                dispatch({
                    type: UPDATE_FORM,
                    data: {
                        name,
                        value,
                        hasError,
                        error,
                        touched: true,
                        isFormValid,
                    },
                })
            }
        }
        if (!isFormValid) {
            setShowError(true)
        } else {
            const userData= {identifier: formState.identifier.value, password: formState.password.value }
            // dispatch(saveUserInfo({userData: userData}))
            try {
                dispatch(saveUserInfo({userData: userData}))
                navigate("/")
            }catch (e) {
                console.log(e.message)
                setError(e.message)
            }

        }

        // Hide the error message after 5 seconds
        setTimeout(() => {
            setShowError(false)
        }, 5000)
    }
    const showErrorMessage = () =>{
        return(<div className="form_error">{error}</div>)
        setTimeout(() => {
            setError('')
        }, 5000)
    }

    return (
        <div>
            <Header />
            <div id="loginform">
                {/*<FormHeader title="Identifiez-vous" />*/}
                <h2 id="headerTitle">Identifiez-vous</h2>
                {showError && !formState.isFormValid && (
                    <div className="form_error">Veuillez remplir les champs correctement</div>
                )}
                <div>
                    <div className="row">
                        <label>Entrer votre identifiant</label>
                        <input
                            type="text"
                            name="identifier"
                            id="identifier"
                            // value={formState.password.value}
                            onChange={e => {
                                onInputChange("identifier", e.target.value, dispatchState, formState)
                            }}
                            onBlur={ e => {
                                onFocusOut("identifier", e.target.value, dispatchState, formState)
                            }}
                        />
                        {formState.identifier.touched && formState.identifier.hasError && (
                            <div style={{
                                marginTop: 2,
                                color: "#f65157",
                                fontSize: 15,
                                textAlign: 'center'
                            }}>{formState.identifier.error}</div>
                        )}
                        <label>Entrer votre mot de passe</label>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            // value={formState.password.value}
                            onChange={e => {
                                onInputChange("password", e.target.value, dispatchState, formState)
                            }}
                            onBlur={ e => {
                              onFocusOut("password", e.target.value, dispatchState, formState)
                          }}
                        />
                        {formState.password.touched && formState.password.hasError && (
                            <div style={{
                                marginTop: 2,
                                color: "#f65157",
                                fontSize: 15,
                                textAlign: 'center'
                            }}>{formState.password.error}</div>
                        )}
                    </div>

                    {/*{error && (<p style={{*/}
                    {/*    color:"#fa0303",*/}
                    {/*    textAlign: "center",*/}
                    {/*    fontSize: 18*/}
                    {/*}}> {error} </p>)}*/}
                    <div id="button" className="row">
                            <button onClick={e => {formSubmitHandler(e)}} >connect</button>
                    </div>
                </div>
                {showErrorMessage()}
            </div>
        </div>
    );
}


export default LoginForm;
