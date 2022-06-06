



import './App.css'
import React, {useState} from 'react'
import CustomerService from './middleware/services'


const User = ({user, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {


const [showDetails, setShowDetails] = useState(false)

const deleteUser = (user) => {
    let vastaus = window.confirm(`Poista user ${user.firstName}`)

    if (vastaus === true) {
    CustomerService.remove(user.userId)
    .then(res => {
        if (res.status === 200) {
        setMessage(`Successfully removed user ${user.firstName}`)
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) 

       
        setTimeout(() => {
        setShowMessage(false)},
        5000
        )
        reloadNow(!reload)
        }
        
            }
        )
        .catch(error => {
            setMessage(error)
            setIsPositive(false)
            setShowMessage(true)
            window.scrollBy(0, -10000) 
    
            setTimeout(() => {
              setShowMessage(false)
             }, 6000)
          })

    } 
    else {
    setMessage('Poisto peruttu onnistuneesti.')
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) 

     
        setTimeout(() => {
        setShowMessage(false)},
        5000
        )
    }
}

  return (
    <div className='customerDiv'>
        
       <h4 onClick={() => setShowDetails(!showDetails)}>
           {user.firstName} , {user.lastName}
        </h4>

       {showDetails && <div className="customerDetails">

                <h3>{user.userName}</h3>

               

                <table>
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Product price</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                           
                            
                        </tr>
                        
                        <button>Delete</button>
                    </tbody>
                </table></div>}
    </div>
  )
}

export default User
























/* import axios from 'axios';
import React, {useEffect, useReducer, useState} from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useParams,Link } from 'react-router-dom';
import UserService from './middleware/Users'
import UserEdit from './UserEdit';

const reducer = (state,action) => {
    switch(action.type){
        case 'USER_REQUEST':
            return {...state,loading:true};
        case 'USER_SUCCESS':            
            return {...state,loading:false,user:action.payload,error:''};
        case 'USER_FAIL':
            return {...state,loading:false,error:action.payload}
        default:
            return state;
    }
}

export default function User () {
    const {firstName} = useParams();
    const [state, dispatch] = useReducer(reducer, {
        loading:false,
        user:[],
        error:''
    })
   
    const [showEditUser, setShowEditUser] = useState(false)
    const [editingUser, setEditingUser] = useState({})
    const {loading,user,error} = state
    
    const fetchUser = async() => {
        dispatch({type:'USER_REQUEST'})
        try {
            const {data} = await axios.get(`https://localhost:7288/api/Users/firstname/${firstName}`);

            dispatch({type:'USER_SUCCESS',payload:data})

        } catch (error) {
            dispatch({type:'USER_FAIL',payload:error.message})
        }
    }

    //delete alkaa
    const deleteUser = (user) => {
        if(window.confirm(`delete user ${user.firstName}`)){
            UserService.remove(user.userId)
            .then(response => {


                if(response.status === 200){
                    alert("Käyttäjä poistettu !")                
                }
            })
        }
        
    }
    //delete loppuu
    // edit alkaa
    const editUser = (user) => {
        setShowEditUser(true)
        setEditingUser(
            user
        )
    }
    

    useEffect(() => {
        fetchUser();
    },[])

    
 
    return (
        <div>
            <Link to="/">Takaisin tuotteisiin</Link>
            {loading &&
                <div>Loading...</div>}
              
              {error && 
                <div>Error:{error}</div>}
       
       { user.map(usr => (
                     <div key={usr.userId}>
                         <h3>Nimi: {usr.firstName}{usr.lastName}</h3>
                         <h3>Email: {usr.email} </h3>
                         <h3>Accesslevelid:{usr.accessLevelId}</h3>
                         <h3>Username:{usr.userName}</h3>
                         <Button onClick={() => editUser(usr)}>Muokkaa</Button>
                        <Button onClick={() => deleteUser(usr)}>Poista tuote</Button>
                     </div>
                     
                 ))}
               
               {showEditUser && <UserEdit editingUser={editingUser}/>}
            
         
        </div>
    )
};
 */