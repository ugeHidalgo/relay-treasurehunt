import React from 'react';
import { render } from 'react-dom';
import Relay from 'react-relay';

import Header from '../common/header/header';
import Footer from '../common/footer/footer';

//import jQuery from 'jquery';
import './main.css';

//let $=jQuery;

class Main extends React.Component {

	render () {
		return (
			<div>
        <Header />
				<div className="container-fluid">
					{this.props.children}
				</div>
        <Footer />
			</div>
		)
	}
};

export default Relay.createContainer(Main, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
          athletes {
            id,
            dni,
            firstName,
            lastName,
            address,
            city,
            country,
          }
      }
    `,
  },
});
