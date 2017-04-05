import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

function convertFloatToFriendlyTime(floatTime) {

  let meridiem = "am";

  if (floatTime > 12) {
      meridiem = "pm";
      floatTime -= 12;
  }

  let stringTime = floatTime.toString();

  // Check for decimal
  if (stringTime.indexOf(".") == -1 ) return stringTime + ":00 " + meridiem;

  let hourTime = stringTime.split('.')[0];
  let minuteTime = stringTime.split('.')[1];

  if (minuteTime.length > 2) {
    minuteTime = minuteTime.slice(0,2);
  }

  return hourTime + ":" + minuteTime + "0" + " " + meridiem;

}

function numberToDayOfWeek(dayIndex) {
  return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dayIndex];
}

class DiningHall extends Component {


  render() {
    if (this.props.data.loading) {
      return(<div className="outer-loader"><div className="loader"></div></div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    console.log(this);
    return(
      <div className="dining-hall-container">
        <div className="dining-hall">
          <h1>{this.props.data.viewer.allDiningHalls.edges[0].node.name}</h1>
          <div className="dining-hall-label">
            <i className="nc-icon-outline ui-1_calendar-grid-58"></i><h4>Hours</h4>
          </div>
          {this.props.data.viewer.allDiningHalls.edges[0].node.windowsOfOperation.edges.map( (hourWindows) => {
              return <div className="dining-hours-line"><p>{numberToDayOfWeek(hourWindows.node.dayOfWeek)}: {convertFloatToFriendlyTime(hourWindows.node.openingHour)} - {convertFloatToFriendlyTime(hourWindows.node.closingHour)}</p></div>
            })}
          <div className="dining-hall-label">
            <i className="nc-icon-outline ui-2_link-69"></i><h4>Link</h4>
          </div>
          <div className="dining-url">
            <a href={this.props.data.viewer.allDiningHalls.edges[0].node.url} target="_blank">{this.props.data.viewer.allDiningHalls.edges[0].node.url}</a>
          </div>
        </div>
      </div>
    );
  }

}



const DiningHallShortId = gql`
query DiningHallShortId($shortId: Int){
    viewer {
      allDiningHalls(where: {
          shortId: {eq: $shortId},
      }){
        edges {
          node{
            name
            nickname
            url
            windowsOfOperation(orderBy: {field: dayOfWeek, direction: ASC}){
              edges {
                node {
                  dayOfWeek
                  openingHour
                  closingHour
                }
              }
            }
          }
        }
      }
    }
  }
`;

const DiningHallWithData = graphql(DiningHallShortId, {
  options: (props) => ({
    variables: {
      shortId: props.match.params.shortId,
    }
  })
})(DiningHall);

export default DiningHallWithData;
