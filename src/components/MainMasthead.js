import React, { Component } from 'react';
import './MainMasthead.css';

class MainMasthead extends Component {
  render() {
    return (
      <div className="main-header-image">
        <header className="masthead">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 text-center">
                <h1 className="name">MONIKA HEDMAN</h1>
                <h2 className="titles">
                  <span id="illustrator">ILLUSTRATOR.</span>
                  <span id="animator">ANIMATOR.</span>
                  <span id="programmer">PROGRAMMER.</span></h2>
              </div>

            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default MainMasthead;