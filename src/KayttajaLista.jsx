

import './App.css'
import React, {useState, useEffect} from 'react'
import UserService from './middleware/Users'
import Kayttaja from './Kayttaja'
import AddKayttaja from './AddKayttaja'
import EditKayttaja from './EditKayttaja'

const KayttajaLista = ({setMessage, setIsPositive, setShowMessage}) => {

// Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.
const [kayttajat, setKayttajat] = useState([])
const [showKayttajat, setShowKayttajat] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [editingUser, setEditingUser] = useState(false) // changes
const [search, setSearch] = useState("")

// UseEffect ajetaan aina alussa kerran
useEffect(() => {

  const token = localStorage.getItem('token')
        UserService
            .setToken(token)
            
  UserService.getAll()
  .then(data => {
    setKayttajat(data)
})
},[lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
)

  //Hakukentän onChange tapahtumankäsittelijä
  const handleSearchInputChange = (event) => {
    setShowKayttajat(true)
    setSearch(event.target.value.toLowerCase())
}

const editKayttaja = (kayttaja) => {
  setEditingUser(kayttaja)
  setMuokkaustila(true)
}

  return (
    <>
        <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowKayttajat(!showKayttajat)}>Kayttajat</nobr>

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

                {!lisäystila && !muokkaustila &&
                <input placeholder="Search by company name" value={search} onChange={handleSearchInputChange} />
                }

                {lisäystila && <AddKayttaja setLisäystila={setLisäystila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />}

                {muokkaustila && <EditKayttaja setMuokkaustila={setMuokkaustila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editingUser={editingUser}
                />}

        {
            !lisäystila && !muokkaustila && showKayttajat && kayttajat && kayttajat.map(c =>
              {
               
                   return(
                <Kayttaja key={c.userId} kayttaja={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editKayttaja={editKayttaja}
                />
              )
                    }
                  
            )
        }

    </>
  )
}

export default KayttajaLista