import React, { Component } from 'react';

import GalleryFolder from "./GalleryFolder";
import GalleryButton from "./GalleryButton";
import './MainGallery.css';

class MainGallery extends Component {

  // props: current_folder
  // props: gallery
  // props: show_lightbox_handler(item)
  constructor(props) {
    super(props)
    // this.folder_click_handler = this.folder_click_handler.bind(this)

    // this.state = {
    //   gallery:        this.props.gallery,
    //   currentFolder: this.props.currentFolder,
    // }
  }

  // folder_click_handler(folder) {
  //   console.log("MainGallery: start folder click handler")
  //   this.setState( { currentFolder: folder })
  //   console.log("MainGallery: end folder click handler")
  // }

  render() {
    console.log("MainGallery: start render")
    console.log(this.props.currentFolder)
    var gallery = ''
    if (this.props.gallery != null && this.props.currentFolder != null) {
      gallery =  (<div>
                  <div className="gallery-list" id="gallery-list">
                  { Object.entries(this.props.gallery).map( ([key, folder]) =>
                    <GalleryButton key={key} currentFolder={this.props.currentFolder} folder={ folder } folder_click_handler={ this.props.folder_click_handler }/>
                  )}
                  </div>
                  <GalleryFolder currentFolder={this.props.currentFolder} show_lightbox_handler={this.props.show_lightbox_handler} />
                </div>)
    }

    return (
      <div className="gallery container" id="gallery-container">
        { gallery }
      </div>
    );
  }
}

export default MainGallery;