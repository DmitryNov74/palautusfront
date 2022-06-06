

import './App.css'
import React, {useState} from 'react'
import UserService from './middleware/Users'
import md5 from 'md5'

const EditKayttaja = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, editingUser}) => {

// Komponentin tilan määritys


const [newUserFirstName, setNewUsertFirstName] = useState(editingUser.firstName)
const [newUserLastName, setNewUserLastName] = useState(editingUser.lastName)
const [newUserEmail, setNewUserEmail] = useState(editingUser.email)
const [newUserPassword, setNewUserPassword] = useState(editingUser.password)
const [newUserAccessLevelId, setNewUserAccessLevelId] = useState(editingUser.accesslevelId)
const [newUserUserName, setNewUserUserName] = useState(editingUser.userName)


const handleSubmit = (event) => {
      event.preventDefault()
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
      if (response.status === 200) {
       setMessage("Muokattu tuote: " + newUser.lastName)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setMuokkaustila(false)
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


  return (
    <div id="edit">
       <h2>Product Edit</h2>

       <form onSubmit={handleSubmit}>
         
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
          <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
     </form> 
      

    </div>
  )
}

export default EditKayttaja

{/* <form onSubmit={handleSubmitt}>
         
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
          <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
     </form> */}