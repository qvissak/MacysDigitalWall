import React from 'react';
import Slider from 'react-slick';
import dataFetch from '../../util/DataFetch';
import './images.css';


class ItemImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        imageUrl: ""
      }
    };
    this.getPhoto = this.getPhoto.bind(this);
  }

  componentWillMount() {
    // this.getPhotos(this.props.webid)
    this.getPhoto(this.props.selectedProductId, this.props.selectedUpcNumber)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedUpcNumber !== nextProps.selectedUpcNumber) this.getPhoto(nextProps.selectedProductId, nextProps.selectedUpcNumber)
  }

  getPhoto(selectedProductId, selectedUpcNumber) {
    var imageUrl = dataFetch.getPdpDataUpcImageUrl(selectedProductId, selectedUpcNumber)
    this.setState({ imageUrl: imageUrl });
  }

  render() {
    var settings = {
      arrows: false,
      dots: true,
      focusOnSelect: true,
      draggable: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      horizontal: true
    };

    return (
      <div className="image-sidepanel-images">
        <div className="sidepanel-entry-images">
          <img src={this.state.imageUrl} alt="bag1" width="70%" height="80%" />
        </div>
      </div>
    );
  }
}

export default ItemImages;
