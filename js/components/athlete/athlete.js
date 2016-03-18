import React from 'react';
import Relay from 'react-relay';

class Athlete extends React.Component {

  renderRow() {
    return this.props.store.athletes.map(athlete => {
      return (
        <tr key={athlete.id}>
          <td>{athlete.dni}</td>
          <td>{athlete.lastName}</td>
          <td>{athlete.firstName}</td>
          <td>{athlete.address}</td>
          <td>{athlete.city}</td>
          <td>{athlete.country}</td>
        </tr>
      )
    });
  }

  render() {

		return (
			<div className="panel panel-primary">
				<div className="panel-heading">Athletes</div>
				<table className='table'>
					<thead>
						<tr>
              <th>DNI</th>
							<th>Last Name</th>
							<th>First Name</th>
              <th>address</th>
              <th>City</th>
              <th>Country</th>
						</tr>
					</thead>
					<tbody>
						{this.renderRow()}
					</tbody>
				</table>
				<div className="panel-footer">
					<div className="footerText">
						<p>Total Athletes  : {this.props.store.athletes.length}</p>
					</div>
				</div>
			</div>
		);
  }
}

export default Relay.createContainer(Athlete, {
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
