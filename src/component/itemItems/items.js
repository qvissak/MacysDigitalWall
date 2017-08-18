import React, {Component} from 'react';

export const ITEMS = [
  {
    webid : 3036330,
    brand : "INC International Concepts",
    name : "Sonng Satchel",
    macysExclusive : true,
    description : "INC International Concept's supple faux leather satchel rocks a spacious shape, antiqued studs and a unique guitar-style strap that''s so in right now.",
    material : "Faux leather",
    origin : "Imported",
    specialOffers : "20% off sitewide!"
  },
  {
    webid : 3430617,
    brand : "INC International Concepts",
    name : "Melly Starburst Tote",
    macysExclusive : true,
    description : "Starburst perforations lend a chic element to an open-top tote finished with scalloped edges from INC International Concepts. The interior zip pocket is perfect for stashing personal items like your lipstick and phone, while the main compartment effortlessly accommodates larger essentials on-the-go.",
    material : "Faux leather",
    origin : "Imported",
    specialOffers : "Sorry! None available at this time."
  }

]

class itemsSelection extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: ITEMS
    };
  }
}

export default itemsSelection;
