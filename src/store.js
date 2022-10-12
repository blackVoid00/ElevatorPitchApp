import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./reducer";
import thunkMiddleware from 'redux-thunk';

function saveToLocalStorage(state){
    try{
        const serializeState = JSON.stringify(state)
        localStorage.setItem('state',serializeState)
    } catch (e) {
        console.log(e)
    }
}
// const initState = {
//     history: getInitState(window.location, window.document.title, window.history),
// }
function loadFromLocalStorage() {
    try{
        const serializeState = localStorage.getItem('state')
        if(serializeState === null) return undefined
        return JSON.parse(serializeState)
    }catch (e) {
        console.log(e)
        return undefined
    }
}
const persistedState = loadFromLocalStorage()
const middlewareEnhancer = applyMiddleware(thunkMiddleware)
const composedEnhancers = compose(middlewareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// const store = createStore(
//     rootReducer,
//     {},
//     composedEnhancers
// )

const store = createStore(
    rootReducer,
    persistedState,
    composedEnhancers
    )
store.subscribe(()=>saveToLocalStorage(store.getState()));
export default store
// export let persistor = persistStore(store)


