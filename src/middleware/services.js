import axios from "axios";

//const baseUrl = "https://localhost:7288/nwproducts/products"
const baseUrl = "https://minunapi.azurewebsites.net/nwproducts/products"


let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers:{Authorization: token},
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data )
}


const create = newProduct => {
    const config = {
        headers:{Authorization: token},
    }
    return axios.post(baseUrl,newProduct,config)
}



const remove = id => {
    const config = {
        headers:{Authorization: token},
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const edit = (product, id) => {
    const config = {
        headers:{Authorization: token},
    }
    
    return axios.put(`${baseUrl}/${id}`, product,config)
}

export default {getAll,create,remove,edit,setToken }
