import React from 'react';
import Relay from 'react-relay';

class Athlete extends React.Component {

  renderCompetitionRow() {
    let athleteCompetitions = this.props.viewer.competitions.edges;
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
    let athlete = this.props.viewer;
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
						{this.renderCompetitionRow()}
					</tbody>
				</table>
				<div className="panel-footer">
					<div className="footerText">
						<p>Total competitions  : {this.props.viewer.competitions.edges.length}</p>
					</div>
				</div>
			</div>
		);
  }
}

export default Relay.createContainer(Athlete, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Athlete {
        firstName,
        lastName,
        competitions(first:2) {
          edges {
            node{
              name,
              type,
              city,
              country
            }
          }
        }
      }
    `,
  },
});
