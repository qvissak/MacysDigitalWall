//Modules
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactTooltip from 'react-tooltip'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//User defined classes
import DetailsPage from '../detailsPage/DetailsPage';
import OverviewPage from '../overviewPage/OverviewPage';
import ReviewsPane from '../reviews/ReviewsPane';
import Tooltip from '../tooltip/Tooltip'
import CheckoutPage from '../checkoutPage/checkoutPg';
import * as TheWallApiUtil from '../../util/ThewallapiRestUtil'
import dataFetch from '../../util/DataFetch';
//Style Sheets
import './tabs.css';
import './requestmodal.css';
//Assets
import infoLogo from '../../assets/icons/icon-ui-info-f-red.svg';


class ItemMainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      displayModal: false,
      customerName: "",
      displayCheckout: true,
      disableSubmitButton: true
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updatedItemRequest = this.updatedItemRequest.bind(this);
    this.submitItemRequest = this.submitItemRequest.bind(this);
  }


  openModal() {
    this.setState({ sending: true })
    this.setState({ displayModal: true });
  }

  closeModal() {
    this.setState({ displayModal: false, disableSubmitButton: true, displayCheckout: true });
  }

  render() {
    return (
      <div className="item-mainpanel">

        <Tabs>
          <TabPanel>
            <div className="tab-panel">
              {/* Overview Page */}
              <OverviewPage openModal={this.openModal}
                selectUpcNumberCallback={this.props.selectUpcNumberCallback}
                selectedProductId={this.props.selectedProductId}
                selectedUpcNumber={this.props.selectedUpcNumber} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="tab-panel">
              {/* Details Page */}
              <DetailsPage openModal={this.openModal}
                selectedProductId={this.props.selectedProductId}
                selectedUpcNumber={this.props.selectedUpcNumber} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="tab-panel">
              {/* Reviews */}
              <ReviewsPane
                openModal={this.openModal}
                selectedProductId={this.props.selectedProductId} />
            </div>
          </TabPanel>

          <TabList>
            <Tab><div className="tab-content">Overview</div></Tab>
            <Tab><div className="tab-content">Details</div></Tab>
            <Tab><div className="tab-content">Reviews</div></Tab>
          </TabList>
        </Tabs>

        {/* -------------------------------REQUEST MODAL------------------------------------- */}
        <Modal show={this.state.displayModal} onHide={this.closeModal}
          container={this} aria-labelledby="contained-modal-title"
          className="modal-container" backdrop={'static'}>

          <Modal.Header >
            Request Item
          </Modal.Header>

          <Modal.Body>
            {/* PUT REQUEST COMPONENTS HERE */}
            <div className="modal-checkout-container">
              <CheckoutPage
                displayCheckout={this.state.displayCheckout}
                updatedItemRequestCallback={this.updatedItemRequest}
                selectUpcNumberCallback={this.props.selectUpcNumberCallback}
                handleChangeCheckout={this.handleChangeCheckout}
                selectedProductId={this.props.selectedProductId}
                selectedUpcNumber={this.props.selectedUpcNumber} />
            </div>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
            {/* DONT FORGET TO CHANGE SUBMIT's EVENT HANDLER!!! */}
            <Button disabled={this.state.disableSubmitButton} onClick={this.submitItemRequest}>Submit</Button>
          </Modal.Footer>

        </Modal>

        {/* <AddButton ref='addButton' onClick={this.onSubmit} /> */}


      </div>
    );
  }

  updatedItemRequest(upcNumber, customerName) {
    this.setState({
      selectedUpcNumber: upcNumber,
      customerName: customerName,
      disableSubmitButton: (customerName.length == 0)
    })
  }

  submitItemRequest() {
    var activeUpcData = dataFetch.getUpcItemDataEasyUsage(this.props.selectedProductId, this.props.selectedUpcNumber);
    var price = (activeUpcData.salePrice === "No sale price available") ? activeUpcData.regularPrice : activeUpcData.salePrice;
    TheWallApiUtil.postNewItemRequest('313', this.props.selectedProductId, activeUpcData.itemName, this.props.selectedUpcNumber, activeUpcData.colorName, price, this.state.customerName).then(() => {
      console.log("finished adding item to database")
    })
    //disable submit button
    this.setState({ disableSubmitButton: true })
    //show the checkout confirmation page
    this.updateDisplayCheckout(false)
  }

  updateDisplayCheckout(displayCheckout) {
    this.setState({ displayCheckout: displayCheckout });
  }
}

export default ItemMainPanel
