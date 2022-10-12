const counterReducer = (state= 0, action) =>  {
    switch (action.type) {
        case 'NEXT':
            return state +1
        case 'RESET_COUNTER':
            return (state = 0)
        default:
            return state
    }

}
export default counterReducer
