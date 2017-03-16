import React, { Component } from 'react';
import './App.css';

var DINING_HALLS = [
  {
    name: "OHill",
    openWindows: [
      {
        day: 0,
        open: 7.00,
        close: 21.00
      },
      {
        day: 1,
        open: 7.00,
        close: 21.00
      },
      {
        day: 2,
        open: 7.00,
        close: 21.00
      },
      {
        day: 3,
        open: 7.00,
        close: 21.00
      },
      {
        day: 4,
        open: 7.00,
        close: 21.00
      },
      {
        day: 5,
        open: 8.00,
        close: 21.00
      },
      {
        day: 6,
        open: 8.00,
        close: 21.00
      }
    ],
    canSwipe: true
  },
  {
    name: "Newcomb",
    openWindows: [
      {
        day: 0,
        open: 7.00,
        close: 20.00
      },
      {
        day: 1,
        open: 7.00,
        close: 20.00
      },
      {
        day: 2,
        open: 7.00,
        close: 20.00
      },
      {
        day: 3,
        open: 7.00,
        close: 20.00
      },
      {
        day: 4,
        open: 7.00,
        close: 14.25
      },
      {
        day: 5,
        open: 10.00,
        close: 14.00
      },
      {
        day: 6,
        open: 10.00,
        close: 20.00
      }
    ],
    canSwipe: true
  }
];


class Header extends Component {
  render() {
    return(
      <div className="header">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

class DiningHall extends Component {
  render() {
    return(
      <div className="dining-hall">
        <h2>{this.props.name}</h2>
      </div>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <div className="footer">

        <button className="pivot" active>
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

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header title={this.props.title} />
        <div className="dining-halls">
          {this.props.diningHalls.map(function(diningHall) {
					       return <DiningHall name={diningHall.name} canSwipe={diningHall.canSwipe} />
				  })}
        </div>

        <Footer />
      </div>
    );
  }

  static defaultProps = {
    title: "HoosHungry",
    diningHalls: DINING_HALLS
  }

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    diningHalls: React.PropTypes.arrayOf(React.PropTypes.shape({
  		name: React.PropTypes.string.isRequired,
  		openWindows: React.PropTypes.arrayOf(React.PropTypes.shape({
        day: React.PropTypes.number.isRequired,
        open: React.PropTypes.number.isRequired,
        close: React.PropTypes.number.isRequired,
      })).isRequired,
  		canSwipe: React.PropTypes.bool.isRequired,
		}
  )).isRequired,
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to HoosHungry</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
