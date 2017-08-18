import React from 'react';
import classNames from 'classnames';
// import ScaleText from 'react-scale-text';
// Style Sheets
import './tapHereButton.css'
// Assets
import leftArrow from '../../assets/icons/icon-ui-chevron-left-sm-wh.svg';
import rightArrow from '../../assets/icons/icon-ui-chevron-right-sm-wh.svg'

export default class TapHereButton extends React.Component{
  //properties: direction (left/rt),
  constructor(props) {
    super(props);
    this.openPanel = this.openPanel.bind(this);
  }

  openPanel(){
    this.props.onClick();
  }

  render() {

    if(this.props.direction === "left"){
      return(
        <div className={classNames("taphere-container", this.props.direction,this.props.taphere)}
          onClick={this.openPanel}>
          <img src={this.props.direction === "left" ? leftArrow : rightArrow}
            className={classNames("taphere-arrow", this.props.direction)} alt="TAP HERE" />
          <div className={classNames("taphere-text", this.props.direction)}>TAP HERE</div>
        </div>
      );
    }
    else {
      return(
        <div className={classNames("taphere-container", this.props.direction,this.props.taphere)}
          onClick={this.openPanel}>
          <div className={classNames("taphere-text", this.props.direction)}>TAP HERE</div>
          <img src={this.props.direction === "left" ? leftArrow : rightArrow}
            className={classNames("taphere-arrow", this.props.direction)} alt="TAP HERE" />
        </div>
      );
    }
  }
}
