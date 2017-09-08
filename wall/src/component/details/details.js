import React from 'react';
import dataFetch from '../../util/DataFetch';
import './details.css';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
          webId: {},
          name: {},
          description: {},
          bullets: []
      }
    };
    this.getPDPInfo = this.getPDPInfo.bind(this);
  }

  componentWillMount() {
    this.getPDPInfo(this.props.webid)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.webid !== nextProps.webid) this.getPDPInfo(nextProps.webid)
  }

  getPDPInfo(webid) {
    var itemPDPData = dataFetch.getPdpData(webid);
    this.setState({ item : { webId : webid, name : itemPDPData.name, description : itemPDPData.description, bullets : itemPDPData.bullets} });
  }

  render () {
    return (
      <div className="details-container">

        {/* <div className="sticky-header">
          <table>
            <tbody>
          <tr>
          <td className="align-left">Product Details</td>
          <td className="align-right">Web ID: {this.state.item.webId}</td>
          </tr>
            </tbody>
          </table>
        </div> */}


        <div className="product-description">

          <div className="details-section-title">Product Details</div>
          <div className="details-webid">Web ID: {this.state.item.webId}</div>
          {this.state.item.description}
          <div className="product-bullets">
            <ul>
              {
                this.state.item.bullets.map((bullet, index) =>
                  <li key={index}>{bullet}</li>
                )
              }
            </ul>
          </div>
        </div>

      </div>
    )}
};

export default Details;
