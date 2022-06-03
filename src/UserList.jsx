

import './App.css'
import React, {useState, useEffect} from 'react'
import UserService from './middleware/Users'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'
import User from './User'

const UserList = ({setMessage, setIsPositive, setShowMessage}) => {

// Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.
const [users, setUsers] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")


useEffect(() => {
    const token = localStorage.getItem('token')
        UserService
            .setToken(token)
  UserService.getAll()
  .then(data => {
    setUsers(data)
        })
    },[lisäystila, reload, muokkaustila] 
  )


const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
}



  return (
        <>
            <h1><nobr>Users</nobr>

            {lisäystila && <UserAdd setLisäystila={setLisäystila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

            {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

            {!lisäystila && !muokkaustila &&
            <input placeholder="Search by Last Name" value={search} onChange={handleSearchInputChange} />
            }


            {!lisäystila && !muokkaustila &&
            <table id="userTable">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Accesslevel</th>
                    </tr>
                </thead>
                <tbody>

        
                {users && users.map(u =>
                {
                    const lowerCaseName = u.lastName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(
                            <tr key={u.userId}>
                                <td>{u.firstName}</td>
                                <td>{u.lastName}</td>
                                <td>{u.email}</td>
                                <td>{u.accessLevelId}</td>
                                
                               
                            </tr>
                            
                                )
                            }
                        }
                    )
                }

                </tbody>

            </table>
            }
         </>
        )
    }

export default UserList











/* import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import {Nav, Navbar} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import {Link, useParams, useNavigate} from 'react-router-dom'



const reducer = (state,action) => {
    switch(action.type){
        case 'USERS_REQUEST':
            return {...state,loading:true}
        case 'USERS_SUCCESS':
            return {...state,loading:false,users:action.payload,error:''}
        case 'USERS_FAIL':
            return {...state,loading:false,error:action.payload}
    }
}

const UserList = (props) => {
    const [queryUser, setQueryUser] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${queryUser}`)
    }

    const {query,productName} = useParams()
    const [state, dispatch] = useReducer(reducer, {
        loading:false,
        error:'',
        users:[]
    })
    const [editingUser, setEditingUser] = useState(false)
    const [muokkaus, setMuokkaus] = useState(false)

    const {loading,error,users} = state;
    


    const loadUsers = async() => {
        dispatch({type:'USERS_REQUEST'})

        try {
            const {data} = await axios.get('https://localhost:7288/api/Users');
            dispatch({ type: 'USERS_SUCCESS', payload: data });
            
        } catch (error) {
            dispatch({type:'USERS_FAIL',payload:error.message})
        }
        
    }

    useEffect(() => {
        loadUsers();
    },[queryUser])
   
    return (
        <div>
            <LinkContainer to="/addUser/">
                    <Nav.Link ><h5>Lisää käyttäjä</h5></Nav.Link>
                </LinkContainer>
            <div className='header-item'>
                    <form onSubmit={handleSubmit}>
                        <input name='queryUser' type='text' onChange={e => setQueryUser(e.target.value)}></input>
                        <button>Etsi</button>
                    </form>
                        
                </div>
           
           {loading ? (
               <div>Loading</div>
           ):error ? (
               <div>Virhe:{error}</div>
           ):(
               users.map(user => (
                   
                 
                    <div key={user.userId} className='productlist'>
                        
                    <LinkContainer  to={`/user/${user.firstName}`}>
                    <Nav.Link>
                    <h3> {user.firstName}{user.lastName}, {user.email}</h3>
                    </Nav.Link>
                    </LinkContainer>
                    
             
                </div>
                  
                   
               ))
           )
        }
        </div>
    );
};

export default UserList; */