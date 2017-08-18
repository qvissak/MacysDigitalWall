import React from 'react';
//User defined classes
import Header from '../Header/Header';
import ItemImages from '../itemImages/ItemImages';
import Checkout from '../checkout/checkout';
import AddButton from '../addButton/AddButton';
import CheckoutConfirmation from '../checkout/checkoutConfirmation';
import * as TheWallApiUtil from '../../util/ThewallapiRestUtil'
import dataFetch from '../../util/DataFetch';
//Style Sheets
import './checkoutPg.css';

// CHANGE ADD BUTTON ON LINES 36 AND 41!!
export default class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCheckout: true,
      disableSubmitButton: true,
    }
  }

  render() {
    return (
      <div className="plssavemenow">
        { this.props.displayCheckout ?
          <div className="checkoutpg-container">
            <div className="chk-top">
              <Header webid={this.props.selectedProductId} className="checkout-header" />
            </div>
            <div className="chk-bot">
              <div className="chk-bot-left">
                <Checkout
                  updatedItemRequestCallback={this.props.updatedItemRequestCallback}
                  selectUpcNumberCallback={this.props.selectUpcNumberCallback}
                  selectedProductId={this.props.selectedProductId}
                  selectedUpcNumber={this.props.selectedUpcNumber} />
              </div>
              <div className="chk-bot-right">
                <ItemImages selectedUpcNumber={this.props.selectedUpcNumber}
                  selectedProductId={this.props.selectedProductId} />
              </div>
            </div>
          </div>
          :
          <div className="checkoutpg-container">
            <CheckoutConfirmation />
          </div>
        }
      </div>
    );

  }
}
