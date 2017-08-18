import React from 'react';
import { Button, Modal } from 'react-bootstrap';
//User defined classes
import Header from '../Header/Header';
import ItemImages from '../itemImages/ItemImages';
import ItemOverview from '../itemOverview/ItemOverview';
import AddButton from '../addButton/AddButton';
import Tooltip from '../tooltip/Tooltip';
//Style Sheets
import './overview.css';
import '../itemMainPanel/requestmodal.css';
import dataFetch from '../../util/DataFetch';
//Assets
import available from '../../assets/icons/icon-ui-validation-f.svg';
import unavailable from '../../assets/icons/icon-ui-close-f-red.svg';

export default class OverviewPage extends React.Component {
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
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.selectedUpcNumber !== nextProps.selectedUpcNumber) {
      var activeUpcData = dataFetch.getUpcItemDataEasyUsage(nextProps.selectedProductId, nextProps.selectedUpcNumber);
      this.setState({ item: activeUpcData });
    }
  }

  componentWillMount() {
    console.log()
    var activeUpcData = dataFetch.getUpcItemDataEasyUsage(this.props.selectedProductId, this.props.selectedUpcNumber);
    this.setState({ item: activeUpcData });
  }

  getAvailability(){
    if (this.state.item.availability != 0){
      return (
        <div>
          <p><img src={available} width="20px" height="20px"/> <b>Availability In-Store:</b> {this.state.item.availability}</p>
        </div>
      )
    } else
      return (
        <div>
          <p><img src={unavailable} width="20px" height="20px"/> <b>Availability In-Store:</b> Out of Stock</p>
          <p>We're sorry, this item is currently not available at this location. Please check online using the product's Web ID.</p>
        </div>
      )
  }
  render() {
    var avail = this.getAvailability ();
    return (
      <div className="overviewpg-container">

        <div className="top-div-ovr">
          <Header webid={this.props.selectedProductId} />
          <Tooltip tip="If you like this item,<br/> press Request Item <br/>to get your own!" position="top-right-corner" />

        </div>
        {/* LEFT */}
        <div className="bottom-div-ovr">
          <div className="left-div-ovr">
            <ItemImages selectedUpcNumber={this.props.selectedUpcNumber}
              selectedProductId={this.props.selectedProductId} />
            {/*<Tooltip tip="Swipe left or right<br/> to see other colors!" position="bottom-left-corner"/>*/}
          </div>
          {/* RIGHT */}
          <div className="right-div-ovr">
            <div className="right-top-div-ovr">
                <ItemOverview selectedUpcNumber={this.props.selectedUpcNumber}
                  selectUpcNumberCallback={this.props.selectUpcNumberCallback}
                  selectedProductId={this.props.selectedProductId} />
            </div>
            <div className="right-bot-div-ovr">
              {avail}
            </div>
          </div>
          <AddButton ref='addButton' onClick={this.props.openModal} />
        </div>
        <Tooltip tip="Touch the swatches above <br/> item availability to see the <br/> item in different colors!" position="bottom-left-corner" />
      </div>
    );

  }
}
