import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

class DiningHall extends Component {

  render() {
    return(
      <div className="dining-hall">
        <h2>{this.props.data.viewer.allDiningHalls.edges[0].name}</h2>
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
        }
      }
    }
  }
}
`;

const DiningHallWithData = graphql(DiningHallShortId, {
  options: ({match}) => ({
    variables: {
      shortId: match.params.shortId,
    }
  })
})(DiningHall);

export default DiningHallWithData;
