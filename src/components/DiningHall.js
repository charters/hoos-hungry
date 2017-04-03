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

  return hourTime + ":" + minuteTime + "0" + " " + meridiem;

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
          <h2>All Hours</h2>
          {this.props.data.viewer.allDiningHalls.edges[0].node.windowsOfOperation.edges.map( (hourWindows) => {
              return <h4>{convertFloatToFriendlyTime(hourWindows.node.openingHour)} - {convertFloatToFriendlyTime(hourWindows.node.closingHour)}</h4>
            })}
          <h2>Link: <a href={this.props.data.viewer.allDiningHalls.edges[0].node.url} target="_blank">{this.props.data.viewer.allDiningHalls.edges[0].node.url}</a></h2>
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
