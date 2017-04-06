import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import DiningHallCard from './DiningHallCard';

function getCurrentTime() {
  var d = new Date();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  return hours+(minutes/100);
}

function getDayOfWeek() {
  let d = new Date();
  let n = d.getDay();
  n--;
  if (n === -1){
    n = 6;
  }
  return n;
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
      return(<div className="outer-loader"><div className="loader"></div></div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    return(
      <div className="dining-hall-list">
        {this.props.data.viewer.allHoursWindows.edges.map(function(window){
          if (window.node.diningHall.nickname == null){
            return <DiningHallCard name={window.node.diningHall.name} shortId={window.node.diningHall.shortId} key={window.node.diningHall.shortId} closingHour={window.node.closingHour}/>
          }
          else return <DiningHallCard name={window.node.diningHall.nickname} key={window.node.diningHall.shortId}/>
        })}
      </div>
    );
  }

}


const AllOpenTimes = gql`
  query AllOpenTimes($time: Float, $dayOfWeek: Int){
    viewer {
      allHoursWindows(where: {
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
            diningHall {
              name,
              shortId
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
