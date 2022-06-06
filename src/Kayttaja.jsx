

import './App.css'
import React, {useState} from 'react'
import UserService from './middleware/Users'

// props on nimeltään customer
const Kayttaja = ({kayttaja, editKayttaja, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

// Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteKayttaja = (kayttaja) => {
    let vastaus = window.confirm(`Poista tuote ${kayttaja.lastName}`)

    if (vastaus === true) {
    UserService.remove(kayttaja.userId)
    .then(res => {
        if (res.status === 200) {
        setMessage(`Successfully removed customer ${kayttaja.lastName}`)
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

        // Ilmoituksen piilotus
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
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)
    
            setTimeout(() => {
              setShowMessage(false)
             }, 6000)
          })

    } // Jos poisto halutaankin perua
    else {
    setMessage('Poisto peruttu onnistuneesti.')
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

        // Ilmoituksen piilotus
        setTimeout(() => {
        setShowMessage(false)},
        5000
        )
    }
}

  return (
    <div className='customerDiv'>
        
       <h4 onClick={() => setShowDetails(!showDetails)}>
           {kayttaja.firstName} , {kayttaja.lastName}
        </h4>

       {showDetails && <div className="customerDetails">

                <h3>{kayttaja.lastName}</h3>

                <button onClick={() => deleteKayttaja(kayttaja)}>Delete</button>
                <button onClick={() => editKayttaja(kayttaja)}>Edit</button>

                <table>
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Product price</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{kayttaja.lastName}</td>
                            <td>{kayttaja.firstName}</td>
                            
                        </tr>
                    </tbody>
                </table></div>}
    </div>
  )
}

export default Kayttaja