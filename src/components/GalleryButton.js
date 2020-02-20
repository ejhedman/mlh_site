import React, { Component } from 'react';
import './GalleryButton.css';

class GalleryButton extends Component {

  // props: folder
  // props: currentFolder
  // props: folder_click_handler(folder)
  constructor(props) {
    super(props);
    this._click = this._click.bind(this);
  }

  _click() {
    console.log("GalleryButton: start click button: ")
    this.props.folder_click_handler(this.props.folder)
    console.log("GalleryButton: end click button: ")
  }

  render() {
    console.log("GalleryButton: start render: ")
    var active = (this.props.currentFolder.label === this.props.folder.label) ? 'active' : ''
    return (
      <span onClick={this._click} className= { 'filter button '+ active } >{this.props.folder.label}</span>
    );
  }
}

export default GalleryButton;