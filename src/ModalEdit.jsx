

import './App.css'
import React, {useState} from 'react'
import CustomerService from './middleware/services'

const ModalEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct}) => {

// Komponentin tilan määritys


    const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
    const [newProductPrice, setNewProductPrice] = useState(muokattavaProduct.unitPrice)

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      let newProductObject = {
            
        productName:newProductName,
        unitPrice:newProductPrice
    }
    
    CustomerService.edit(newProductObject, muokattavaProduct.productId)
    .then(response => {
      if (response.status === 200) {
       setMessage("Muokattu tuote: " + newProductObject.productName)
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
       
            <div>
                <label>Productname</label>
                </div>
                <div>
                <input type="text" value={newProductName}
                    onChange={({ target }) => setNewProductName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newProductPrice} placeholder="Contact name"
                    onChange={({ target }) => setNewProductPrice(target.value)} />
            </div>
            
            
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
       </form>

    </div>
  )
}

export default ModalEdit






/* import React, { useState } from 'react'
import { Alert } from 'react-bootstrap';
import ProductService from './middleware/services'
import { useNavigate, useParams } from 'react-router-dom';

//setMuokkaus,setIspositive, setMessage, setShowMessage,product,prod,

export default function ModalEdit({ editingProduct,productName}) {

    const [newProductName, setNewProductName] = useState(editingProduct.productName)
    const [newProductPrice, setNewProductPrice] = useState(editingProduct.unitPrice)
    
   
    const navigate = useNavigate();
    
    const routeChange = () => {
        navigate(`/edit/${productName}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        let newProductObject = {
            
            productName:newProductName,
            unitPrice:newProductPrice
        }
        ProductService.edit(newProductObject,editingProduct.productId) //newProductObject 
        .then(response => {
            if(response.status === 200){
               alert("Tuote " + newProductObject.productName + " on muokattu")
                
            }
        })
        .catch(error => {
            Alert ("error")
            
        })
        
    }
    
  return (
    <div id='addNew'>
   
        <div className='modal_body'>
        <div onClick={routeChange}>X
               
            </div>
        {

       
    
        <form onSubmit={handleSubmit}>
         
            <label>Tuotteen nimi:</label>
            <input type="text" value={newProductName} onChange={({target}) => setNewProductName(target.value)} />
            <label>Tuotteen hinta:</label>
            <input type="text" value={newProductPrice} onChange={({target}) =>setNewProductPrice(target.value) } />

            <input type="submit" value="Tallenna muutokset"/>
        </form>
         }
        </div>
    </div>
  )
}
 */