import React from "react";
import { Link } from "react-router";
import './header.css';
//import jQuery from 'jquery';


class Header extends React.Component {

	render() {
		return (
			<nav className="navbar navbar-default navbar-inner">
				<div className="container-fluid">
					<ul className="nav navbar-nav">
						<li><Link to='/homepage'>Home</Link></li>
						<li><a href='graphql'>GraphiQl</a></li>
						<li><Link to='/athleteForm'>Athletes</Link></li>
						<li><Link to='/competition'>Competitions</Link></li>
					</ul>
				</div>
			</nav> //navbar navbar-default navbar-inner
		);
	}
}

export default Header
