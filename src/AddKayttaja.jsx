

import './App.css'
import React, {useState} from 'react'
import UserService from './middleware/Users'
import md5 from 'md5'

 const AddKayttaja = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {


const [newFirstName, setNewFirstName] = useState('')
const [newLastName, setNewLastName] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newAccessLevelId, setNewAccessLevelId] = useState(2)
const [newUserName, setNewUserName] = useState('')
const [newPassword, setNewPassword] = useState('')



const handleSubmit = (event) => {
      event.preventDefault()
      var newUser = {
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        accessLevelId: parseInt(newAccessLevelId),
        username: newUserName,
        password: md5(newPassword)
    }
    
    console.log(newUser)

    UserService.create(newUser)
    .then(response => {
      if (response.status === 200) {
       setMessage(`Added new User: ${newUser.firstName} ${newUser.lastName}`)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setLisäystila(false)
    }

      })
      .catch(error => {
        setMessage(error.data)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }


  return (

    
    <div id="addNew">
       <h2>User add</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newFirstName} placeholder="First name"
                    onChange={({ target }) => setNewFirstName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastName} placeholder="Last name"
                    onChange={({ target }) => setNewLastName(target.value)} required />
            </div>
            <div>
                <input type="email" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
                <input type="number" value={newAccessLevelId} placeholder="Access level"
                    onChange={({ target }) => setNewAccessLevelId(target.value)} />
            </div>
            <div>
                <input type="text" value={newUserName} placeholder="Username"
                    onChange={({ target }) => setNewUserName(target.value)} />
            </div>
            <div>
                <input type="password" value={newPassword} placeholder="Password"
                    onChange={({ target }) => setNewPassword(target.value)} />
            </div>
          
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setLisäystila(false)} />
       </form>

    </div>
  )
}

export default AddKayttaja