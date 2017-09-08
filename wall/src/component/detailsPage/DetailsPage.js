import React from 'react';
import { Button, Modal } from 'react-bootstrap';
//User defined classes
import Header from '../Header/Header';
import ItemImages from '../itemImages/ItemImages';
import Details from '../details/details';
import AddButton from '../addButton/AddButton';
import Tooltip from '../tooltip/Tooltip';

//Style Sheets
import './detailsPg.css';


export default class OverviewPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="detailspg-container">
        {/*<div className="left-top-div-det">*/}
        <div className="top-div-det">
          <div >
            <Header webid={this.props.selectedProductId} />
            <Tooltip tip="If you like this item,<br/> press Request Item <br/>to get your own!" position="top-right-corner"/>
          </div>
        </div>
        <div className="bottom-div-det">
          <div className="left-div-det">
            <Details webid={this.props.selectedProductId} />
            {/*<Tooltip tip="Scroll down to check out more details,<br/> on this item, including <br/> material, style, and more!" position="bottom-left-corner"/>*/}
          </div>
          <div className="right-div-det">
            <ItemImages selectedUpcNumber={this.props.selectedUpcNumber}
              selectedProductId={this.props.selectedProductId} />
            {/*<Tooltip tip="Swipe left or right<br/> to see other colors!" position="bottom-left-corner"/>*/}
          </div>
          <Tooltip tip="Scroll down to check out more details,<br/> on this item, including <br/> material, style, and more!" position="bottom-left-corner"/>
        </div>
        <AddButton ref='addButton' onClick={this.props.openModal} />
      </div>
    );

  }
}
