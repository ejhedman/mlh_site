import React, { Component } from 'react';
import './GalleryItem.css';

class GalleryItem extends Component {

  // props: show_lightbox_handler(item)
  // props: item
  constructor(props) {
    super(props);
    this._click = this._click.bind(this);
  }

  _click() {
    console.log("GalleryItem: start click")
    this.props.show_lightbox_handler(this.props.item)
    console.log("GalleryItem: end click")
  }

  render() {
    console.log("GalleryItem: start render")
    return (
      <div onClick={this._click} className="gallery-content" >

        <div className="image-frame filter illustration">

          <div className="image-cover">
            <span className="zoom"><i className="fas fa-search-plus" size="lg"></i></span>
            <div className="image-title" style={{ height: "200px", width: "200px" }}>
              <h6 className="image-title-box">{this.props.item.label}</h6>
            </div>
          </div>

          <img className="item" src={this.props.item.thumbnail_href} alt={this.props.item.label}/>

        </div>

      </div>
    );
  }
}

export default GalleryItem;