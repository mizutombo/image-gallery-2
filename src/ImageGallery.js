import React, { Component } from 'react';

import images from './images';

import ImageSelectorBar from './ImageSelectorBar';
import DetailList from './DetailList';
import GalleryList from './GalleryList';
import ThumbnailList from './ThumbnailList';
import NewImageForm from './NewImageForm';

// establishes default state
export default class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'detail',
      images: images,
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.addImage = this.addImage.bind(this);
  }

  clickHandler(newView) {
    this.setState({
      currentView: newView
    });
  }

  addImage(imageToAdd) {
    // let newImages = this.state.images.splice();
    let newImages = [...this.state.images]; // makes copy of images array
    newImages.push(imageToAdd);
    this.setState({
      images: newImages
    });
  }

  deleteImage(imageToDelete) {
    let newImages = this.state.images.filter((image, idx) => {
      if (imageToDelete !== image) {
        return image;
      }
    });
    this.setState({
      images: newImages
    });
  }

  render() {
    let contents;
    
    if (this.state.currentView === 'thumbnail') {
      contents = < ThumbnailList images={this.state.images} deleteImage={this.deleteImage} addImage={this.addImage} />;
    }
    else if (this.state.currentView === 'gallery') {
      contents = < GalleryList images={this.state.images} deleteImage={this.deleteImage} addImage={this.addImage} />;
    }
    else {
      contents = < DetailList images={this.state.images} deleteImage={this.deleteImage} addImage={this.addImage} />;
    }
    return (
      <div>
        <ImageSelectorBar clickHandler={this.clickHandler} />
        <br />
        <NewImageForm addImage={this.addImage} />
        {contents}
      </div>
    );
  }

}
