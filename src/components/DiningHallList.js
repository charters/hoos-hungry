import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import DiningHall from './DiningHall';

function getCurrentTime() {
  var d = new Date();
  var hours = d.getHours();
  var minutes = d.getMinutes();

  return hours+(minutes/100);
}

class DiningHallList extends Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      viewer: React.PropTypes.object,
    }).isRequired,
  }

  render() {
    if (this.props.data.loading) {
      return(<div className="loader"></div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    return(
      <div className="dining-hall-list">
        {this.props.data.viewer.allHoursOfOperations.edges.map(function(diningHall){
          return <DiningHall name={diningHall.node.location.nickname} />
        })}
      </div>
    );
  }

}

const AllOpenTimes = gql`
  query AllOpenTimes{
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

const DiningHallListWithData = graphql(AllOpenTimes)(DiningHallList);

export default DiningHallListWithData;
