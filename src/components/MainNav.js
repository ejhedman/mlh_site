import React, { Component } from 'react';
import { Link  } from 'react-router-dom'
import './MainNav.css';

class MainNav extends Component {
  render() {
    return (
      <div className="main-navbar" id="main-navbar" style={ {position: 'relative'} } >
        <nav className="navbar navbar-expand-lg navbar-dark" data-spy="affix" style={ { zIndex: '1000', paddingTop: '40px', position: 'absolute', width: '100%' } }>
          <a className="navbar-brand" href="/">
            <h2 id="long-header">MONIKA HEDMAN</h2>
            <h2 id="short-header">MONIKA <br/> HEDMAN</h2>
          </a>
          <button className="navbar-toggler" id="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <div id="nav-icon3">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" style={ { justifyContent: 'flex-end' } } >
            <ul className="navbar-nav" id="nav-toChangeColor">

              <li className="nav-item">
                <Link className="nav-link" to="./about">
                  <h3 className="color-me-teal addBorder">ABOUT + CONTACT</h3>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="./resume">
                  <h3 className="color-me-teal addBorder">RESUME</h3>
                </Link>
              </li>

              <li>
                <a href="https://www.instagram.com/monikahedmanart/" target="_blank" rel="noopener noreferrer"> <i className="fab fa-instagram"
                    style={ { verticalAlign: 'middle', fontSize: '2em', marginTop: '0.35em', paddingLeft: '.5em', color: '#D4FCC3' } }></i></a>

                <a href="https://www.linkedin.com/in/monikahedman/" target="_blank" rel="noopener noreferrer"> <i className="fab fa-linkedin " style= { { verticalAlign: 'middle', fontSize: '2em', marginTop: '0.35em', paddingLeft: '.5em', color: '#D4FCC3' } } ></i></a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default MainNav;