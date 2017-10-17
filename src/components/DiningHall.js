import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

export function convertFloatToFriendlyTime(floatTime) {

  let meridiem = "am";

  if (floatTime === 12) {
    meridiem = "pm";
  }

  if (floatTime > 12 && floatTime < 24) {
      meridiem = "pm";
      floatTime -= 12;
  }

  if (floatTime === 24){
    meridiem = "am";
    floatTime -= 12;
  }

  let stringTime = floatTime.toString();

  // Check for decimal
  if (stringTime.indexOf(".") === -1 ) return stringTime + ":00 " + meridiem;

  let hourTime = stringTime.split('.')[0];
  let minuteTime = stringTime.split('.')[1];

  if (minuteTime.length > 2) {
    minuteTime = minuteTime.slice(0,2);
  }

  return hourTime + ":" + minuteTime + (minuteTime.length > 1 ? "" : "0") + " " + meridiem;

}

function numberToDayOfWeek(dayIndex) {
  return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dayIndex];
}

function dateToNumber( date ) {
  let n = date.getDay();
  return (n === 0) ? 6 : n - 1;

}

class DiningHall extends Component {

  renderHoursLine(dayOfWeek, openingHour, closingHour) {
    // if dayOfWeek is today
    let today = new Date();
    let todayNum = dateToNumber(today);

    if (dayOfWeek === todayNum) {
      return (
        <div className="dining-hours-line active">
          <p>{ numberToDayOfWeek(dayOfWeek) }:  { convertFloatToFriendlyTime(openingHour) } - { convertFloatToFriendlyTime(closingHour) }</p>
          </div>
        )
    }
    else {
      return (
      <div className="dining-hours-line">
        <p>{ numberToDayOfWeek(dayOfWeek)}:  { convertFloatToFriendlyTime(openingHour) } - { convertFloatToFriendlyTime(closingHour) }</p>
        </div>
      )
    }
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
      <div className="dining-hall-container">
        <div className="dining-hall">
          <h1>{this.props.data.viewer.allDiningHalls.edges[0].node.name}</h1>
          <div className="dining-hall-label">
            <i className="nc-icon-glyph ui-1_calendar-grid-58"></i><h4>Hours</h4>
          </div>
          {this.props.data.viewer.allDiningHalls.edges[0].node.windowsOfOperation.edges.map( (hourWindows) => {
                return this.renderHoursLine(hourWindows.node.dayOfWeek, hourWindows.node.openingHour, hourWindows.node.closingHour);
            })}
          <div className="dining-hall-label">
            <i className="nc-icon-glyph ui-2_link-69"></i><h4>Link</h4>
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
