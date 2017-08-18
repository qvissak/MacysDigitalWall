import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
//User defined classes
import dataFetch from '../../util/DataFetch';
import ItemSidePanelEntry from '../itemSidePanel/ItemSidePanelEntry';
import Tooltip from '../tooltip/Tooltip';
//Assets
import upArrow from '../../assets/icons/icon-ui-chevron-up-f-gr.svg';
import downArrow from '../../assets/icons/icon-ui-chevron-down-f-gr.svg';
//Style Sheets
import './sidepanel.css';


export default class ItemSidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.scrollUp = this.scrollUp.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
    this.handleEntrySelected = this.handleEntrySelected.bind(this);
    this.getBagImages = this.getBagImages.bind(this);

    this.state = {
      index: 0,
      productImages: [
        {
          productId: {},
          productPrimaryImageUrl: {}
        },
      ]
    };

  }

  componentWillMount() {
    this.interval = setInterval(this.getBagImages(), 5 * 1000)
  }


  getBagImages() {
    var numSuccessfulImagesReceived = 0;
    var newProductImages = [];
    for (var index = 0; index < this.props.productIds.length; index++) {
      //for each product id we will go and get the image. and put it into an object array
      //each object has the structure of:{productId:####,productPrimaryImageUrl:####}
      //we will set the state with the data we have but the loop doesnt finish till we get alll images

      var bagPdpData = dataFetch.getPdpData(this.props.productIds[index]);
      let bagImage = null;
      if (bagPdpData) {
        bagImage = bagPdpData.primaryImageUrl;
        var productImageObject = {
          productId: this.props.productIds[index],
          productPrimaryImageUrl: bagImage
        };
        newProductImages = newProductImages.concat(productImageObject);
      }
    }
    this.setState({ productImages: newProductImages });
    //JOSH -  need to test if this clear interval actually works or not
    if (newProductImages.length == this.props.productIds.length) {
      //clear interval
      clearInterval(this.interval);
    }
  }

  scrollUp() {
    this.slider.slickPrev();
  }

  scrollDown() {
    this.slider.slickNext();
  }

  //updates parent that a new product Id was selected.
  //Josh -  not sure what we use newIndex variable for.
  handleEntrySelected(newIndex, selectedProductId) {
    this.setState({ index: newIndex });
    //update parent of the selected product Id
    this.props.selectProductIdCallback(selectedProductId);
  }

  render() {
    var settings = {
      arrows: false,
      focusOnSelect: false,
      draggable: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      centeredMode: false
    };

    var fillers = [];
    var i;
    for(i = 0; i < 3 - this.props.productIds.length; i++){
      fillers.push(
        <div key={i} className="sidepanel-entry">
          <ItemSidePanelEntry name="Empty" itemImageInfo={[]} alt="empty" status="disabled"/>
        </div>
      );
    }
    var sideButtonStatus = this.props.productIds.length > 3 ? "active" : "disabled";

    var index = 0;
    return (
      <div className="item-sidepanel">
        <div id="sidepanel-text">Other Items in this Collection</div>
        <img src={upArrow} onClick={this.scrollUp} className={classNames("sidepanel-button", sideButtonStatus)}
        id="sidepanel-button-up" alt="Up" />

        <hr className="sidepanel-hr" id="sidepanel-hr-top"></hr>

        <Slider className="sidepanel-slider" ref={c => this.slider = c} {...settings}>
          {
            this.state.productImages.map((itemEntry) =>
              <div key={itemEntry.productId} className="sidepanel-entry">
                <ItemSidePanelEntry name={"Handbag" + ++index} index={index}
                  itemImageInfo={itemEntry} alt={"bag" + index} onClick={this.handleEntrySelected}
                  isSelected={this.props.selectedProductId == itemEntry.productId} status="active"/>
              </div>
            )
          }
          {fillers}
        </Slider>

        <hr className="sidepanel-hr" id="sidepanel-hr-bot"></hr>

        <img src={downArrow} onClick={this.scrollDown} className={classNames("sidepanel-button", sideButtonStatus)}
        id="sidepanel-button-down" alt="Down"/>

        <Tooltip tip="Tap the arrows to scroll<br/> through this collection!" position="side-panel"/>
      </div>
    );
  }
}
