import React from 'react'
import ReactTooltip from 'react-tooltip'
import infoLogo from '../../assets/icons/icon-ui-info-f-red.svg';
import './Tooltip.css'

class Tooltip extends React.Component {
  constructor ()  {
    super()
  }

  render() {
    return (
        <div>
          <p data-tip={this.props.tip} data-event='click focus'>
            <div id="advanced" className={this.props.position}><img src={infoLogo} width="20" height="20"/></div>
          </p>
          <ReactTooltip globalEventOff='click' multiline={true}/>
        </div>
    )
  }
}

export default Tooltip
