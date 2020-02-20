import React, { Component } from 'react';
import GalleryItem from "./GalleryItem";
import './GalleryFolder.css';

// props: show_lightbox_handler()
// props: currentFolder
class GalleryFolder extends Component {

  render() {
    console.log("GalleryFolder: start render: ")
    console.log(this.props.currentFolder)

    return (
      <div className="gallery-content">
        { this.props.currentFolder.items.map( (item) =>
          <GalleryItem key={item.label} show_lightbox_handler={this.props.show_lightbox_handler} item = {item}/>
        )}
      </div>
    );
  }
}

export default GalleryFolder;