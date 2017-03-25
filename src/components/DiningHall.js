import React, { Component } from 'react';

class DiningHall extends Component {

  render() {
    return(
      <div className="dining-hall">
        <h2>{this.props.name}</h2>
      </div>
    );
  }

}

export default DiningHall;
