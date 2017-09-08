import './Reviews.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import '../addButton/AddButton.css';
import Tooltip from '../tooltip/Tooltip';

export default class DefaultReviewLanding extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="default-review-landing">
                <Tooltip tip="If you like this item,<br/> press Request Item <br/>to get your own!" position="top-right-corner-reviews" />
                <div className="default-review">
                    <h3>Currently No Reviews</h3>
                    <br/>
                    <p>
                        <b>Be the first to write a review!</b>
                        <br />
                        Find the product online using the
                        <br/>
                        following WebID!
                    </p>
                    <h5>WebID: {this.props.selectedProductId}</h5>
                    <div className="add-button-2">
                      <Button bsClass="btn" active={false} onClick={this.props.openModal}>REQUEST ITEM</Button>
                    </div>
                </div>
            </div>
        );
    }
}
