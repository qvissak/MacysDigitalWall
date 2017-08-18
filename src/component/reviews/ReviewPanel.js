import React from 'react';
import AverageRatingStars from '../averageRatingStars/AverageRatingStars';
import $ from 'jquery';
import './Reviews.css';

export default class ReviewPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="reviews-panel">
                <h4>{this.props.reviewData.reviewTitle}</h4>
                <div >
                    <AverageRatingStars numStars={this.props.reviewData.ratingValue} />
                    <p id="wrap">
                        {this.props.reviewData.reviewDesc}
                    </p>
                    <div>
                        <p>{this.props.reviewData.reviewDate}</p>
                    </div>
                </div>
            </div>
        );
    }
}
