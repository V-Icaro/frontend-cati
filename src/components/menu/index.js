import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import './menu.css';

function Menu() {

    const dispatch = useDispatch();

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Sistema - CATI</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to={`/home`}>Manutenção</Link>
            </li>

            <li className="nav-item active dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Equipamentos
              </a>
              <div className="dropdown-menu font-text-white" aria-labelledby="navbarDropdownMenuLink1">
                <Link className="dropdown-item" to={'/computador'}>Computadores</Link>
                <Link className="dropdown-item" to={'#'}>Notebooks</Link>
                <Link className="dropdown-item" to={'#'}>Monitores</Link>
                <Link className="dropdown-item" to={'#'}>Estabilizadores</Link>
                <Link className="dropdown-item" to={'#'}>Smartphones</Link>
                <Link className="dropdown-item" to={'#'}>Tablets</Link>
              </div>
            </li>

            <li className="nav-item active dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Cadastrar
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
                <Link className="dropdown-item" to={'/novo-computador'}>Computadores</Link>
                <Link className="dropdown-item" to={'#'}>Notebooks</Link>
                <Link className="dropdown-item" to={'#'}>Monitores</Link>
                <Link className="dropdown-item" to={'#'}>Estabilizadores</Link>
                <Link className="dropdown-item" to={'#'}>Smartphones</Link>
                <Link className="dropdown-item" to={'#'}>Tablets</Link>
              </div>
            </li>
            
            <li className="nav-item active dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Opções
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <Link to="#" className="dropdown-item" onClick={() => dispatch({type: 'LOG_OUT'})} >Sair</Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>

    )
}

export default Menu