



import './App.css'
import React, {useState} from 'react'
import LoginService from './middleware/Auth'
import md5 from 'md5'

const Login = ({setIsPositive, setMessage, setShowMessage, setLoggedInUser,setAdminLogged}) => {

// Komponentin tilan määritys
const [userName, setUserName] = useState('')
const [password, setPassword] = useState('')


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      

    var userForAuth = {
    
        username: userName,
        password:md5(password)
    }

    // Käytetään services/Auth.js tiedoston metodia
    LoginService.authenticate(userForAuth)
    .then(response => {
        if (response.status === 200) {
     
        
        

        localStorage.setItem("username",response.data.username)
        localStorage.setItem("accesslevel",response.data.accesslevelId)
        localStorage.setItem("token",response.data.token)
        
        
        
        setLoggedInUser(response.data.username)
        setAdminLogged(response.data.accesslevelId)

       setMessage(`Logged in as: ${userForAuth.username}`)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

    }
      })
      .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }

 
    const emptyFields = () => {
        setUserName("")
        setPassword("")
    } 




  return (
    <div id="loginWindow">
       <h2>Login</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={userName} placeholder="Username"
                    onChange={({ target }) => setUserName(target.value)} />
            </div>
            <div>
                <input type="password" value={password} placeholder="Password"
                    onChange={({ target }) => setPassword(target.value)} />
            </div>
           
         <input type='submit' value='Login' />
         <input type='button' value='Empty' onClick={() => emptyFields()} />
       </form>

    </div>
  )
}

export default Login








/* 

import React, { useState } from 'react'

import LoginService from './middleware/Auth'
import { useNavigate } from 'react-router-dom';
import md5 from 'md5'

const Login = ({setMessage, setShowMessage,setLoggedUser}) => {
    
    
    const [userName, setUserName] = useState('')
    
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate();
    
    const routeChange = () => {
        navigate(`/products`)
    }
    
    

    const handleSubmit = (e) => {
        e.preventDefault()
        
        let userForAuth = {
    
            username:userName,
            password:password
        }
        console.log(userForAuth)
        LoginService.authenticate(userForAuth)
        .then(response => {
            
               if(response.status === 200){
                   localStorage.setItem("username",response.data.username)
                   localStorage.setItem("accesslevel",response.data.accesslevelId)
                   localStorage.setItem("token",response.data.token)
                   setLoggedUser(response.data.username)
                   routeChange()
                   
                alert ("Kirjautunut " + userForAuth.username ) 
               }
               
                  
            
        })
        .catch(error => {
           alert ("error")
        })
        
    }

    const emptyFields = () => {
        setUserName("")
        setPassword("")
    }
    

    return (
        <div >
            <div className='modal_body'>

            
            <div onClick={routeChange}>X
               
            </div>
        <form onSubmit={handleSubmit}>
         
         <label>Käyttäjänimi:</label>
         <input type="text" value={userName} onChange={({target}) =>setUserName(target.value) } required/>
         
         <label>Salasana:</label>
         <input type="password" value={password} onChange={({target}) =>setPassword(target.value) } required/>



         <input type="submit" value="Login"/>
         <input type="button" value="Tyhjennä" onClick = {() => emptyFields()}/>
     </form>
     </div>
        </div>
    );
};

export default Login; */