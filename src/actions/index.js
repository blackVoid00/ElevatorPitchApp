import Users from "../Users";
import {userExist} from "../utils";
import DataUserCard from "../DataUserCard";

export const getCandidatesList = () =>{
    return {
        type: 'GET_CANDIDATES_ALL',
        payload: ''
    }
}

export const getUserData = () =>{
    return {
        type: 'GET_USERS_ALL',
    }
}

export const logout = () =>{
    localStorage.removeItem('userData')
    reset()
    return{
        type: 'LOGOUT'
    }
}
export const saveUserInfo = ({userData})=>{
    let valid = userExist(userData)
    console.log(valid)
    if(valid){
        localStorage.setItem('userData',JSON.stringify(userData))
        return{
            type: 'USER_DATA_IS_VALID',
            payload: {userData}
        }
        }
    else{
        throw new Error('utilisateur inexistant')
        return {
            type: 'USER_DATA_IS_NOT_VALID',
            payload: 'utilisateur inexistant'
        }

    }
}
export const increment = () =>{
    return{
        type: 'NEXT'
    }
}
export const getCounter = () =>{
    return{
        type: 'LOAD'
    }
}
export const reset = () =>{
    return{
        type: 'RESET_STATE'
    }
}
