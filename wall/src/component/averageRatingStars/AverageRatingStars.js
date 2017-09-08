import React from 'react';
import greyStar from '../../assets/icons/icon-star-gr.svg';
import redStar from '../../assets/icons/icon-star-red.svg';

export default class AverageRatingsStars extends React.Component{
    constructor(props){
        super(props);
    }

    setRating(numStars) {
        const rating = numStars;
        const widthPercentage = (rating/5 * 100)*.78;
        const divStyle = {
            width: widthPercentage + "%",
        };
        return (divStyle);
    }

    render() {
        return (
            <span className="rating">
                <span className="starGrey">★★★★★</span>
                <span className="starRed" style={this.setRating(this.props.numStars)}>★★★★★</span>
            </span>
        )
    }
}
