import React from 'react';
import Relay from 'react-relay';

class Athlete extends React.Component {

  renderCompetitionRow() {
    debugger;
    let Competitions = this.props.store.competitions;
    return Competitions.map(comp => {
      return (
        <tr key={comp.__dataID__}>
          <td>{comp.name}</td>
          <td>{comp.type}</td>
          <td>{comp.city}</td>
          <td>{comp.country}</td>
        </tr>
      )
    });
  }

  render() {
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">Competitions</div>
				<table className='table'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Type</th>
              <th>City</th>
              <th>Country</th>
						</tr>
					</thead>
					<tbody>
						{this.renderCompetitionRow()}
					</tbody>
				</table>
				<div className="panel-footer">
					<div className="footerText">
						<p>Total competitions  : {this.props.store.competitions.length}</p>
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
        competitions{
          name,
          type,
          city,
          country
        }
      }
    `,
  },
});
