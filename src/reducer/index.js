import {combineReducers} from "redux";
import candidatesReducer from "./candidatesReducer";
import authReducer from "./authReducer";
import counterReducer from "./counterReducer";


const appReducer =  combineReducers({
    // candidates : candidatesReducer,
    authReducer,
    counterReducer,
    candidatesReducer
})
const rootReducer = (state, action) => {
    if (action.type === 'RESET_STATE') {
        localStorage.removeItem('state')
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}
export default rootReducer
