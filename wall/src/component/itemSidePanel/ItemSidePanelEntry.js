import React from 'react';
import classNames from 'classnames';
import empty from '../../assets/empty.jpg';

export default class ItemSidePanelEntry extends React.Component {
  // props in this class:
  // name, index, src, src-alt, onClick, isSelected

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    if(this.props.status == 'active'){
      this.props.onClick(this.props.index, this.props.itemImageInfo.productId);
    }
  }

  render() {
    return (
      <div className= "entry-container" onClick={this.handleClick}>
        <div className={classNames("sidepanel-selector", (this.props.isSelected ? "active" : "disabled"))}></div>
        <img src={this.props.itemImageInfo.length != 0 ? this.props.itemImageInfo.productPrimaryImageUrl : empty}
          alt={this.props.alt} />
      </div>
    );
  }
}
