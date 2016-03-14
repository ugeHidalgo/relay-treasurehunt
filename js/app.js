//instal react-router react-relay y react-router-relay
//npm install --save react react-dom react-relay react-router
//npm install --save react-router-relay
import {createHashHistory} from 'history';
import {IndexRoute, Route} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {RelayRouter} from 'react-router-relay';
import App from './components/App';
import ViewerQueries from './queries/ViewerQueries';



ReactDOM.render (
  <RelayRouter history={createHashHistory({queryKey: false})}>
    <Route
      path="/" component={App}
      queries={ViewerQueries}>
      <IndexRoute
        component={App}
        queries={ViewerQueries}
      />
    </Route>
  </RelayRouter>,
  document.getElementById('root')
);
