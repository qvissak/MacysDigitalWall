import React from 'react';
//User defined classes
import ItemContainer from '../itemContainer/ItemContainer';
import TapHereButton from '../tapHereButton/TapHereButton';
import CloseButton from '../closeButton/CloseButton';
import DataFetch from '../../util/DataFetch';

export default class CollectionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.state = {
      opened: false,
      taphere: "active",
      closebutton: "disabled",
      panel: "disabled",
      isThereData: false
    };
  }

  handleOpen() {
    if (this.state.opened) this.setState({ opened: false });
    else this.setState({
      opened: true,
      taphere: "disabled",
      closebutton: "active",
      panel: "active"
    });
  }

  handleClose() {
    this.setState({
      opened: false,
      taphere: "active",
      closebutton: "disabled",
      panel: "disabled"
    });
  }

  renderPage() {
    if (this.props.direction === "left") {
      return (
        <div className="collection-container">
          <ItemContainer productIds={this.props.productIds} isVisible="item-container-visible" panel={this.state.panel} />
          <CloseButton onClick={this.handleClose}
            direction={this.props.direction}
            closebutton={this.state.closebutton} />
          <TapHereButton onClick={this.handleOpen}
            direction={this.props.direction}
            taphere={this.state.taphere} />
        </div>
      );
    }
    else {
      return (
        <div className="collection-container">
          <CloseButton onClick={this.handleClose}
            direction={this.props.direction}
            closebutton={this.state.closebutton} />
          <ItemContainer productIds={this.props.productIds} isVisible="item-container-hidden" panel={this.state.panel} />
          <TapHereButton onClick={this.handleOpen}
            direction={this.props.direction}
            taphere={this.state.taphere} />
        </div>
      );
    }
  }

  componentDidMount() {
    //get our data async
    DataFetch.getProductIdsData(this.props.productIds, "5133").then(() => {
      //finished getting our data. now set the state with this data.
      if (DataFetch.isThereData()) {
        this.setState({ isThereData: true });
      } else {
        console.log("returned and there isnt any data")
      }
    });
  }

  render() {
    if (this.state.isThereData) {
      return this.renderPage();
    } else {
      return (null);
    }
  }
}
