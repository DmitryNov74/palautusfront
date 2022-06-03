

import './App.css'
import React, {useState} from 'react'
import CustomerService from './middleware/services'

const ModalAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

// Komponentin tilan määritys

    const [newProductName, setNewProductName] = useState('')
    const [newProductPrice, setNewProductPrice] = useState('')


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      let newProductObject = {
            
        productName:newProductName,
        unitPrice:newProductPrice
    }
    
    /*const token = localStorage.getItem('token')
        CustomerService
            .setToken(token)*/

    CustomerService.create(newProductObject)
    .then(response => {
      if (response.status === 200) {
       setMessage("Uusi tuote on lisätty: " + newProductObject.productName)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setLisäystila(false)
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
    <div id="addNew">
       <h2>Customer add</h2>

       <form onSubmit={handleSubmit}>
       <div>
                <input type="text" value={newProductName} placeholder="ID with 5 capital letters" 
                    onChange={({ target }) => setNewProductName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newProductPrice} placeholder="Company name"
                    onChange={({ target }) => setNewProductPrice(target.value)} required />
            </div>
            
            
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setLisäystila(false)} />
       </form>

    </div>
  )
}

export default ModalAdd



















/* 

import React, { useState } from 'react'

import ProductService from './middleware/services'
import { useNavigate } from 'react-router-dom';

const ModalAdd = ({setMessage, setShowMessage,setIspositive,setLisays}) => {
    
    const [newProductName, setNewProductName] = useState('')
    const [newProductPrice, setNewProductPrice] = useState('')
    
    const navigate = useNavigate();
    
    const routeChange = () => {
        navigate(`/`)
    }
    
    

    const handleSubmit = (e) => {
        e.preventDefault()
        
        let newProductObject = {
            
            productName:newProductName,
            unitPrice:newProductPrice
        }
        ProductService.create(newProductObject)
        .then(response => {
            if(response.status === 200){
                setMessage ("Tuote " + newProductObject.productName + " on lisätty")
                setShowMessage(true)
                setIspositive(true)

                setTimeout(() => {
                    setShowMessage(false)
                },3000)
                setLisays(false)
            }
        })
        .catch(error => {
            setMessage ("error")
            setShowMessage(true)
            setIspositive(false)

            setTimeout(() => {
                setShowMessage(false)
            },3000)
        })
        
    }
    

    return (
        <div >
            <div className='modal_body'>

            
            <div onClick={routeChange}>X
               
            </div>
        <form onSubmit={handleSubmit}>
         
         <label>Tuotteen nimi:</label>
         <input type="text" value={newProductName} onChange={({target}) => setNewProductName(target.value)}  required/>
         <label>Tuotteen hinta:</label>
         <input type="text" value={newProductPrice} onChange={({target}) =>setNewProductPrice(target.value) } required/>

         <input type="submit" value="Tallenna"/>
     </form>
     </div>
        </div>
    );
};

export default ModalAdd; */