import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './checkout.css';
import * as TheWallApiUtil from '../../util/ThewallapiRestUtil'
import dataFetch from '../../util/DataFetch';
import KeyboardedInput from 'react-touch-screen-keyboard';

export default class Checkout extends React.Component {
  // props to be passed in are webid and upcNumber
  constructor(props) {
    super(props);
    this.state = {
      selectedUpcNumber: this.props.selectedUpcNumber,
      customerName: "",
      item: {
        productId: " ",
        salePrice: " ",
        regularPrice: " ",
        availability: 0,
        colorName: " ",
        colorURL: " ",
        allColors: " ",
        reviewAvgRating: 0,
        reviewCount: 0
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

    this.getDropdownItems = this.getDropdownItems.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
  }

  componentWillMount() {
    this.getUpcInfo(this.props.selectedProductId, this.props.selectedUpcNumber);
  }

  componentWillUnmount() {
    this.setState({ customerName: "" });
  }

  getUpcInfo(selectedProductId, selectedUpcNumber) {
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

  //goes through each good upc and adds it as an option of the dropdown.
  getDropdownItems() {
    let display = [];
    for (var i = 0; i < this.state.upcInfos.length; i++) {
      let swatchColorName = this.state.upcInfos[i].color.name;
      let swatchImageUrl = this.state.upcInfos[i].swatchImageUrl;
      let availability = this.state.upcInfos[i].availabilityCount;
      display.push(<MenuItem disabled={availability === 0} value={this.state.upcInfos[i].upcNumber} key={this.state.upcInfos[i].upcNumber} label={swatchColorName} /*leftIcon={}*/ primaryText={`${swatchColorName} : ${availability} in stock`} />)
    }
    return display;
  }

  handleChangeName(value) {
    this.setState({
      customerName: value
    })
    this.props.updatedItemRequestCallback(this.state.selectedUpcNumber, value)
  }

  handleChangeColor(event, index, newUpcNumber) {
    this.setState({ selectedUpcNumber: newUpcNumber });
    //update the selectedUpcNumber and then pass it up to parent.
    this.props.selectUpcNumberCallback(newUpcNumber)
  }
  getSalePriceIfNeeded() {
    if (this.state.item.salePrice != this.state.item.regularPrice) {
      return (
        <div className="sale-item">NOW: {this.state.item.salePrice}</div>
      )
    }
  }

  render() {
    var salePrice = this.getSalePriceIfNeeded();
    return (
      <div>

        <div className="chk-prices">
          {salePrice} Orig. {this.state.item.regularPrice}
        </div>
        <div className="enter-info">
          <form>

            <label>
              Your name:
              <KeyboardedInput
                enabled
                onChange={this.handleChangeName}
                value={this.state.customerName}
                placeholder={"Please enter your name"}
                defaultKeyboard="us"
                readOnly={false}
                step={this.step}
              />


              {/* <input type="text" onChange={this.handleChangeName} /> */}
            </label>
          </form>
        </div>
        <div className="color-select">
          <p className="bold">Choose color:</p>

          <MuiThemeProvider className="color-dropdown">
            <DropDownMenu maxHeight={100} value={this.state.selectedUpcNumber} onChange={this.handleChangeColor}>
              {this.getDropdownItems()}
            </DropDownMenu>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
};
