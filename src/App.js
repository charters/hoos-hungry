//Libraries
import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

//Components
import Header from './components/Header.js';

//Styles
import './App.css';

const AllOpenTimes = gql`
  query AllOpenTimes {
    viewer {
      allHoursOfOperations(where: {
        AND: [
          {openingHour: {lt: 18.45}},
          {closingHour: {gt: 18.45}}
        ]
      }) {
        edges {
          node{
            closingHour
            openingHour
            location {
              name
              nickname
            }
          }
        }
      }
    }
  }
`;


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
    diningHalls: {}
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

const DiningHallWithData = graphql(AllOpenTimes)(DiningHall);

export default App;
