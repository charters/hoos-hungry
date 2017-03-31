import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class DiningHallCard extends Component {


  render() {
    let shortId = '/' + this.props.shortId;
    console.log(this);
    return(
        <div className="dining-hall-card">
          <Link to={{pathname: shortId}}>
            <h2>{this.props.name}</h2>
          </Link>
        </div>
    );
  }

}

export default DiningHallCard;
