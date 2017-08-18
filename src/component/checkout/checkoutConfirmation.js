import React from 'react';
import './checkout.css';

export default class CheckoutConfirmation extends React.Component {
  // props to be passed in are bool confirmation, name and color
  constructor(props) {
    super(props);
  }
  render (){
    return (
      <div className="default-checkout-landing">
        <div className="default-checkout">
          <h3>Thank you for your submission!</h3>
          <br/>
          <p>
            Please go the checkout station to your left.
            <br/>
            An employee will meet you there with your item shortly.
            <br/>
            Feel free to request more items from the tabs below!
          </p>
        </div>

      </div>
    );
  }
}
