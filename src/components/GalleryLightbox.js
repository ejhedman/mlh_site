import React, { Component } from 'react';
import './GalleryLightbox.css';

function getWindowWidth() {
  return typeof global.window !== 'undefined' ? global.window.innerWidth : 0;
}

function getWindowHeight() {
  return typeof global.window !== 'undefined' ? global.window.innerHeight : 0;
}

class GalleryLightbox extends Component {

  // props: item
  constructor(props) {
    super(props);
    this._clickClose = this._clickClose.bind(this);
    this._clickCloseInfo = this._clickCloseInfo.bind(this);
    this._clickInfo = this._clickInfo.bind(this);
    this.state = { infoOpen: false }

    this.outerEl = React.createRef();
    this.imageCache = {};

    const generateLoadDoneCallback = (imageSrc) => err => {

      console.log("Load Done Callback")
      // Give up showing image on error
      if (err) {
        return;
      }

      // // Don't rerender if the src is not the same as when the load started
      // // or if the component has unmounted
      // if (this.props[srcType] !== imageSrc || this.didUnmount) {
      //   return;
      // }

      // Force rerender with the new image
      this.forceUpdate();
    };

    this.loadImage(this.props.item.image_href, generateLoadDoneCallback(this.props.item.image_href) );

  }

  _clickClose() {
    console.log("GalleryLightbox: start close")
    this.props.close_lightbox_handler()
    console.log("GalleryLightbox: end close")
  }

  _clickInfo() {
    console.log("GalleryLightbox: start info")
    this.setState( { infoOpen: true })
    console.log("GalleryLightbox: end info")
  }

  _clickCloseInfo() {
    console.log("GalleryLightbox: start close info")
    this.setState( { infoOpen: false })
    console.log("GalleryLightbox: end closeinfo")
  }

  getWindowWidth() {
    return typeof global.window !== 'undefined' ? global.window.innerWidth : 0;
  }

  getWindowHeight() {
    return typeof global.window !== 'undefined' ? global.window.innerHeight : 0;
  }

  getLightboxRect() {
    if (this.outerEl.current) {
      return this.outerEl.current.getBoundingClientRect();
    }

    return {
      width: this.getWindowWidth(),
      height: this.getWindowHeight(),
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
  }

    // Get sizing for when an image is larger than the window
    getFitSizes(width, height) {
      const boxSize = this.getLightboxRect();
      // let maxHeight = boxSize.height - this.props.imagePadding * 2;
      // let maxWidth = boxSize.width - this.props.imagePadding * 2;
      let maxHeight = boxSize.height;
      let maxWidth = boxSize.width;

      const maxRatio = maxWidth / maxHeight;
      const srcRatio = width / height;

      if (maxRatio > srcRatio) {
        // height is the constraining dimension of the photo
        return {
          width: (width * maxHeight) / height,
          height: maxHeight,
        };
      }

      return {
        width: maxWidth,
        height: (height * maxWidth) / width,
      };
    }

   // Check if image is loaded
   isImageLoaded(imageSrc) {
    return (
      imageSrc &&
      imageSrc in this.imageCache &&
      this.imageCache[imageSrc].loaded
    );
  }

    // Load image from src and call callback with image width and height on load
    loadImage(imageSrc, done) {
      // Return the image info if it is already cached
      if (this.isImageLoaded(imageSrc)) {
        this.setTimeout(() => {
          done();
        }, 1);
        return;
      }

      const inMemoryImage = new global.Image();

      // if (this.props.imageCrossOrigin) {
      //   inMemoryImage.crossOrigin = this.props.imageCrossOrigin;
      // }

      inMemoryImage.onerror = errorEvent => {
        // this.props.onImageLoadError(imageSrc, srcType, errorEvent);

        // // failed to load so set the state loadErrorStatus
        // this.setState(prevState => ({
        //   loadErrorStatus: { ...prevState.loadErrorStatus, [srcType]: true },
        // }));

        done(errorEvent);
      };

      inMemoryImage.onload = () => {
        // this.props.onImageLoad(imageSrc, srcType, inMemoryImage);

        this.imageCache[imageSrc] = {
          loaded: true,
          width: inMemoryImage.width,
          height: inMemoryImage.height,
        };


        done();
      };

      inMemoryImage.src = imageSrc;
    }

    getBestImageForType(imageSrc) {
      let fitSizes = {};

      if (this.isImageLoaded(imageSrc)) {
        console.log("IMAGE IS LOADED")
        // Use full-size image if available

        console.log("---------------")
        console.log(this.imageCache[imageSrc])

        fitSizes = this.getFitSizes(
          this.imageCache[imageSrc].width,
          this.imageCache[imageSrc].height
        );
      } else {
        console.log("IMAGE IS NOT***** LOADED")
        return null;
      }

      return {
        src: imageSrc,
        height: this.imageCache[imageSrc].height,
        width: this.imageCache[imageSrc].width,
        targetHeight: fitSizes.height,
        targetWidth: fitSizes.width,
      };
    }

    static getTransform({ width, targetWidth }) {
      var x = 0;
      var y = 0;
      var zoom = 1;
      let nextX = x;
      const windowWidth = getWindowWidth();

      console.log("WindowWidth: " + windowWidth)
      console.log("width: " + width)
      if (width > windowWidth) {
        nextX += (windowWidth - width) / 2;
      }
      nextX = 0
      const scaleFactor = zoom * (targetWidth / width);

      return {
        transform: `translate3d(${nextX}px,${y}px,0) scale3d(${scaleFactor},${scaleFactor},1)`,
      };
    }

  render() {
    console.log("GalleryLightbox: start render")

    const boxSize = this.getLightboxRect();
    const bestImageInfo = this.getBestImageForType(this.props.item.image_href);

    // const imageStyle = {
    //   ...GalleryLightbox.getTransform({
    //     ...bestImageInfo,
    //   }),
    // };

    var imageStyle = {}
    if (bestImageInfo != null) {
      imageStyle = {
        width: bestImageInfo.targetWidth,
        height: 'auto'
      };
    }

    console.log("BOX SIZE: ")
    console.log(boxSize)
    console.log("best INFO: ")
    console.log(bestImageInfo)
    console.log("style: ")
    console.log(imageStyle)


    let info = ''
    if (this.state.infoOpen) {
      info =   (
            <div  style={{ padding: "10px" }} className="info-dropdown">
              <span onClick={ this._clickCloseInfo } className="close-info image-button"><i className="far fa-times-circle" size="lg" style={{ fontSize: "2em" }} ></i></span>
                <div className="image-info">
                <h3>{ this.props.item.title}</h3>
                <p style={{ color: "red" }}>{ this.props.item.description} </p>
               </div>
             </div>
              )
      } else {
       info =        <span onClick={ this._clickInfo } className="open-info image-button"><i className="fas fa-info-circle" size="lg" style={{ fontSize: "2em" }}></i></span>
    }
    return (
      <div className="" id="lightbox">
        <div className="dark-overlay"></div>
        <div ref={this.outerEl} className="main-overlay">
          <div className="col-xs-8 col-sm-8 col-md-8" style={{ padding: 0 }}>
            <div style={{ position: "relative" }} >
              <img  style={imageStyle} className="col-12 image-main" src={ this.props.item.image_href } alt="Example image" />
              <span onClick={ this._clickClose } className="close-lightbox image-button"><i className="far fa-times-circle" size="lg" style={{ fontSize: "2em" }}></i></span>
            </div>
              {  info }
          </div>
        </div>
      </div>
    );
  }
}

export default GalleryLightbox;