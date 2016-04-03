import React from 'react';
import Relay from 'react-relay';

class Competition extends React.Component {

  renderCompetitionRow() {
    let Competitions = this.props.store.competitionConnection.edges;
    return Competitions.map(comp => {
      return (
        <tr key={comp.__dataID__}>
          <td>{comp.node.name}</td>
          <td>{comp.node.type}</td>
          <td>{comp.node.city}</td>
          <td>{comp.node.country}</td>
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
						<p>Total competitions  : {this.props.store.competitionConnection.edges.length}</p>
					</div>
				</div>
			</div>
		);
  }
}

export default Relay.createContainer(Competition, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        competitionConnection (first:5){
          edges {
            node {
              name,
              type
            }
          }
        }
      }
    `,
  },
});
