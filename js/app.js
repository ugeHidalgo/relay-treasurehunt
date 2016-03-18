//instalar: react-router react-relay y react-router-relay
//npm install --save react react-dom react-relay react-router
//npm install --save react-router-relay
//import {createHashHistory} from 'history';
//import {IndexRoute, Route} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {RelayRouter} from 'react-router-relay';
import {hashHistory} from 'react-router';

// import Main from './components/main/main';
// import Home from './components/home/home';
// import Athlete from './components/athlete/athlete';
// import ViewerQueries from './queries/ViewerQueries';
import routes from './routes/routes';

ReactDOM.render (
  <RelayRouter history={hashHistory}>
    {routes}
  </RelayRouter>,
  document.getElementById('root')
);

// ReactDOM.render (
//   <RelayRouter history={createHashHistory({queryKey: false})}>
//     {routes}
//   </RelayRouter>,
//   document.getElementById('root')
// );

// ReactDOM.render (
//   <RelayRouter history={createHashHistory({queryKey: false})}>
//     <Route
//       path="/" component={Main}
//       queries={ViewerQueries}>
//       <IndexRoute path="/homePage"
//         component={Home}
//         queries={ViewerQueries}/>
//       <Route path="/homePage"
//         component={Home}
//         queries={ViewerQueries}/>
//       <Route path="/athletesList"
//         component={Athlete}
//         queries={ViewerQueries}/>
//     </Route>
//   </RelayRouter>,
//   document.getElementById('root')
// );
