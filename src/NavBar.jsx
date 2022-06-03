import { getSuggestedQuery } from '@testing-library/react';
import React, { useContext, useState } from 'react';
import {Nav, Navbar} from 'react-bootstrap'
import{LinkContainer} from 'react-router-bootstrap'
import {ThemeContext} from './ThemeContext';
import { useNavigate, useParams, Link, Route } from 'react-router-dom';



const NavBar = ({open,setOpen,setModalIsOpen,modalIsOpen,setLoggedUser,logout}) => {
    //const [isLogged, setIsLogged] = useState(false)
    const [query, setQuery] = useState('')
    const navigate = useNavigate()
    //const navigateLogin = useNavigate(`/login`)

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/product/${query}`)
    }

    //logout fun was here

    
    const {theme, toggleTheme} = useContext(ThemeContext)
    return (
        <div className='header'>
            <div className='header-item'>
            <button onClick={() => logout()}>Kirjaudu ulos</button>
                <button onClick={toggleTheme}>{theme === 'light' ? 'dark' : 'light'}</button>
                </div> 

                <div className='header-item'>
                    <form onSubmit={handleSubmit}>
                        <input name='query' type='text' onChange={e => setQuery(e.target.value)}></input>
                        <button>Etsi</button>
                    </form>
                        
                </div>
                <div className='header-item'>
                    
                    
                </div>
                <LinkContainer to="/add/">
                    <Nav.Link ><h5>Lisää tuote</h5></Nav.Link>
                </LinkContainer>

                <LinkContainer to="/users/">
                    <Nav.Link ><h5>Käyttäjät</h5></Nav.Link>
                </LinkContainer>
                 
               
                
                
        </div>
    );
};

export default NavBar;
