import React from 'react';
import classNames from 'classnames';
import ItemMainPanel from '../itemMainPanel/ItemMainPanel'
import ItemSidePanel from '../itemSidePanel/ItemSidePanel'
import DataFetch from '../../util/DataFetch'
// DONT REMOVE ITEM SIDE PANEL OR ITEM MAIN PANEL -- itll screw up
// the panel spacing, create child components intead

export default class ItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.newSelectedProductIdCallback = this.newSelectedProductIdCallback.bind(this);
    this.newSelectedUpcNumberCallback = this.newSelectedUpcNumberCallback.bind(this);

    this.state = {
      selectedProductId: this.props.productIds[0],
      selectedUpcNumber: 0
    };
  }
  componentWillMount() {
    console.log(this.state.selectedProductId);


    this.setState({ selectedUpcNumber: DataFetch.getFirstGoodUpcNumber(this.state.selectedProductId) })
  }
  newSelectedProductIdCallback(newlySelectedProductId) {
    this.setState({ selectedProductId: newlySelectedProductId, selectedUpcNumber: DataFetch.getFirstGoodUpcNumber(newlySelectedProductId) });
  }

  newSelectedUpcNumberCallback(newlySelectedUpcNumber) {
    this.setState({ selectedUpcNumber: newlySelectedUpcNumber });
  }

  render() {
    return (
      <div className={classNames("item-container", this.props.panel)}>
        <ItemSidePanel selectProductIdCallback={this.newSelectedProductIdCallback} selectedProductId={this.state.selectedProductId} productIds={this.props.productIds} />
        <ItemMainPanel selectUpcNumberCallback={this.newSelectedUpcNumberCallback} selectedUpcNumber={this.state.selectedUpcNumber} selectedProductId={this.state.selectedProductId} />
      </div>
    );
  }
}
