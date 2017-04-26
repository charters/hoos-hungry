import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { convertFloatToFriendlyTime } from './DiningHall';


export default class DiningHallCard extends Component {


  render() {
    let shortId = '/' + this.props.shortId;
    return(
      <div className="dining-hall-card">
        <div className="dining-hall-card-container">
        <div className="dining-hall-card-title">
          <h2>{this.props.name}</h2>
          </div>
          <div className="dining-hall-card-closing">
            <i className="nc-icon-glyph ui-2_time-clock"></i>
            <p> Closes at {convertFloatToFriendlyTime(this.props.closingHour)}</p>
          </div>
        </div>
          <div className="dining-hall-card-arrow">
            <Link to={{pathname: shortId}}>
              <i className="nc-icon-glyph arrows-1_minimal-right"></i>
            </Link>
          </div>
      </div>
    );
  }

}
