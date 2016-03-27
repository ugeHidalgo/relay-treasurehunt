import React from 'react';
import Relay from 'react-relay';

class AthleteCompetitions extends React.Component {

  renderAthleteCompetitionRow() {
    let athleteCompetitions = this.props.store.athlete.competitions.edges;
    return athleteCompetitions.map(comp => {
      return (
        <tr key={comp.node.__dataID__}>
          <td>{comp.node.name}</td>
          <td>{comp.node.type}</td>
          <td>{comp.node.city}</td>
          <td>{comp.node.country}</td>
        </tr>
      )
    });
  }

  render() {
    let athlete = this.props.store.athlete;
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">Competitions for athlete : {athlete.firstName} {athlete.lastName}</div>
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
						{this.renderAthleteCompetitionRow()}
					</tbody>
				</table>
				<div className="panel-footer">
					<div className="footerText">
						<p>Total competitions  : {athlete.competitions.edges.length}</p>
					</div>
				</div>
			</div>
		);
  }
}

export default Relay.createContainer(AthleteCompetitions, {
  initialVariables: {
    limit: 5
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        athlete {
          competitions(first:$limit) {
            edges {
              node {
                name,
                type,
                city,
                country
              }
            }
          }
        }
      }
    `,
  },
});
