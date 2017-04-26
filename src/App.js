//Libraries
import React, { Component } from 'react';

//Components
import Header from './components/Header';
import Footer from './components/Footer';

//Styles
import './App.css';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Header title={this.props.title} />
        { this.props.children }
        <Footer />
      </div>
    );
  }

  static defaultProps = {
    title: "hoos hungry",
    diningHalls: {}
  }

  static propTypes = {
    title: React.PropTypes.string.isRequired
  }
}
