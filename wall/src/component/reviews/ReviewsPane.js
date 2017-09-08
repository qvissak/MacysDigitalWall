import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Slider from 'react-slick';
import classNames from 'classnames';
import ReviewPanel from './ReviewPanel';
import DataFetch from '../../util/DataFetch';
import AddButton from '../addButton/AddButton';
import DefaultReviewLanding from './DefaultReviewLanding';
import './Reviews.css';
import '../itemMainPanel/requestmodal.css';
import Tooltip from '../tooltip/Tooltip';
import upArrow from '../../assets/icons/icon-ui-chevron-up-f-gr.svg';
import downArrow from '../../assets/icons/icon-ui-chevron-down-f-gr.svg';

export default class ReviewsPane extends React.Component {
    constructor(props) {
        super(props);
        this.scrollUp = this.scrollUp.bind(this);
        this.scrollDown = this.scrollDown.bind(this);
        this.getReviewData = this.getReviewData.bind(this);

        this.state = {
            allReviewData: [],
        };

    }
    componentWillMount() {
        this.getReviewData(this.props.selectedProductId)

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedProductId !== nextProps.selectedProductId) {
            this.getReviewData(nextProps.selectedProductId)
        } else console.log("props have not changed")
    }

    getReviewData(productId) {
        var reviewsForProductId = DataFetch.getReviewsData(productId);
        if (reviewsForProductId) {
            var actualReviews = reviewsForProductId.reviewResponse.reviews.items;
            this.setState({ allReviewData: actualReviews })
        } else {
            console.log("could not get data  " + productId)
        }
    }

    scrollUp() {
        this.slider.slickPrev();
    }

    scrollDown() {
        this.slider.slickNext();
    }

    render() {
        var settings = {
            arrows: false,
            focusOnSelect: true,
            draggable: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            vertical: true
        };
        var sideButtonStatus = this.state.allReviewData.length > 1 ? "active" : "disabled";
        if (typeof this.state.allReviewData === 'undefined' || this.state.allReviewData.length === 0) {
            return (
                <DefaultReviewLanding selectedProductId={this.props.selectedProductId} openModal={this.props.openModal} />
            )
        } else
            return (
              <div className="reviewspg-container">
                <div className="reviews-panel">

                    <img src={upArrow} onClick={this.scrollDown} className={classNames("sidepanel-button-rev", sideButtonStatus)}
                    id="sidepanel-button-up" alt="Up" />
                    <Slider ref={c => this.slider = c} {...settings}>
                        {
                        this.state.allReviewData.map((review, index) =>
                            <div key={index} className="reviews-panel-desc">
                            <ReviewPanel reviewData={review} />
                            </div>
                        )
                        }
                    </Slider>
                    <img src={downArrow} onClick={this.scrollUp} className={classNames("sidepanel-button-rev", sideButtonStatus)}
                    id="sidepanel-button-up" alt="Down" />
                    <Tooltip tip="If you like this item,<br/> press Request Item <br/>to get your own!" position="top-right-corner-reviews"/>
                    <Tooltip tip="Use the arrows to<br/> scroll through reviews!" position="bottom-left-corner"/>
                </div>
                <AddButton ref='addButton' onClick={this.props.openModal} />
              </div>

            );
    }
}
