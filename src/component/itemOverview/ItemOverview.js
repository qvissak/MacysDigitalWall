import React from 'react';
import AverageRatingStars from '../averageRatingStars/AverageRatingStars';
import dataFetch from '../../util/DataFetch';
import '../details/details.css';
import './overview.css';

class ItemOverview extends React.Component {
  // props are productId and upcNumber
  constructor(props) {
    super(props);
    this.state = {
      item: {
        productId: " ",
        salePrice: " ",
        regularPrice: " ",
        availability: 0,
        colorName: " ",
        colorURL: " ",
        allColors: " ",
        reviewAvgRating: 0,
        reviewCount: 0,
      },
      upcInfos: [
        {
          availabilityCount: 0,
          color: {
            id: {},
            colorwayId: {},
            name: {},
            normalName: {}
          }, prices: [{
            type: {},
            value: {}
          }],
          swatchImageUrl: {},
          size: {
            displayName: {},
            id: {}
          },
          upcNumber: {}
        }
      ]
    };
    this.getOverviewInformation = this.getOverviewInformation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedUpcNumber !== nextProps.selectedUpcNumber)
      this.getOverviewInformation(nextProps.selectedProductId, nextProps.selectedUpcNumber)
  }

  componentWillMount() {
    this.getOverviewInformation(this.props.selectedProductId, this.props.selectedUpcNumber)
  }

  getOverviewInformation(selectedProductId, selectedUpcNumber) {
    //we dont want to actually delte stuff from the dataFetchObject. we will clone it and make changes.
    var itemPdpData = JSON.parse(JSON.stringify(dataFetch.getPdpWithAvailability(selectedProductId)));

    //adds to an array indexes that we will remove from upc array
    var upcIndexesToRemove = [];
    for (var i = 0; i < itemPdpData.upcs.length; i++) {
      if (itemPdpData.upcs[i].prices === null) {
        upcIndexesToRemove.push(i);
      } else if (itemPdpData.upcs[i].availabilityCount == 0 && !itemPdpData.upcs[i].onlineActive) {
        //if item availability =0 and item is not onlineActive
        upcIndexesToRemove.push(i);
      }
    }


    //actually does the removing of upcs from array
    for (var x = upcIndexesToRemove.length - 1; x >= 0; x--) {
      itemPdpData.upcs.splice(upcIndexesToRemove[x], 1);
    }

    var activeUpcData = dataFetch.getUpcItemDataEasyUsage(selectedProductId, selectedUpcNumber);
    activeUpcData.reviewAvgRating = itemPdpData.avgRating;
    activeUpcData.reviewCount = itemPdpData.reviewCount;
    this.setState({
      item: activeUpcData,
      upcInfos: itemPdpData.upcs
    });
  }
  getSalePriceIfNeeded() {
    if (this.state.item.salePrice != this.state.item.regularPrice) {
      return (

        <td className="align-left sale-item">NOW: {this.state.item.salePrice} <br /></td>
      )
    }
  }
  render() {
    var salePrice = this.getSalePriceIfNeeded();
    return (
      <div>
        <div className="sticky-header ">
          <table>
            <tbody>
              <tr>
                <td className="align-left">
                  <AverageRatingStars numStars={this.state.item.reviewAvgRating} /> {this.state.item.reviewCount} Reviews
                 </td>
              </tr>
              <tr>
                <td className="align-left"><b>Web ID:</b> {this.props.selectedProductId}</td>
              </tr>
              <tr>
                <td className="align-left reg-price pad"><b>{salePrice} Orig.</b> {this.state.item.regularPrice}</td>
              </tr>
              <tr>
                <td className="align-left pad align-left-ovr"><b>Color:</b> {this.state.item.colorName}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="swatchColors">
          {
            this.state.upcInfos.map((upcInfo, index) =>
              <div key={index} className="swatchItem">
                <span>
                  <img className='swatchColorDetails' src={upcInfo.swatchImageUrl} width="25px" height="25px" onClick={() => {
                    {/* pass the new upc number to the parents. they'll update. and then this will also update via componentWillRecieveProps */ }
                    this.props.selectUpcNumberCallback(upcInfo.upcNumber)
                  }} />
                </span>
              </div>
            )
          }
        </div>
      </div>
    );
  }
};

export default ItemOverview;
