

import './App.css'
import React, {useState} from 'react'
import CustomerService from './middleware/services'

// props on nimeltään customer
const Product = ({product, editProduct, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

// Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteProduct = (product) => {
    let vastaus = window.confirm(`Poista tuote ${product.productName}`)

    if (vastaus === true) {
    CustomerService.remove(product.productId)
    .then(res => {
        if (res.status === 200) {
        setMessage(`Successfully removed customer ${product.productName}`)
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
           {product.productName} , {product.productPrice}
        </h4>

       {showDetails && <div className="customerDetails">

                <h3>{product.productName}</h3>

                <button onClick={() => deleteProduct(product)}>Delete</button>
                <button onClick={() => editProduct(product)}>Edit</button>

                <table>
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Product price</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.productName}</td>
                            <td>{product.unitPrice}</td>
                            
                        </tr>
                    </tbody>
                </table></div>}
    </div>
  )
}

export default Product











/* import axios from 'axios';
import React, {useEffect, useReducer, useState} from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useParams,Link } from 'react-router-dom';
import ProductService from './middleware/services'
import ModalEdit from './ModalEdit';

const reducer = (state,action) => {
    switch(action.type){
        case 'PRODUCT_REQUEST':
            return {...state,loading:true};
        case 'PRODUCT_SUCCESS':            
            return {...state,loading:false,product:action.payload,error:''};
        case 'PRODUCT_FAIL':
            return {...state,loading:false,error:action.payload}
        default:
            return state;
    }
}

export default function Product () {
    const[tuote, setTuote] = useState([])
    const {productName} = useParams();
    const [state, dispatch] = useReducer(reducer, {
        loading:false,
        product:[],
        error:''
    })
   
    const [showEdit, setShowEdit] = useState(false)
    const [editingProd, setEditingProd] = useState([])
    const {loading,product,error} = state
    
    const fetchProduct = async() => {
        dispatch({type:'PRODUCT_REQUEST'})
        try {
            const {data} = await axios.get(`https://localhost:7288/nwproducts/Products/productname/${productName}`);

            dispatch({type:'PRODUCT_SUCCESS',payload:data})

        } catch (error) {
            dispatch({type:'PRODUCT_FAIL',payload:error.message})
        }
    }

    //delete alkaa
    const deleteProduct = (product) => {
        if(window.confirm(`delete productc ${product.productName}`)){
            ProductService.remove(product.productId)
            .then(response => {


                if(response.status === 200){
                    alert("Tuote poistettu !")                
                }
            })
        }
        
    }
    //delete loppuu
    // edit alkaa
    const editProduct = (product) => {
        setShowEdit(true)
        setEditingProd(
            product
        )
    }
    

    useEffect(() => {
        
        const token = localStorage.getItem('token')
        ProductService.setToken(token)
        ProductService.getBy()
        .then(data => {
            setTuote(data)
        })
    },[])

    
 
    return (
        <div>
            <Link to="/">Takaisin tuotteisiin</Link>
            {loading &&
                <div>Loading...</div>}
              
              {error && 
                <div>Error:{error}</div>}
       
       { tuote.map(tuot => (
                     <div key={tuot.productId}>
                         <h3>Tuote: {tuot.productName}</h3>
                         <h3>Hinta: {tuot.unitPrice} €</h3>
                         <h3>Varastossa:{tuot.unitsInStock} kpl</h3>
                         <Button onClick={() => editProduct(tuot)}>Muokkaa</Button>
                        <Button onClick={() => deleteProduct(tuot)}>Poista tuote</Button>
                     </div>
                     
                 ))}
               
               {showEdit && <ModalEdit editingProduct={editingProd}/>}
            
         
        </div>
    )
};
 */