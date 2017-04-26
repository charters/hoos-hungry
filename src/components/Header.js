import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {

  render() {
    return(
      <div className="header">
        <Link to="/">
          <i className="nc-icon-glyph food_pizza-slice"></i>
          <h1>{this.props.title}</h1>
        </Link>
      </div>
    );
  }

}
