

import './App.css'
import React, {useState, useEffect} from 'react'
import ProductService from './middleware/services'
import Product from './Product'
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'

const ProductList = ({setMessage, setIsPositive, setShowMessage}) => {

// Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.
const [products, setProducts] = useState([])
const [showProducts, setShowProducts] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaProduct, setMuokattavaProduct] = useState(false)
const [search, setSearch] = useState("")

// UseEffect ajetaan aina alussa kerran
useEffect(() => {

  const token = localStorage.getItem('token')
        ProductService
            .setToken(token)
            
  ProductService.getAll()
  .then(data => {
    setProducts(data)
})
},[lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
)

  //Hakukentän onChange tapahtumankäsittelijä
  const handleSearchInputChange = (event) => {
    setShowProducts(true)
    setSearch(event.target.value.toLowerCase())
}

const editProduct = (product) => {
  setMuokattavaProduct(product)
  setMuokkaustila(true)
}

  return (
    <>
        <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowProducts(!showProducts)}>Tuotteet</nobr>

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

                {!lisäystila && !muokkaustila &&
                <input placeholder="Search by company name" value={search} onChange={handleSearchInputChange} />
                }

                {lisäystila && <ModalAdd setLisäystila={setLisäystila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />}

                {muokkaustila && <ModalEdit setMuokkaustila={setMuokkaustila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaProduct={muokattavaProduct}
                />}

        {
            !lisäystila && !muokkaustila && showProducts && products && products.map(c =>
              {
                const lowerCaseName = c.productName.toLowerCase()
                if (lowerCaseName.indexOf(search) > -1) {
                    return(
                <Product key={c.productId} product={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editProduct={editProduct}
                />
              )
                    }
                  }
            )
        }

    </>
  )
}

export default ProductList












/* import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import {Nav, Navbar} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import {Link, useParams} from 'react-router-dom'
import ProductService from './middleware/services'


const reducer = (state,action) => {
    switch(action.type){
        case 'PRODUCTS_REQUEST':
            return {...state,loading:true}
        case 'PRODUCTS_SUCCESS':
            return {...state,loading:false,products:action.payload,error:''}
        case 'PRODUCTS_FAIL':
            return {...state,loading:false,error:action.payload}
    }
}

const ProductList = (props) => {
    const[tuotteet, setTuotteet] = useState([])
    const {query,productName} = useParams()
    const [state, dispatch] = useReducer(reducer, {
        loading:false,
        error:'',
        products:[]
    })
    const [editingProduct, setEditingProduct] = useState(false)
    const [muokkaus, setMuokkaus] = useState(false)

    const {loading,error,products} = state;
    


    const loadProducts = async() => {
        dispatch({type:'PRODUCTS_REQUEST'})

        try {
            
            const {data} = await axios.get('https://localhost:7288/nwproducts/Products');
            dispatch({ type: 'PRODUCTS_SUCCESS', payload: data });
           // const filteredProds = query ? data.filter((x) => x.productName.indexOf(query) >= 0) : data;
          
           // dispatch({type:'PRODUCTS_SUCCESS',payload:filteredProds})
            
        } catch (error) {
            dispatch({type:'PRODUCTS_FAIL',payload:error.message})
        }
        
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        ProductService.setToken(token)
        ProductService.getAll()
        .then(data => {
            setTuotteet(data)
        })
        //loadProducts()
    },[query])

    return (
        <div>
            
           
           {loading ? (
               <div>Loading</div>
           ):error ? (
               <div>Virhe:{error}</div>
           ):(
               tuotteet.map(tuote => (
                   <div key={tuote.productId} className='productlist'>
                       <LinkContainer  to={`/product/${tuote.productName}`}>
                       <Nav.Link>
                       <h3> {tuote.productName}</h3>
                       </Nav.Link>
                       </LinkContainer>
                       
                
                   </div>
               ))
           )
        }
        </div>
    );
};

export default ProductList; */