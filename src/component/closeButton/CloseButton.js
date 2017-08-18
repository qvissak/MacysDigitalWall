import React from 'react';
import classNames from 'classnames';
//Style Sheets
import './closeButton.css'
//Assets
import leftArrow from '../../assets/icons/icon-ui-chevron-left-sm-gr.svg';
import rightArrow from '../../assets/icons/icon-ui-chevron-right-sm-gr.svg';

export default class CloseButton extends React.Component{
  constructor(props) {
    super(props);
    this.closePanel = this.closePanel.bind(this);
  }

  closePanel(){
    this.props.onClick();
  }

  render(){
    if(this.props.direction === "left") {
      return(
        <div onClick={this.closePanel}
          className={classNames("close-button-container",this.props.direction, this.props.closebutton)}>
          <img src={leftArrow} className="close-button" alt="close"  />
        </div>
      );
    }
    else {
      return(
        <div onClick={this.closePanel}
          className={classNames("close-button-container",this.props.direction, this.props.closebutton)}>
          <img src={rightArrow} className="close-button" alt="close"  />
        </div>
      );
    }
  }
}
