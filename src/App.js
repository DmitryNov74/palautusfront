


import React, {useState, useEffect} from 'react'
import './App.css'


import ProductList from './ProductList'
import KayttajaLista from './KayttajaLista'
import UserList from './UserList'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import Message from './Message'
import Login from './Login'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'


const App = () => {

const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(true)
const [showMessage, setShowMessage] = useState('')
const [loggedInUser, setLoggedInUser] = useState('')
const [adminLogged, setAdminLogged] = useState('')


useEffect(() => {
  let admin = localStorage.getItem("accesslevelId")
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
    
  }

  
},[])



const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
}
  
  return (
    <div className="App">

      {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} />}

{ loggedInUser && 
      <Router>        
          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Link to={'/Products'} className='nav-link'>Tuotteet</Link>
                <Link to={'/Users'} className='nav-link'>Users</Link>
              
                <button onClick={() => logout()}>Logout</button>
            </Nav>
          </Navbar>
          
          

          {showMessage && <Message message={message} isPositive={isPositive} />}

          <Switch>
           
                <Route path="/Products"> <ProductList setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} /></Route>
             
          <Route path="/Users"> <KayttajaLista setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} /></Route>
           
            

          </Switch>
           
      </Router>

    }
          
      </div>
  )
}

export default App















/* import { useContext, useEffect, useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import {ThemeContext} from './ThemeContext';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ProductList from './ProductList';
import Product from './Product';
import ModalAdd from './ModalAdd';
import { Modal } from 'react-st-modal';

import ModalEdit from './ModalEdit';
import UserList from './UserList';
import UserAdd from './UserAdd';
import User from './User';
import UserEdit from './UserEdit';
import Login from './Login';

function App() {
  const {theme} = useContext(ThemeContext)
  const [modalIsOpen,setModalIsOpen] = useState(false)
  const[loggedUser, setLoggedUser] = useState('')

  const logout = () => {
    localStorage.clear()
    setLoggedUser('')
   // navigateLogin()
}

  useEffect(() => {
    let storedUser = localStorage.getItem('username')
    if(storedUser !== null){
      setLoggedUser(storedUser)
    }
  },[])
 
  return (

    <BrowserRouter>
      <div className={`container ${theme}`}>
      
      {!loggedUser && <Login path='/login' setLoggedUser={setLoggedUser} />}

     {loggedUser && 
     <>

<NavBar logout={logout} />

<Routes>

  

    

  
    <Route path="/products" element={<ProductList/>}/>

    <Route path='/search/:query?' element={<ProductList/>}/>

    <Route path="/product/:productName" element={<Product />}/>

    <Route path='/add/' element={<ModalAdd />}/>
    <Route path='/edit/' element={<ModalEdit/>}/>
    <Route path='/users/' element={<UserList/>}/>
    <Route path='/search/:queryUser' element={<UserList/>}/>
    <Route path='/addUser/' element={<UserAdd/>}/>

    <Route path='/user/:firstName' element={<User/>}/>
    <Route path="editUser/" element={<UserEdit/>}/>
   
  </Routes>
  </>
      
     }
      
      

      </div>
    </BrowserRouter>
  );
}

export default App;

//<Route path='/login' element={<Login/>}/>

//  <Route path='/' element={<Login/>}/> */