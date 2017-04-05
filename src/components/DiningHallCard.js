import React, { Component } from 'react';
import {Link} from 'react-router-dom';

function relativeTimeToClose() {

}

function convertFloatToFriendlyTime(floatTime) {

  let meridiem = "am";

  if (floatTime > 12) {
      meridiem = "pm";
      floatTime -= 12;
  }

  let stringTime = floatTime.toString();

  // Check for decimal
  if (stringTime.indexOf(".") == -1 ) return stringTime + ":00 " + meridiem;

  let hourTime = stringTime.split('.')[0];
  let minuteTime = stringTime.split('.')[1];

  if (minuteTime.length > 2) {
    minuteTime = minuteTime.slice(0,2);
  }

  return hourTime + ":" + minuteTime + "0" + " " + meridiem;

}

class DiningHallCard extends Component {


  render() {
    let shortId = '/' + this.props.shortId;
    console.log(this);
    return(
      <div className="dining-hall-card">
        <div className="dining-hall-card-container">
        <div className="dining-hall-card-title">
          <h2>{this.props.name}</h2>
          </div>
          <div className="dining-hall-card-closing">
            <i className="nc-icon-outline ui-2_time-clock"></i>
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

export default DiningHallCard;
