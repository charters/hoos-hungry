import React, { Component } from 'react';

class Header extends Component {

  render() {
    return(
      <div className="header">
        <i className="fa fa-cutlery"></i>
        <h1><a href="/">{this.props.title}</a></h1>
      </div>
    );
  }

}

export default Header;
