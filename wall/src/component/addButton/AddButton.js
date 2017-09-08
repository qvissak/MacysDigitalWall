import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './AddButton.css';

class AddButton extends Component {
  constructor (props) {
    super(props)

    this.state = {
      sending: false
    };

    this.onSend = this.onSend.bind(this)
    this.onCancelSend = this.onCancelSend.bind(this)
  }

  onSend () {
    this.setState({sending: true})
  }

  onCancelSend () {
    this.setState({sending: false})
  }

  render () {
    return (
      <div className="add-button">
        <Button bsClass="btn" active={false} onClick={this.props.onClick}>REQUEST ITEM</Button>
      </div>
    )
  }
}

export default AddButton
