import React from 'react';
import dataFetch from '../../util/DataFetch';
import './Header.css';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        webId: {},
        brand: {},
        name: {},
      }
    };
    this.getPDPInfo = this.getPDPInfo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.webid !== nextProps.webid) this.getPDPInfo(nextProps.webid)
  }

  componentWillMount() {
    this.getPDPInfo(this.props.webid)
  }

  getPDPInfo(webid) {
    var itemPDPData = dataFetch.getPdpData(webid);
    var itemBrand = itemPDPData.name.substring(0, 26);
    var itemName = itemPDPData.name.substring(27, itemPDPData.name.length)

    this.setState({ item: { webId: webid, brand: itemBrand, name: itemName } });

  }

  render() {
    return (
      <div>
        <div className="product-brand">{this.state.item.brand}</div>
        <div className="product-name">{this.state.item.name}</div>
      </div>
    )
  }
};

export default Header;
