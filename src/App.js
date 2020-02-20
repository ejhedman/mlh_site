import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'

import MainNav from "./components/MainNav";
import MainMasthead from "./components/MainMasthead";
import MainGallery from "./components/MainGallery";
import PageAbout from "./pages/PageAbout";
import PageResume from "./pages/PageResume";
import GalleryLightbox from "./components/GalleryLightbox";

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.show_lightbox_handler = this.show_lightbox_handler.bind(this)
    this.close_lightbox_handler = this.close_lightbox_handler.bind(this)
    this.folder_click_handler = this.folder_click_handler.bind(this)

    this.state = {
      galleryDefinition:  null,
      currentFolder:      null,
      lightboxItem:       null,
      lightboxIsOpen:     false }
    }

  show_lightbox_handler(item) {
    console.log("App: start show lightbox handler")
    this.setState( { lightboxItem: item, lightboxIsOpen: true })
    console.log("App: end show lightbox handler")
  }

  close_lightbox_handler(item) {
    console.log("App: start close lightbox handler")
    this.setState( { lightboxItem: null, lightboxIsOpen: false })
    console.log("App: end close lightbox handler")
  }

  folder_click_handler(folder) {
    console.log("MainGallery: start folder click handler")
    this.setState( { currentFolder: folder })
    console.log("MainGallery: end folder click handler")
  }


  componentDidMount() {
    var th = this;
    this.serverRequest =
        axios.get("./gallery.json")
            .then(function(result) {
                  var gallery = result.data
                  console.log("received gallery response")
                  var currentFolder = null;
                  if (gallery != null) {
                    currentFolder = Object.entries(gallery).filter( ([k,v]) => { return(v["active"] === true) } )[0][1]
                    console.log("Compute Current Folder: ")
                    console.log(currentFolder)
                  }
                  th.setState({
                    galleryDefinition: result.data,
                    currentFolder:     currentFolder
                });
            })
  }

  render() {
    console.log("App: start render")
    console.log(this.state.currentFolder)
    return (
      <div className="inner-main-content">
          <div className="page-content">
              <Router>
              <MainNav/>
              <MainMasthead/>
                <Route path="/" exact render={ () => <MainGallery gallery={ this.state.galleryDefinition }
                                                                  currentFolder={ this.state.currentFolder }
                                                                  show_lightbox_handler={this.show_lightbox_handler}
                                                                  folder_click_handler={this.folder_click_handler} /> }/>
                <Route path="/about" component={PageAbout}/>
                <Route path="/resume" component={PageResume}/>
              </Router>
          </div>

          { this.state.lightboxIsOpen && (
            <GalleryLightbox
              mainSrc={ this.state.lightboxItem.image_href }
              close_lightbox_handler={ this.close_lightbox_handler }
              item = { this.state.lightboxItem }
            />
          )}
      </div>
    );
  }
}

export default App;
