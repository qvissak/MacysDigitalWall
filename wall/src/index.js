// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Grid, Row, Col } from 'react-bootstrap'
// User-defined classes
import registerServiceWorker from './registerServiceWorker';
import CollectionContainer from './component/collectionContainer/CollectionContainer';
// Style Sheets
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
var collection1ProductIds = ["4609023","2865215","4535779"];//top left
var collection2ProductIds = ["4484514","4486033","4796469"];//top right
var collection3ProductIds = ["4735028","4484520","4484515"];//bottom left
var collection4ProductIds = ["4796470","4484518","4373170"];// bottom right

//PLEASE DONT EDIT! create child components and put them within intead
var renderedPage = (
    <Grid id="grid" fluid={true}>
      <Row id="row-top">
        <Col className="box-left" xs={12} md={5}>
          {/* TOP LEFT /> */}
          <CollectionContainer productIds={collection1ProductIds} direction="left"/>
        </Col>
        <Col className="box-dummy" xs={0} md={2}></Col>
        <Col className="box-right" xs={12} md={5}>
          {/* TOP RIGHT /> */}
          <CollectionContainer productIds={collection2ProductIds} direction="right"/>
        </Col>
      </Row>
      <Row id="row-bot">
        <Col className="box-left" xs={12} md={5}>
          {/* BOTTOM LEFT */}
          <CollectionContainer productIds={collection3ProductIds} direction="left"/>
        </Col>
        <Col className="box-dummy" xs={0} md={2}></Col>
        <Col className="box-right" xs={12} md={5}>
          {/* BOTTOM RIGHT */}
          <CollectionContainer productIds={collection4ProductIds} direction="right"/>
        </Col>
      </Row>
    </Grid>
);

injectTapEventPlugin();
ReactDOM.render(renderedPage, document.getElementById('root'));
registerServiceWorker();
