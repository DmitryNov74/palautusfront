





















/* import React, { useState } from 'react'
import { Alert } from 'react-bootstrap';
import UserService from './middleware/Users'
import { useNavigate, useParams } from 'react-router-dom';
import md5 from 'md5'

//setMuokkaus,setIspositive, setMessage, setShowMessage,,product,prod,firstName
export default function UserEdit({ editingUser}) {

    const [newUserFirstName, setNewUsertFirstName] = useState(editingUser.firstName)
    const [newUserLastName, setNewUserLastName] = useState(editingUser.lastName)
    const [newUserEmail, setNewUserEmail] = useState(editingUser.email)
    const [newUserPassword, setNewUserPassword] = useState(editingUser.password)
    const [newUserAccessLevelId, setNewUserAccessLevelId] = useState(editingUser.accesslevelId)
    const [newUserUserName, setNewUserUserName] = useState(editingUser.userName)

    
   
    const navigate = useNavigate();
    
    const routeChange = () => {
        navigate(`/users/`)
    }

    const handleSubmitt = (e) => {
        e.preventDefault()
        
        let newUser = {
            
            firstName:newUserFirstName,
            lastName:newUserLastName,
            email:newUserEmail,
            accesslevelId:newUserAccessLevelId,
            userName:newUserUserName,
            password:md5(newUserPassword)
        }
        UserService.edit(newUser,editingUser.userId) 
        .then(response => {
            if(response.status === 200){
               alert("Käyttäjä " + newUser.firstName + " on muokattu")
                
            }
        })
        .catch(error => {
            alert ("error")
            
        })
        
    }
    
  return (
    <div id='addNew'>
   
        <div className='modal_body'>
        <div onClick={routeChange}>X
               
            </div>
        {

       
    
        <form onSubmit={handleSubmitt}>
         
            <label>Etunimi:</label>
            <input type="text" value={newUserFirstName} onChange={({target}) => setNewUsertFirstName(target.value)} />
            <label>Sukunimi:</label>
            <input type="text" value={newUserLastName} onChange={({target}) =>setNewUserLastName(target.value) } />
            <label>Email:</label>
            <input type="email" value={newUserEmail} onChange={({target}) => setNewUserEmail(target.value)} />
            <label>Access level:</label>
            <input type="number" value={newUserAccessLevelId} onChange={({target}) =>setNewUserAccessLevelId(target.value) } />
            <label>User name:</label>
            <input type="text" value={newUserUserName} onChange={({target}) => setNewUserUserName(target.value)} />
            <label>Salasana:</label>
            <input type="password" value={newUserPassword} onChange={({target}) =>setNewUserPassword(target.value) } />



            <input type="submit" value="Tallenna muutokset"/>
        </form>
         }
        </div>
    </div>
  )
}
 */