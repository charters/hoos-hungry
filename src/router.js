// Libraries
import React from 'react';
import { Route, BrowserRouter as Router} from 'react-router-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';


//Components
import App from './App';
import DiningHallList from './components/DiningHallList';
import DiningHall from './components/DiningHall';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({uri: 'https://us-west-2.api.scaphold.io/graphql/hooshungry'})
});

//Routes
const routes = (
  <ApolloProvider client={client}>
    <Router>
      <App>
        <Route exact={true} path="/" component={DiningHallList} />
        <Route path="dininghall/:shortId" component={DiningHall} />
      </App>
    </Router>
  </ApolloProvider>
);

export default routes;
