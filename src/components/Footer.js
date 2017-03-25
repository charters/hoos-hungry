import React, { Component } from 'react';

class Footer extends Component {

  render() {
    return (
      <div className="footer">

        <button className="pivot">
          <p>ALL</p>
        </button>

        <button className="pivot">
          <p>SWIPE</p>
        </button>

        <button className="pivot">
          <p>PLUS DOLLARS</p>
        </button>

      </div>
    );
  }
  
}

export default Footer;
