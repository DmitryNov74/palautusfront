import axios from "axios"

const url = "https://localhost:7288/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(url, userForAuth)
    return request.then(responsse => responsse)
}


export default {authenticate}