import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {

  render() {
    return(
      <div className="header">
        <i className="fa fa-cutlery"></i>
        <h1><Link to="/">{this.props.title}</Link></h1>
      </div>
    );
  }

}

export default Header;
