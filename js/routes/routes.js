import React from "react";
import {
		//Router,
		Route,
		IndexRoute
	} from "react-router";
  //import {createHashHistory} from 'history';
import {RelayRouter} from 'react-router-relay';

import Main from '../components/main/main';
import Home from '../components/home/home';
import Athlete from '../components/athlete/competition';
import Competition from '../components/competition/competition';
import ViewerQueries from '../queries/ViewerQueries';

var routes = (
    <Route
      path="/" component={Main}
      queries={ViewerQueries}>
      <IndexRoute
        component={Home}
        queries={ViewerQueries}/>
      <Route path="/homePage"
        component={Home}
        queries={ViewerQueries}/>
      <Route path="/athlete"
        component={Athlete}
        queries={ViewerQueries}/>
			<Route path="/competition"
	      component={Competition}
	      queries={ViewerQueries}/>
    </Route>
);

export default routes
