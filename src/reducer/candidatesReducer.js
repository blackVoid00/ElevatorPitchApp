import DataUserCard from "../DataUserCard";

export default function(state={},action){

    switch(action.type){
        case 'GET_CANDIDATE':
            return {...state,artistList:action.payload}
        case 'GET_CANDIDATES_ALL':
            return {...state,artistList:action.payload}
        case 'GET_USERS_ALL':
            return {...state,DataUserCard:DataUserCard}
        default:
            return state;
    }

}
