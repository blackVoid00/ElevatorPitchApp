const initialState = {
   userData: "",
    error: ""
}
export default function (state= initialState, action)   {
    switch (action.type) {
        case 'USER_DATA_IS_VALID':
            return {
                ...state,userData :action.payload,error: ''
            }
        case 'USER_DATA_IS_NOT_VALID':
            return {
                ...state,error :action.payload,
            }
        case 'LOGOUT':
            return {
                initialState
            }
        default:
            return state
    }

}
