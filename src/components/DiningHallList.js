import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import DiningHall from './DiningHall';

function getCurrentTime() {
  var d = new Date();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  console.log(hours+(minutes/100));
  return hours+(minutes/100);
}

function getDayOfWeek() {
  var d = new Date();

  return d.getDay();
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
          if (diningHall.node.location.nickname == null){
            return <DiningHall name={diningHall.node.location.name} key={diningHall.node.location.id}/>
          }
          else return <DiningHall name={diningHall.node.location.nickname} key={diningHall.node.location.id}/>
        })}
      </div>
    );
  }

}

const AllOpenTimes = gql`
  query AllOpenTimes($time: Float, $dayOfWeek: Int){
    viewer {
      allHoursOfOperations(where: {
        AND: [
          {openingHour: {lt: $time}},
          {closingHour: {gt: $time}},
          {dayOfWeek: {eq: $dayOfWeek}},
        ]
      }, orderBy: {field: closingHour, direction: ASC}) {
        edges {
          node{
            closingHour
            openingHour
            dayOfWeek
            location {
              id
              name
              nickname
            }
          }
        }
      }
    }
  }
`;

const DiningHallListWithData = graphql(AllOpenTimes, {
  options: {
    variables: {
      time: getCurrentTime(),
      dayOfWeek: getDayOfWeek(),
    }
  }
})(DiningHallList);

export default DiningHallListWithData;
