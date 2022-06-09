import axios from "axios";

//const baseUrl = "https://localhost:7288/api/Users"


const baseUrl = "https://minunapi.azurewebsites.net/api/Users"


let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers:{Authorization: token},
    }

    const request = axios.get(baseUrl,config)
    return request.then(response => response.data )
}


const create = newUser => {
    const config = {
        headers:{Authorization: token},
    }

    return axios.post(baseUrl,newUser,config)
}

const remove = id => {
    const config = {
        headers:{Authorization: token},
    }

    return axios.delete(`${baseUrl}/${id}`,config)
}

const edit = (user, id) => {
     const config = {
        headers:{Authorization: token},
    }
   
    return axios.put(`${baseUrl}/${id}`, user,config)
}

export default {getAll,create,remove,edit,setToken}
