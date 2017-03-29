//Libraries
import React, { Component } from 'react';

//Components
import Header from './components/Header';
import DiningHallList from './components/DiningHallList';
import Footer from './components/Footer';

//Styles
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header title={this.props.title} />
        <DiningHallList />
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

export default App;
