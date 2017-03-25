//Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router} from 'react-router-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

//Component
import App from './App';

//Style
import './index.css';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({uri: 'https://us-west-2.api.scaphold.io/graphql/hooshungry'})
});

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      <Route exact path="/" component={App} />
    </Router>
  </ApolloProvider>
), document.getElementById('root'));
