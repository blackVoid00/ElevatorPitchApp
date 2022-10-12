import Users from "./Users";

export const userExist = (userData) =>{
    const toCompare = {
        id: userData.identifier,
        password: userData.password,
    };
    console.log(toCompare)
// Or just compare properties
    const found = Users.find(data => data.id == toCompare.id && data.password == toCompare.password)
    if (found) {
        console.log(found)
        return true
    } else {
        return false
    }
}
